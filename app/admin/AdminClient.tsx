'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Claim {
  id: string;
  business_id: string | null;
  owner_full_name: string;
  owner_email: string;
  owner_phone: string | null;
  custom_business_name: string | null;
  custom_business_category: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
  user_id: string | null;
}

export default function AdminClient({ claims }: { claims: Claim[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, { type: 'success' | 'error'; text: string }>>({});

  const pending = claims.filter((c) => c.status === 'pending');
  const resolved = claims.filter((c) => c.status !== 'pending');

  async function resolve(claimId: string, action: 'approved' | 'rejected') {
    setLoading(claimId);
    try {
      const res = await fetch('/api/admin/claims/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setFeedback((prev) => ({ ...prev, [claimId]: { type: 'success', text: `Claim ${action}.` } }));
      router.refresh();
    } catch (err: any) {
      setFeedback((prev) => ({ ...prev, [claimId]: { type: 'error', text: err.message } }));
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          Pending ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <p className="text-zinc-500 text-sm">No pending claims — all clear.</p>
        ) : (
          <div className="space-y-4">
            {pending.map((claim) => (
              <ClaimCard
                key={claim.id}
                claim={claim}
                onApprove={() => resolve(claim.id, 'approved')}
                onReject={() => resolve(claim.id, 'rejected')}
                isLoading={loading === claim.id}
                feedback={feedback[claim.id]}
              />
            ))}
          </div>
        )}
      </section>

      {resolved.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 text-zinc-500">Resolved ({resolved.length})</h2>
          <div className="space-y-3">
            {resolved.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} resolved />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ClaimCard({
  claim,
  onApprove,
  onReject,
  isLoading,
  feedback,
  resolved = false,
}: {
  claim: Claim;
  onApprove?: () => void;
  onReject?: () => void;
  isLoading?: boolean;
  feedback?: { type: 'success' | 'error'; text: string };
  resolved?: boolean;
}) {
  const statusColor =
    claim.status === 'approved'
      ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800'
      : claim.status === 'rejected'
      ? 'text-rose-400 bg-rose-950/40 border-rose-800'
      : 'text-yellow-400 bg-yellow-950/40 border-yellow-800';

  return (
    <div className={`bg-zinc-900 border rounded-lg p-5 space-y-4 ${resolved ? 'border-zinc-800 opacity-60' : 'border-zinc-700'}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-0.5">
          <p className="font-semibold text-zinc-100">{claim.owner_full_name}</p>
          <p className="text-sm text-zinc-400">{claim.owner_email}</p>
          {claim.owner_phone && <p className="text-sm text-zinc-500">{claim.owner_phone}</p>}
        </div>
        <span className={`text-xs font-mono px-2 py-1 rounded border uppercase tracking-wider ${statusColor}`}>
          {claim.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Business</p>
          <p className="text-zinc-300">
            {claim.custom_business_name || (claim.business_id ? `ID: ${claim.business_id}` : '—')}
          </p>
        </div>
        {claim.custom_business_category && (
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Category</p>
            <p className="text-zinc-300">{claim.custom_business_category}</p>
          </div>
        )}
        {claim.additional_notes && (
          <div className="col-span-2">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Notes</p>
            <p className="text-zinc-300">{claim.additional_notes}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Submitted</p>
          <p className="text-zinc-400">{new Date(claim.created_at).toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      {feedback && (
        <p className={`text-sm font-medium ${feedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {feedback.text}
        </p>
      )}

      {!resolved && (
        <div className="flex gap-3 pt-1">
          <button
            onClick={onApprove}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Working...' : 'Approve'}
          </button>
          <button
            onClick={onReject}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-semibold bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-lg transition disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
