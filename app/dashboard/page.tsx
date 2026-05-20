import { createClient } from '@/src/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', session.user.id)
    .single();

  const { data: verifications } = await supabase
    .from('verification_records')
    .select('method,status,created_at')
    .eq('business_id', business?.id ?? '')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/lemon-icon.png" alt="Lemon" className="w-7 h-7 object-contain" />
            <span className="font-black text-zinc-900 tracking-tight">Lemon</span>
          </Link>
          <span className="text-xs text-zinc-400">{session.user.email}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        {/* Status card */}
        <div className={`rounded-2xl p-5 border ${
          business?.is_verified
            ? 'bg-amber-50 border-amber-200'
            : 'bg-zinc-100 border-zinc-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Status</p>
              <p className={`text-lg font-black ${business?.is_verified ? 'text-amber-600' : 'text-zinc-500'}`}>
                {business?.is_verified ? '✓ Verified & Live' : 'Pending Review'}
              </p>
              {!business?.is_verified && verifications && (
                <p className="text-xs text-zinc-400 mt-1">
                  Verification submitted via {verifications.method} - under review
                </p>
              )}
            </div>
            {business && (
              <Link
                href={`/claim/${business.id}`}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline"
              >
                View profile →
              </Link>
            )}
          </div>
        </div>

        {business ? (
          <>
            {/* Business summary */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3">your business</p>
              <h1 className="text-xl font-black text-zinc-900">{business.name}</h1>
              <p className="text-sm text-zinc-400 mt-1">
                {[business.category, business.subcategory, business.neighborhood].filter(Boolean).join(' · ')}
              </p>
              {business.address && business.address !== 'Not Provided' && (
                <p className="text-sm text-zinc-500 mt-2">{business.address}</p>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Profile views', value: '-' },
                { label: 'Bookings', value: '-' },
                { label: 'Reviews', value: '-' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-zinc-200 p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-zinc-900">{s.value}</p>
                  <p className="text-[11px] text-zinc-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Edit profile CTA */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-900">Update your profile</p>
                <p className="text-xs text-zinc-400 mt-0.5">Hours, photos, about us, booking options</p>
              </div>
              <Link
                href={`/claim/${business.id}/edit`}
                className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-4 py-2.5 rounded-xl transition"
              >
                Edit
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center shadow-sm">
            <p className="text-sm font-bold text-zinc-900 mb-1">No business linked yet</p>
            <p className="text-xs text-zinc-400 mb-4">Search for your business to claim it.</p>
            <Link href="/" className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm px-5 py-2.5 rounded-xl transition">
              Find my business →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
