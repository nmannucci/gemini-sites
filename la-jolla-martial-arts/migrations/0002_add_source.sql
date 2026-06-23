ALTER TABLE leads ADD COLUMN source TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
