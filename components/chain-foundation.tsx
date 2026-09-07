import { FileCheck2, Layers, ShieldCheck } from 'lucide-react';
import { products } from '@/lib/content';

/**
 * Three layers, from the products a person meets down to the network the
 * contracts settle on. Each layer states only what it is responsible for, so
 * the figure shows where identity and permissions stay and what the chain adds.
 */
export function ChainFoundation() {
  return (
    <figure
      className="chain-foundation"
      aria-label="VerifyNova products manage identity, authority and permissions. VerifyNova smart contracts provide a shared foundation for attestations and verifiable evidence. The contracts are built on the Base network."
    >
      <div className="chain-layer">
        <span className="icon-tile">
          <ShieldCheck size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="chain-layer-body">
          <p className="chain-layer-title">Our products</p>
          <p className="chain-layer-note">
            Identity, authority and permissions
          </p>
          <div className="chain-products">
            {products.map((product) => (
              <span className="chip" key={product.slug}>
                {product.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <span className="chain-link" aria-hidden="true" />
      <div className="chain-layer chain-layer-focus">
        <span className="icon-tile">
          <FileCheck2 size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="chain-layer-body">
          <p className="chain-layer-title">VerifyNova smart contracts</p>
          <p className="chain-layer-note">
            Attestations and verifiable evidence
          </p>
        </div>
      </div>
      <span className="chain-link" aria-hidden="true" />
      <div className="chain-layer">
        <span className="icon-tile">
          <Layers size={22} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="chain-layer-body">
          <p className="chain-layer-title">Base</p>
          <p className="chain-layer-note">Public network</p>
        </div>
      </div>
      <figcaption>
        Identity, authority and permissions stay with the products. The
        contracts provide the shared foundation beneath them.
      </figcaption>
    </figure>
  );
}
