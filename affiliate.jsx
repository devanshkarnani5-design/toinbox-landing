/* ── SHARED ────────────────────────────────────────────────────────────────*/
const LOGO_SRC = '/favicon.png'; // ToInbox mark (hosted at site root)
const SUPPORT_EMAIL = 'affiliates@toinbox.app'; // CHANGE to your real inbox



/* ═════════════════════════════════════════════════════════════════════════
 * SECTION 1 — Marketing page  →  route /affiliates
 * ═════════════════════════════════════════════════════════════════════════ */

/* ToInbox — Affiliates page (v2)
 * Single self-contained React component. Tailwind CSS required.
 * Design tokens mirror the ToInbox landing page (landing-styles.css).
 *
 * ── PLUG IN REAL VALUES HERE ────────────────────────────────────────────────
 *   SIGNUP_URL    — affiliate sign-up route (placeholder: /affiliate/signup)
 *   PAYOUT_DAY    — when monthly payouts are sent
 *   SUPPORT_EMAIL — affiliate support inbox
 *   PACK_PRICE    — top credit-pack price ($24), drives the hero chip + calculator
 *   HERO_SALES    — sales count used for the illustrative hero commission figure
 *   AVATARS       — swap the placeholder portraits for real photos/illustrations
 * ───────────────────────────────────────────────────────────────────────────*/

const SIGNUP_URL = '/affiliate-apply';
const PAYOUT_DAY = 'the 1st of every month'; // CHANGE if different
const PACK_PRICE = 24; // top credit-pack price — update if pricing changes
const HERO_SALES = 21; // illustrative sales count shown in the hero chip
const CURRENCY = '$';
const money2 = (n) => CURRENCY + n.toFixed(2);
/* → real ToInbox mark — point this at your hosted/bundled asset path */

function Logo({ size = 26, className = '' }) {
  return <img src={LOGO_SRC} alt="ToInbox" width={size} height={size} className={`rounded-[7px] object-contain ${className}`} style={{ width: size, height: size }} />;
}

/* Placeholder portraits — replace with your own hosted images. */
const AVATARS = [
  'https://i.pravatar.cc/240?img=12', 'https://i.pravatar.cc/240?img=32',
  'https://i.pravatar.cc/240?img=45', 'https://i.pravatar.cc/240?img=68',
  'https://i.pravatar.cc/240?img=5', 'https://i.pravatar.cc/240?img=26',
  'https://i.pravatar.cc/240?img=51', 'https://i.pravatar.cc/240?img=60',
];

const affTokens = {
  '--bg': '#f7f6f3', '--bg-elev': '#ffffff', '--bg-soft': '#efede8',
  '--ink': '#0a0a0a', '--ink-2': '#2a2a2a', '--ink-3': '#545454', '--ink-4': '#8a8a85',
  '--line': 'rgba(10,10,10,0.08)', '--line-2': 'rgba(10,10,10,0.14)',
  '--accent': 'oklch(0.58 0.19 252)', '--accent-2': 'oklch(0.42 0.2 270)',
  '--accent-soft': 'oklch(0.94 0.04 252)', '--accent-ink': 'oklch(0.32 0.16 252)',
  '--accent-glow': 'oklch(0.7 0.21 252 / 0.35)',
  /* CTA colour — change these two to retheme every "Become an affiliate" button */
  '--cta': 'oklch(0.58 0.2 252)',
  '--cta-glow': 'oklch(0.62 0.21 252 / 0.45)',
  fontFamily: "'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontFeatureSettings: "'ss01','cv11'", background: 'var(--bg)', color: 'var(--ink)',
};
const MONO = "'Geist Mono', ui-monospace, monospace";

