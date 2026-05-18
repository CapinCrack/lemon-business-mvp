'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const METHODS = [
  {
    id: 'google',
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
        <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
        <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
        <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
        <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C42.021 35.563 44 30 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
      </svg>
    ),
    label: 'Verify via Google Business',
    sub: 'Fastest — confirm you own the Google listing.',
    recommended: true,
  },
  {
    id: 'phone',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone verification',
    sub: 'We call or text your listed business number.',
    recommended: false,
  },
  {
    id: 'document',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'Upload a document',
    sub: 'Business license, utility bill, or govt. registration.',
    recommended: false,
  },
];

export default function VerifyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [selected, setSelected] = useState('google');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    setLoading(true);
    setError('');

    const fd = new FormData();
    fd.append('businessId', id);
    fd.append('method', selected);
    if (selected === 'document' && file) fd.append('file', file);

    try {
      const res = await fetch('/api/businesses/verify', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      router.push(`/claim/${id}/value`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center gap-4">
          <Link href={`/claim/${id}/account`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-sm font-black text-zinc-900">Verify ownership</p>
            <p className="text-xs text-zinc-400">Confirm this is your business.</p>
          </div>
        </div>
        {/* Step indicator */}
        <div className="max-w-lg mx-auto px-6 pb-3 flex items-center gap-2">
          {[1, 2, 3, 4].map((step, i) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-amber-400' : 'bg-zinc-100'}`}
            />
          ))}
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-4">
        <p className="text-xs text-zinc-400">
          Choose how you&apos;d like to prove you own this business. We review every claim within 24 hours.
        </p>

        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`relative w-full text-left px-4 py-4 rounded-2xl border transition flex gap-4 items-start ${
              selected === m.id ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            {m.recommended && (
              <span className="absolute top-3 right-3 text-[9px] font-black bg-amber-400 text-black px-1.5 py-0.5 rounded-full uppercase">
                Fastest
              </span>
            )}
            <div className={`mt-0.5 flex-shrink-0 ${selected === m.id ? 'text-amber-500' : 'text-zinc-400'}`}>
              {m.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 pr-16">{m.label}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{m.sub}</p>
            </div>
          </button>
        ))}

        {/* Document upload area */}
        {selected === 'document' && (
          <div
            onClick={() => fileRef.current?.click()}
            className={`mt-2 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
              file ? 'border-amber-400 bg-amber-50' : 'border-zinc-200 hover:border-zinc-300'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <>
                <p className="text-sm font-bold text-zinc-900">{file.name}</p>
                <p className="text-xs text-zinc-400 mt-1">Tap to change</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-zinc-500">Tap to upload</p>
                <p className="text-xs text-zinc-400 mt-1">PDF, JPG, or PNG — max 10 MB</p>
              </>
            )}
          </div>
        )}

        {/* Phone info */}
        {selected === 'phone' && (
          <div className="bg-zinc-50 rounded-2xl p-4 text-sm text-zinc-500">
            We&apos;ll call or text the phone number on your business listing. Make sure it&apos;s correct in your profile before proceeding.
          </div>
        )}

        {/* Google info */}
        {selected === 'google' && (
          <div className="bg-zinc-50 rounded-2xl p-4 text-sm text-zinc-500">
            After you submit, we&apos;ll check that your Google Business account matches this listing. Make sure your Google listing is live and up to date.
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 shadow-xl px-6 py-4 z-50">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading || (selected === 'document' && !file)}
            className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-4 rounded-2xl transition text-sm shadow-sm"
          >
            {loading ? 'Submitting…' : 'Submit verification'}
          </button>
          <p className="text-center text-xs text-zinc-400 mt-2">We review every claim within 24 hours.</p>
        </div>
      </div>
    </main>
  );
}
