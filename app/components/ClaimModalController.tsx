'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClaimModal from './ClaimModal';


interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  neighborhood?: string;
}

interface ClaimModalControllerProps {
  searchResults: Business[];
}

export default function ClaimModalController({ searchResults }: ClaimModalControllerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'claim' | 'add'>('claim');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleOpenClaim = (business: Business) => {
    router.push(`/claim/${business.id}`);
  };

  const handleOpenAdd = () => {
    setSelectedBusiness(null);
    setModalMode('add');
    setIsOpen(true);
  };

  // Path B: If the database returned absolutely 0 matches for the search query
  if (searchResults.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-xl">
        <p className="text-zinc-600 font-medium mb-1">Not on Lemon yet?</p>
        <p className="text-xs text-zinc-400 mb-4">Add your business in 2 minutes to get listed.</p>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150"
        >
          Add my business
        </button>

        {isOpen && (
          <ClaimModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            mode={modalMode}
            business={null}
          />
        )}
      </div>
    );
  }

  // Path A: If the database found matching businesses
  return (
    <div className="space-y-2 max-h-60 overflow-y-auto p-1">
      {searchResults.map((biz) => (
        <div
          key={biz.id}
          className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-all duration-150 group"
        >
          <div className="text-left">
            <h3 className="font-bold text-zinc-900 text-sm">{biz.name}</h3>
            <p className="text-xs text-zinc-400">
              {biz.category} {biz.neighborhood ? `• ${biz.neighborhood}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenClaim(biz)}
            className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Claim Business
          </button>
        </div>
      ))}

      {isOpen && (
        <ClaimModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          business={selectedBusiness}
        />
      )}
    </div>
  );
}