-- Signed records retain the exact waiver version, consent, dates and signature strokes.
-- Email delivery is an outbox: failures remain pending and are retried by the Worker.
CREATE TABLE IF NOT EXISTS zumba_waivers (
  id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  record_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  email_status TEXT NOT NULL DEFAULT 'pending' CHECK (email_status IN ('pending', 'sent')),
  email_attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TEXT NOT NULL,
  email_sent_at TEXT,
  email_id TEXT
);
CREATE INDEX IF NOT EXISTS idx_zumba_waiver_delivery ON zumba_waivers(email_status, next_attempt_at);
