'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageEntryScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Keep explicit section links working, but never inherit another page's scroll.
    const resetPosition = () => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    resetPosition();
    const frame = window.requestAnimationFrame(resetPosition);
    window.addEventListener('pageshow', resetPosition);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', resetPosition);
    };
  }, [pathname]);

  return null;
}
