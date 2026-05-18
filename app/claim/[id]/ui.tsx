"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClaimForm({ business }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
          ownerPhone: phone || null,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to submit claim.");
        return;
      }

      router.push("/claim/success");
    } catch (err: any) {
      setError(err?.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

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

        <input
          className="w-full p-3 rounded-xl bg-neutral-800"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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