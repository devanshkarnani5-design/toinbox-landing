// ToInbox — Mobile Landing Page (isolated from the desktop build)
// Reuses: window.Icon and the same brand CSS variables from styles.css's
// :root. The hero and how-it-works sections use composed static visuals
// (not the live ProductDemo/HiwProductDemo demos) per the mobile design
// brief. Everything here is self-contained under mobile-landing.jsx/.css
// and never touches sections.jsx, how-it-works.jsx, product-demo*.jsx, or
// styles.css.
const { useState: useStateML, useEffect: useEffectML, useRef: useRefML } = React;

function useIsMobile(breakpoint = 430) {
  const [isMobile, setIsMobile] = useStateML(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffectML(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

function useReveal() {
  const ref = useRefML(null);
  const [inView, setInView] = useStateML(false);
  useEffectML(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setInView(true); }),
      { threshold: 0.15 }
    );
    io.observe(el);
    const fb = setTimeout(() => setInView(true), 1200);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  return [ref, inView];
}

function MLReveal({ children, style }) {
  const [ref, inView] = useReveal();
  return <div ref={ref} className={`ml-reveal ${inView ? 'ml-in' : ''}`} style={style}>{children}</div>;
}

// ---------- content (mirrors the real copy from sections.jsx / index.html) ----------

const ML_BENEFITS = [
  { ico: 'panel', t: 'Lives where you already are', s: "A Chrome extension that sits inside LinkedIn. No new app to learn, no second tab to keep open." },
  { ico: 'target', t: 'Skip Easy Apply queues', s: 'Reach the founder and department head directly, where your application actually gets noticed.' },
  { ico: 'forward', t: 'Forwarded to hiring directly', s: 'These applications carry an advantage — founders often move them straight to interviews.' },
  { ico: 'sparkle', t: 'Tailored, never templated', s: 'Every application is unique, personalised to the job description and your resume.' },
  { ico: 'bolt', t: 'Fifteen-second applications', s: 'Detect → enroll → send. Personalized outreach creates stronger intent.' },
  { ico: 'chart', t: 'Decision-makers reply at multiples', s: 'Personalized outreach leads to more replies and interviews than a portal application.' },
];

const ML_HIW_STEPS = [
  { t: 'Open a LinkedIn job', s: 'Browse LinkedIn as you normally would.' },
  { t: 'ToInbox detects it', s: 'The moment you open a job, ToInbox recognizes it automatically.' },
  { t: 'Finds the hiring managers', s: 'It identifies the real decision-makers behind the listing.' },
  { t: 'Drafts your application', s: 'A personalised application is written for this exact role.' },
  { t: 'You review it', s: 'See exactly who it goes to and what it says before anything sends.' },
  { t: 'Sent from your Gmail', s: 'Delivered straight to their inbox — not a portal.' },
];

const ML_STATS = [
  { k: 'Enrolled', v: 18, color: 'var(--ink-2)' },
  { k: 'Sent', v: 14, color: 'var(--ink-2)' },
  { k: 'Replied', v: 6, color: '#057642' },
  { k: 'Interviews', v: 4, color: '#1a56db' },
];
const ML_APPS = [
  { logo: 'N', bg: '#1e3a5f', co: 'Northwind', role: 'Founding Product Engineer', status: 'replied', label: 'Replied ✓' },
  { logo: 'L', bg: '#3730a3', co: 'Lumen AI', role: 'Head of Growth', status: 'interview', label: 'Interview Set' },
  { logo: 'R', bg: '#7c2d12', co: 'Reed Labs', role: 'Backend Engineer', status: 'fwd', label: 'Fwd to HR' },
  { logo: 'C', bg: '#374151', co: 'Cloudpack', role: 'Infrastructure Engineer', status: 'sent', label: 'Sent' },
];
const ML_STATUS_STYLE = {
  replied: { bg: '#e6f4ea', color: '#057642' },
  interview: { bg: '#e8f0ff', color: '#1a56db' },
  fwd: { bg: '#fff0e0', color: '#b45309' },
  sent: { bg: '#f0ede8', color: '#666' },
};

// ---------- nav ----------

function MLNav() {
  const [open, setOpen] = useStateML(false);
  const links = [
    { href: '#why', label: 'Why' },
    { href: '#how-section', label: 'How it works' },
    { href: '#product', label: 'Product' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/affiliates', label: 'Affiliates' },
  ];
  return (
    <>
      <nav className="ml-nav">
        <div className="ml-brand"><span className="ml-brand-mark" />ToInbox</div>
        <button className="ml-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>
      <div className={`ml-menu-overlay ${open ? 'ml-open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`ml-menu-sheet ${open ? 'ml-open' : ''}`}>
        <button className="ml-menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <Icon name="x" size={16} />
        </button>
        {links.map((l) => (
          <a key={l.label} href={l.href} className="ml-menu-link" onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="https://app.toinbox.app" className="ml-btn ml-btn-accent ml-menu-cta">
          Sign In <Icon name="arrow" size={14} />
        </a>
      </div>
    </>
  );
}

// ---------- hero ----------

function MLHeroVisual() {
  return (
    <div className="ml-hv">
      <div className="ml-hv-glow" />
      <div className="ml-hv-main">
        <div className="ml-hv-main-top">
          <span className="ml-hv-avatar">P</span>
          <div className="ml-hv-who">
            <div className="ml-hv-name">Priya Nair</div>
            <div className="ml-hv-role">Hiring Manager · Esper</div>
          </div>
          <span className="ml-hv-badge"><span className="ml-hv-dot" />Delivered</span>
        </div>
        <div className="ml-hv-main-body">
          <div className="ml-hv-line" style={{ width: '92%' }} />
          <div className="ml-hv-line" style={{ width: '78%' }} />
          <div className="ml-hv-line" style={{ width: '85%' }} />
          <div className="ml-hv-line" style={{ width: '60%' }} />
        </div>
        <div className="ml-hv-attach">
          <span className="ml-hv-pdf">PDF</span> Resume_Tailored.pdf
        </div>
      </div>
      <div className="ml-hv-float ml-hv-float-1">
        <div className="ml-hv-float-num">24</div>
        <div className="ml-hv-float-lbl">Enrolled</div>
      </div>
      <div className="ml-hv-float ml-hv-float-2">
        <span className="ml-hv-float-ico"><Icon name="mail" size={13} /></span>
        <div>
          <div className="ml-hv-float-title">New reply</div>
          <div className="ml-hv-float-sub">Interview requested</div>
        </div>
      </div>
    </div>
  );
}

function MLHero() {
  return (
    <section className="ml-section ml-hero">
      <MLReveal>
        <span className="ml-eyebrow"><span className="ml-dot" />Chrome extension · works inside LinkedIn</span>
        <h1 className="ml-h1">
          Tired of applying on LinkedIn? Send your application directly to leadership.
        </h1>
        <p className="ml-lead">
          ToInbox finds the key decision-makers behind any LinkedIn job and sends your personalised application straight to their inbox — get noticed, get replies.
        </p>
        <div className="ml-hero-cta">
          <a href="https://app.toinbox.app" className="ml-btn ml-btn-accent">Sign In <Icon name="arrow" size={16} /></a>
          <a href="#how-section" className="ml-btn ml-btn-ghost"><Icon name="play" size={13} /> How it works</a>
        </div>
      </MLReveal>
      <MLReveal style={{ transitionDelay: '120ms' }}>
        <MLHeroVisual />
      </MLReveal>
    </section>
  );
}

// ---------- benefits carousel ----------

function MLBenefits() {
  const scrollRef = useRefML(null);
  const [active, setActive] = useStateML(0);
  const onScroll = () => {
    const el = scrollRef.current; if (!el) return;
    const cardW = el.firstElementChild ? el.firstElementChild.getBoundingClientRect().width + 14 : 1;
    setActive(Math.round(el.scrollLeft / cardW));
  };
  return (
    <section className="ml-section" id="why">
      <MLReveal>
        <span className="ml-eyebrow"><span className="ml-dot" />Why this works</span>
        <h2 className="ml-h2">Stop getting ignored on LinkedIn. Start getting interview calls.</h2>
      </MLReveal>
      <div className="ml-bcarousel" ref={scrollRef} onScroll={onScroll}>
        {ML_BENEFITS.map((b, i) => (
          <div className="ml-bcard" key={i}>
            <div className="ml-bcard-ico"><Icon name={b.ico} size={19} /></div>
            <h3>{b.t}</h3>
            <p>{b.s}</p>
          </div>
        ))}
      </div>
      <div className="ml-bdots">
        {ML_BENEFITS.map((_, i) => <span key={i} className={`ml-bdot ${i === active ? 'ml-active' : ''}`} />)}
      </div>
    </section>
  );
}

// ---------- how it works (same self-contained jumpTo/tick pattern as the desktop file) ----------

function MLStepVisual({ step }) {
  // Step 0 — Open a LinkedIn job: real LinkedIn chrome, filters, and a
  // selected job card, so it reads instantly as "this is LinkedIn."
  if (step === 0) {
    return (
      <div className="ml-sv-frame ml-sv-tall">
        <div className="ml-sv-li-top">
          <span className="ml-sv-li-logo">in</span>
          <div className="ml-sv-li-search"><Icon name="search" size={10} />Program Manager</div>
        </div>
        <div className="ml-sv-li-chips">
          {['Jobs', 'Date posted', 'Remote'].map(c => <span key={c} className="ml-sv-li-chip">{c}</span>)}
        </div>
        <div className="ml-sv-li-card ml-sv-annotated">
          <span className="ml-sv-li-cardlogo">E</span>
          <div className="ml-sv-li-cardtext">
            <div className="ml-sv-li-cardtitle">Senior Program Manager</div>
            <div className="ml-sv-li-cardco">Esper · Bengaluru</div>
          </div>
          <span className="ml-sv-ring" />
        </div>
        <div className="ml-sv-li-card ml-sv-dim">
          <span className="ml-sv-li-cardlogo" style={{ background: '#7c2d12' }}>R</span>
          <div className="ml-sv-li-cardtext">
            <div className="ml-sv-li-cardtitle">Backend Engineer</div>
            <div className="ml-sv-li-cardco">Reed Labs · Remote</div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1 — ToInbox detects it: same page, ToInbox pin appears with a
  // pulse + a curved arrow connecting the job to the detection itself.
  if (step === 1) {
    return (
      <div className="ml-sv-frame ml-sv-tall" style={{ position: 'relative' }}>
        <div className="ml-sv-li-top">
          <span className="ml-sv-li-logo">in</span>
          <div className="ml-sv-li-search"><Icon name="search" size={10} />Program Manager</div>
        </div>
        <div className="ml-sv-li-card" style={{ margin: '10px 10px 0' }}>
          <span className="ml-sv-li-cardlogo">E</span>
          <div className="ml-sv-li-cardtext">
            <div className="ml-sv-li-cardtitle">Senior Program Manager</div>
            <div className="ml-sv-li-cardco">Esper · Bengaluru</div>
          </div>
        </div>
        <svg className="ml-sv-arrow" viewBox="0 0 240 70" fill="none">
          <path d="M60 14 C 120 14, 150 50, 195 52" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
          <path d="M187 46 L197 52 L189 60" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="ml-sv-pin-wrap">
          <span className="ml-sv-pin-pulse" />
          <div className="ml-sv-pin"><span className="ml-sv-pin-dot" />ToInbox</div>
        </div>
      </div>
    );
  }

  // Step 2 — Finds the hiring managers: the real panel chrome, with names
  // resolving one by one, checkmarks landing as they're found.
  if (step === 2) {
    return (
      <div className="ml-sv-frame ml-sv-tall">
        <div className="ml-sv-panel-head">
          <span className="ml-sv-panel-logo" />ToInbox
        </div>
        <div className="ml-sv-panel-job">
          <span className="ml-sv-li-cardlogo" style={{ width: 22, height: 22, fontSize: 10 }}>E</span>
          Senior Program Manager · Esper
        </div>
        <div className="ml-sv-find-list">
          <div className="ml-sv-find-row ml-sv-find-done">
            <span className="ml-sv-find-check"><Icon name="check" size={9} /></span>
            <div><div className="ml-sv-find-name">Priya Nair</div><div className="ml-sv-find-role">Hiring Manager</div></div>
          </div>
          <div className="ml-sv-find-row ml-sv-find-done">
            <span className="ml-sv-find-check"><Icon name="check" size={9} /></span>
            <div><div className="ml-sv-find-name">Arjun Mehta</div><div className="ml-sv-find-role">Head of Technology</div></div>
          </div>
          <div className="ml-sv-find-row">
            <span className="ml-sv-find-spin" />
            <div><div className="ml-sv-find-name ml-sv-dimtext">Searching more contacts…</div></div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3 — Drafts your application: AI-personalized email being written,
  // referencing the actual role, with a visible "typing" line.
  if (step === 3) {
    return (
      <div className="ml-sv-frame ml-sv-tall">
        <div className="ml-sv-panel-head">
          <span className="ml-sv-panel-logo" />ToInbox
          <span className="ml-sv-ai-badge"><Icon name="sparkle" size={9} /> AI</span>
        </div>
        <div className="ml-sv-draft">
          <div className="ml-sv-draft-to">To: Priya Nair, Arjun Mehta</div>
          <div className="ml-sv-draft-subj">Application for Senior Program Manager</div>
          <div className="ml-sv-draft-line" style={{ width: '94%' }} />
          <div className="ml-sv-draft-line" style={{ width: '88%' }} />
          <div className="ml-sv-draft-line ml-sv-typing" style={{ width: '52%' }} />
        </div>
        <div className="ml-sv-personalizing">Personalizing for Esper's job description…</div>
      </div>
    );
  }

  // Step 4 — You review it: the complete drafted card, highlighted with a
  // review ring so it's clear nothing sends without this step.
  if (step === 4) {
    return (
      <div className="ml-sv-frame ml-sv-tall">
        <div className="ml-sv-review ml-sv-annotated">
          <div className="ml-sv-review-row">
            <span className="ml-sv-avatar-sm ml-sv-avatar-xs" style={{ background: '#6d54c7' }}>P</span>
            <span className="ml-sv-avatar-sm ml-sv-avatar-xs ml-sv-avatar-sm2" style={{ background: '#374151' }}>A</span>
            <span className="ml-sv-review-names">Priya Nair, Arjun Mehta</span>
          </div>
          <div className="ml-sv-draft-subj" style={{ marginTop: 8 }}>Application for Senior Program Manager</div>
          <div className="ml-sv-draft-line" style={{ width: '90%' }} />
          <div className="ml-sv-draft-line" style={{ width: '70%' }} />
          <div className="ml-sv-review-attach"><span className="ml-hv-pdf">PDF</span> Resume_Tailored.pdf</div>
          <span className="ml-sv-eye-badge"><Icon name="eye" size={11} /></span>
        </div>
      </div>
    );
  }

  // Step 5 — Sent from your Gmail: delivered confirmation, both recipients
  // checked off.
  return (
    <div className="ml-sv-frame ml-sv-tall ml-sv-center">
      <div className="ml-sv-sent-check"><Icon name="check" size={18} /></div>
      <div className="ml-sv-sent-title">Delivered</div>
      <div className="ml-sv-sent-row"><span className="ml-sv-avatar-sm ml-sv-avatar-xs" style={{ background: '#6d54c7' }}>P</span>Priya Nair<Icon name="check" size={11} className="ml-sv-sent-tick" /></div>
      <div className="ml-sv-sent-row"><span className="ml-sv-avatar-sm ml-sv-avatar-xs" style={{ background: '#374151' }}>A</span>Arjun Mehta<Icon name="check" size={11} className="ml-sv-sent-tick" /></div>
      <div className="ml-sv-sent-gmail">Sent from your Gmail</div>
    </div>
  );
}

function MLHowItWorks() {
  const scrollRef = useRefML(null);
  const [active, setActive] = useStateML(0);
  const onScroll = () => {
    const el = scrollRef.current; if (!el) return;
    const cardW = el.firstElementChild ? el.firstElementChild.getBoundingClientRect().width + 14 : 1;
    setActive(Math.round(el.scrollLeft / cardW));
  };
  return (
    <section className="ml-section" id="how-section">
      <MLReveal>
        <span className="ml-eyebrow"><span className="ml-dot" />How it works</span>
        <h2 className="ml-h2">From LinkedIn tab to the right inbox in fifteen seconds.</h2>
      </MLReveal>
      <MLReveal style={{ transitionDelay: '100ms' }}>
        <div className="ml-hiw-carousel" ref={scrollRef} onScroll={onScroll}>
          {ML_HIW_STEPS.map((st, i) => (
            <div className="ml-sv-card" key={i}>
              <MLStepVisual step={i} />
              <div className="ml-sv-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{st.t}</h3>
              <p>{st.s}</p>
            </div>
          ))}
        </div>
        <div className="ml-bdots">
          {ML_HIW_STEPS.map((_, i) => <span key={i} className={`ml-bdot ${i === active ? 'ml-active' : ''}`} />)}
        </div>
      </MLReveal>
    </section>
  );
}

// ---------- product showcase (native mobile cards) ----------

function MLProduct() {
  return (
    <section className="ml-section" id="product">
      <MLReveal>
        <span className="ml-eyebrow"><span className="ml-dot" />Inside the extension</span>
        <h2 className="ml-h2">Track every application, reply, and interview.</h2>
        <p className="ml-lead">Your complete outreach dashboard — who opened it, who replied, who's booking interviews.</p>
      </MLReveal>
      <MLReveal style={{ transitionDelay: '80ms' }}>
        <div className="ml-stat-grid">
          {ML_STATS.map((s) => (
            <div className="ml-stat-card" key={s.k}>
              <div className="ml-stat-num" style={{ color: s.color }}>{s.v}</div>
              <div className="ml-stat-lbl">{s.k}</div>
            </div>
          ))}
        </div>
        <div className="ml-app-list">
          {ML_APPS.map((a, i) => (
            <div className="ml-app-row" key={i}>
              <div className="ml-app-logo" style={{ background: a.bg }}>{a.logo}</div>
              <div className="ml-app-info">
                <div className="ml-app-co">{a.co}</div>
                <div className="ml-app-role">{a.role}</div>
              </div>
              <span className="ml-app-status" style={ML_STATUS_STYLE[a.status]}>{a.label}</span>
            </div>
          ))}
        </div>
      </MLReveal>
    </section>
  );
}

// ---------- pricing (featured plan first) ----------

function MLPricing() {
  return (
    <section className="ml-section" id="pricing">
      <MLReveal>
        <span className="ml-eyebrow"><span className="ml-dot" />Pricing</span>
        <h2 className="ml-h2">Simple monthly plans, built for active job hunts.</h2>
        <p className="ml-lead">Pick a plan that fits your search. Cancel anytime.</p>
      </MLReveal>
      <div className="ml-price-stack">
        <MLReveal style={{ transitionDelay: '60ms' }}>
          <div className="ml-price-card ml-featured">
            <div className="ml-price-tag">BEST VALUE</div>
            <div>
              <div className="ml-price-name">Starter</div>
              <div className="ml-price-amt"><span className="ml-currency">₹</span>499<span className="ml-per">/month</span></div>
            </div>
            <div className="ml-price-feats">
              {['100 personalized sends', 'Auto follow-up in 40 hrs', 'Cover letter + cold email pair', 'Dashboard + Analytics'].map((f) => (
                <div className="ml-price-feat" key={f}><span className="ml-price-check"><Icon name="check" size={10} /></span>{f}</div>
              ))}
            </div>
            <a href="https://app.toinbox.app" className="ml-btn ml-btn-accent">Sign In <Icon name="arrow" size={14} /></a>
          </div>
        </MLReveal>
        <MLReveal style={{ transitionDelay: '120ms' }}>
          <div className="ml-price-card">
            <div>
              <div className="ml-price-name">Pro</div>
              <div className="ml-price-amt"><span className="ml-currency">₹</span>799<span className="ml-per">/month</span></div>
              <div className="ml-price-sub">Best for active job searches.</div>
            </div>
            <div className="ml-price-feats">
              {['200 personalized sends', 'Cheaper per send', 'Everything in Starter included'].map((f) => (
                <div className="ml-price-feat" key={f}><span className="ml-price-check"><Icon name="check" size={10} /></span>{f}</div>
              ))}
            </div>
            <a href="https://app.toinbox.app" className="ml-btn ml-btn-primary">Sign In <Icon name="arrow" size={14} /></a>
          </div>
        </MLReveal>
        <MLReveal style={{ transitionDelay: '180ms' }}>
          <div className="ml-price-card">
            <div>
              <div className="ml-price-name">Free Trial</div>
              <div className="ml-price-amt"><span className="ml-currency">₹</span>0</div>
              <div className="ml-price-sub">Try before you commit.</div>
            </div>
            <div className="ml-price-feats">
              {['10 personalized sends', 'Auto follow-up in 40 hrs', 'Cover letter + cold email pair', 'Dashboard + Analytics'].map((f) => (
                <div className="ml-price-feat" key={f}><span className="ml-price-check"><Icon name="check" size={10} /></span>{f}</div>
              ))}
            </div>
            <a href="https://app.toinbox.app" className="ml-btn ml-btn-ghost">Sign In <Icon name="arrow" size={14} /></a>
          </div>
        </MLReveal>
      </div>
    </section>
  );
}

// ---------- final CTA ----------

function MLFinalCTA() {
  return (
    <section className="ml-section">
      <MLReveal>
        <div className="ml-final">
          <span className="ml-eyebrow" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}>
            <span className="ml-dot" />One last thing
          </span>
          <h2 className="ml-h2">Your dream startup won't notice another Easy Apply.</h2>
          <p className="ml-lead">Turn LinkedIn applications into real conversations — the email a founder will actually forward.</p>
          <div className="ml-hero-cta">
            <a href="https://app.toinbox.app" className="ml-btn ml-btn-accent">Sign In <Icon name="arrow" size={15} /></a>
            <a href="#how-section" className="ml-btn ml-btn-ghost" style={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' }}>See how it works</a>
          </div>
          <div className="ml-final-note">NO CARD REQUIRED · 5 FREE CREDITS · WORKS ON LINKEDIN</div>
        </div>
      </MLReveal>
    </section>
  );
}

// ---------- footer ----------

function MLFooter() {
  const links = [
    { href: '#why', label: 'Why' }, { href: '#how-section', label: 'How' },
    { href: '#product', label: 'Product' }, { href: '#pricing', label: 'Pricing' },
    { href: '/privacy.html', label: 'Privacy' }, { href: '/terms.html', label: 'Terms' },
  ];
  return (
    <footer className="ml-foot">
      <div className="ml-brand"><span className="ml-brand-mark" />ToInbox</div>
      <div className="ml-foot-desc">The Chrome extension for decision-maker-first LinkedIn applications.</div>
      <div className="ml-foot-links">
        {links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
      </div>
      <div className="ml-foot-copy">© 2026 ToInbox · v0.4</div>
    </footer>
  );
}

// ---------- root ----------

function MobileLanding() {
  return (
    <div className="ml-root">
      <MLNav />
      <MLHero />
      <MLBenefits />
      <MLHowItWorks />
      <MLProduct />
      <MLPricing />
      <MLFinalCTA />
      <MLFooter />
    </div>
  );
}

window.MobileLanding = MobileLanding;
window.useIsMobile = useIsMobile;
