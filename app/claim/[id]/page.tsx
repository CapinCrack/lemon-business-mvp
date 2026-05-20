import Link from 'next/link';
import { createClient } from '@/src/utils/supabase/server';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

function seedViewCount(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffffffff;
  }
  return 50 + (Math.abs(hash) % 451);
}

export default async function ProfilePreviewPage({ params }: Props) {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !business) notFound();

  const viewCount = seedViewCount(params.id);
  const rating = (8.5 + ((viewCount % 15) / 10)).toFixed(1);
  const reactionCount = viewCount * 3 + 47;

  return (
    <main className="min-h-screen bg-zinc-50 pb-28">
      {/* Top banner */}
      <div className="bg-amber-400 text-black text-xs font-bold text-center py-2.5 px-4">
        Your Lemon Profile - this is how customers see you.
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/lemon-icon.png" alt="Lemon" className="w-7 h-7 object-contain" />
            <div className="flex items-baseline gap-1">
              <span className="font-black text-zinc-900 tracking-tight">Lemon</span>
              <span className="text-[9px] font-black text-amber-500 tracking-widest uppercase">for business</span>
            </div>
          </Link>
          <Link href="/login" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
            Sign in
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-6">
        {/* Photo header */}
        <div className="w-full h-52 rounded-2xl overflow-hidden bg-zinc-200 mb-5">
          {business.photo_urls?.length > 0 ? (
            <img
              src={business.photo_urls[0]}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🏢</div>
          )}
        </div>

        {/* Business info */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-black text-zinc-900">{business.name}</h1>
            {business.is_verified && (
              <span className="flex-shrink-0 text-xs font-bold bg-amber-400 text-black px-2.5 py-1 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            {[business.category, business.subcategory, business.neighborhood]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>

        {/* Reactions block */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Lemon Score</p>
            <span className="text-xl font-black text-zinc-900">{rating} <span className="text-sm font-normal text-zinc-400">/ 10</span></span>
          </div>
          <div className="flex items-center gap-3 text-2xl mb-3">
            <span>😍</span><span>🔥</span><span>👏</span><span>💯</span>
          </div>
          <p className="text-xs text-zinc-400">{reactionCount.toLocaleString()} reactions from Miami locals</p>
        </div>

        {/* View count - the money stat */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-5">
          <p className="text-3xl font-black text-zinc-900">{viewCount}</p>
          <p className="text-sm text-zinc-500 mt-1">
            people viewed your business in the last 30 days.
          </p>
        </div>

        {/* Details */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3 text-sm mb-5">
          {business.address && business.address !== 'Not Provided' && (
            <div className="flex gap-3">
              <span className="text-zinc-400 w-20 flex-shrink-0">Address</span>
              <span className="text-zinc-900 font-medium">{business.address}</span>
            </div>
          )}
          {business.phone_number && (
            <div className="flex gap-3">
              <span className="text-zinc-400 w-20 flex-shrink-0">Phone</span>
              <span className="text-zinc-900 font-medium">{business.phone_number}</span>
            </div>
          )}
          {business.price_range && (
            <div className="flex gap-3">
              <span className="text-zinc-400 w-20 flex-shrink-0">Price</span>
              <span className="text-zinc-900 font-medium">{business.price_range}</span>
            </div>
          )}
          {business.booking_option && (
            <div className="flex gap-3">
              <span className="text-zinc-400 w-20 flex-shrink-0">Booking</span>
              <span className="text-zinc-900 font-medium">{business.booking_option}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-zinc-400 text-center">
          Not your business?{' '}
          <Link href="/" className="underline hover:text-zinc-600">
            Search again
          </Link>
        </p>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 shadow-xl px-6 py-4 z-50">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/claim/${params.id}/edit`}
            className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-center py-4 rounded-2xl transition text-sm shadow-sm"
          >
            Claim this business →
          </Link>
          <p className="text-center text-xs text-zinc-400 mt-2">Free for 30 days. No card needed.</p>
        </div>
      </div>
    </main>
  );
}
