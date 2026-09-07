'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
const navigation = [
  ['Infrastructure', '/infrastructure'],
  ['Products', '/products'],
  ['Solutions', '/solutions'],
  ['Trust', '/trust'],
  ['Company', '/company'],
] as const;
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="VerifyNova home">
          <Image
            unoptimized
            src="/verifynova.svg"
            width="205"
            height="64"
            alt="VerifyNova"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname.startsWith(href + '/')
                  ? 'page'
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="mobile-menu" aria-label="Open navigation">
            <Menu size={23} />
          </SheetTrigger>
          <SheetContent className="mobile-panel">
            <SheetTitle>VerifyNova</SheetTitle>
            <SheetDescription>
              Explore our company and infrastructure.
            </SheetDescription>
            <nav aria-label="Mobile navigation">
              {[['Home', '/'], ...navigation, ['Contact', '/contact']].map(
                ([label, href]) => (
                  <Link
                    href={href}
                    key={href}
                    aria-current={pathname === href ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ),
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-wordmark">
              <Image
                src="/verifynova-footer.svg"
                width={183}
                height={64}
                alt="VerifyNova"
                className="footer-logo"
              />
              <span>Trust, built in.</span>
            </Link>
            <p>
              Identity, authority and trusted information.
              <br />
              Built in Africa. Designed to connect.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <div>
              <h2>Explore</h2>
              {navigation.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <h2>Our ecosystem</h2>
              <Link href="#" data-placeholder="product:unifyid">UnifyID</Link>
              <Link href="#" data-placeholder="product:vchaincred">VChainCred</Link>
              <Link href="#" data-placeholder="product:asil">ASIL</Link>
            </div>
            <div>
              <h2>Get in touch</h2>
              <Link href="/contact">Contact VerifyNova</Link>
              <Link href="/security">Responsible disclosure</Link>
            </div>
            <div>
              <h2>Legal</h2>
              <Link href="/privacy">Privacy notice</Link>
              <Link href="/terms">Terms of use</Link>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} VerifyNova. All rights reserved.
          </span>
          <span>Nigeria first. Africa next. Interoperable globally.</span>
        </div>
      </div>
    </footer>
  );
}
