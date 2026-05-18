import Link from 'next/link';
import { createClient } from '@/src/utils/supabase/server';

interface Props {
  params: { id: string };
}

function formatHours(hours: unknown): string | null {
  if (!hours || (typeof hours === 'object' && Object.keys(hours as object).length === 0)) return null;
  if (typeof hours === 'string' && hours.trim()) return hours;
  if (typeof hours === 'object') {
    return Object.entries(hours as Record<string, string>)
      .map(([day, time]) => `${day}: ${time}`)
      .join(' · ');
  }
  return null;
}

export default async function BusinessPage({ params }: Props) {
  const supabase = await createClient();

  const [{ data: claim }, { data, error }] = await Promise.all([
    supabase
      .from('claim_requests')
      .select('status')
      .eq('business_id', params.id)
      .eq('status', 'approved')
      .maybeSingle(),
    supabase
      .from('businesses')
      .select('*')
      .eq('id', params.id)
      .single(),
  ]);

  if (error || !data) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Business not found.</p>
          <Link href="/" className="text-sm font-semibold text-amber-500 hover:text-amber-600">← Back to Lemon</Link>
        </div>
      </main>
    );
  }

  const hoursDisplay = formatHours(data.hours);
  const isClaimed = !!claim || data.is_verified;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">

      {/* Nav */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center font-black text-black text-base">L</div>
            <span className="font-black tracking-tight text-zinc-900">Lemon Miami</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-8 pb-16">

        {/* Photo */}
        <div className="w-full h-56 bg-zinc-200 rounded-2xl overflow-hidden mb-6">
          {data.photo_urls?.length > 0 ? (
            <img src={data.photo_urls[0]} className="w-full h-full object-cover" alt={data.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🏢
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-3xl font-black text-zinc-900">{data.name}</h1>
            <p className="text-zinc-500 mt-1">
              {[data.category, data.subcategory, data.neighborhood].filter(Boolean).join(' • ')}
            </p>
          </div>
          {data.is_verified && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-black bg-amber-400 px-3 py-1.5 rounded-full">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <InfoCard label="Status" value={isClaimed ? 'Claimed' : 'Unclaimed'} highlight={isClaimed} />
          <InfoCard label="Price range" value={data.price_range || 'Not listed'} />
          {data.address && data.address !== 'Not Provided' && (
            <InfoCard label="Address" value={data.address} wide />
          )}
          {data.phone_number && (
            <InfoCard label="Phone" value={data.phone_number} />
          )}
          {hoursDisplay && (
            <InfoCard label="Hours" value={hoursDisplay} wide />
          )}
          {data.booking_option && (
            <InfoCard label="Book via" value={data.booking_option} />
          )}
        </div>

        {!isClaimed && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <p className="font-black text-zinc-900 mb-1">Is this your business?</p>
            <p className="text-sm text-zinc-500 mb-4">
              Claim it to unlock editing, analytics, and customer discovery features. Free forever.
            </p>
            <Link
              href={`/claim/${data.id}`}
              className="block w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 transition text-center text-sm"
            >
              Claim this business →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
  wide = false,
  highlight = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-xl p-4 shadow-sm ${wide ? 'col-span-2' : ''}`}>
      <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{label}</div>
      <div className={`font-bold text-sm ${highlight ? 'text-emerald-600' : 'text-zinc-900'}`}>{value}</div>
    </div>
  );
}
