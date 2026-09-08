/*
# Create contact_leads table

## Overview
Creates the `contact_leads` table to store all project inquiries submitted through the AK Technologies website contact form.

## New Tables

### `contact_leads`
Stores every inbound lead from the website contact form.

| Column           | Type        | Notes                                                      |
|------------------|-------------|------------------------------------------------------------|
| id               | uuid        | Primary key, auto-generated                                |
| full_name        | text        | Submitter's full name (required)                           |
| email            | text        | Contact email address (required)                           |
| phone            | text        | Optional phone number                                      |
| company_name     | text        | Optional company / organisation                            |
| service_required | text        | Selected service from dropdown                             |
| budget_range     | text        | Selected budget range from dropdown                        |
| message          | text        | Free-text project description (required)                   |
| status           | text        | Workflow status — one of: New, Contacted, In Discussion, Converted, Rejected (default: New) |
| notes            | text        | Internal admin notes — not visible to submitters           |
| created_at       | timestamptz | Auto-set to UTC now() on insert                            |

## Security

- RLS is enabled. Public (anon) users can INSERT only — they cannot read, update, or delete.
- Authenticated users (admin) can SELECT, UPDATE, and DELETE.
- The anon INSERT policy allows the contact form to save leads without auth.
- Admins sign in via Supabase Auth and get full CRUD access.
*/

CREATE TABLE IF NOT EXISTS contact_leads (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name        text NOT NULL,
  email            text NOT NULL,
  phone            text,
  company_name     text,
  service_required text,
  budget_range     text,
  message          text NOT NULL,
  status           text NOT NULL DEFAULT 'New'
                   CHECK (status IN ('New','Contacted','In Discussion','Converted','Rejected')),
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Index on created_at for default sort, email for dedup checks
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads (email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads (status);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Anon can insert (contact form submissions)
DROP POLICY IF EXISTS "anon_insert_leads" ON contact_leads;
CREATE POLICY "anon_insert_leads" ON contact_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admins can read leads
DROP POLICY IF EXISTS "auth_select_leads" ON contact_leads;
CREATE POLICY "auth_select_leads" ON contact_leads FOR SELECT
TO authenticated
USING (true);

-- Only authenticated admins can update leads (status, notes)
DROP POLICY IF EXISTS "auth_update_leads" ON contact_leads;
CREATE POLICY "auth_update_leads" ON contact_leads FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated admins can delete leads (spam removal)
DROP POLICY IF EXISTS "auth_delete_leads" ON contact_leads;
CREATE POLICY "auth_delete_leads" ON contact_leads FOR DELETE
TO authenticated
USING (true);
