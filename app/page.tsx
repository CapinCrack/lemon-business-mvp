"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BusinessSearch from "./components/BusinessSearch";
import ClaimModal from "./components/ClaimModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Food & Drinks", emoji: "🍽️" },
  { label: "Beauty", emoji: "💄" },
  { label: "Fitness & Wellness", emoji: "💪" },
  { label: "Home Improvement", emoji: "🔧" },
  { label: "Time Savers", emoji: "⚡" },
  { label: "Pets", emoji: "🐾" },
  { label: "Events", emoji: "🎉" },
  { label: "Auto", emoji: "🚗" },
  { label: "Activities & Experiences", emoji: "🎯" },
  { label: "Other", emoji: "✨" },
];

const VALUE_PROPS = [
  {
    icon: "👥",
    title: "Customers who already trust you",
    body: "People find you through friends, not ads. When someone books you on Lemon, they already saw that someone they trust loved your work.",
  },
  {
    icon: "⚡",
    title: "Set up in minutes",
    body: "Your business is already on Lemon. Claim it, add your photos and services, and start getting booked. No complicated onboarding.",
  },
  {
    icon: "💛",
    title: "Simple, honest pricing",
    body: "Start with a 30-day free trial - no charge today. After that, plans start at $29/month, billed quarterly or yearly. No per-booking fees, no surprises. Cancel anytime before your trial ends.",
  },
];

const SHOWCASE = [
  {
    name: "La Mar by Gastón Acurio",
    category: "Restaurant",
    neighborhood: "Brickell",
    price: "$$$$",
    rating: 9.2,
    reviews: 847,
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop",
    photo2: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop",
  },
  {
    name: "Wynwood Ink",
    category: "Tattoo & Piercing",
    neighborhood: "Wynwood",
    price: "$$$",
    rating: 9.6,
    reviews: 412,
    photo: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&h=300&fit=crop",
    photo2: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=300&h=300&fit=crop",
  },
  {
    name: "Barry's Miami Beach",
    category: "Fitness Studio",
    neighborhood: "South Beach",
    price: "$$",
    rating: 9.4,
    reviews: 631,
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop",
    photo2: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=300&fit=crop",
  },
];

const FAQS = [
  {
    q: "How do customers find me?",
    a: "Lemon surfaces your business to Miami locals searching in your category. More importantly, when someone has a great experience with you, Lemon shows that reaction to their friends - turning one happy customer into ten new ones.",
  },
  {
    q: "What's the reaction system?",
    a: "Instead of written reviews, customers leave one-tap emoji reactions after visiting your business. The volume of reactions generates a score out of 10 that actually means something - no fake five-star paragraphs, just honest signals from real customers.",
  },
  {
    q: "What happens when my free trial ends?",
    a: "We'll remind you before your 30-day trial ends, and you choose whether to continue. Cancel anytime before then and you're never charged.",
  },
  {
    q: "Can I control my profile?",
    a: "Absolutely. Once verified, you control everything - photos, hours, services, pricing, and more. You can also message customers directly and manage bookings from your dashboard.",
  },
  {
    q: "How is this different from Yelp or Google?",
    a: "Yelp and Google are search engines. Lemon is a social network. When your customer loves you, their entire friend group sees it - without you spending a dollar on ads. The discovery is built into how people use the app, not bolted on.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 last:border-0">
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
      {open && <p className="pb-5 text-sm text-zinc-500 leading-relaxed pr-8">{a}</p>}
    </div>
  );
}

function LiveCounter() {
  const [count, setCount] = useState(1247);
  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => c + Math.floor(Math.random() * 3 + 1)),
      4000
    );
    return () => clearInterval(id);
  }, []);
  return <>{count.toLocaleString()}</>;
}

