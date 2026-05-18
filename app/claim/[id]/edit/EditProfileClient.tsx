'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = [
  'Food & Drinks', 'Beauty', 'Fitness & Wellness', 'Home Improvement',
  'Time Savers', 'Pets', 'Events', 'Auto', 'Activities & Experiences', 'Other',
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const GOOD_TO_KNOW_TAGS = [
  'Walk-ins welcome', 'Appointment only', 'Wheelchair accessible', 'Free parking',
  'Street parking only', 'Cash only', 'Card accepted', 'LGBTQ+ friendly',
  'Dog friendly', 'Outdoor seating', 'Family friendly', 'Wi-Fi available',
  'By referral only', 'Bilingual staff', 'Same-day service',
];

const PRICE_OPTIONS = ['Affordable', 'Mid-Range', 'Premium'];

const BOOKING_OPTIONS = [
  {
    id: 'lemon',
    label: 'Book through Lemon',
    sub: 'Customers book directly — no friction.',
    recommended: true,
  },
  {
    id: 'call',
    label: 'Call to book',
    sub: 'No booking tracking. Manual payment.',
    recommended: false,
  },
  {
    id: 'walkin',
    label: 'Walk-in only',
    sub: "Customers can't book ahead.",
    recommended: false,
  },
  {
    id: 'external',
    label: 'External booking link',
    sub: 'Customers leave Lemon to book.',
    recommended: false,
  },
];

interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  neighborhood?: string;
  address?: string;
  phone_number?: string;
  photo_urls?: string[];
  hours?: Record<string, string>;
  price_range?: string;
  booking_option?: string;
  about_us?: string;
  good_to_know?: string[];
  draft_data?: Record<string, unknown>;
}

