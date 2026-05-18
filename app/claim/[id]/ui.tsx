"use client";

import { useState } from "react";

export default function ClaimForm({ business }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          ownerFullName: name,
          ownerEmail: email,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to submit claim.");
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-neutral-900">
        <h1 className="text-3xl font-black">Claim submitted</h1>
        <p className="text-neutral-400 mt-2">
          We’ve received your request. It’s now pending review.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white p-6">
      <h1 className="text-2xl font-black">
        Claim {business.name}
      </h1>

      <p className="text-neutral-400 mt-1">
        {business.category} • {business.neighborhood}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md space-y-4">
        <input
          className="w-full p-3 rounded-xl bg-neutral-800"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-3 rounded-xl bg-neutral-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Claim"}
        </button>

        {/* REAL ERROR DISPLAY */}
        {error && (
          <div className="text-red-400 text-sm text-center mt-2">
            {error}
          </div>
        )}
      </form>
    </main>
  );
}