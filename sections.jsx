// JobPilot — Benefits, Demo, Testimonials, Pricing, Final CTA
const { useEffect: useEffectS } = React;

function Benefits() {
  const items = [
    { ico: 'panel', t: 'Lives where you already are', s: "A Chrome extension that sits inside LinkedIn. No new app to learn, no second tab to keep open." },
    { ico: 'target', t: 'Skip Easy Apply queues', s: 'Your application reaches a human inbox, not the bottom of an ATS pile tagged "auto-reject".' },
    { ico: 'forward', t: 'Forwarded to hiring directly', s: 'Founders introduce strong candidates to their team. You start the process two steps ahead.' },
    { ico: 'sparkle', t: 'Tailored, never templated', s: 'Every email cites the job, the changelog, the founder. No mail-merge smell. No AI tells.' },
    { ico: 'bolt', t: 'Fifteen-second applications', s: 'Detect → enroll → send. You stay in flow on LinkedIn while JobPilot does the choreography.' },
    { ico: 'chart', t: 'Founders reply at multiples', s: 'Personal cold outreach beats Easy Apply on reply rate by a wide margin. The funnel just works.' },
  ];
  return (
    <section className="section" id="why">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Why this works</span>
          <h2 className="h-section">Stop getting ignored on LinkedIn.<br /><em>Start a founder conversation.</em></h2>
        </div>
        <div className="cards-grid">
          {items.map((b, i) => (
            <div className="bcard" key={i} data-reveal style={{ transitionDelay: (i * 60) + 'ms' }}>
              <div className="b-ico"><Icon name={b.ico} size={18} /></div>
              <h3>{b.t}</h3>
              <p>{b.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoShowcase() {
  return (
    <section className="section" id="product">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Inside the extension</span>
          <h2 className="h-section">A founder copilot pinned<br />to every LinkedIn tab.</h2>
          <p className="lead">Track every founder you've reached, the quality of each draft, and what's coming back.</p>
        </div>

        <div className="demo">
          <div className="demo-card" data-reveal>
            <h4>This week's outreach</h4>
            <div className="kpi-row">
              <div className="kpi"><div className="k">Founders reached</div><div className="v">14</div><div className="delta">+6 vs last week</div></div>
              <div className="kpi"><div className="k">Reply rate</div><div className="v">31%</div><div className="delta">+22pp vs Easy Apply</div></div>
              <div className="kpi"><div className="k">Forwards to HR</div><div className="v">5</div><div className="delta">straight to hiring</div></div>
            </div>
            <div className="applist">
              {[
                { co: 'N', bg: 'linear-gradient(135deg,#1b1b1b,#404040)', name: 'Northwind', role: 'Founding PE', state: 'replied' },
                { co: 'L', bg: 'linear-gradient(135deg,#5562eb,#3a1f9c)', name: 'Lumen', role: 'Founding Designer', state: 'fwd' },
                { co: 'R', bg: 'linear-gradient(135deg,#d8543e,#9c2a1c)', name: 'Reed Labs', role: 'Growth Engineer', state: 'sent' },
                { co: 'A', bg: 'linear-gradient(135deg,#3aa178,#1b6448)', name: 'Atlas Health', role: 'Backend Engineer', state: 'sent' },
                { co: 'P', bg: 'linear-gradient(135deg,#e1b14a,#a67919)', name: 'Plover', role: 'Product Manager', state: 'replied' },
              ].map((a, i) => (
                <div key={i} className="appline">
                  <div className="co" style={{ background: a.bg }}>{a.co}</div>
                  <div className="meta">
                    <div>{a.name}</div>
                    <div className="role">{a.role}</div>
                  </div>
                  <span className={`state ${a.state}`}>{a.state.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="demo-stack">
            <div className="demo-card" data-reveal>
              <h4>Founder profile</h4>
              <div className="founder-card" style={{ marginTop: 12 }}>
                <div className="avatar-bubble" style={{ background: 'linear-gradient(135deg, #f0a17a, #d8543e)' }}>M</div>
                <div>
                  <div className="name">Maya Okafor</div>
                  <div className="role">Co-founder & CEO · Northwind</div>
                </div>
                <span className="tag">HOT</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
                <div className="kpi" style={{ padding: 10 }}><div className="k">Last post</div><div className="v" style={{ fontSize: 16 }}>3d ago</div></div>
                <div className="kpi" style={{ padding: 10 }}><div className="k">Hiring signal</div><div className="v" style={{ fontSize: 16 }}>Strong</div></div>
              </div>
            </div>

            <div className="demo-card" data-reveal>
              <h4>Credits</h4>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontSize: 38, letterSpacing: '-0.03em', fontWeight: 500 }}>42</div>
                <div style={{ color: 'var(--ink-3)', fontSize: 13 }}>of 50 remaining</div>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: 'var(--bg-soft)', overflow: 'hidden', marginTop: 12 }}>
                <div style={{ height: '100%', width: '84%', background: 'linear-gradient(90deg, var(--accent), var(--accent-2, oklch(0.7 0.21 252)))' }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 12.5, color: 'var(--ink-3)' }}>1 credit = 1 personalized founder email + resume send.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const INBOX_THREADS = [
  {
    id: 0, avatar: 'M', bg: 'linear-gradient(135deg,#f0a17a,#d8543e)',
    name: 'Marcus Webb', role: 'Head of Engineering · Northwind',
    when: 'Mon 9:14 AM', unread: true,
    subj: 'Re: Founding PE · from a 0→1 builder',
    preview: 'This stood out from the 240+ applications we got…',
    tag: 'INTERVIEW →', tagColor: '#1a56db', tagBg: '#e8f0ff',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Mon 6:02 AM', dir: 'sent', body: `Hi Marcus,\n\nSaw Northwind's Founding PE role — your March changelog on shipping v3 in six weeks is exactly the pace I want.\n\nTwo years doing this: solo-shipped 3 products, grew last app 2k → 80k MAU. Full-stack across TS, Go, Postgres.\n\nResume attached. Happy to pair on a real bug.\n\n— Arjun` },
      { from: 'Marcus Webb', time: 'Mon 9:14 AM', dir: 'recv', body: `Arjun —\n\nThis stood out from the 240+ applications we got this week. The v3 reference — that tells me you actually read what we shipped.\n\nForwarding to Priya (Head of Eng). She'll set up a chat this week.\n\n— Marcus` },
    ],
  },
  {
    id: 1, avatar: 'D', bg: 'linear-gradient(135deg,#5562eb,#3a1f9c)',
    name: 'Devon Reilly', role: 'CEO · Plover',
    when: 'Tue 11:42 AM', unread: false,
    subj: 'Re: Head of Growth · loved what you\'ve built',
    preview: 'Most candidates send the same Notion template…',
    tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Tue 8:15 AM', dir: 'sent', body: `Hi Devon,\n\nLumen AI's approach to contextual retrieval caught my attention — especially the zero-shot work from your Feb post.\n\nI've grown products from 0 → 80k MAU in 18 months. Comfortable at the product × distribution intersection.\n\nWould love to talk about the Head of Growth role.\n\n— Arjun` },
      { from: 'Devon Reilly', time: 'Tue 11:42 AM', dir: 'recv', body: `Most candidates send the same Notion-template cover letter. Yours read like a real person — and you actually understood the brief.\n\nCan we schedule a quick chat this week? I'm open Thu/Fri afternoon.\n\n— Devon` },
    ],
  },
  {
    id: 2, avatar: 'S', bg: 'linear-gradient(135deg,#3aa178,#1b6448)',
    name: 'Sana Iyer', role: 'Co-founder · Reed Labs',
    when: 'Wed 2:08 PM', unread: false,
    subj: 'Re: Backend Engineer · saw the changelog',
    preview: 'The reference to our changelog gave it away…',
    tag: 'FORWARDED TO HR', tagColor: '#b45309', tagBg: '#fff0e0',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Wed 9:30 AM', dir: 'sent', body: `Hi Sana,\n\nReed Labs' distributed systems work stands out — I've been following the Raft consensus posts on your eng blog.\n\nI've shipped Go services at 10k+ RPS. Resume attached — happy to do a take-home or a system design session.\n\n— Arjun` },
      { from: 'Sana Iyer', time: 'Wed 2:08 PM', dir: 'recv', body: `The reference to our changelog gave it away — you actually read it. We don't see that often.\n\nForwarding this to our eng team. Calendar's open Thursday afternoon.\n\n— Sana` },
    ],
  },
  {
    id: 3, avatar: 'P', bg: 'linear-gradient(135deg,#5fb6c4,#1f6b78)',
    name: 'Priya Shah', role: 'CTO · Atlas Health',
    when: 'Thu 8:04 AM', unread: false,
    subj: 'Re: Backend Engineer — strong profile',
    preview: 'Strong signal. The way you framed the v3 migration…',
    tag: 'WORKING SESSION', tagColor: '#6d28d9', tagBg: '#ede9fe',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Wed 11:00 AM', dir: 'sent', body: `Hi Priya,\n\nAtlas Health's HIPAA-compliant data pipeline work resonated — especially the v3 migration case study.\n\nI've built production Go + Postgres services under strict compliance requirements. Happy to share specifics.\n\n— Arjun` },
      { from: 'Priya Shah', time: 'Thu 8:04 AM', dir: 'recv', body: `Strong signal. The way you framed the v3 migration tells me you'd ship from week one.\n\nLet's do a working session instead of a panel — I'll send a calendar invite today.\n\n— Priya` },
    ],
  },
  {
    id: 4, avatar: 'T', bg: 'linear-gradient(135deg,#e1b14a,#a67919)',
    name: 'Theo Marchetti', role: 'Founder · Lumen AI',
    when: 'Thu 3:51 PM', unread: false,
    subj: 'Re: Founding Designer — loved the specificity',
    preview: 'Most cold inbound goes straight to spam…',
    tag: 'FORWARDED TO HR', tagColor: '#b45309', tagBg: '#fff0e0',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Thu 10:00 AM', dir: 'sent', body: `Hi Theo,\n\nLumen AI's design direction — particularly the information density work in the dashboard — is exactly the kind of problem I want.\n\nI've shipped design systems at scale. Portfolio attached.\n\n— Arjun` },
      { from: 'Theo Marchetti', time: 'Thu 3:51 PM', dir: 'recv', body: `Most cold inbound goes straight to spam. Yours got through because it was specific and short.\n\nSending to our hiring lead now. Expect a note from her tomorrow.\n\n— Theo` },
    ],
  },
  {
    id: 5, avatar: 'J', bg: 'linear-gradient(135deg,#a07ad8,#5b34a1)',
    name: 'Jules Bennett', role: 'Founder · Cloudpack',
    when: 'Fri 10:50 AM', unread: false,
    subj: 'Re: One of the best applications we\'ve seen',
    preview: 'Direct, no fluff, no AI smell. Resume on point…',
    tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Fri 7:30 AM', dir: 'sent', body: `Hi Jules,\n\nCloudpack's edge caching architecture — the April teardown — showed exactly the kind of engineering I want to be close to.\n\nI've shipped infrastructure at scale (Go, k8s, Cloudflare Workers). Resume attached.\n\n— Arjun` },
      { from: 'Jules Bennett', time: 'Fri 10:50 AM', dir: 'recv', body: `Direct, no fluff, no AI smell. Resume on point.\n\nBooked you in with our CEO for next week — calendar invite incoming shortly.\n\n— Jules` },
    ],
  },
];

const STATS = [
  { k: 'Sent', v: 14, sub: 'this week', color: 'var(--ink-3)' },
  { k: 'Opened', v: 11, sub: '79% open rate', color: 'var(--accent)' },
  { k: 'Replied', v: 6, sub: '43% reply rate', color: '#0a8a4a' },
  { k: 'Interviews', v: 4, sub: 'scheduled', color: '#7c3aed' },
];

function Testimonials() {
  const { useState: useStateT, useEffect: useEffectT, useRef: useRefT } = React;
  const [activeThread, setActiveThread] = useStateT(0);
  const timerRef = useRefT(null);

  const activate = (i) => {
    setActiveThread(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveThread(t => (t + 1) % INBOX_THREADS.length);
    }, 4200);
  };

  useEffectT(() => {
    timerRef.current = setInterval(() => {
      setActiveThread(t => (t + 1) % INBOX_THREADS.length);
    }, 4200);
    return () => clearInterval(timerRef.current);
  }, []);

  const thread = INBOX_THREADS[activeThread];

  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Real founder replies</span>
          <h2 className="h-section">Founders reply to intent.<br /><em>Here's what that looks like.</em></h2>
          <p className="lead">These are the actual inboxes that fill up after using JobPilot. Personal outreach generates real conversations.</p>
        </div>

        {/* Stats bar */}
        <div className="inbox-stats-row" data-reveal>
          {STATS.map(({ k, v, sub, color }) => (
            <div key={k} className="inbox-stat-card">
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.04em', color, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{k}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Gmail inbox mock */}
        <div className="inbox-shell" data-reveal>
          {/* Left: thread list */}
          <div className="inbox-list">
            <div className="inbox-list-header">
              <span style={{ fontSize: 13, fontWeight: 600 }}>Inbox</span>
              <span className="inbox-badge">{INBOX_THREADS.filter(t => t.unread).length} new</span>
            </div>
            {INBOX_THREADS.map((t, i) => (
              <div
                key={t.id}
                className={`inbox-row${activeThread === i ? ' active' : ''}${t.unread ? ' unread' : ''}`}
                onClick={() => activate(i)}
              >
                <div className="inbox-row-av" style={{ background: t.bg }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="inbox-row-name">{t.name}</div>
                  <div className="inbox-row-subj">{t.subj}</div>
                  <div className="inbox-row-preview">{t.preview}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                  <span className="inbox-row-time">{t.when.split(' ')[0]}</span>
                  <span className="inbox-row-tag" style={{ background: t.tagBg, color: t.tagColor }}>{t.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: email view */}
          <div className="inbox-view">
            <div className="inbox-view-header">
              <h3 className="inbox-view-subj">{thread.subj}</h3>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span className="inbox-tag-pill" style={{ background: thread.tagBg, color: thread.tagColor }}>{thread.tag}</span>
                <span className="inbox-tag-pill" style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)' }}>via JobPilot</span>
              </div>
            </div>

            <div className="inbox-thread">
              {thread.thread.map((msg, i) => (
                <div key={i} className={`inbox-msg${msg.dir === 'recv' ? ' recv' : ' sent-msg'}`}>
                  <div className="inbox-msg-header">
                    <div className="inbox-msg-av" style={{ background: msg.dir === 'recv' ? thread.bg : 'linear-gradient(135deg,#6366f1,#4f46e5)' }}>
                      {msg.dir === 'recv' ? thread.avatar : 'A'}
                    </div>
                    <div>
                      <div className="inbox-msg-from">{msg.from}</div>
                      <div className="inbox-msg-time">{msg.time}</div>
                    </div>
                    {msg.dir === 'sent' && (
                      <span style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'var(--accent-soft)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>SENT VIA JOBPILOT</span>
                    )}
                  </div>
                  <div className="inbox-msg-body">{msg.body}</div>
                </div>
              ))}

              {/* Reply prompt */}
              <div className="inbox-reply-box">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>A</div>
                  <div style={{ flex: 1, height: 32, borderRadius: 6, border: '1px solid var(--line-2)', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12.5, color: 'var(--ink-4)' }}>
                    Reply to {thread.name}…
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow"><span className="dot" />Pricing</span>
          <h2 className="h-section">Pay only when you're applying.</h2>
          <p className="lead" style={{ textAlign: 'center' }}>No subscription. No expiring credits. Buy a pack, send when it counts.</p>
        </div>
        <div className="pricing-grid">
          <div className="price-card" data-reveal>
            <div>
              <div className="price-name">Free trial</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">₹</span>0</span>
              </div>
              <div className="price-sub">7 free credits to feel the difference.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>7 personalized founder sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>LinkedIn auto-detection</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Resume parsing & matching</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Reply tracking</div>
            </div>
            <a href="#" className="btn btn-outline" style={{ marginTop: 'auto' }}>Add to Chrome <Icon name="arrow" size={14} className="chev" /></a>
          </div>

          <div className="price-card featured" data-reveal style={{ transitionDelay: '90ms' }}>
            <div className="price-tag">BEST VALUE</div>
            <div>
              <div className="price-name">Starter pack</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">₹</span>499<span className="per">one-time</span></span>
              </div>
              <div className="price-sub">50 credits. About ₹10 per founder reach.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>50 personalized founder sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Cover letter + cold email pair</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Founder profile enrichment</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Reply, forward & interview tracking</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Credits never expire</div>
            </div>
            <a href="#" className="btn btn-accent" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Get the pack <Icon name="arrow" size={14} className="chev" /></a>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 13, marginTop: 24 }}>
          One Northwind reply pays for the entire pack ten times over.
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="final-cta" data-reveal>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}><span className="dot" />One last thing</span>
          <h2 className="h-section" style={{ marginTop: 18, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
            Your dream startup won't notice<br />another Easy Apply.
          </h2>
          <p className="lead">Turn LinkedIn applications into founder conversations. Send the email a founder will actually forward.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="btn btn-accent">Add JobPilot to Chrome <Icon name="arrow" size={14} className="chev" /></a>
            <a href="#how-section" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.8)' }}>See how it works</a>
          </div>
          <div style={{ marginTop: 20, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>NO CARD REQUIRED · 7 FREE CREDITS · WORKS ON LINKEDIN</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="brand"><span className="brand-mark" /> JobPilot</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-4)' }}>The Chrome extension for founder-first LinkedIn applications.</div>
          </div>
          <div className="foot-links">
            <a href="#why">Why</a>
            <a href="#how-section">How</a>
            <a href="#product">Product</a>
            <a href="#proof">Replies</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>© 2026 JobPilot · v0.4</div>
        </div>
      </div>
    </footer>
  );
}

function ProofBar() {
  const logos = [
    { l: 'Northwind', g: 'N' },
    { l: 'Plover', g: 'P' },
    { l: 'Lumen', g: 'L' },
    { l: 'Reed Labs', g: 'R' },
    { l: 'Atlas', g: 'A' },
    { l: 'Cloudpack', g: 'C' },
  ];
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof-inner">
          <span className="proof-label">Used by applicants targeting</span>
          {logos.map((x) => (
            <div className="proof-logo" key={x.l}><span className="glyph">{x.g}</span>{x.l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Benefits = Benefits;
window.DemoShowcase = DemoShowcase;
window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
window.ProofBar = ProofBar;