function completion(fields: string[]): number {
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export default function EditProfileClient({ business }: { business: Business }) {
  const router = useRouter();
  const draft = (business.draft_data as Record<string, unknown>) ?? {};

  const [name, setName] = useState<string>((draft.name as string) ?? business.name ?? '');
  const [category, setCategory] = useState<string>((draft.category as string) ?? business.category ?? '');
  const [subcategory, setSubcategory] = useState<string>((draft.subcategory as string) ?? business.subcategory ?? '');
  const [address, setAddress] = useState<string>((draft.address as string) ?? business.address ?? '');
  const [price, setPrice] = useState<string>((draft.price_range as string) ?? business.price_range ?? '');
  const [booking, setBooking] = useState<string>((draft.booking_option as string) ?? business.booking_option ?? 'lemon');
  const [aboutUs, setAboutUs] = useState<string>((draft.about_us as string) ?? business.about_us ?? '');
  const [goodToKnow, setGoodToKnow] = useState<string[]>((draft.good_to_know as string[]) ?? business.good_to_know ?? []);
  const [hours, setHours] = useState<Record<string, string>>(
    (draft.hours as Record<string, string>) ?? business.hours ?? {}
  );
  const [bookingNudge, setBookingNudge] = useState(false);
  const [saving, setSaving] = useState(false);
  const [continueTaps, setContinueTaps] = useState(0);

  const fields = [name, category, address, price, booking, aboutUs];
  const pct = completion(fields);
  const filled = fields.filter(Boolean).length;

  // Auto-save draft every 2s of inactivity
  useEffect(() => {
    const timer = setTimeout(saveDraft, 2000);
    return () => clearTimeout(timer);
  }, [name, category, subcategory, address, price, booking, aboutUs, goodToKnow, hours]);

  async function saveDraft() {
    setSaving(true);
    const draftData = { name, category, subcategory, address, price_range: price, booking_option: booking, about_us: aboutUs, good_to_know: goodToKnow, hours };
    try {
      await fetch('/api/businesses/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId: business.id, draftData }),
      });
    } finally {
      setSaving(false);
    }
  }

  function toggleTag(tag: string) {
    setGoodToKnow((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleContinue() {
    if (booking !== 'lemon' && continueTaps === 0) {
      setBookingNudge(true);
      setContinueTaps(1);
      return;
    }
    await saveDraft();
    router.push(`/claim/${business.id}/account`);
  }

  return (
    <main className="min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
          <Link href={`/claim/${business.id}`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-sm font-black text-zinc-900">Finish your profile</p>
            <p className="text-xs text-zinc-400">A few quick details and you&apos;re live.</p>
          </div>
          {saving && <span className="text-xs text-zinc-400">Saving…</span>}
        </div>
        {/* Progress bar */}
        <div className="max-w-lg mx-auto px-6 pb-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-zinc-400 flex-shrink-0">{filled} of {fields.length}</span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-10">

        {/* 1. Business name */}
        <Section label="business name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-lg font-bold text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent"
          />
        </Section>

        {/* 2. Category */}
        <Section label="category">
          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              placeholder="Subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="flex-1 text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent placeholder-zinc-300"
            />
          </div>
        </Section>

        {/* 3. Photos */}
        <Section label="photos">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(business.photo_urls ?? []).map((url, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img src={url} alt="" className="w-20 h-20 rounded-xl object-cover" />
                {i === 0 && (
                  <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    COVER
                  </span>
                )}
              </div>
            ))}
            {(business.photo_urls ?? []).length === 0 && (
              <div className="w-20 h-20 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-300 text-sm">
                No photos
              </div>
            )}
          </div>
        </Section>

        {/* 4. Hours */}
        <Section label="hours">
          <div className="space-y-2">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 w-8 flex-shrink-0">{day}</span>
                <input
                  placeholder="e.g. 9am – 6pm or Closed"
                  value={hours[day] ?? ''}
                  onChange={(e) => setHours((h) => ({ ...h, [day]: e.target.value }))}
                  className="flex-1 text-sm text-zinc-900 border-b border-zinc-100 focus:border-amber-400 outline-none py-1 bg-transparent placeholder-zinc-200"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Address */}
        <Section label="address">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address, Miami, FL"
            className="w-full text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent placeholder-zinc-300"
          />
        </Section>

        {/* 6. Price range */}
        <Section label="price range">
          <div className="flex gap-2">
            {PRICE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setPrice(opt)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition ${
                  price === opt
                    ? 'bg-amber-400 border-amber-400 text-black'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </Section>

        {/* 7. About us */}
        <Section label="about us">
          <textarea
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
            placeholder="Tell customers what makes you special…"
            rows={3}
            className="w-full text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent resize-none placeholder-zinc-300"
          />
        </Section>

        {/* 8. Good to know */}
        <Section label="good to know">
          <div className="flex flex-wrap gap-2">
            {GOOD_TO_KNOW_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  goodToKnow.includes(tag)
                    ? 'bg-amber-400 border-amber-400 text-black'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </Section>

        {/* 9. Booking options */}
        <Section label="booking options">
          <div className="space-y-2">
            {BOOKING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setBooking(opt.id); setBookingNudge(false); setContinueTaps(0); }}
                className={`relative w-full text-left px-4 py-3 rounded-xl border transition ${
                  booking === opt.id
                    ? 'border-amber-400 bg-amber-50'
                    : bookingNudge && opt.id === 'lemon'
                    ? 'border-amber-400 bg-amber-50 animate-pulse'
                    : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {opt.recommended && (
                  <span className="absolute top-2 right-2 text-[9px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded-full uppercase">
                    Recommended
                  </span>
                )}
                <p className="text-sm font-bold text-zinc-900 pr-20">{opt.label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{opt.sub}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-3 text-center">
            We&apos;ve seen significantly more bookings when people can book through Lemon.
          </p>
        </Section>

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 shadow-xl px-6 py-4 z-50">
        <div className="max-w-lg mx-auto space-y-2">
          {bookingNudge && (
            <p className="text-xs text-center text-amber-600 font-medium">
              We recommend booking through Lemon — no extra cost, and you get all the benefits above.
            </p>
          )}
          <button
            onClick={handleContinue}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 rounded-2xl transition text-sm shadow-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-zinc-400 lowercase tracking-wider mb-3">{label}</p>
      {children}
    </div>
  );
}
