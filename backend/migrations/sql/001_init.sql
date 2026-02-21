CREATE TABLE IF NOT EXISTS authorized_users (
  id SERIAL PRIMARY KEY,
  emp_id VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128),
  approved_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS detectors (
  id SERIAL PRIMARY KEY,
  management_no VARCHAR(64) UNIQUE NOT NULL,
  fault BOOLEAN NOT NULL DEFAULT FALSE,
  ready BOOLEAN NOT NULL DEFAULT FALSE,
  region VARCHAR(64),
  line VARCHAR(64),
  floor VARCHAR(64),
  vendor_name VARCHAR(128),
  model_name VARCHAR(128)
);

CREATE INDEX IF NOT EXISTS idx_detectors_line ON detectors(line);
CREATE INDEX IF NOT EXISTS idx_detectors_model_name ON detectors(model_name);
CREATE INDEX IF NOT EXISTS idx_detectors_region ON detectors(region);
