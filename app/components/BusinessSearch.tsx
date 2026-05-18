'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import ClaimModalController from './ClaimModalController';

// Initialize Supabase fallback safely for client side rendering
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  neighborhood?: string;
  is_verified?: boolean;
}

export default function BusinessSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 1) {
        searchBusinesses();
      } else {
        setResults([]);
        setSearched(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchBusinesses = async () => {
    if (!supabaseUrl || !supabaseAnonKey) return;
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name, category, subcategory, neighborhood, is_verified')
        .ilike('name', `%${query}%`)
        .limit(8);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Error searching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="relative isolate w-full max-w-2xl mx-auto z-[60]">
      {/* Search Input Group */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-amber-300 focus-within:border-amber-500 transition-all duration-200 shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search your business name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-zinc-900 placeholder-zinc-400 focus:outline-none text-base"
          />
        </div>
        <button
          onClick={searchBusinesses}
          className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-2.5 rounded-lg transition-colors duration-150 shadow-sm"
        >
          Search
        </button>
      </div>

      {/* Dynamic Loading Overlay */}
      {loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-xl p-4 text-center shadow-lg">
          <span className="inline-block w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mr-3 align-middle" />
          <span className="text-sm text-zinc-400">Searching Miami registry...</span>
        </div>
      )}

      {/* Unified Search Results View / Claim Engine Switcher */}
      {!loading && searched && (
        <div className="absolute left-0 right-0 top-full mt-3 z-[9999]">
          <div className="w-full bg-white text-zinc-900 border border-zinc-200 rounded-xl shadow-2xl p-4 max-h-[400px] overflow-y-auto drop-shadow-2xl">
            <ClaimModalController searchResults={results} />
          </div>
        </div>
      )}
    </div>
  );
}