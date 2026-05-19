'use client';

import { createPortal } from 'react-dom';
import { useState } from 'react';

interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  neighborhood?: string;
}

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'claim' | 'add';
  business: Business | null;
}

export default function ClaimModal({ isOpen, onClose, mode, business }: ClaimModalProps) {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!ownerName || !email) {
      setError('Name and email are required.');
      return;
    }
    if (mode === 'add' && !businessName) {
      setError('Business name is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let businessId: string | null = null;

      if (mode === 'add') {
        const bizRes = await fetch('/api/businesses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: businessName, category, neighborhood }),
        });
        const bizJson = await bizRes.json();
        if (!bizRes.ok) throw new Error(bizJson.error || 'Failed to create listing.');
        businessId = bizJson.id;
      }

      const claimRes = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: businessId ?? business?.id ?? null,
          ownerFullName: ownerName,
          ownerEmail: email,
          ownerPhone: phone || null,
          additionalNotes: notes || null,
        }),
      });
      const claimJson = await claimRes.json();
      if (!claimRes.ok) throw new Error(claimJson.error || 'Failed to submit claim.');

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-neutral-950/70 backdrop-blur-sm p-4">
      <div className="bg-white text-zinc-900 w-full max-w-xl rounded-2xl shadow-2xl border border-zinc-200 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">

        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <div className="text-left">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500">
              {mode === 'claim' ? 'Claim Listing' : 'New Business Setup'}
            </span>
            <h2 className="text-xl font-black text-zinc-900 mt-0.5">
              {mode === 'claim' ? `Claim ${business?.name}` : 'Add Your Business'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors text-lg font-bold p-1">
            ✕
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-amber-400/20 text-amber-500 rounded-full flex items-center justify-center mx-auto text-2xl font-black">✓</div>
            <h3 className="text-xl font-black text-zinc-900">
              {mode === 'add' ? 'Business listed!' : 'Claim submitted!'}
            </h3>
            <p className="text-sm text-zinc-500">
              {mode === 'add'
                ? "Your listing is now live on Lemon. We'll be in touch to verify ownership."
                : "We've received your claim request and will review it shortly."}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-left">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-lg p-3">
                  {error}
                </div>
              )}

              {mode === 'add' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Business Name *</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g., Panther Coffee"
                      className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Category *</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Cafe"
                        className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Neighborhood</label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="e.g., Brickell"
                        className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Work Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@business.com"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(305) 555-0199"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Notes / Proof of Ownership (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Links to social handles, registration info..."
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900 h-20 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 rounded-b-2xl flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 text-sm font-bold bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 rounded-xl transition-colors shadow-md"
              >
                {loading ? 'Submitting...' : mode === 'add' ? 'Submit Listing' : 'Submit Claim'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
