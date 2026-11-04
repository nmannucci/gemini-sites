-- One row per family. Repeat entries update the row and bump version.
-- Each entry is sent to GHL once (plus once per re-entry). Failures are marked 'failed' and never retried,
-- so GHL can't receive the same entry twice and send a second receipt text.
CREATE TABLE IF NOT EXISTS giveaway_entries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  parent_first_name TEXT NOT NULL,
  parent_last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  child_first_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  zip TEXT NOT NULL,
  benefits TEXT NOT NULL,
  benefit_other TEXT,
  twice_weekly TEXT NOT NULL,
  sms_consent_text TEXT NOT NULL,
  sms_consent_at TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  fbclid TEXT,
  ghl_status TEXT NOT NULL DEFAULT 'pending' CHECK (ghl_status IN ('pending', 'sent', 'failed')),
  ghl_attempts INTEGER NOT NULL DEFAULT 0,
  ghl_next_attempt_at TEXT NOT NULL,
  ghl_error TEXT,
  ghl_first_sent_at TEXT,
  ghl_lease_until TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_giveaway_phone ON giveaway_entries(phone);
CREATE INDEX IF NOT EXISTS idx_giveaway_email ON giveaway_entries(email);
CREATE INDEX IF NOT EXISTS idx_giveaway_delivery ON giveaway_entries(ghl_status, ghl_next_attempt_at);
CREATE INDEX IF NOT EXISTS idx_giveaway_ip ON giveaway_entries(ip, updated_at);
