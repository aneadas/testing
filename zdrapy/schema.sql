-- D1 schema
CREATE TABLE IF NOT EXISTS codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE NOT NULL,
  prize TEXT,
  created_at TEXT NOT NULL,
  redeemed_at TEXT,
  redeemed_ip TEXT
);
CREATE INDEX IF NOT EXISTS idx_codes_code ON codes(code);
