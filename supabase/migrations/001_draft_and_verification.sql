-- Draft state on businesses (published vs pending edits)
ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS draft_data      JSONB,
  ADD COLUMN IF NOT EXISTS draft_user_id   UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS draft_updated_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS about_us        TEXT,
  ADD COLUMN IF NOT EXISTS good_to_know    TEXT[];

-- Verification records
CREATE TABLE IF NOT EXISTS verification_records (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  UUID        NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id      UUID        REFERENCES auth.users(id),
  method       TEXT        NOT NULL CHECK (method IN ('google', 'document', 'phone')),
  status       TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  document_url TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE verification_records ENABLE ROW LEVEL SECURITY;

-- Service role bypass (your API routes use the service key)
CREATE POLICY "service_role_all" ON verification_records
  USING (true)
  WITH CHECK (true);
