import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { notifyClaimantOfDecision } from '@/app/lib/email';

export async function POST(req: Request) {
  try {
    const { claimId, action } = await req.json();

    if (!claimId || !['approved', 'rejected'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: claim, error: claimError } = await supabase
      .from('claim_requests')
      .update({ status: action })
      .eq('id', claimId)
      .select()
      .single();

    if (claimError) throw claimError;

    if (action === 'approved' && claim.business_id) {
      await supabase
        .from('businesses')
        .update({ owner_id: claim.user_id, claimed: true })
        .eq('id', claim.business_id);
    }

    if (action === 'approved' && !claim.business_id && claim.custom_business_name) {
      await supabase.from('businesses').insert({
        name: claim.custom_business_name,
        category: claim.custom_business_category,
        owner_id: claim.user_id,
        claimed: true,
      });
    }

    // Notify the claimant of the decision
    notifyClaimantOfDecision(claim.owner_email, claim.owner_full_name, action).catch((err) =>
      console.error('[admin/resolve] Claimant notification failed:', err)
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
