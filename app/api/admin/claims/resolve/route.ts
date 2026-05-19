import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/src/utils/supabase/server';
import { notifyClaimantOfDecision } from '@/app/lib/email';

export async function POST(req: Request) {
  try {
    const auth = await createServerClient();
    const { data: { session } } = await auth.auth.getSession();
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      // Merge any pending draft edits into the live record on approval
      const { data: biz } = await supabase
        .from('businesses')
        .select('draft_data')
        .eq('id', claim.business_id)
        .single();

      const draft = (biz?.draft_data ?? {}) as Record<string, unknown>;
      const draftFields = Object.keys(draft).length > 0 ? {
        name: draft.name,
        category: draft.category,
        subcategory: draft.subcategory,
        address: draft.address,
        price_range: draft.price_range,
        booking_option: draft.booking_option,
        about_us: draft.about_us,
        good_to_know: draft.good_to_know,
        hours: draft.hours,
      } : {};

      const { error: bizError } = await supabase
        .from('businesses')
        .update({ is_verified: true, ...draftFields })
        .eq('id', claim.business_id);
      if (bizError) console.error('[admin/resolve] Business update failed:', bizError);
    }

    if (action === 'approved' && !claim.business_id && claim.custom_business_name) {
      const { error: insertError } = await supabase.from('businesses').insert({
        name: claim.custom_business_name,
        category: claim.custom_business_category,
        is_verified: true,
      });
      if (insertError) console.error('[admin/resolve] Business insert failed:', insertError);
    }

    try {
      await notifyClaimantOfDecision(claim.owner_email, claim.owner_full_name, action);
    } catch (err) {
      console.error('[admin/resolve] Claimant notification failed:', err);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