function BusinessCard({ biz }: { biz: (typeof SHOWCASE)[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
      <div className="flex h-40 gap-0.5">
        <div className="flex-1 relative overflow-hidden">
          <img src={biz.photo} alt={biz.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
            <span className="font-black text-xs text-zinc-900">{biz.rating}</span>
            <span className="text-zinc-400 text-xs">({biz.reviews})</span>
          </div>
        </div>
        <div className="w-24 overflow-hidden flex-shrink-0">
          <img src={biz.photo2} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="p-4">
        <p className="font-black text-zinc-900 text-sm">{biz.name}</p>
        <p className="text-xs text-zinc-400 mt-1">
          {biz.category} · {biz.neighborhood} · {biz.price}
        </p>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-52 bg-zinc-800 rounded-[2rem] p-2 shadow-2xl ring-1 ring-white/10">
      <div className="bg-white rounded-[1.5rem] overflow-hidden">
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-4 pb-1">
          <span className="text-[10px] font-bold text-zinc-900">9:41</span>
          <div className="w-4 h-1.5 bg-zinc-900 rounded-sm" />
        </div>
        {/* App wordmark */}
        <div className="px-5 pb-3">
          <span className="text-[13px] font-black text-zinc-900">🍋 Lemon</span>
        </div>
        {/* Friends section */}
        <div className="px-5 pb-3">
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Your friends love</p>
          <div className="space-y-1.5">
            {[
              { name: "Brickell Cafe", emoji: "😍", note: "Maria & 2 others" },
              { name: "SunGlow Beauty", emoji: "🔥", note: "Jake loves this" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-2 bg-zinc-50 rounded-xl p-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-base flex-shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-900">{item.name}</p>
                  <p className="text-[9px] text-zinc-400">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Business profile snippet */}
        <div className="mx-5 mb-5 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black text-zinc-900">Your business</p>
            <span className="text-[8px] bg-amber-400 text-black font-black px-1.5 py-0.5 rounded-full">LIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">😍</span>
            <span className="text-base">🔥</span>
            <span className="text-base">👏</span>
            <span className="text-[9px] text-zinc-400 ml-auto">284 reactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const heroRef = useRef<HTMLElement>(null);
  const midSearchRef = useRef<HTMLElement>(null);
  const faqSearchRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = [heroRef.current, midSearchRef.current, faqSearchRef.current].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
      setStickyVisible(visible.size === 0);
    }, { threshold: 0.1 });
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const scrollToSearch = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const el = document.getElementById("hero-search");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => (el.querySelector("input") as HTMLInputElement | null)?.focus(), 600);
  };

  const handleCategoryClick = (label: string) => {
    setCategoryFilter(label);
    const el = document.getElementById("hero-search");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen text-zinc-900 overflow-x-hidden">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center font-black text-black text-lg leading-none">
              L
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg tracking-tight text-zinc-900">Lemon</span>
              <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase leading-none">
                for business
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-zinc-50 transition"
          >
            <span className={`block w-5 h-0.5 bg-zinc-700 rounded-full transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-zinc-700 rounded-full transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-zinc-700 rounded-full transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-zinc-100 bg-white px-6 py-4 space-y-1">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold text-zinc-700 hover:text-zinc-900 py-2.5 border-b border-zinc-100"
            >
              Sign in
            </Link>
            <button
              onClick={() => { setShowAddModal(true); setMenuOpen(false); }}
              className="block w-full text-left text-sm font-bold text-amber-500 py-2.5"
            >
              List my business →
            </button>
          </div>
        )}
      </header>

      {/* ── 1. HERO ── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-white pt-20 pb-28 px-6 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-600 tracking-wide mb-8 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            For Miami service businesses
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-zinc-900">
            Your next customer is already looking for you.
          </h1>

          <p className="text-zinc-700 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Lemon is Miami&apos;s app for finding the best local services, places, and experiences.
            You&apos;re already on Lemon - claim your business to rank higher, receive bookings, and earn
            trust from the community.
          </p>

          <div id="hero-search" className="mb-3">
            <BusinessSearch defaultQuery={categoryFilter} />
          </div>

          <p className="text-zinc-600 text-sm mb-4">
            Claim your business free. 30-day trial. No charge today.
          </p>

          <Link
            href="/login"
            className="text-sm text-zinc-600 hover:text-zinc-800 transition-colors underline underline-offset-2"
          >
            Already on Lemon? Sign In
          </Link>

          {/* Live counter */}
          <div className="mt-14 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black text-amber-600 tracking-widest uppercase">Live in Miami</span>
            </div>
            <p className="text-6xl font-black text-amber-500 tabular-nums leading-none">
              <LiveCounter />
            </p>
            <p className="text-sm text-zinc-500">
              people found a business on Lemon in the last 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY GRID ── */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 text-center mb-10">
            Every service business belongs on <span className="text-amber-400">Lemon</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className="bg-white border border-zinc-200 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm hover:border-amber-400 hover:shadow-md transition text-left"
              >
                <span className="text-xl flex-shrink-0">{cat.emoji}</span>
                <span className="font-bold text-sm text-zinc-900 leading-snug">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm rounded-full px-6 py-2.5 transition"
            >
              + Yours
            </button>
          </div>

          <p className="text-center text-zinc-400 text-sm">
            Whatever you do - if people pay for it, you belong on Lemon.
          </p>
        </div>
      </section>

      {/* ── 3. VALUE PROPS ── */}
      <section className="bg-zinc-50 border-y border-zinc-100 py-20 px-6">
        <div className="max-w-2xl mx-auto space-y-12">
          {VALUE_PROPS.map((vp, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl shadow-sm">
                {vp.icon}
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 mb-2">{vp.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{vp.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. SOCIAL PROOF ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest text-center mb-3">
            Already on Lemon
          </p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 text-center mb-2">
            Real Miami businesses, <span className="text-amber-400">getting discovered</span>
          </h2>
          <p className="text-zinc-400 text-sm text-center mb-12">
            These spots claimed their profile. Yours is waiting.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {SHOWCASE.map((biz) => (
              <BusinessCard key={biz.name} biz={biz} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MID-PAGE SEARCH ── */}
      <section ref={midSearchRef} className="bg-zinc-50 border-y border-zinc-100 py-14 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-sm text-zinc-500 mb-5">
            See your business on Lemon - search to claim it.
          </p>
          <BusinessSearch />
        </div>
      </section>

      {/* ── 6. HOW LEMON WORKS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 text-center mb-16">
            How <span className="text-amber-400">Lemon</span> works for your business
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                title: "You're already on the app",
                body: "We pre-load every local business using public data. Your listing is live. Claim it to update the information, and let people book with you directly.",
              },
              {
                n: "02",
                title: "Customers discover you through trust",
                body: "Users see what services their friends use and love. When your business gets a great reaction, it spreads to their entire network.",
              },
              {
                n: "03",
                title: "One simple subscription",
                body: "Pick the plan that fits your business - starting at $29/month. No per-booking fees. Free for the first 30 days.",
              },
            ].map((step) => (
              <div key={step.n}>
                <p className="text-7xl font-black text-amber-400 leading-none mb-5 select-none">
                  {step.n}
                </p>
                <h3 className="font-black text-zinc-900 mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. THIS ISN'T ANOTHER DIRECTORY ── */}
      <section className="bg-zinc-900 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              This isn&apos;t another directory.
              <br />
              It&apos;s word of mouth, with <span className="text-amber-400">infrastructure.</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              See how Lemon turns every happy customer into your best marketing channel.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            <PhoneMockup />
            <div className="max-w-xs text-center md:text-left">
              <h3 className="text-xl font-black text-white mb-4">
                Your best marketing is your happy customers
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every great reaction a customer leaves gets seen by their friends. One happy customer
                becomes ten new ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. RATING SYSTEM ── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-zinc-900 mb-5">
            A rating system <span className="text-amber-400">people actually trust</span>
          </h2>
          <p className="text-zinc-500 leading-relaxed text-lg">
            One-tap emoji reactions. No fake paragraphs. A score out of 10 that means something because
            the volume of responses is massive.
          </p>
        </div>
      </section>

      {/* ── 9. BOTTOM CTA ── */}
      <section className="bg-amber-400 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-black text-black mb-3">
            Claim your business in 2 minutes
          </h2>
          <p className="text-black/60 mb-8 text-lg">
            Find your business, confirm it&apos;s yours, and you&apos;re live. Free for 30 days.
          </p>
          <button
            onClick={scrollToSearch}
            className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-zinc-800 transition text-sm shadow-lg"
          >
            Find my business →
          </button>
        </div>
      </section>

      {/* ── 10. FAQ ── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-zinc-900 text-center mb-12">
            Your questions, answered
          </h2>
          <div className="bg-white border border-zinc-200 rounded-2xl px-8 shadow-sm mb-10">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* Third search placement - after FAQ */}
          <p className="text-center text-sm text-zinc-400 mb-5">Ready to get started?</p>
          <section ref={faqSearchRef}>
            <BusinessSearch />
          </section>
        </div>
      </section>

      {/* ── 11. FINAL CTA + FOOTER ── */}
      <footer className="bg-zinc-900 pb-20">
        <div className="py-24 px-6 text-center border-b border-zinc-800">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Your customers are already here.
            <br />
            Meet them.
          </h2>
          <p className="text-zinc-400 mb-10 text-lg">Join Lemon for free.</p>
          <button
            onClick={scrollToSearch}
            className="px-8 py-4 bg-amber-400 text-black font-bold rounded-2xl hover:bg-amber-300 transition text-sm shadow-lg"
          >
            Claim Your Business
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center font-black text-black text-sm">
              L
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-white tracking-tight">Lemon</span>
              <span className="text-[9px] font-black text-amber-400 tracking-widest uppercase">
                for business
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">About</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Help</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
          </div>

          <p className="text-xs text-zinc-600">© 2026 Lemon.</p>
        </div>
      </footer>

      {/* ── STICKY SEARCH BAR ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-zinc-200 shadow-xl px-4 py-3 transition-all duration-300 ${
          stickyVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <button
            onClick={scrollToSearch}
            className="w-full flex items-center gap-3 bg-zinc-50 border border-amber-300 hover:border-amber-500 rounded-xl px-4 py-3 text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="flex-shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-left">Search your business →</span>
          </button>
        </div>
      </div>

      <ClaimModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        mode="add"
        business={null}
      />

    </main>
  );
}
