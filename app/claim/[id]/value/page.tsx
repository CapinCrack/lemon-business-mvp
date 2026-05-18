import Link from 'next/link';

interface Props {
  params: { id: string };
}

const PERKS = [
  {
    icon: '📅',
    title: 'Direct bookings',
    body: 'Customers book and pay through Lemon - no phone tag, no no-shows.',
  },
  {
    icon: '📣',
    title: 'Priority placement',
    body: 'Claimed businesses appear above unclaimed listings in every search.',
  },
  {
    icon: '💬',
    title: 'Review management',
    body: 'Reply to reviews, flag bad actors, and build your reputation.',
  },
  {
    icon: '📊',
    title: 'Analytics dashboard',
    body: 'See who viewed you, where they came from, and what made them click.',
  },
  {
    icon: '🎯',
    title: 'Targeted promotions',
    body: 'Run flash deals to fill slow days - reach locals already searching for you.',
  },
  {
    icon: '✅',
    title: 'Verified badge',
    body: 'The amber checkmark that tells customers you\'re the real deal.',
  },
];

export default function ValuePage({ params }: Props) {
  return (
    <main className="min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
          <Link href={`/claim/${params.id}/verify`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-sm font-black text-zinc-900">What you unlock</p>
            <p className="text-xs text-zinc-400">Here&apos;s what&apos;s waiting for you.</p>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">

        {/* Hero stat */}
        <div className="bg-amber-400 rounded-3xl p-6 mb-8 text-center">
          <p className="text-4xl font-black text-black">3×</p>
          <p className="text-sm font-bold text-black/80 mt-1">more bookings vs. unclaimed listings</p>
          <p className="text-xs text-black/60 mt-2">Based on Lemon Miami averages, Q1 2025</p>
        </div>

        <div className="space-y-4 mb-8">
          {PERKS.map((perk) => (
            <div key={perk.title} className="flex gap-4 items-start p-4 rounded-2xl border border-zinc-100">
              <span className="text-2xl flex-shrink-0">{perk.icon}</span>
              <div>
                <p className="text-sm font-bold text-zinc-900">{perk.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{perk.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-50 rounded-2xl p-5 text-center">
          <p className="text-xs text-zinc-400 mb-1">Starting at</p>
          <p className="text-3xl font-black text-zinc-900">$49<span className="text-lg font-normal text-zinc-400">/mo</span></p>
          <p className="text-xs text-zinc-400 mt-1">First 30 days free. No card required today.</p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 shadow-xl px-6 py-4 z-50">
        <div className="max-w-lg mx-auto">
          <Link
            href={`/claim/${params.id}/checkout`}
            className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-center py-4 rounded-2xl transition text-sm shadow-sm"
          >
            Start my free 30 days →
          </Link>
          <p className="text-center text-xs text-zinc-400 mt-2">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </main>
  );
}
