import Link from 'next/link';

export default function ClaimSuccessPage() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 text-amber-400"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-black text-white">Claim submitted</h1>
      <p className="text-neutral-400 mt-3 max-w-sm leading-relaxed">
        We've received your ownership request. Our team will review it and reach out to{' '}
        <span className="text-white font-medium">confirm your identity</span> within 1–2 business days.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-amber-400 text-black font-bold rounded-xl hover:bg-amber-300 transition text-sm"
      >
        Back to Lemon
      </Link>
    </main>
  );
}
