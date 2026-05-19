import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, subcategory, neighborhood, priceRange } = body

    if (!name || !category || !neighborhood) {
      return NextResponse.json(
        { error: 'Name, category, and neighborhood are required.' },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        name,
        category,
        subcategory: subcategory || null,
        neighborhood,
        price_range: priceRange || null,
        photo_urls: [],
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
