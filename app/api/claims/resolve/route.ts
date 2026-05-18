import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const { userId, claimId } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // 1. Attach user to claim
    const { data: claim, error: claimError } = await supabase
      .from('claim_requests')
      .update({
        user_id: userId,
        status: 'approved',
      })
      .eq('id', claimId)
      .select()
      .single()

    if (claimError) throw claimError

    // 2. If business exists → mark verified
    if (claim.business_id) {
      await supabase
        .from('businesses')
        .update({ is_verified: true })
        .eq('id', claim.business_id)
    }

    // 3. If custom business → create it
    if (!claim.business_id && claim.custom_business_name) {
      await supabase.from('businesses').insert({
        name: claim.custom_business_name,
        category: claim.custom_business_category,
        is_verified: true,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}