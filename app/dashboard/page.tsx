// app/dashboard/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  // 1. Check for authenticated user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login'); // Adjust redirect path to match your Sprint 2 login route
  }

  // 2. Fetch the business belonging to this user
  // Assumes your table is named 'businesses' and has an 'owner_id' column
  const { data: business, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', session.user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 means "no rows returned", which might happen if a user has no business yet
    console.error('Error fetching business:', error.message);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-zinc-800 pb-6">
          <p className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Lemon Dashboard</p>
          <h1 className="text-3xl font-bold mt-1 tracking-tight">
            {business?.name || 'Your Business'}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your Miami local listing details.</p>
        </header>

        {/* Pass data to the Client Component for interactive editing */}
        <DashboardClient initialBusiness={business} userId={session.user.id} />
      </div>
    </div>
  );
}