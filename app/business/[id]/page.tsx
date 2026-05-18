import { createClient } from '@/src/utils/supabase/server';

interface Props {
  params: { id: string };
}

export default async function BusinessPage({ params }: Props) {
  const supabase = await createClient();
  const { data: claim } = await supabase
    .from('claim_requests')
    .select('status')
    .eq('business_id', params.id)
    .maybeSingle();
  
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return (
      <div className="p-10 text-white">
        Business not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white">

      <div className="max-w-3xl mx-auto px-6 pt-10">

        <h1 className="text-4xl font-black">
          {data.name}
        </h1>

        <p className="text-neutral-400 mt-2">
          {data.category} • {data.subcategory} • {data.neighborhood}
        </p>

        {/* IMAGE */}
        <div className="mt-6 w-full h-64 bg-neutral-800 rounded-2xl overflow-hidden">
          {data.photo_urls?.length > 0 ? (
            <img
              src={data.photo_urls[0]}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500">
              No image yet
            </div>
          )}
        </div>
                
        {/* GRID */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="bg-neutral-800 rounded-xl p-4">
            <div className="text-xs text-neutral-400">Price range</div>
            <div className="font-bold mt-1">
              {data.price_range || "Unknown"}
            </div>
          </div>
          <div className="bg-neutral-800 rounded-xl p-4">
            <div className="text-xs text-neutral-400">Status</div>
            <div className="font-bold mt-1">
            {claim?.status ?? "Unclaimed"}
            </div>
          </div>

        </div>

        <p className="mt-6 text-neutral-300 leading-relaxed">
          This business is listed on Lemon. Claim it to unlock editing, analytics, and customer discovery features.
        </p>

        {/* CTA (NO onClick — server safe) */}
        <a
          href={`/claim/${data.id}`}
          className="mt-8 block w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 transition text-center"
        >
          Claim this business
        </a>

      </div>

    </main>
  );
}