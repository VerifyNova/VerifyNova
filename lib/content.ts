export const products = [
  {
    slug: 'unifyid',
    name: 'UnifyID',
    role: 'Identity & authority',
    category: 'Personal trust infrastructure',
    stage: 'In development',
    tone: 'taupe',
    headline: 'Identity for people. Authority for agents.',
    description:
      'Verify people, govern AI agents and control how trusted information moves. UnifyID brings identity, permission and accountable authority into one connected experience.',
    capabilities: [
      [
        'Verified information',
        'Bring approved identity information together and disclose what a service needs for a stated purpose.',
      ],
      [
        'Permission and control',
        'Understand a request, approve the relationship and review future access.',
      ],
      [
        'Accountable agents',
        'Connect an agent to a sponsor, define its permissions and contain its authority when circumstances change.',
      ],
    ],
    boundary:
      'UnifyID establishes the identity and authority context. It does not turn a successful sign-in into permission for every subsequent action.',
  },
  {
    slug: 'vchaincred',
    name: 'VChainCred',
    role: 'Institutional trust',
    category: 'Institutional trust & credential infrastructure',
    stage: 'In test',
    tone: 'blue',
    headline: 'Trusted records begin with accountable institutions.',
    description:
      'VChainCred connects institutional governance, delegated authority and credential issuance. The question is not only whether a record exists, but who was entitled to issue it.',
    capabilities: [
      [
        'Institutional governance',
        'Establish the institution, its accreditation context and the people authorised to act.',
      ],
      [
        'Governed issuance',
        'Connect an issuing decision to an approved workflow, an authorised role and a recipient.',
      ],
      [
        'Credential lifecycle',
        'Make records verifiable with their issuer and lifecycle context, including expiry or revocation where applicable.',
      ],
    ],
    boundary:
      'Education credentials are the first implementation described in the current portfolio. Wider institutional use cases remain areas for exploration, not a claim of deployed coverage.',
  },
  {
    slug: 'asil',
    name: 'ASIL',
    role: 'Recipient control',
    category: 'Personal trusted records',
    stage: 'In test',
    tone: 'sage',
    headline: 'Your trusted records. Under your oversight.',
    description:
      'ASIL gives recipients a place to receive, organise and share trusted records. Information should remain useful to the person it represents, not only to the institution that issued it.',
    capabilities: [
      [
        'Receive and organise',
        'Keep issued credentials and trusted records together with their source and context.',
      ],
      [
        'Purposeful sharing',
        'Choose which supported records to share with a recipient, rather than repeatedly sending a complete personal file.',
      ],
      [
        'Review relationships',
        'Manage supported sharing permissions and understand the status of the records you hold.',
      ],
    ],
    boundary:
      'Ending a sharing permission limits supported future access. It cannot guarantee deletion of copies a recipient has already lawfully received.',
  },
] as const;

export const trustGaps = [
  [
    'Fragmented identity',
    'People repeat the same verification across services, with little continuity or control.',
  ],
  [
    'Disconnected authority',
    'An institution’s name does not explain who may act on its behalf or issue a particular record.',
  ],
  [
    'Hard-to-check records',
    'Important decisions can still depend on letters, calls and manual searches.',
  ],
  [
    'Unclear sharing boundaries',
    'Information can outlive the purpose for which it was originally requested.',
  ],
  [
    'New automated actors',
    'AI agents need accountable sponsors and bounded authority, not anonymous access.',
  ],
  [
    'Trust across borders',
    'A record’s meaning and status should be understandable beyond the system that created it.',
  ],
] as const;

export const lifecycle = [
  ['Identity', 'Who is acting?'],
  ['Institution', 'Who stands behind the action?'],
  ['Authority', 'What may they do?'],
  ['Governance', 'Which policy applies?'],
  ['Trusted action', 'What was issued or approved?'],
  ['Evidence', 'What supports the decision?'],
  ['Recipient control', 'Who holds and shares the record?'],
  ['Verification', 'Can its origin and status be checked?'],
  ['Lifecycle', 'Is that trust still current?'],
] as const;

