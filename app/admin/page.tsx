import { createClient } from '@/src/utils/supabase/server';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: claims, error } = await supabase
    .from('claim_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-400 flex items-center justify-center p-10">
        Failed to load claims: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="border-b border-zinc-800 pb-6">
          <p className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Lemon Admin</p>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">Claim Requests</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Review and resolve pending business ownership claims.
          </p>
        </header>

        <AdminClient claims={claims ?? []} />
      </div>
    </div>
  );
}