const st = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Ic = {
  ticket: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6Z"/><path d="M14.5 9.5l-5 5"/><circle cx="9.8" cy="9.8" r=".9"/><circle cx="14.2" cy="14.2" r=".9"/></g></svg>),
  share: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8 15.8 6.8M8.2 13.2l7.6 4"/></g></svg>),
  coin: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><circle cx="12" cy="12" r="8.5"/><path d="M14.3 9.3a2.6 2.6 0 0 0-2.3-1.2c-1.4 0-2.4.8-2.4 1.9 0 2.6 4.9 1.3 4.9 3.9 0 1.2-1.1 2-2.5 2a2.7 2.7 0 0 1-2.4-1.3M12 6.6v1.5M12 15.9v1.5"/></g></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="M12 3.5c.6 3.9 1.9 5.3 5.8 6-3.9.7-5.2 2-5.8 6-.6-4-1.9-5.3-5.8-6 3.9-.7 5.2-2.1 5.8-6Z"/><path d="M18.6 15.4c.3 1.7.9 2.3 2.6 2.6-1.7.3-2.3.9-2.6 2.6-.3-1.7-.9-2.3-2.6-2.6 1.7-.3 2.3-.9 2.6-2.6Z"/></g></svg>),
  target: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r=".9"/></g></svg>),
  gift: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="M4 10.5h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M3.2 7h17.6v3.5H3.2zM12 7v13.5"/><path d="M12 7S10.8 3.5 8.8 3.5a2 2 0 0 0 0 3.5Zm0 0s1.2-3.5 3.2-3.5a2 2 0 0 1 0 3.5Z"/></g></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="m5 12.5 4.2 4.2L19 7"/></g></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="M5 12h13M12.5 6l6 6-6 6"/></g></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><rect x="3" y="5.5" width="18" height="13" rx="2.4"/><path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7"/></g></svg>),
  bolt: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...st}><path d="M13.5 3 5.5 13.4h5.2L10 21l8.2-10.6H13Z"/></g></svg>),
};

/* ── Primitives ────────────────────────────────────────────────────────────*/
function Btn({ children = 'Become an affiliate', variant = 'accent', sm = false, className = '' }) {
  const base = `group inline-flex items-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-all duration-150 hover:-translate-y-px ${sm ? 'px-[14px] py-[8px] text-[13px]' : 'px-[20px] py-[12px] text-[14.5px]'}`;
  const v = {
    accent: 'text-white shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_10px_34px_-10px_var(--cta-glow)] bg-[linear-gradient(180deg,#1785f5,#0a6fe0)] hover:brightness-[1.06]',
    ink: 'bg-[var(--ink)] text-white shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_6px_22px_-6px_rgba(10,10,10,0.35)] hover:bg-[#1c1c1c]',
    outline: 'border border-[var(--line-2)] bg-[var(--bg-elev)] text-[var(--ink)] hover:bg-[var(--bg-soft)]',
    light: 'bg-white text-[var(--ink)] hover:brightness-95',
  }[variant];
  /* → wire this to your real sign-up route */
  return (
    <a href={SIGNUP_URL} className={`${base} ${v} ${className}`}>
      {children}
      <Ic.arrow className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]" />
    </a>
  );
}

function Eyebrow({ children, dot = true, dark = false }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] uppercase tracking-[0.06em] ${dark ? 'border-white/12 bg-white/[0.06] text-[rgba(245,245,244,0.7)]' : 'border-[var(--line)] bg-white/70 text-[var(--ink-3)] backdrop-blur'}`} style={{ fontFamily: MONO }}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]" />}
      {children}
    </span>
  );
}

const hSection = 'font-medium leading-[1.03] tracking-[-0.03em] text-[clamp(32px,4vw,52px)]';
const leadCls = 'text-[clamp(16px,1.35vw,18.5px)] leading-[1.55] text-[var(--ink-3)] text-pretty';

function SectionHead({ eyebrow, title, sub, center = true, dark = false }) {
  return (
    <div className={`flex max-w-[620px] flex-col gap-5 ${center ? 'mx-auto items-center text-center' : 'items-start'}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={`${hSection} ${dark ? 'text-[#fafafa]' : ''} text-pretty`}>{title}</h2>
      {sub && <p className={`${leadCls} ${dark ? '!text-[rgba(245,245,244,0.6)]' : ''}`}>{sub}</p>}
    </div>
  );
}

function Avatar({ src, size = 40, ring = 'var(--bg)', className = '' }) {
  return <img src={src} alt="" width={size} height={size} loading="lazy" className={`rounded-full object-cover ${className}`} style={{ width: size, height: size, boxShadow: `0 0 0 2px ${ring}, 0 4px 12px -4px rgba(10,10,10,0.3)` }} />;
}

