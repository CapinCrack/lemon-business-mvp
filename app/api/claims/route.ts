import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { notifyAdminOfNewClaim } from '@/app/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      businessId,
      ownerFullName,
      ownerEmail,
      ownerPhone,
      customBusinessName,
      customBusinessCategory,
      additionalNotes,
    } = body

    if (!ownerFullName || !ownerEmail) {
      return NextResponse.json(
        { error: 'Missing core contact details.' },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('claim_requests')
      .insert([
        {
          business_id: businessId || null,
          owner_full_name: ownerFullName,
          owner_email: ownerEmail,
          owner_phone: ownerPhone,
          custom_business_name: customBusinessName || null,
          custom_business_category: customBusinessCategory || null,
          additional_notes: additionalNotes || null,
          status: 'pending',

          // NEW (optional for now)
          user_id: null,
        },
      ])
      .select()
      .single()

    if (error) throw error

    // Fire-and-forget — don't let email failure block the response
    notifyAdminOfNewClaim(data).catch((err) =>
      console.error('[claims] Admin notification failed:', err)
    );

    return NextResponse.json({ success: true, claim: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}