import Image from 'next/image';

export function TrustVerification() {
  return (
    <figure className="trust-minimal" aria-label="Attestation, blockchain evidence and verification">
      <Image src="/favicon.svg" alt="VerifyNova" width={179} height={192} unoptimized />
      <ol className="trust-minimal-path">
        <li>Attestation</li>
        <li>Blockchain evidence</li>
        <li>Verification</li>
      </ol>
      <figcaption>Attest claims. Anchor evidence where enabled. Make integrity checkable.</figcaption>
    </figure>
  );
}
