'use client';

import { createPortal } from 'react-dom';

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

export default function ClaimModal({
  isOpen,
  onClose,
  mode,
  business,
}: ClaimModalProps) {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-neutral-950/70 backdrop-blur-sm p-4">
      
      <div className="bg-white text-zinc-900 w-full max-w-xl rounded-2xl shadow-2xl border border-zinc-200 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <div className="text-left">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500">
              {mode === 'claim'
                ? 'Path A: Claim Listing'
                : 'Path B: New Setup'}
            </span>

            <h2 className="text-xl font-black text-zinc-900 mt-0.5">
              {mode === 'claim'
                ? `Claim ${business?.name}`
                : 'Add Your Business'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-left">
          {mode === 'add' && (
            <>
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Business Name *
                </label>

                <input
                  type="text"
                  placeholder="e.g., Panther Coffee"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Primary Category *
                </label>

                <input
                  type="text"
                  placeholder="e.g., Cafe, Barbershop"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Your Full Name *
            </label>

            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Work Email *
            </label>

            <input
              type="email"
              placeholder="jane@business.com"
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Phone Number *
            </label>

            <input
              type="text"
              placeholder="(305) 555-0199"
              className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
              Verification Notes / Proof (Optional)
            </label>

            <textarea
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
            onClick={() => {
              alert('Submission received!');
              onClose();
            }}
            className="px-5 py-2 text-sm font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-xl transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}