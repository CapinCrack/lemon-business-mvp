'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    features: ['Verified badge', 'Priority placement', 'Direct bookings', 'Analytics dashboard'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 99,
    badge: 'Most popular',
    features: ['Everything in Starter', 'Targeted promotions', 'Review management', 'Dedicated onboarding call'],
  },
];

export default function CheckoutPage() {
  const params = useParams<{ id: string }>();
  const [plan, setPlan] = useState('growth');
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-2xl mb-6">✓</div>
        <h1 className="text-2xl font-black text-zinc-900 mb-2">You&apos;re in!</h1>
        <p className="text-sm text-zinc-400 mb-8 max-w-xs">
          Your 30-day free trial has started. We&apos;ll review your verification and get you live within 24 hours.
        </p>
        <Link
          href="/dashboard"
          className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-4 rounded-2xl transition text-sm"
        >
          Check your status →
        </Link>
        <Link
          href="/"
          className="mt-4 text-sm text-zinc-400 hover:text-zinc-600 transition underline underline-offset-2"
        >
          Back to Lemon
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href={`/claim/${params.id}/value`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-sm font-black text-zinc-900">Choose your plan</p>
            <p className="text-xs text-zinc-400">First 30 days free - cancel anytime.</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlan(p.id)}
            className={`relative w-full text-left px-5 py-5 rounded-2xl border transition ${
              plan === p.id ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            {p.badge && (
              <span className="absolute top-3 right-3 text-[9px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded-full uppercase">
                {p.badge}
              </span>
            )}
            <div className="flex items-baseline gap-2 mb-3 pr-24">
              <span className="text-lg font-black text-zinc-900">{p.name}</span>
              <span className="text-2xl font-black text-zinc-900">${p.price}<span className="text-sm font-normal text-zinc-400">/mo</span></span>
            </div>
            <ul className="space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="text-amber-500 font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
        </div>

        {/* Trial callout */}
        <div className="bg-zinc-50 rounded-2xl p-5">
          <p className="text-sm font-bold text-zinc-900 mb-1">Your first 30 days are free</p>
          <p className="text-xs text-zinc-400">
            No card required today. At the end of your trial, you&apos;ll be charged ${PLANS.find((p) => p.id === plan)?.price}/mo.
            Cancel before then and you&apos;ll never be billed.
          </p>
        </div>

        {/* Fake card fields */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-[11px] text-zinc-400 lowercase tracking-wider">card number</label>
            <input
              disabled
              placeholder="Will be required at trial end"
              className="w-full text-sm text-zinc-300 border-b border-zinc-100 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1 cursor-not-allowed"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[11px] text-zinc-400 lowercase tracking-wider">expiry</label>
              <input
                disabled
                placeholder="MM / YY"
                className="w-full text-sm text-zinc-300 border-b border-zinc-100 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1 cursor-not-allowed"
              />
            </div>
            <div className="flex-1">
              <label className="text-[11px] text-zinc-400 lowercase tracking-wider">CVC</label>
              <input
                disabled
                placeholder="•••"
                className="w-full text-sm text-zinc-300 border-b border-zinc-100 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1 cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-[11px] text-zinc-400">Card details collected at end of free trial via Stripe.</p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 shadow-xl px-6 py-4 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setDone(true)}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-2xl transition text-sm shadow-sm"
          >
            Start free trial →
          </button>
          <p className="text-center text-xs text-zinc-400 mt-2">No charge today. Cancel anytime.</p>
        </div>
      </div>
    </main>
  );
}