function AvatarStack({ imgs, size = 36, ring = 'var(--bg)' }) {
  return (
    <div className="flex">
      {imgs.map((src, i) => (
        <div key={src} style={{ marginLeft: i ? -10 : 0, zIndex: imgs.length - i }} className="relative">
          <Avatar src={src} size={size} ring={ring} />
        </div>
      ))}
    </div>
  );
}

/* Hero visual: an affiliate payout statement for HERO_SALES sales this month */
function PayoutMock() {
  const commission = HERO_SALES * PACK_PRICE * 0.25; // 25% of the full $24 list price
  const saved = HERO_SALES * PACK_PRICE * 0.1;
  const rows = [
    ['Sales with your code', `${HERO_SALES}`],
    ['Pack price', money2(PACK_PRICE)],
    ['Commission rate', '25% of list price'],
    ['Your audience paid', `${money2(PACK_PRICE * 0.9)} each`],
  ];
  return (
    <div className="relative w-full max-w-[420px]">
      <div className="rounded-[20px] border border-[var(--line-2)] bg-[var(--bg-elev)] p-6 shadow-[0_1px_0_rgba(10,10,10,0.04),0_40px_80px_-40px_rgba(10,10,10,0.35)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={24} />
            <span className="text-[14px] font-medium tracking-[-0.01em]">Affiliate payout</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.05_152)] px-2.5 py-1 text-[oklch(0.42_0.14_152)]">
            <Ic.check className="h-[12px] w-[12px]" />
            <span style={{ fontFamily: MONO }} className="text-[10.5px] uppercase tracking-[0.08em]">Paid</span>
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-[var(--line)] pt-5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <span className="text-[13.5px] text-[var(--ink-3)]">{k}</span>
              <span className="text-[14px] font-medium tabular-nums">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-[12px] border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[var(--accent-soft)] px-4 py-4">
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[var(--accent-ink)]">Commission earned</span>
            <span style={{ fontFamily: MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[color-mix(in_oklab,var(--accent-ink)_65%,transparent)]">Code · YOURNAME10</span>
          </div>
          <div className="mt-2 text-[34px] font-medium leading-none tracking-[-0.035em] tabular-nums text-[var(--accent-ink)]">{money2(commission)}</div>
        </div>
        {/* → payout method comes from the affiliate's account settings */}
        <div className="mt-4 flex items-center justify-between text-[12.5px] text-[var(--ink-3)]">
          <span>Sent to PayPal</span>
          <span style={{ fontFamily: MONO }} className="uppercase tracking-[0.08em] text-[var(--ink-4)]">Monthly payout</span>
        </div>
      </div>
      {/* floating audience-saving chip */}
      <div className="absolute -bottom-12 -left-4 flex items-center gap-3 whitespace-nowrap rounded-[14px] border border-[var(--line-2)] bg-[var(--bg-elev)] px-4 py-3 shadow-[0_20px_50px_-24px_rgba(10,10,10,0.4)] sm:-left-10">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[oklch(0.94_0.06_152)] text-[oklch(0.45_0.14_152)]"><Ic.gift className="h-[17px] w-[17px]" /></span>
        <div>
          <div style={{ fontFamily: MONO }} className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-4)]">Your audience saved</div>
          <div className="text-[15px] font-medium tracking-[-0.02em] tabular-nums">{money2(saved)}<span className="ml-1.5 text-[12px] font-normal text-[var(--ink-3)]">on {HERO_SALES} orders</span></div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────*/
