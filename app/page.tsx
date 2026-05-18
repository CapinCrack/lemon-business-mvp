"use client";

import { useState } from "react";
import BusinessSearch from "./components/BusinessSearch";
import ClaimModal from "./components/ClaimModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Food & Drink", icon: "🍽️", count: "340+" },
  { label: "Beauty & Wellness", icon: "💆", count: "210+" },
  { label: "Home Services", icon: "🔧", count: "185+" },
  { label: "Auto & Transport", icon: "🚗", count: "120+" },
  { label: "Legal & Finance", icon: "⚖️", count: "95+" },
  { label: "Fitness & Health", icon: "💪", count: "160+" },
  { label: "Real Estate", icon: "🏠", count: "75+" },
  { label: "Events & Music", icon: "🎵", count: "130+" },
];

const STEPS = [
  {
    n: "01",
    title: "Search your business",
    body: "Type your business name into the search bar. We pull live data from the Miami business registry.",
  },
  {
    n: "02",
    title: "Submit your claim",
    body: "Fill in a short form with your contact details. No documents required — takes under two minutes.",
  },
  {
    n: "03",
    title: "Get verified & go live",
    body: "Our team reviews your request within 1–2 business days. Once approved, your profile is fully yours.",
  },
];

const VALUE_PROPS = [
  { icon: "📍", title: "Be found locally", body: "Miami locals search Lemon before Google Maps. Show up where it matters." },
  { icon: "✅", title: "Verified badge", body: "A trusted badge signals legitimacy and drives more clicks from cautious buyers." },
  { icon: "📊", title: "Analytics dashboard", body: "See profile views, click-throughs, and search impressions in one clean panel." },
  { icon: "📅", title: "Direct booking", body: "Accept appointments straight from your Lemon profile — no third-party fees." },
  { icon: "🔔", title: "Customer alerts", body: "Get notified the moment a customer engages with your listing." },
  { icon: "🏙️", title: "Miami-first audience", body: "Every visitor is searching for local services — not national chains." },
];

const RECENT_CLAIMS = [
  { name: "Brickell Cafe", owner: "Carlos R.", neighborhood: "Brickell", ago: "2h ago", category: "Food & Drink" },
  { name: "SunGlow Beauty Studio", owner: "Mariana L.", neighborhood: "Wynwood", ago: "5h ago", category: "Beauty" },
  { name: "ProFix Plumbing", owner: "James T.", neighborhood: "Doral", ago: "9h ago", category: "Home Services" },
  { name: "Coral Legal Group", owner: "Priya M.", neighborhood: "Coral Gables", ago: "1d ago", category: "Legal" },
  { name: "Iron District Gym", owner: "Andre S.", neighborhood: "Little Haiti", ago: "1d ago", category: "Fitness" },
];

