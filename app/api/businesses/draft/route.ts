import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const { businessId, draftData } = await req.json();

  if (!businessId || !draftData) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from('businesses')
    .update({
      draft_data: draftData,
      draft_updated_at: new Date().toISOString(),
    })
    .eq('id', businessId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
