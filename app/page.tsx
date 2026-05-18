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
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-zinc-900 hover:text-amber-500 transition-colors"
      >
        <span>{q}</span>
        <span className={`flex-shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-zinc-500 leading-relaxed pr-8">{a}</p>
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
    <main className="min-h-screen bg-white text-zinc-900">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-black text-lg shadow-sm">
              L
            </div>
            <span className="font-black text-lg tracking-tight text-zinc-900">Lemon</span>
            <span className="hidden sm:block text-xs text-zinc-400 ml-1 font-medium tracking-wider uppercase">Miami</span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-500">
            <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a>
          </nav>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-amber-400 text-black font-bold hover:bg-amber-300 transition text-sm shadow-sm"
          >
            List my business
          </button>
        </div>
      </header>

      {/* ── 1. HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-600 tracking-wider uppercase mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Miami&apos;s Local Business Directory
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-5 text-zinc-900">
              Your next customer is already{" "}
              <span className="text-amber-400">looking for you.</span>
            </h1>

            <p className="text-zinc-500 text-base md:text-lg mb-8 leading-relaxed">
              Claim your business free on Lemon — Miami&apos;s fastest-growing local
              services directory. Be found by thousands of locals searching for
              services just like yours.
            </p>

            <div id="search" className="mb-6">
              <BusinessSearch />
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-black text-zinc-900">1,247</p>
                <p className="text-xs text-zinc-400 mt-0.5">businesses on Lemon</p>
              </div>
              <div className="w-px h-10 bg-zinc-200" />
              <div>
                <p className="text-3xl font-black text-zinc-900">127</p>
                <p className="text-xs text-zinc-400 mt-0.5">claims this month</p>
              </div>
              <div className="w-px h-10 bg-zinc-200" />
              <div>
                <p className="text-3xl font-black text-zinc-900">2 min</p>
                <p className="text-xs text-zinc-400 mt-0.5">to go live</p>
              </div>
            </div>

            <p className="text-zinc-400 text-xs mt-6">
              Free to list &bull; No credit card required &bull; Set up in 2 minutes
            </p>
          </div>

          {/* Right — visual mockup */}
          <div className="hidden md:flex flex-col gap-3">
            {/* Simulated business listing cards */}
            {[
              { name: "Brickell Cafe", cat: "Food & Drink", rating: "4.9", reviews: 142, verified: true },
              { name: "SunGlow Beauty Studio", cat: "Beauty & Wellness", rating: "4.8", reviews: 87, verified: true },
              { name: "ProFix Plumbing", cat: "Home Services", rating: "4.7", reviews: 53, verified: false },
            ].map((biz) => (
              <div key={biz.name} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center font-black text-amber-500 text-lg flex-shrink-0">
                  {biz.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-zinc-900 truncate">{biz.name}</p>
                    {biz.verified && (
                      <span className="flex-shrink-0 text-[10px] bg-amber-400 text-black font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{biz.cat}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-zinc-900">★ {biz.rating}</p>
                  <p className="text-xs text-zinc-400">{biz.reviews} reviews</p>
                </div>
              </div>
            ))}
            <div className="bg-amber-400 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-black/60 uppercase tracking-widest mb-1">Ready to join them?</p>
              <p className="text-black font-black text-lg leading-snug">Claim your listing in 2 minutes.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 px-5 py-2 bg-black text-white text-sm font-bold rounded-xl hover:bg-zinc-800 transition"
              >
                Get started free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EVERY SERVICE BUSINESS ── */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Browse by category</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Every service business on Lemon</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="bg-white border border-zinc-200 hover:border-amber-400 hover:shadow-md rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="font-bold text-sm text-zinc-900 group-hover:text-amber-500 transition-colors">{cat.label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{cat.count} businesses</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ADD A BUSINESS BANNER ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-amber-400 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-amber-400/20">
          <div>
            <p className="text-xs font-mono text-black/60 uppercase tracking-widest mb-1">Not listed yet?</p>
            <h2 className="text-xl font-black tracking-tight text-black">Add your business in 2 minutes.</h2>
            <p className="text-sm text-black/60 mt-1 max-w-md">
              We&apos;re expanding the Miami registry daily. Submit your listing and become discoverable immediately.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-shrink-0 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition text-sm whitespace-nowrap"
          >
            Add a business →
          </button>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-zinc-50 border-y border-zinc-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">How Lemon works for your business</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                <p className="text-5xl font-black text-zinc-100 leading-none mb-4">{step.n}</p>
                <h3 className="text-lg font-black mb-2 text-zinc-900">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VALUE PROPS ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Why claim your profile?</p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">Everything your listing unlocks</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title} className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition">
              <span className="text-2xl">{vp.icon}</span>
              <h3 className="font-black mt-3 mb-1 text-zinc-900">{vp.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{vp.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. SOCIAL PROOF ── */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Live activity</p>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">Real Miami businesses, real results</h2>
            </div>
            <div className="flex-shrink-0 bg-white border border-zinc-200 rounded-xl px-6 py-4 text-center shadow-sm">
              <p className="text-3xl font-black text-amber-500">127</p>
              <p className="text-xs text-zinc-400 mt-1">claims this month</p>
            </div>
          </div>

          <div className="space-y-3">
            {RECENT_CLAIMS.map((claim) => (
              <div
                key={claim.name}
                className="bg-white border border-zinc-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center font-black text-xs flex-shrink-0 uppercase border border-amber-100">
                    {claim.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-zinc-900">{claim.name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Claimed by {claim.owner} &bull; {claim.neighborhood} &bull; {claim.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-zinc-400">{claim.ago}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Star rating callout */}
          <div className="mt-10 bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="flex-shrink-0 text-center">
              <p className="text-5xl font-black text-zinc-900">4.9</p>
              <div className="flex gap-0.5 justify-center mt-1 text-amber-400">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-xs text-zinc-400 mt-1">average rating</p>
            </div>
            <div className="w-px h-16 bg-zinc-100 hidden sm:block" />
            <div>
              <p className="font-black text-lg text-zinc-900 mb-1">A rating system people actually trust</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Every review on Lemon is tied to a verified local customer. No fake stars, no gaming the system — just honest feedback from Miami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PRICING ── */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Simple pricing</p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">Free forever. More when you&apos;re ready.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col shadow-sm">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">Free</p>
            <p className="text-5xl font-black mb-1 text-zinc-900">$0</p>
            <p className="text-sm text-zinc-400 mb-8">Forever. No card needed.</p>
            <ul className="space-y-3 text-sm text-zinc-600 flex-1">
              {["Searchable listing", "Business profile page", "Claim your existing listing", "Owner dashboard access", "Email on claim decision"].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg className="text-emerald-500 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-8 w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold rounded-xl transition text-sm border border-zinc-200"
            >
              Get started free
            </button>
          </div>

          {/* Verified Partner */}
          <div className="bg-zinc-900 border-2 border-zinc-900 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-xl">
            <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide">
              Popular
            </div>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-4">Verified Partner</p>
            <p className="text-5xl font-black mb-1 text-white">$29<span className="text-2xl text-zinc-500">/mo</span></p>
            <p className="text-sm text-zinc-400 mb-8">Everything in Free, plus:</p>
            <ul className="space-y-3 text-sm text-zinc-300 flex-1">
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
            <button className="mt-8 w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition text-sm">
              Join waitlist
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section id="faq" className="bg-zinc-50 border-y border-zinc-100 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">Got questions?</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Your questions, answered</h2>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl px-8 shadow-sm">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-amber-400 rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto shadow-xl shadow-amber-400/20">
          <p className="text-xs font-mono text-black/60 uppercase tracking-widest mb-3">This isn&apos;t another directory</p>
          <h2 className="text-3xl font-black tracking-tight text-black mb-3">Claim your business in 2 minutes</h2>
          <p className="text-black/60 text-sm leading-relaxed mb-8">
            Join 1,247 Miami businesses already on Lemon. Free forever — no credit card, no hidden fees.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-8 py-3.5 bg-black text-white font-bold rounded-xl hover:bg-zinc-800 transition text-sm shadow-md"
          >
            Get started free →
          </button>
          <p className="text-black/40 text-xs mt-4">Free to list &bull; No credit card required</p>
        </div>
      </section>

      {/* ── 10. LEAD CAPTURE ── */}
      <section className="bg-zinc-50 border-t border-zinc-100 py-20">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">Stay in the loop</p>
          <h2 className="text-2xl font-black tracking-tight text-zinc-900 mb-3">Be first to know</h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-8">
            We&apos;re launching new features for Miami business owners every week. Drop your email and we&apos;ll keep you posted.
          </p>

          {waitlistDone ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4">
              <p className="text-emerald-600 font-semibold text-sm">You&apos;re on the list. We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setWaitlistDone(true); }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-zinc-200 focus:border-amber-400 focus:outline-none text-zinc-900 placeholder-zinc-400 rounded-xl px-4 py-3 text-sm transition shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition text-sm flex-shrink-0"
              >
                Notify me
              </button>
            </form>
          )}

          <p className="text-zinc-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── 11. FOOTER ── */}
      <footer className="border-t border-zinc-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center font-black text-black text-base">
                  L
                </div>
                <span className="font-black tracking-tight text-zinc-900">Lemon Miami</span>
              </div>
              <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                The fastest-growing local business directory for Miami. Claim your profile. Get discovered.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Product</p>
                <ul className="space-y-2 text-zinc-400">
                  <li><a href="#how-it-works" className="hover:text-zinc-900 transition-colors">How it Works</a></li>
                  <li><a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a></li>
                  <li><a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Business</p>
                <ul className="space-y-2 text-zinc-400">
                  <li><button onClick={() => setShowAddModal(true)} className="hover:text-zinc-900 transition-colors">Add a listing</button></li>
                  <li><a href="/dashboard" className="hover:text-zinc-900 transition-colors">Dashboard</a></li>
                  <li><a href="/login" className="hover:text-zinc-900 transition-colors">Sign in</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Legal</p>
                <ul className="space-y-2 text-zinc-400">
                  <li><a href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</a></li>
                  <li><a href="mailto:support@lemonmiami.com" className="hover:text-zinc-900 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
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
