"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/client";

const supabase = createClient();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

    setLoading(false);

    if (!error) setSent(true);
    else alert(error.message);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <img src="/lemon-icon.png" alt="Lemon" className="w-9 h-9 object-contain" />
        <span className="font-black text-xl tracking-tight text-white">Lemon</span>
      </Link>

      <div className="w-full max-w-sm">
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-white mb-2">Sign in to Lemon</h1>
              <p className="text-zinc-400 text-sm">We&apos;ll send a magic link to your email.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition text-sm"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-6">
              No account needed — just enter your email.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-5">📬</div>
            <h2 className="text-xl font-black text-white mb-2">Check your inbox</h2>
            <p className="text-zinc-400 text-sm mb-8">
              We sent a magic link to <span className="text-white font-semibold">{email}</span>. Click it to sign in.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>

      <Link href="/" className="mt-12 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
        ← Back to Lemon
      </Link>
    </main>
  );
}
