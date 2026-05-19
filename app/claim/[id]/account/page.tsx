'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/src/utils/supabase/client';

export default function AccountPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [mode, setMode] = useState<'create' | 'signin'>('create');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    router.push(`/claim/${id}/verify`);
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push(`/claim/${id}/verify`);
  }

  return (
    <main className="min-h-screen bg-white pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href={`/claim/${id}/edit`} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <p className="text-sm font-black text-zinc-900">Create your account</p>
            <p className="text-xs text-zinc-400">You&apos;re almost there.</p>
          </div>
        </div>
        {/* Step indicator */}
        <div className="max-w-2xl mx-auto px-6 pb-3 flex items-center gap-2">
          {[1, 2, 3, 4].map((step, i) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-amber-400' : 'bg-zinc-100'}`}
            />
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8">

        {/* Social options (fake) */}
        <div className="space-y-3 mb-8">
          <button className="w-full flex items-center justify-center gap-3 border border-zinc-200 rounded-2xl py-3.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
              <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
              <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
              <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C42.021 35.563 44 30 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border border-zinc-200 rounded-2xl py-3.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-zinc-100" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="flex-1 h-px bg-zinc-100" />
        </div>

        {/* Mode toggle */}
        <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => { setMode('create'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              mode === 'create' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'
            }`}
          >
            Create account
          </button>
          <button
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              mode === 'signin' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'
            }`}
          >
            Sign in
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={mode === 'create' ? handleCreate : handleSignIn} className="space-y-4">
          {mode === 'create' && (
            <div>
              <label className="text-[11px] text-zinc-400 lowercase tracking-wider">full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="w-full text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1"
              />
            </div>
          )}
          <div>
            <label className="text-[11px] text-zinc-400 lowercase tracking-wider">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1"
            />
          </div>
          <div>
            <label className="text-[11px] text-zinc-400 lowercase tracking-wider">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full text-sm text-zinc-900 border-b border-zinc-200 focus:border-amber-400 outline-none py-2 bg-transparent placeholder-zinc-300 mt-1"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-4 rounded-2xl transition text-sm shadow-sm"
            >
              {loading ? 'Loading…' : mode === 'create' ? 'Create account & continue' : 'Sign in & continue'}
            </button>
          </div>
        </form>

        <p className="text-xs text-zinc-400 text-center mt-6">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