function AffiliatesPage() {
  const [open, setOpen] = React.useState(0);
  const [refs, setRefs] = React.useState(HERO_SALES);

  const sale = PACK_PRICE;
  const monthly = refs * PACK_PRICE * 0.25; // commission is 25% of the full list price
  const saved = refs * PACK_PRICE * 0.1;
  const money = (n) => CURRENCY + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const steps = [
    { icon: Ic.ticket, n: '01', t: 'Sign up & get your code', d: 'Apply in under a minute. We issue a unique discount code tied to your account — no approval queue.' },
    { icon: Ic.share, n: '02', t: 'Share it with your audience', d: 'A newsletter, a video description, a coaching call, a community post. Anywhere job seekers listen to you.' },
    { icon: Ic.coin, n: '03', t: 'They save 10%, you earn 25%', d: 'The code is entered at checkout — that\u2019s how the sale is attributed. Commission lands in your dashboard.' },
  ];

  const audiences = [
    { av: AVATARS[0], t: 'Career coaches', d: 'Give clients a real outreach tool between sessions.' },
    { av: AVATARS[1], t: 'Resume writers', d: 'A natural next step once the resume is done.' },
    { av: AVATARS[2], t: 'Creators & bloggers', d: 'Career, tech, and job-search audiences convert well.' },
    { av: AVATARS[3], t: 'Communities & cohorts', d: 'Bootcamps, Slack groups, clubs, Discord servers.' },
    { av: AVATARS[4], t: 'Past users', d: 'Landed a job with ToInbox? Pass it forward.' },
    { av: AVATARS[5], t: 'Anyone else', d: 'No follower minimum, no gatekeeping. Just sign up.' },
  ];

  const benefits = [
    { icon: Ic.spark, t: 'A product people actually want', d: 'ToInbox finds the hiring managers, founders, and decision-makers behind LinkedIn job listings, then sends AI-personalized emails from the user\u2019s own Gmail. It solves a problem your audience already complains about.' },
    { icon: Ic.target, t: 'Built for real outcomes', d: 'Applications that reach a human instead of an ATS black hole. You\u2019re recommending a tool that changes how your audience job-hunts — not a novelty.' },
    { icon: Ic.coin, t: 'Generous 25% commission', d: 'A quarter of every sale, on every credit pack, for every customer who uses your code. Paid monthly, with no cap on earnings.' },
    { icon: Ic.gift, t: 'A genuine discount, not a favour', d: '10% off is a real reason to use your code. You\u2019re handing your audience a saving — recommending it costs your credibility nothing.' },
  ];

  const faqs = [
    { q: 'How do I get paid?', a: 'Commission is paid out monthly to your PayPal account. You add your PayPal email when you apply, and you can update it any time from your affiliate dashboard.' },
    { q: 'When are payouts sent?', a: `Payouts go out once a month, on ${PAYOUT_DAY}, covering all commissions earned the previous month.` },
    { q: 'Do I need a big audience to join?', a: 'No. There\u2019s no follower minimum and no application gauntlet. Career coaches, resume writers, creators, community organisers, and past users are all welcome — if you know people looking for work, you qualify.' },
    { q: 'Does my code work on all plans?', a: 'Yes. Your code applies to every ToInbox credit pack. ToInbox sells one-time credit packs rather than subscriptions, so your audience gets 10% off whichever pack they buy, and you earn 25% of that sale.' },
    { q: 'How much do I earn, and how much does my audience save?', a: `You earn 25% commission on the full ${CURRENCY}${PACK_PRICE} list price of every sale made with your code — ${money2(PACK_PRICE * 0.25)} per pack — while your audience pays ${money2(PACK_PRICE * 0.9)} instead of ${CURRENCY}${PACK_PRICE}. So ${HERO_SALES} sales in a month comes to ${money2(HERO_SALES * PACK_PRICE * 0.25)} for you and ${money2(HERO_SALES * PACK_PRICE * 0.1)} saved for them. Both are applied automatically at checkout, with nothing for you to calculate or invoice.` },
    { q: 'Is there a cost to join?', a: 'None. The program is free to join, no fees come out of your commission, and you\u2019re never required to buy ToInbox yourself in order to promote it.' },
  ];

  return (
    <div className="min-h-screen w-full antialiased" style={affTokens}>
      {/* ═══ NAV ═══ */}
      <header className="sticky top-0 z-50 border-b border-transparent bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-[14px] backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-7">
          <a href="/" className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em]">
            <Logo size={26} />
            ToInbox
          </a>
          <nav className="hidden items-center gap-7 text-[14px] text-[var(--ink-3)] md:flex">
            <a href="#how-it-works" className="hover:text-[var(--ink)]">How it works</a>
            <a href="#earnings" className="hover:text-[var(--ink)]">Earnings</a>
            <a href="#who" className="hover:text-[var(--ink)]">Who it's for</a>
            <a href="#faq" className="hover:text-[var(--ink)]">FAQ</a>
          </nav>
          <Btn sm>Become an affiliate</Btn>
        </div>
      </header>

      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-x-[-10%] -top-[16%] h-[760px] blur-[24px]" style={{ background: 'radial-gradient(46% 58% at 72% 20%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 70%), radial-gradient(38% 48% at 20% 8%, color-mix(in oklab, oklch(0.7 0.18 320) 15%, transparent), transparent 70%)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(70% 55% at 50% 22%, #000, transparent 75%)', WebkitMaskImage: 'radial-gradient(70% 55% at 50% 22%, #000, transparent 75%)' }} />
        <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-5 pb-[104px] pt-[72px] sm:px-7 sm:pb-[120px] sm:pt-[88px] lg:grid-cols-[1.06fr_1fr] lg:gap-12">
          <div>
            <Eyebrow>Affiliate Program</Eyebrow>
            <h1 className="mt-6 max-w-[620px] text-[clamp(40px,5.4vw,72px)] font-medium leading-[0.99] tracking-[-0.038em] text-pretty">
              Earn <span className="bg-[linear-gradient(100deg,oklch(0.6_0.2_252),oklch(0.48_0.2_282))] bg-clip-text text-transparent">25%</span> helping job seekers land the job.
            </h1>
            <p className={`${leadCls} mt-6 max-w-[520px]`}>
              Share your code, your audience gets <span className="font-medium text-[var(--ink)]">10% off</span> every ToInbox credit pack, and you keep <span className="font-medium text-[var(--ink)]">25% of every sale</span>. Open to everyone.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Btn />
              <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--bg-elev)] px-[20px] py-[12px] text-[14.5px] font-medium transition-colors hover:bg-[var(--bg-soft)]">See how it works</a>
            </div>
            <div className="mt-9 flex items-center gap-4">
              <AvatarStack imgs={AVATARS.slice(0, 5)} />
              <p className="max-w-[280px] text-[13px] leading-[1.5] text-[var(--ink-3)]">Coaches, creators, communities and past users — all welcome, no audience minimum.</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end"><PayoutMock /></div>
        </div>
      </section>

      {/* ═══ 2. HOW IT WORKS ═══ */}
      <section id="how-it-works" className="scroll-mt-16 border-t border-[var(--line)] bg-[var(--bg-elev)] py-[80px] sm:py-[112px]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
          <SectionHead eyebrow="How it works" title="Three steps, then it runs itself." sub="No links to rebuild, no dashboards to babysit. One code does everything." />
          <div className="relative mt-16">
            <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-[linear-gradient(90deg,transparent,var(--line-2),var(--line-2),transparent)] md:block" />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {steps.map(({ icon: I, n, t, d }) => (
                <div key={n} className="relative">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[54px] w-[54px] flex-none items-center justify-center rounded-[16px] border border-[var(--line)] bg-[var(--bg)] text-[var(--accent-ink)] shadow-[0_1px_0_rgba(10,10,10,0.03),0_10px_28px_-18px_rgba(10,10,10,0.45)]"><I className="h-[22px] w-[22px]" /></div>
                    <span style={{ fontFamily: MONO }} className="text-[11.5px] tracking-[0.1em] text-[var(--ink-4)]">STEP {n}</span>
                  </div>
                  <h3 className="mt-6 text-[19px] font-medium tracking-[-0.02em]">{t}</h3>
                  <p className="mt-2.5 max-w-[330px] text-[14.5px] leading-[1.6] text-[var(--ink-3)] text-pretty">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. EARNINGS HIGHLIGHT + CALCULATOR ═══ */}
      <section id="earnings" className="scroll-mt-16 bg-[var(--bg-elev)] pb-[80px] sm:pb-[112px]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[var(--ink)] text-[#f5f5f4]">
            <div aria-hidden className="pointer-events-none absolute -inset-0.5 -z-10 opacity-70" style={{ background: 'radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 38%, transparent), transparent 70%)' }} />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(45% 55% at 92% 8%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 70%)' }} />
            <div className="relative grid grid-cols-1 gap-14 px-6 py-[56px] sm:px-14 sm:py-[80px] lg:grid-cols-[1fr_400px] lg:gap-16">
              <div>
                <SectionHead center={false} dark eyebrow="The numbers" title="Everyone comes out ahead." />
                <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-0">
                  <div className="sm:pr-8">
                    <div className="text-[clamp(52px,6.5vw,76px)] font-medium leading-none tracking-[-0.04em] text-[oklch(0.79_0.14_268)]">25%</div>
                    <div className="mt-5 text-[17px] font-medium">Earn 25% commission on every sale</div>
                    <p className="mt-2 max-w-[340px] text-[14px] leading-[1.6] text-[rgba(245,245,244,0.55)]">Calculated on the full list price, not the discounted total. No cap, no tiers, no expiry on your code.</p>
                  </div>
                  <div className="sm:border-l sm:border-white/10 sm:pl-8">
                    <div className="text-[clamp(52px,6.5vw,76px)] font-medium leading-none tracking-[-0.04em]">10%</div>
                    <div className="mt-5 text-[17px] font-medium">Your audience gets 10% off with your code</div>
                    <p className="mt-2 max-w-[340px] text-[14px] leading-[1.6] text-[rgba(245,245,244,0.55)]">Entered at checkout — the same discount is what attributes the sale to you.</p>
                  </div>
                </div>
                {/* → payout details: replace with your real terms */}
                <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-white/10 pt-8 text-[12.5px]" style={{ fontFamily: MONO }}>
                  <span className="text-[rgba(245,245,244,0.45)]">PAID VIA <span className="ml-2 text-white">PAYPAL</span></span>
                  <span className="text-[rgba(245,245,244,0.45)]">SCHEDULE <span className="ml-2 text-white">MONTHLY</span></span>
                </div>
              </div>

              {/* calculator — illustrative math, not a projection */}
              <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[rgba(245,245,244,0.55)]">Estimate your earnings</span>
                  <Ic.bolt className="h-[16px] w-[16px] text-[oklch(0.79_0.14_268)]" />
                </div>
                <div className="mt-7">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13.5px] text-[rgba(245,245,244,0.6)]">Sales with your code / month</span>
                    <span className="text-[20px] font-medium tracking-[-0.02em]">{refs}</span>
                  </div>
                  <input type="range" min="1" max="100" value={refs} onChange={(e) => setRefs(+e.target.value)} className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.4)] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white" style={{ background: `linear-gradient(90deg, oklch(0.7 0.18 262) ${refs}%, rgba(255,255,255,0.14) ${refs}%)` }} />
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div style={{ fontFamily: MONO }} className="text-[10.5px] uppercase tracking-[0.08em] text-[rgba(245,245,244,0.45)]">Your monthly commission</div>
                  <div className="mt-2 text-[42px] font-medium leading-none tracking-[-0.035em] text-[oklch(0.85_0.13_268)]">{money(monthly)}</div>
                  <div className="mt-5 flex items-center justify-between text-[13px] text-[rgba(245,245,244,0.6)]">
                    <span>Your audience saves</span><span className="text-white">{money(saved)}</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[13px] text-[rgba(245,245,244,0.6)]">
                    <span>Based on a {money(PACK_PRICE)} pack</span><span className="text-white">25% of {money(sale)}</span>                  </div>
                </div>
                {/* → PACK_PRICE ($24 top pack) drives this math */}
                <p className="mt-6 text-[11.5px] leading-[1.5] text-[rgba(245,245,244,0.4)]">Illustrative only — based on the {CURRENCY}{PACK_PRICE} pack. Actual earnings depend on which packs your audience buys.</p>
                <div className="mt-6"><Btn variant="light" className="w-full justify-center">Start earning</Btn></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. WHO IT'S FOR ═══ */}
      <section id="who" className="scroll-mt-16 border-t border-[var(--line)] py-[80px] sm:py-[112px]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
          <SectionHead eyebrow="Who it's for" title="Open to everyone with an audience." sub="If people come to you for career advice — in any format, at any scale — this is for you." />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map(({ av, t, d }) => (
              <div key={t} className="group flex items-start gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--bg-elev)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--line-2)] hover:shadow-[0_1px_0_rgba(10,10,10,0.03),0_22px_48px_-30px_rgba(10,10,10,0.35)]">
                {/* → replace AVATARS with real photos or illustrations */}
                <Avatar src={av} size={48} ring="var(--bg-elev)" />
                <div>
                  <h3 className="text-[16px] font-medium tracking-[-0.018em]">{t}</h3>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-[var(--ink-3)] text-pretty">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. WHY PROMOTE TOINBOX ═══ */}
      <section className="pb-[80px] sm:pb-[112px]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-7">
          <SectionHead eyebrow="Why promote it" title="Worth recommending on its own." sub="The commission is the incentive. The product is the reason." />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
            {benefits.map(({ icon: I, t, d }) => (
              <div key={t} className="flex min-h-[216px] flex-col gap-3 bg-[var(--bg-elev)] p-8 transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--bg-elev)_70%,var(--bg-soft))]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[var(--accent-soft)] text-[var(--accent-ink)]"><I className="h-[20px] w-[20px]" /></div>
                <h3 className="mt-2 text-[17px] font-medium tracking-[-0.018em]">{t}</h3>
                <p className="text-[14.5px] leading-[1.6] text-[var(--ink-3)] text-pretty">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══ */}
      <section id="faq" className="scroll-mt-16 border-t border-[var(--line)] bg-[var(--bg-elev)] py-[80px] sm:py-[112px]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 sm:px-7 lg:grid-cols-[360px_1fr] lg:gap-20">
          <div>
            <SectionHead center={false} eyebrow="FAQ" title="Questions, answered." />
            {/* → affiliate support inbox */}
            <div className="mt-8 flex items-center gap-3 rounded-[16px] border border-[var(--line)] bg-[var(--bg)] p-4">
              <AvatarStack imgs={AVATARS.slice(5, 8)} size={32} ring="var(--bg)" />
              <p className="text-[13px] leading-[1.5] text-[var(--ink-3)]">Still unsure? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a> — a human replies.</p>
            </div>
          </div>
          <div className="border-t border-[var(--line)]">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-[var(--line)]">
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-6 py-6 text-left">
                    <span className={`text-[16.5px] font-medium leading-[1.4] tracking-[-0.015em] transition-colors ${isOpen ? 'text-[var(--ink)]' : 'text-[var(--ink-2)]'}`}>{f.q}</span>
                    <span className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--line-2)] text-[var(--ink-4)]'}`}>
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><g {...st} strokeWidth="2"><path d="M12 5v14M5 12h14" /></g></svg>
                    </span>
                  </button>
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}>
                    <div className="overflow-hidden"><p className="max-w-[620px] pb-7 pr-8 text-[15px] leading-[1.65] text-[var(--ink-3)] text-pretty">{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 7. FINAL CTA ═══ */}
      <section className="relative overflow-hidden border-t border-[var(--line)]">
        <div aria-hidden className="pointer-events-none absolute inset-x-[-10%] bottom-[-34%] h-[600px] blur-[24px]" style={{ background: 'radial-gradient(44% 55% at 50% 58%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)' }} />
        <div className="relative mx-auto max-w-[1240px] px-5 py-[96px] text-center sm:px-7 sm:py-[124px]">
          <div className="flex justify-center"><AvatarStack imgs={AVATARS.slice(0, 6)} size={44} /></div>
          <h2 className={`${hSection} mx-auto mt-8 max-w-[700px] text-pretty`}>Give your audience 10% off.<br className="hidden sm:block" /> Keep 25% of every sale.</h2>
          <p className={`${leadCls} mx-auto mt-5 max-w-[470px]`}>Free to join, no audience minimum, and your code is ready the moment you sign up.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Btn /><a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--bg-elev)] px-[20px] py-[12px] text-[14.5px] font-medium transition-colors hover:bg-[var(--bg-soft)]"><Ic.mail className="h-[15px] w-[15px]" /> Talk to us</a></div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-[var(--line)] bg-[var(--bg-elev)]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-5 py-8 text-[13px] text-[var(--ink-3)] sm:flex-row sm:px-7">
          <div className="flex items-center gap-2.5">
            <Logo size={20} />
            <span className="text-[var(--ink-2)]">ToInbox — Affiliate Program</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-[var(--ink)]">Program terms</a>
            <a href="/privacy" className="hover:text-[var(--ink)]">Privacy</a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-[var(--ink)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* expose for the standalone affiliates.html page */
if (typeof window !== 'undefined') window.AffiliatesPage = AffiliatesPage;
