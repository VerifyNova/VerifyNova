import Link from 'next/link';
import { ArrowUpRight, Fingerprint, Landmark, FolderLock } from 'lucide-react';
import { products } from '@/lib/content';

const productIcons = {
  unifyid: Fingerprint,
  vchaincred: Landmark,
  asil: FolderLock,
};

export function ProductShowcases() {
  return (
    <div className="product-showcase-grid">
      {products.map((product) => {
        const Icon = productIcons[product.slug];
        return (
          <article
            className={`product-story product-story-${product.slug}`}
            key={product.slug}
            aria-labelledby={`showcase-${product.slug}`}
          >
            <header className="product-story-identity">
              <div className="product-story-meta">
                <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="product-story-role">{product.role}</p>
              <h2 id={`showcase-${product.slug}`}>{product.name}</h2>
            </header>
            <div className="product-story-intro">
              <p className="product-story-lead">{product.headline}</p>
              <p className="product-story-copy">{product.description}</p>
            </div>
            <ul className="product-story-capabilities">
              {product.capabilities.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <footer className="product-story-footer">
              <Link
                className="product-story-link"
                href="#"
              >
                <span>Explore {product.name}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </footer>
          </article>
        );
      })}
    </div>
  );
}
