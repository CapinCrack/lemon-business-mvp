// app/dashboard/DashboardClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface Business {
  id: string;
  name: string;
  phone: string;
  hours: string;
  neighborhood: string;
  owner_id: string;
}

interface DashboardClientProps {
  initialBusiness: Business | null;
  userId: string;
}

export default function DashboardClient({ initialBusiness, userId }: DashboardClientProps) {
  // Correctly uses cookie-aware helper instead of custom app/supabaseClient.ts
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: initialBusiness?.phone || '',
    hours: initialBusiness?.hours || '',
    neighborhood: initialBusiness?.neighborhood || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync state if server component refetches or updates the layout props
  useEffect(() => {
    if (initialBusiness) {
      setFormData({
        phone: initialBusiness.phone || '',
        hours: initialBusiness.hours || '',
        neighborhood: initialBusiness.neighborhood || '',
      });
    }
  }, [initialBusiness]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let error;

      if (initialBusiness?.id) {
        // Step 4: Client-side UPDATE query bound securely to the RLS layer
        const { error: updateError } = await supabase
          .from('businesses')
          .update({
            phone: formData.phone,
            hours: formData.hours,
            neighborhood: formData.neighborhood,
          })
          .eq('id', initialBusiness.id);
        
        error = updateError;
      } else {
        // Fallback: If no business exists yet for this user, INSERT a new one
        const { error: insertError } = await supabase
          .from('businesses')
          .insert({
            owner_id: userId,
            phone: formData.phone,
            hours: formData.hours,
            neighborhood: formData.neighborhood,
            name: 'My New Miami Business',
          });

        error = insertError;
      }

      if (error) throw error;

      setMessage({ type: 'success', text: 'Listing details updated successfully.' });
      
      // Instruct Next.js to fetch fresh server components without losing client state
      router.refresh(); 
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Mini Analytics / Overview Panel */}
      <div className="md:col-span-1 space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Listing Status</h3>
          <p className="text-xl font-semibold mt-2 text-emerald-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified & Live
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg">
          <h3 className="text-sm font-medium text-zinc-400">Location Context</h3>
          <p className="text-xl font-semibold mt-2 text-zinc-200">
            {formData.neighborhood || 'Miami, FL'}
          </p>
        </div>
      </div>

      {/* Profile Editor Form */}
      <div className="md:col-span-2">
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg space-y-6">
          <h2 className="text-lg font-medium border-b border-zinc-800 pb-3">Edit Business Profile</h2>

          {message && (
            <div
              className={`p-3 rounded text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
                  : 'bg-rose-950/50 border border-rose-800 text-rose-300'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(305) 555-0199"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="hours" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Operating Hours
            </label>
            <input
              type="text"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Mon-Fri: 9am - 6pm"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="neighborhood" className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Miami Neighborhood
            </label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              placeholder="Wynwood, Brickell, Little Havana"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-zinc-100 text-zinc-950 text-sm font-medium px-5 py-2.5 rounded hover:bg-yellow-400 hover:text-zinc-950 transition disabled:opacity-50"
            >
              {loading ? 'Saving Changes...' : 'Save Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}