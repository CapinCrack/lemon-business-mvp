"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; 

interface Business {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  photo_urls: string[];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  // --- Modal States ---
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form submission tracking states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [priceRange, setPriceRange] = useState('$$-$$$');

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .ilike("name", `%${searchTerm}%`)
        .limit(8);

      if (!error && data) {
        setResults(data as Business[]);
      }
      setHasSearched(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Mock submit handler for drafts/verifications
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - Sprint 2 will wire this to real user IDs
    setTimeout(() => {
      setIsSubmitting(false);
      setClaimSuccess(true);
    }, 1200);
  };

  const closeModals = () => {
    setSelectedBusiness(null);
    setShowAddModal(false);
    setClaimSuccess(false);
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex flex-col justify-between relative">
      
      {/* Navigation Header */}
      <header className="p-6 flex justify-between items-center max-w-7xl w-full mx-auto z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-black text-xl shadow-md shadow-amber-400/20">
            L
          </div>
          <span className="font-black text-xl tracking-tight">Lemon</span>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold hover:bg-amber-300 transition text-sm shadow-md shadow-amber-400/10"
        >
          List my business
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-3xl w-full mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
          Miami is <br className="md:hidden" />
          <span className="text-amber-400">already looking</span> <br />
          for you.
        </h1>
        
        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Claim your business free on Lemon — Miami's fastest-growing local services directory. Be found by thousands of locals searching for services just like yours.
        </p>

        {/* Search Input Box Container */}
        <div className="relative w-full max-w-2xl mx-auto text-left">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-neutral-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for your business by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 text-white placeholder-neutral-500 rounded-xl pl-12 pr-32 py-4 text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
            />
            
            {loading ? (
              <div className="absolute right-4 text-neutral-400 text-sm animate-pulse font-medium">
                Searching...
              </div>
            ) : (
              <button className="absolute right-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-neutral-800">
                Search
              </button>
            )}
          </div>

          {/* Search Dropdown Panel */}
          {searchTerm && !loading && (
            <div className="absolute w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
              
              {/* STATE A: Results Matching Database Rows */}
              {results.length > 0 && (
                <div className="divide-y divide-neutral-700">
                  {results.map((biz) => (
                    <div 
                      key={biz.id}
                      onClick={() => router.push(`/business/${biz.id}`)}
                      className="p-4 hover:bg-neutral-700/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                          {biz.category[0] || "B"}
                        </div>
                        <div>
                          <div className="font-bold text-white">{biz.name}</div>
                          <div className="text-xs text-neutral-400 uppercase tracking-wider mt-0.5">
                            {biz.category} &bull; {biz.neighborhood}
                          </div>
                        </div>
                      </div>
                      <span className="text-neutral-500 font-bold pr-2">&rarr;</span>
                    </div>
                  ))}
                </div>
              )}

              {/* STATE B: Empty State (No Matches) */}
              {hasSearched && results.length === 0 && (
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-white">Looks like you're not on Lemon yet</h3>
                  <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">
                    Let's fix that &mdash; add your business in 2 minutes and start getting discovered by Miami locals today.
                  </p>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 px-4 py-2 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition text-sm inline-flex items-center gap-1"
                  >
                    Add my business &rarr;
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

        <p className="mt-4 text-neutral-500 text-sm">
          Free to list &bull; No credit card required &bull; Set up in 2 minutes
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Lemon Miami. All rights reserved.
      </footer>

      {/* ========================================================= */}
      {/* MODAL LIGHTBOX OVERLAY (Renders when either modal is open) */}
      {/* ========================================================= */}
      {(selectedBusiness || showAddModal) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all animate-fadeIn">
          <div className="bg-neutral-800 border border-neutral-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative p-6 text-left">
            
            {/* Close Button */}
            <button 
              onClick={closeModals}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition text-xl font-bold"
            >
              &times;
            </button>

            {claimSuccess ? (
              /* Global Success Screen */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Application Received!</h3>
                <p className="text-neutral-400 text-sm mt-2 max-w-xs mx-auto">
                  We're initializing your listing verification. Next up, we need to secure your identity.
                </p>
                <button
                  onClick={closeModals}
                  className="mt-6 w-full py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition"
                >
                  Awesome
                </button>
              </div>
            ) : selectedBusiness ? (
              /* PATH A MODAL: Claiming Existing Business */
              <form onSubmit={handleModalSubmit}>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-md">
                  Path A: Verification
                </span>
                <h2 className="text-2xl font-black mt-3 text-white">Claim "{selectedBusiness.name}"</h2>
                <p className="text-neutral-400 text-sm mt-1">
                  Located in <span className="text-white font-medium">{selectedBusiness.neighborhood}</span> ({selectedBusiness.category}).
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Your Full Name</label>
                    <input required type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Business Contact Email</label>
                    <input required type="email" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="john@company.com" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? "Processing Request..." : "Claim This Profile →"}
                </button>
              </form>
            ) : (
              /* PATH B MODAL: Adding a Missing Business */
              <form onSubmit={handleModalSubmit}>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-md">
                  Path B: New Listing
                </span>
                <h2 className="text-2xl font-black mt-3 text-white">Add Your Business</h2>
                <p className="text-neutral-400 text-sm mt-1">
                  Get discovered by thousands of Miami locals completely free.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Business Name</label>
                    <input required type="text" defaultValue={searchTerm} className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="e.g. Wynwood Gym Collective" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Category</label>
                      <input required type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="e.g. Fitness" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Miami Neighborhood</label>
                      <input required type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="e.g. Brickell" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Price Range</label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 appearance-none"
                    >
                      <option value="$">Low-Range ($)</option>
                      <option value="$$-$$$">Mid-Range ($$-$$$)</option>
                      <option value="$$$$">High-Range ($$$$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Contact Email</label>
                    <input required type="email" className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="owner@mybusiness.com" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? "Creating Profile..." : "Submit Listing →"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </main>
  );
}