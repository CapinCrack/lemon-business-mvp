'use client';

import ClaimModalController from './ClaimModalController';

export default function TestWrapper() {
  // Mock results mirroring your operational pipeline
  const mockSearchResultsPathA = [
    {
      id: '99999999-9999-9999-9999-999999999999',
      name: 'Test Miami Cafe',
      category: 'Food & Drink',
    }
  ];

  return (
    <div className="p-8 space-y-12 max-w-xl mx-auto bg-zinc-50 border border-zinc-200 rounded-2xl my-8">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest bg-zinc-900 text-white px-2 py-1 rounded">
          Sprint 1 Test Rig
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h1 className="text-sm font-bold text-zinc-900 mb-2">🧪 Test Environment: Path A</h1>
        <p className="text-xs text-zinc-500 mb-4">Simulating a found, unverified business result.</p>
        
        <ClaimModalController searchResults={mockSearchResultsPathA} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h1 className="text-sm font-bold text-zinc-900 mb-2">🧪 Test Environment: Path B</h1>
        <p className="text-xs text-zinc-500 mb-4">Simulating the "Not on Lemon yet" empty state.</p>
        
        <ClaimModalController searchResults={[]} />
      </div>
    </div>
  );
}