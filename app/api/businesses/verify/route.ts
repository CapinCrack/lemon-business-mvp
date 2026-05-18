import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const formData = await req.formData();
  const businessId = formData.get('businessId') as string;
  const method = formData.get('method') as string;
  const file = formData.get('file') as File | null;

  if (!businessId || !method) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let documentUrl: string | null = null;

  if (method === 'document' && file) {
    const ext = file.name.split('.').pop();
    const path = `verification/${businessId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file, { contentType: file.type, upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from('documents').getPublicUrl(path);
    documentUrl = urlData.publicUrl;
  }

  const { error } = await supabase.from('verification_records').insert({
    business_id: businessId,
    method,
    status: 'pending',
    document_url: documentUrl,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