const FAQS = [
  {
    q: "Is it really free to claim my business?",
    a: "Yes. The basic claim and listing are completely free, forever. The Verified Partner tier is optional and adds premium features like booking integration and priority placement.",
  },
  {
    q: "How long does the review process take?",
    a: "Most claims are reviewed within 1–2 business days. You'll receive an email as soon as a decision is made.",
  },
  {
    q: "What if my business isn't in the directory yet?",
    a: "Use the 'Add a Business' option. You can create a new listing from scratch — it takes under two minutes and is immediately searchable once submitted.",
  },
  {
    q: "Can I edit my profile after claiming?",
    a: "Absolutely. Once your claim is approved, you get full access to your owner dashboard where you can update your hours, phone number, neighborhood, and more.",
  },
  {
    q: "What is the Verified Partner badge?",
    a: "Verified Partners receive a prominent badge on their profile, priority placement in search results, booking integration, and access to the analytics panel. It signals trust to customers and increases clicks.",
  },
  {
    q: "What happens if someone else already claimed my business?",
    a: "Contact us at support@lemonmiami.com and we'll investigate. We have a dispute resolution process to ensure rightful owners get access.",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-neutral-100 hover:text-amber-400 transition-colors"
      >
        <span>{q}</span>
        <span className={`flex-shrink-0 text-neutral-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-neutral-400 leading-relaxed pr-8">{a}</p>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [email, setEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-black text-lg shadow-md shadow-amber-400/20">
              L
            </div>
            <span className="font-black text-lg tracking-tight">Lemon</span>
            <span className="hidden sm:block text-xs text-neutral-500 ml-1 font-medium tracking-wider uppercase">Miami</span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-neutral-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-amber-400 text-black font-bold hover:bg-amber-300 transition text-sm shadow-md shadow-amber-400/10"
          >
            List my business
          </button>
        </div>
      </header>

      {/* ── 1. HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Miami's Local Business Directory
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.02] mb-6">
          Miami is already
          <br />
          <span className="text-amber-400">looking for you.</span>
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Claim your business free on Lemon — Miami's fastest-growing local services directory.
          Be found by thousands of locals searching for services just like yours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href="#search"
            className="px-8 py-3.5 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition text-sm shadow-lg shadow-amber-400/20"
          >
            Claim your business
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 bg-neutral-800 text-neutral-200 font-semibold rounded-xl hover:bg-neutral-700 transition text-sm border border-neutral-700"
          >
            See how it works
          </a>
        </div>

        <p className="text-neutral-600 text-sm">
          Free to list &bull; No credit card required &bull; Set up in 2 minutes
        </p>
      </section>

      {/* ── 2. SEARCH ── */}
      <section id="search" className="max-w-6xl mx-auto px-6 pb-16">
        <p className="text-center text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">
          Find your business
        </p>
        <BusinessSearch />
      </section>

      {/* ── 3. ADD A BUSINESS BANNER ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">Not listed yet?</p>
            <h2 className="text-xl font-black tracking-tight">Add your business in 2 minutes.</h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-md">
              We're expanding the Miami registry daily. Submit your listing and become discoverable immediately.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-shrink-0 px-6 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition text-sm shadow-md shadow-amber-400/10 whitespace-nowrap"
          >
            Add a business &rarr;
          </button>
        </div>
      </section>

      {/* ── 4. CATEGORIES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Browse by category</p>
          <h2 className="text-3xl font-black tracking-tight">What's on Lemon</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="bg-neutral-900 border border-neutral-800 hover:border-amber-400/40 rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-bold text-sm text-neutral-100 group-hover:text-amber-400 transition-colors">{cat.label}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{cat.count} businesses</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section id="how-it-works" className="border-t border-neutral-900 bg-neutral-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-3xl font-black tracking-tight">Claim in three steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                <p className="text-5xl font-black text-neutral-800 leading-none mb-4">{step.n}</p>
                <h3 className="text-lg font-black mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. VALUE PROPS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Why claim your profile?</p>
          <h2 className="text-3xl font-black tracking-tight">Everything your listing unlocks</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <span className="text-2xl">{vp.icon}</span>
              <h3 className="font-black mt-3 mb-1">{vp.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{vp.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. SOCIAL PROOF ── */}
      <section className="border-t border-neutral-900 bg-neutral-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Live activity</p>
              <h2 className="text-3xl font-black tracking-tight">Miami businesses are claiming now</h2>
            </div>
            <div className="flex-shrink-0 bg-amber-400/10 border border-amber-400/20 rounded-xl px-6 py-4 text-center">
              <p className="text-3xl font-black text-amber-400">127</p>
              <p className="text-xs text-neutral-500 mt-1">claims this month</p>
            </div>
          </div>

          <div className="space-y-3">
            {RECENT_CLAIMS.map((claim) => (
              <div
                key={claim.name}
                className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0 uppercase">
                    {claim.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-neutral-100">{claim.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Claimed by {claim.owner} &bull; {claim.neighborhood} &bull; {claim.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-neutral-500">{claim.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Simple pricing</p>
          <h2 className="text-3xl font-black tracking-tight">Free forever. More when you're ready.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">Free</p>
            <p className="text-5xl font-black mb-1">$0</p>
            <p className="text-sm text-neutral-500 mb-8">Forever. No card needed.</p>
            <ul className="space-y-3 text-sm text-neutral-300 flex-1">
              {["Searchable listing", "Business profile page", "Claim your existing listing", "Owner dashboard access", "Email on claim decision"].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg className="text-emerald-400 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-8 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition text-sm border border-neutral-700"
            >
              Get started free
            </button>
          </div>

          {/* Verified Partner */}
          <div className="bg-neutral-900 border-2 border-amber-400/40 rounded-2xl p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
              Popular
            </div>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-4">Verified Partner</p>
            <p className="text-5xl font-black mb-1">$29<span className="text-2xl text-neutral-500">/mo</span></p>
            <p className="text-sm text-neutral-500 mb-8">Everything in Free, plus:</p>
            <ul className="space-y-3 text-sm text-neutral-300 flex-1">
              {[
                "Verified badge on your profile",
                "Priority search placement",
                "Booking integration",
                "Analytics dashboard",
                "Customer engagement alerts",
                "Dedicated support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg className="text-amber-400 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition text-sm shadow-md shadow-amber-400/20">
              Join waitlist
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section id="faq" className="border-t border-neutral-900 bg-neutral-950 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Got questions?</p>
            <h2 className="text-3xl font-black tracking-tight">Frequently asked</h2>
          </div>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. LEAD CAPTURE ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Stay in the loop</p>
          <h2 className="text-3xl font-black tracking-tight mb-3">Be first to know</h2>
          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            We're launching new features for Miami business owners every week. Drop your email and we'll keep you posted.
          </p>

          {waitlistDone ? (
            <div className="bg-emerald-950/40 border border-emerald-800 rounded-xl px-6 py-4">
              <p className="text-emerald-400 font-semibold text-sm">You're on the list. We'll be in touch soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setWaitlistDone(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-neutral-800 border border-neutral-700 focus:border-amber-400 focus:outline-none text-white placeholder-neutral-500 rounded-xl px-4 py-3 text-sm transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition text-sm flex-shrink-0"
              >
                Notify me
              </button>
            </form>
          )}

          <p className="text-neutral-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer className="border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center font-black text-black text-base">
                  L
                </div>
                <span className="font-black tracking-tight">Lemon Miami</span>
              </div>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                The fastest-growing local business directory for Miami. Claim your profile. Get discovered.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Product</p>
                <ul className="space-y-2 text-neutral-500">
                  <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Business</p>
                <ul className="space-y-2 text-neutral-500">
                  <li><button onClick={() => setShowAddModal(true)} className="hover:text-white transition-colors">Add a listing</button></li>
                  <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="/login" className="hover:text-white transition-colors">Sign in</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">Legal</p>
                <ul className="space-y-2 text-neutral-500">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="mailto:support@lemonmiami.com" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
            <p>&copy; {new Date().getFullYear()} Lemon Miami. All rights reserved.</p>
            <p>Built for Miami &bull; Powered by Lemon</p>
          </div>
        </div>
      </footer>

      <ClaimModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
        business={null}
      />

    </main>
  );
}
