"use client";

import { useState } from "react";
import { supabase } from "../supabaseClient";

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
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (!error) setSent(true);
    else alert(error.message);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Lemon Login 🍋</h1>

      {!sent ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, marginTop: 20 }}
            required
          />

          <button style={{ marginLeft: 10 }} disabled={loading}>
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      ) : (
        <p>Check your email for the login link.</p>
      )}
    </main>
  );
}