export const solutions = [
  {
    id: 'education',
    title: 'Education & credentials',
    stage: 'First implementation · in test',
    description:
      'Degrees, transcripts, professional certifications and micro-credentials. Connect institutional authority, issuance, recipient control and verification in one accountable journey.',
    detail:
      'Universities, polytechnics, colleges and TVET institutions are the starting point. The objective is to reduce manual checking without losing the issuer, authority or lifecycle context.',
  },
  {
    id: 'licensing',
    title: 'Professional licensing',
    stage: 'Exploring',
    description:
      'Licences to practise, professional registers and continuing professional development.',
    detail:
      'A useful licence check needs to establish the issuing body and current status—not only the fact that a licence was once issued.',
  },
  {
    id: 'workforce',
    title: 'Workforce trust',
    stage: 'Exploring',
    description:
      'Employment records, references, skills and role authorisations that remain useful across a working life.',
    detail:
      'The opportunity is to make approved employment evidence portable while keeping authority, access and sensitive information bounded.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare credentials',
    stage: 'Exploring',
    description:
      'Practitioner qualifications and facility accreditation across institutions and systems.',
    detail:
      'This is about professional and institutional trust. It is not a claim that medical records or clinical services are currently supported.',
  },
  {
    id: 'government',
    title: 'Government & public services',
    stage: 'Exploring',
    description:
      'Trust around registries, public-service decisions and delegated institutional authority.',
    detail:
      'Government databases and national identity systems remain authoritative. VerifyNova’s role is to help make the trust around them more interoperable.',
  },
  {
    id: 'business',
    title: 'Business & organisation trust',
    stage: 'Exploring',
    description:
      'Registrations, permits and records issued by authorised officers of accountable institutions.',
    detail:
      'A verifiable record should explain its source and current standing, without exposing more underlying information than the recipient needs.',
  },
  {
    id: 'land',
    title: 'Land & property',
    stage: 'Exploring',
    description:
      'Titles, transfers and encumbrances with clear provenance and governed changes.',
    detail:
      'Digital evidence does not replace legal ownership rules or the authority of the relevant registry. Those boundaries must be established first.',
  },
  {
    id: 'agriculture',
    title: 'Agricultural certification',
    stage: 'Exploring',
    description:
      'Records of origin, standards and certification that can accompany produce through supply chains.',
    detail:
      'The opportunity is to connect a certificate to an accountable issuer and make its status understandable to the next participant.',
  },
  {
    id: 'agents',
    title: 'AI agent authority',
    stage: 'In development · UnifyID',
    description:
      'Accountable sponsorship and explicit permissions for software acting on someone’s behalf.',
    detail:
      'Identity alone is not enough. A receiving system must check the agent’s current authority before allowing an operation.',
  },
  {
    id: 'cross-border',
    title: 'Cross-border trust',
    stage: 'Design direction',
    description:
      'Records and trust decisions that can be understood beyond their originating system.',
    detail:
      'Technical interoperability can support recognition. It does not by itself create legal acceptance in another jurisdiction.',
  },
] as const;

export const pageContent = {
  infrastructure: {
    eyebrow: 'Our infrastructure',
    title: 'Trust doesn’t begin with a document.',
    intro:
      'Identity, institutional authority, governance and evidence must work together before a record can be relied on. VerifyNova connects those moments without replacing the systems that remain authoritative.',
  },
  products: {
    eyebrow: 'The VerifyNova ecosystem',
    title: 'One foundation. Three distinct platforms.',
    intro:
      'UnifyID establishes identity and authority. VChainCred governs institutional issuance. ASIL gives recipients control of their trusted records. Different responsibilities, connected by a common trust model.',
  },
  solutions: {
    eyebrow: 'Where trust matters',
    title: 'One trust foundation. Many possibilities.',
    intro:
      'Education credentials are the first implementation. The same questions of identity, authority, evidence and control extend into other services.',
  },
  trust: {
    eyebrow: 'Trust by design',
    title: 'Governed, not assumed.',
    intro:
      'Trust depends on decisions that can be explained, permissions that remain bounded, and evidence that can be checked. These principles guide how VerifyNova designs its products.',
  },
  company: {
    eyebrow: 'About VerifyNova',
    title: 'Built in Africa. Designed to connect.',
    intro:
      'VerifyNova is building digital public infrastructure for the relationships that matter: between people and institutions, between records and decisions, and between systems that need to work together.',
  },
  security: {
    eyebrow: 'Responsible disclosure',
    title: 'Report a security issue.',
    intro:
      'If you believe you have found a vulnerability in a VerifyNova product or in this website, we want to hear from you. This page explains what to send, what to hold back and what happens after you report it.',
  },
  privacy: {
    eyebrow: 'Privacy notice',
    title: 'What this website collects.',
    intro:
      'This notice covers the VerifyNova company website and nothing else. Our products publish their own privacy notices, which explain the processing that happens inside those services.',
  },
  terms: {
    eyebrow: 'Terms of use',
    title: 'Terms for using this website.',
    intro:
      'These terms apply to the VerifyNova company website. They do not create a contract for any VerifyNova product, and they are not a commitment that a described capability is available to you today.',
  },
  contact: {
    eyebrow: 'Work with VerifyNova',
    title: 'The right conversation starts here.',
    intro:
      'Tell us what you are building, the institution you represent or the trust problem you want to solve. Keep the first conversation general—do not send personal records or security credentials.',
  },
} as const;

export type PageSlug = keyof typeof pageContent;
export const publicRoutes = [
  '/',
  ...Object.keys(pageContent).map((slug) => `/${slug}`),
];
