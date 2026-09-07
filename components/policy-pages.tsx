import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { analyticsEnabled } from '@/lib/site-config';

const UPDATED = '7 September 2026';
const MAIL = 'info@verifynova.com';

type PolicySection = { id: string; heading: string; body: ReactNode };

/** Shared reading layout: a contents rail beside the sections themselves. */
function PolicyDocument({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="policy wrap">
      <aside className="policy-contents">
        <p className="eyebrow">On this page</p>
        <nav aria-label="Sections on this page">
          {sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              <span className="policy-nav-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{section.heading}</span>
            </a>
          ))}
        </nav>
        <p className="policy-updated">Last updated {UPDATED}</p>
      </aside>
      <div className="policy-body">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id}>
            <span className="policy-section-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="policy-section-content">
              <h2>{section.heading}</h2>
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function MailLink({
  subject,
  children,
}: {
  subject: string;
  children: ReactNode;
}) {
  return (
    <a
      className="text-link"
      href={`mailto:${MAIL}?subject=${encodeURIComponent(subject)}`}
    >
      {children} <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function SecurityPage() {
  return (
    <PolicyDocument
      sections={[
        {
          id: 'report',
          heading: 'How to report',
          body: (
            <>
              <p>
                Email us with “Security disclosure” in the subject line. Tell us
                which product, page or address is affected and what you found. A
                short, clear description is more useful than a long one.
              </p>
              <p>
                If your report needs sensitive material to make sense, say so
                and ask for a secure channel. Do not send it with the first
                message.
              </p>
              <MailLink subject="Security disclosure">
                Email a security disclosure
              </MailLink>
            </>
          ),
        },
        {
          id: 'include',
          heading: 'What to include',
          body: (
            <ul>
              <li>The product, page or address affected.</li>
              <li>What the issue is, and why it matters.</li>
              <li>The steps someone would follow to see it.</li>
              <li>Anything we need in order to reproduce your result.</li>
              <li>How you would like us to reply to you.</li>
            </ul>
          ),
        },
        {
          id: 'hold-back',
          heading: 'What to hold back',
          body: (
            <>
              <p>
                Do not send personal information about other people, identity
                documents, passwords, access tokens, private keys, or copies of
                records that are not yours. A description of what you saw is
                enough to open a conversation.
              </p>
              <p>
                If we need evidence, we will arrange a way for you to send it
                safely.
              </p>
            </>
          ),
        },
        {
          id: 'response',
          heading: 'What happens next',
          body: (
            <>
              <p>
                We read every report. We will confirm that we have it, tell you
                whether we can act on it, and let you know when the issue is
                resolved or why it will not be changed.
              </p>
              <p>
                If you would like to be credited when a fix is published, say so
                in your report. We will ask you before naming you anywhere.
              </p>
            </>
          ),
        },
        {
          id: 'boundaries',
          heading: 'Testing boundaries',
          body: (
            <>
              <p>
                Please keep your testing to accounts and data that belong to
                you. Do not access, change, keep or share other people’s
                information. Do not run load or denial-of-service tests, and
                stop as soon as you have enough to describe the issue.
              </p>
              <p>
                Research carried out within these boundaries, and reported to us
                promptly, is research we welcome.
              </p>
            </>
          ),
        },
        {
          id: 'out-of-scope',
          heading: 'Usually out of scope',
          body: (
            <>
              <ul>
                <li>
                  Scanner output with no demonstrated impact on a real user or
                  record.
                </li>
                <li>
                  Missing hardening headers or configuration preferences without
                  a working attack.
                </li>
                <li>Software or services that VerifyNova does not operate.</li>
                <li>
                  Social engineering of our people, our partners or our
                  suppliers.
                </li>
                <li>Physical access attempts, and denial of service.</li>
              </ul>
              <p>
                If you are unsure whether something counts, report it and
                explain your reasoning.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

export function PrivacyPage() {
  return (
    <PolicyDocument
      sections={[
        {
          id: 'scope',
          heading: 'What this notice covers',
          body: (
            <>
              <p>
                This notice describes the VerifyNova company website, the one
                you are reading now. It does not describe what happens inside
                our products.
              </p>
              <p>
                UnifyID, VChainCred and ASIL publish their own privacy notices,
                which explain the processing those services carry out, how long
                information is kept and what rights apply.
              </p>
            </>
          ),
        },
        {
          id: 'collect',
          heading: 'What this website collects',
          body: (
            <>
              <p>
                This website has no accounts, no sign-in and no forms that send
                us anything. There is nothing here to fill in, so there is
                nothing for us to store.
              </p>
              <p>
                The contact links open a message in your own mail application.
                Nothing is sent until you choose to send it.
              </p>
            </>
          ),
        },
        {
          id: 'cookies',
          heading: 'Cookies and tracking',
          body: (
            <>
              <p>
                This website sets no cookies, and stores nothing in your
                browser. There is no consent banner because there is nothing to
                consent to.
              </p>
              <p>
                We run no advertising or retargeting tags, and we do not record
                what individual visitors do on a page. There is no session
                replay and there are no heatmaps.
              </p>
            </>
          ),
        },
        {
          id: 'counting',
          heading: 'How we count visits',
          body: analyticsEnabled ? (
            <>
              <p>
                We measure how the website is used so that we can tell which
                pages are worth keeping. The measurement is deliberately
                cookieless: it stores nothing on your device and creates no
                identifier that follows you between visits or between websites.
              </p>
              <p>
                For each page view it records the page address, the site that
                referred you, the country your request came from, and the kind
                of device and browser you used. That is enough to count visits
                and to see the paths people take through the site. It is not
                enough to work out who you are.
              </p>
              <p>
                If we ever add anything that does need your consent, this notice
                will say so first, and we will ask before it runs.
              </p>
            </>
          ) : (
            <p>
              We currently run no analytics at all. If that changes, the
              measurement will be cookieless, this notice will describe exactly
              what it records, and it will say so before the change takes
              effect.
            </p>
          ),
        },
        {
          id: 'logs',
          heading: 'Hosting records',
          body: (
            <>
              <p>
                Our hosting provider records the standard information any web
                server records in order to serve a page and stay secure: the
                requesting network address, the page requested, the time, and
                the browser’s own description of itself.
              </p>
              <p>
                These records are used to keep the site available and to
                investigate abuse. They are not used to build a profile of you
                and are not combined with anything else.
              </p>
            </>
          ),
        },
        {
          id: 'email',
          heading: 'When you email us',
          body: (
            <>
              <p>
                If you email us, your message and your address reach our mail
                provider and the colleagues who need to answer you. We use them
                to reply and to keep track of the conversation.
              </p>
              <p>
                Please keep first messages general. Do not send identity
                documents, credentials or confidential records to a general
                address.
              </p>
            </>
          ),
        },
        {
          id: 'rights',
          heading: 'Your choices',
          body: (
            <>
              <p>
                You can ask what correspondence we hold from you, ask us to
                correct it, or ask us to delete it. Write to us and describe
                what you are asking for.
              </p>
              <p>
                Where a request concerns one of our products rather than this
                website, the privacy notice for that product explains the route
                to take.
              </p>
              <MailLink subject="Privacy enquiry">
                Ask a privacy question
              </MailLink>
            </>
          ),
        },
        {
          id: 'changes',
          heading: 'Changes to this notice',
          body: (
            <p>
              If this website starts to collect anything, this notice will say
              so before it does, and the date at the top will change. Security
              reports have their own guidance on the{' '}
              <Link href="/security">responsible disclosure page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <PolicyDocument
      sections={[
        {
          id: 'about',
          heading: 'About these terms',
          body: (
            <p>
              These terms apply to your use of the VerifyNova company website.
              They do not create a contract for any VerifyNova product. Use of a
              product is governed by the agreement made for that product.
            </p>
          ),
        },
        {
          id: 'purpose',
          heading: 'What this website is for',
          body: (
            <>
              <p>
                This website describes what VerifyNova is building and how we
                think about trust. It is written to inform a conversation, not
                to serve as technical documentation or professional advice.
              </p>
              <p>
                Please do not rely on it alone for a decision that carries legal
                or financial weight. Ask us, and we will tell you what is
                actually supported today.
              </p>
            </>
          ),
        },
        {
          id: 'products',
          heading: 'Product descriptions and availability',
          body: (
            <>
              <p>
                Products described here are at different stages. A description
                on this website is not an offer, a commitment to deliver, or a
                promise that a capability is available to you.
              </p>
              <p>
                Stages, capabilities and boundaries change as the work
                progresses. Confirm the current position with us before you plan
                around it.
              </p>
            </>
          ),
        },
        {
          id: 'content',
          heading: 'Content and marks',
          body: (
            <>
              <p>
                The text, images, diagrams and code on this website belong to
                VerifyNova unless stated otherwise. The VerifyNova, UnifyID,
                VChainCred and ASIL names and logos are ours.
              </p>
              <p>
                You may quote short passages with attribution and a link. Please
                do not use our names or logos in a way that suggests a
                partnership, endorsement or affiliation that does not exist.
              </p>
            </>
          ),
        },
        {
          id: 'acceptable-use',
          heading: 'Acceptable use',
          body: (
            <>
              <p>
                Use this website lawfully and without disrupting it for anyone
                else. Do not attempt to interfere with its availability, and do
                not misrepresent your relationship with VerifyNova.
              </p>
              <p>
                Security research is welcome within the boundaries set out on
                the <Link href="/security">responsible disclosure page</Link>.
              </p>
            </>
          ),
        },
        {
          id: 'external',
          heading: 'Links to other websites',
          body: (
            <p>
              Where we link to another organisation, we do so because it is
              useful. We do not control those websites and are not responsible
              for their content, their availability or their handling of your
              information.
            </p>
          ),
        },
        {
          id: 'liability',
          heading: 'Liability',
          body: (
            <p>
              We take care to keep this website accurate and available, but we
              provide it as it is. To the extent the law allows, VerifyNova is
              not liable for loss arising from reliance on this website’s
              content or from its unavailability. Nothing here limits liability
              that cannot lawfully be limited.
            </p>
          ),
        },
        {
          id: 'questions',
          heading: 'Questions about these terms',
          body: (
            <>
              <p>
                If something here is unclear, or you need a written position for
                your own review process, ask us.
              </p>
              <MailLink subject="Website terms enquiry">
                Ask about these terms
              </MailLink>
            </>
          ),
        },
      ]}
    />
  );
}
