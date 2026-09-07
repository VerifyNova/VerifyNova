'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="wrap not-found">
      <p className="eyebrow">Something went wrong</p>
      <h1>We couldn’t load this page.</h1>
      <p>Please try again, or return to the homepage.</p>
      <div className="actions">
        <button className="button" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="text-link">
          Return home
        </Link>
      </div>
    </main>
  );
}
