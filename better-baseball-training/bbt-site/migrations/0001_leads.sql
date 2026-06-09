CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  program    TEXT,
  message    TEXT NOT NULL DEFAULT '',
  source     TEXT,
  user_agent TEXT,
  ip         TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source     ON leads(source);
