import "jsr:@supabase/functions-js/edge-runtime.d.ts";
/// <reference types="https://esm.sh/@supabase/functions-js/2.4.3/src/edge-runtime.d.ts" />

declare const Deno: any;

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  service_required?: string;
  budget_range?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const lead: LeadPayload = await req.json();

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || "akashkiranboddu@gmail.com";
    const senderEmail = Deno.env.get("SENDER_EMAIL") || "onboarding@resend.dev";

    // If no Resend key configured, log and return success (graceful degradation)
    if (!resendKey) {
      console.log("RESEND_API_KEY not set — skipping email notification for lead:", lead.email);
      return new Response(
        JSON.stringify({ success: true, notified: false, reason: "email_not_configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px;">
        <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #1e293b;">
          <h1 style="color: #2563EB; font-size: 22px; margin: 0 0 4px;">New Project Inquiry</h1>
          <p style="color: #64748b; margin: 0; font-size: 13px;">AK Technologies — Contact Form</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${lead.full_name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #60a5fa;">${lead.email}</a></td></tr>
          ${lead.phone ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Phone</td><td style="padding: 8px 0;">${lead.phone}</td></tr>` : ""}
          ${lead.company_name ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Company</td><td style="padding: 8px 0;">${lead.company_name}</td></tr>` : ""}
          ${lead.service_required ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Service</td><td style="padding: 8px 0;">${lead.service_required}</td></tr>` : ""}
          ${lead.budget_range ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Budget</td><td style="padding: 8px 0;">${lead.budget_range}</td></tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #1e293b; border-radius: 8px; border-left: 3px solid #2563EB;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <p style="margin: 0; line-height: 1.6;">${lead.message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #475569;">Submitted via aktechnologies.io contact form</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `AK Technologies <${senderEmail}>`,
        to: [notifyEmail],
        subject: `New Lead: ${lead.full_name} — ${lead.service_required || "General Inquiry"}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(
        JSON.stringify({ success: true, notified: false, reason: "email_send_failed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, notified: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("notify-lead error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
