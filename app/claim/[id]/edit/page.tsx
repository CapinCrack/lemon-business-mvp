import { createClient } from '@/src/utils/supabase/server';
import { notFound } from 'next/navigation';
import EditProfileClient from './EditProfileClient';

interface Props {
  params: { id: string };
}

export default async function EditProfilePage({ params }: Props) {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !business) notFound();

  return <EditProfileClient business={business} />;
}
