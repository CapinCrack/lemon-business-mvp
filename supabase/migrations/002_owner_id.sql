-- Link a claimed business to its owner (set by the verify route on submission)
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS businesses_owner_id_idx ON businesses(owner_id);
