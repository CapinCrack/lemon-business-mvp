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
      .maybeSingle(),
    supabase
      .from('businesses')
      .select('*')
      .eq('id', params.id)
      .single(),
  ]);

  if (error || !data) {
    return <div className="p-10 text-white">Business not found</div>;
  }

  const hoursDisplay = formatHours(data.hours);
  const isClaimed = claim?.status === 'approved';

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-black">{data.name}</h1>
            <p className="text-neutral-400 mt-2">
              {[data.category, data.subcategory, data.neighborhood].filter(Boolean).join(' • ')}
            </p>
          </div>
          {data.is_verified && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Verified
            </span>
          )}
        </div>

        {/* Photo */}
        <div className="mt-6 w-full h-64 bg-neutral-800 rounded-2xl overflow-hidden">
          {data.photo_urls?.length > 0 ? (
            <img src={data.photo_urls[0]} className="w-full h-full object-cover" alt={data.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500">
              No image yet
            </div>
          )}
        </div>

        {/* Detail grid */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <InfoCard label="Price range" value={data.price_range || 'Unknown'} />
          <InfoCard
            label="Status"
            value={isClaimed ? 'Claimed' : claim?.status ?? 'Unclaimed'}
            highlight={isClaimed}
          />
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

        <p className="mt-6 text-neutral-300 leading-relaxed">
          This business is listed on Lemon.{' '}
          {!isClaimed && 'Claim it to unlock editing, analytics, and customer discovery features.'}
        </p>

        {!isClaimed && (
          <a
            href={`/claim/${data.id}`}
            className="mt-8 block w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 transition text-center"
          >
            Claim this business
          </a>
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
    <div className={`bg-neutral-800 rounded-xl p-4 ${wide ? 'col-span-2' : ''}`}>
      <div className="text-xs text-neutral-400">{label}</div>
      <div className={`font-bold mt-1 ${highlight ? 'text-emerald-400' : ''}`}>{value}</div>
    </div>
  );
}
