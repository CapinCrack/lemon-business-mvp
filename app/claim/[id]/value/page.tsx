import Link from 'next/link';

interface Props {
  params: { id: string };
}

const BENEFITS = [
  {
    icon: '💰',
    title: '+$13,000/month in revenue',
    body: 'What the average Lemon vendor earns in extra monthly revenue.',
  },
  {
    icon: '📍',
    title: 'Rank higher',
    body: 'Get found by Miami locals searching your category.',
  },
  {
    icon: '✅',
    title: 'Verified badge',
    body: 'Customers trust verified businesses on Lemon.',
  },
  {
    icon: '🎛️',
    title: 'Full control of your business',
    body: 'Edit photos, hours, services, and pricing. Message customers and receive bookings directly.',
  },
  {
    icon: '📊',
    title: 'Real-time analytics',
    body: 'See who\'s viewing, booking, and reacting to your business.',
  },
];

export default function ValuePage({ params }: Props) {
  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center">
          <Link href={`/claim/${params.id}/verify`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-10 pb-8">
        {/* Hero text */}
        <h1 className="text-4xl font-black text-zinc-900 mb-3">You&apos;re in.</h1>
        <p className="text-base text-zinc-500 mb-10">
          Here&apos;s what unlocks when you start your free trial.
        </p>

        {/* Benefits list */}
        <div className="space-y-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl flex-shrink-0">
                {b.icon}
              </div>
              <div className="pt-1">
                <p className="text-sm font-black text-zinc-900">{b.title}</p>
                <p className="text-sm text-zinc-400 mt-0.5 leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 shadow-xl px-6 py-4 z-50">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/claim/${params.id}/checkout`}
            className="block w-full bg-amber-400 hover:bg-amber-300 text-black font-black text-center py-4 rounded-full transition text-base shadow-sm"
          >
            Try for $0
          </Link>
          <p className="text-center text-xs text-zinc-400 mt-2">30-day free trial. Cancel anytime.</p>
        </div>
      </div>
    </main>
  );
}
