import 'dotenv/config';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Rejected';
interface LeadDocument {
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  service_required: string | null;
  budget_range: string | null;
  message: string;
  status: LeadStatus;
  notes: string | null;
  created_at: Date;
}

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'] as const;
for (const name of requiredEnv) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

const app = express();
const client = new MongoClient(process.env.MONGODB_URI!);
const leads = () => client.db(process.env.MONGODB_DB || 'ak_technologies').collection<LeadDocument>('contact_leads');
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET!;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '32kb' }));

function serializeLead(document: LeadDocument & { _id: ObjectId }) {
  return { ...document, id: document._id.toHexString(), created_at: document.created_at.toISOString(), _id: undefined };
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired' });
  }
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    const valid = email?.trim().toLowerCase() === process.env.ADMIN_EMAIL!.trim().toLowerCase()
      && await bcrypt.compare(password || '', await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10));
    if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });
    res.json({ token: jwt.sign({ email }, jwtSecret, { expiresIn: '8h' }) });
  } catch (error) { next(error); }
});

app.post('/api/leads', async (req, res, next) => {
  try {
    const input = req.body as Partial<LeadDocument>;
    if (!input.full_name?.trim() || !input.email?.trim() || !input.message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const lead: LeadDocument = {
      full_name: input.full_name.trim(), email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null, company_name: input.company_name?.trim() || null,
      service_required: input.service_required || null, budget_range: input.budget_range || null,
      message: input.message.trim(), status: 'New', notes: null, created_at: new Date(),
    };
    const result = await leads().insertOne(lead);
    const saved = await leads().findOne({ _id: result.insertedId });
    res.status(201).json({ lead: serializeLead(saved!) });
    void notifyLead(lead);
  } catch (error) { next(error); }
});

app.get('/api/leads', auth, async (_req, res, next) => {
  try {
    const result = await leads().find().sort({ created_at: -1 }).toArray();
    res.json({ leads: result.map((lead) => serializeLead(lead as LeadDocument & { _id: ObjectId })) });
  } catch (error) { next(error); }
});

app.patch('/api/leads/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (typeof id !== 'string' || !ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid lead id' });
    const patch = req.body as Partial<Pick<LeadDocument, 'status' | 'notes'>>;
    const result = await leads().findOneAndUpdate(
      { _id: new ObjectId(id) }, { $set: { status: patch.status, notes: patch.notes } }, { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ error: 'Lead not found' });
    res.json({ lead: serializeLead(result as LeadDocument & { _id: ObjectId }) });
  } catch (error) { next(error); }
});

app.delete('/api/leads/:id', auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    if (typeof id !== 'string' || !ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid lead id' });
    await leads().deleteOne({ _id: new ObjectId(id) });
    res.status(204).send();
  } catch (error) { next(error); }
});

async function notifyLead(lead: LeadDocument) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: `AK Technologies <${process.env.SENDER_EMAIL || 'onboarding@resend.dev'}>`, to: [process.env.NOTIFY_EMAIL], subject: `New Lead: ${lead.full_name}`, text: `${lead.email}\n\n${lead.message}` }),
  });
}

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

await client.connect();
await leads().createIndex({ created_at: -1 });
app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
