import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main-content" className="wrap not-found">
      <p className="eyebrow">Page not found</p>
      <h1>
        This path doesn’t lead
        <br />
        to a page.
      </h1>
      <p>Return to VerifyNova or explore our products.</p>
      <div className="actions">
        <Link href="/" className="button">
          Return home
        </Link>
        <Link href="/products" className="text-link">
          Explore products
        </Link>
      </div>
    </main>
  );
}
