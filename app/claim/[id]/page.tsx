import { createClient } from '@/src/utils/supabase/server';
import ClaimForm from './ui';

export default async function ClaimPage({
  params,
}: {
  params: { id: string };
}) {
  // Await the server client creation
  const supabase = await createClient();

  const { data: business } = await supabase
    .from('businesses')
    .select('id, name, category, neighborhood')
    .eq('id', params.id)
    .single();

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-neutral-900">
        Business not found
      </div>
    );
  }

  return <ClaimForm business={business} />;
}