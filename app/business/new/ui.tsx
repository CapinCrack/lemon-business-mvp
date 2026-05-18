// app/business/new/ui.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewBusinessForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [priceRange, setPriceRange] = useState('$$-$$$');
  const [loading, setLoading] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, subcategory, neighborhood, priceRange }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error || 'Failed to create listing.');
      } else {
        setCreatedId(json.id);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-12">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Add Your Business</h2>
          <p className="text-neutral-400 text-sm mt-1">
            List your business on Lemon to unlock customization features.
          </p>
        </div>

        {createdId ? (
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-5 text-center space-y-4">
            <div>
              <p className="text-emerald-400 font-medium">Business listed successfully!</p>
              <p className="text-neutral-400 text-xs mt-1">Your establishment is now active on Lemon.</p>
            </div>
            <Link 
              href={`/business/${createdId}`}
              className="block w-full p-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-lg transition-colors text-sm text-center"
            >
              View Public Listing Page
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-rose-950/30 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs">
                Error: {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Business Name
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-3 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-lg text-white transition-all text-sm" 
                placeholder="Brickell Cafe"
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-lg text-white transition-all text-sm" 
                  placeholder="Food & Drink"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Subcategory
                </label>
                <input 
                  type="text" 
                  value={subcategory} 
                  onChange={(e) => setSubcategory(e.target.value)} 
                  className="w-full p-3 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-lg text-white transition-all text-sm" 
                  placeholder="Coffee Shop"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Neighborhood
              </label>
              <input 
                type="text" 
                value={neighborhood} 
                onChange={(e) => setNeighborhood(e.target.value)} 
                className="w-full p-3 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-lg text-white transition-all text-sm" 
                placeholder="Brickell"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-3 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none rounded-lg text-white transition-all text-sm appearance-none"
              >
                <option value="$">Low-Range ($)</option>
                <option value="$$-$$$">Mid-Range ($$-$$$)</option>
                <option value="$$$$">High-Range ($$$$)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 p-3 bg-amber-400 hover:bg-amber-300 disabled:bg-neutral-800 disabled:text-neutral-600 font-bold text-black rounded-lg transition-colors text-sm shadow-lg shadow-amber-400/10 flex items-center justify-center"
            >
              {loading ? 'Adding Business...' : 'Add Business'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}