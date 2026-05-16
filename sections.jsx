// JobPilot — Benefits, Demo, Testimonials, Pricing, Final CTA
const { useEffect: useEffectS } = React;

function Benefits() {
  const items = [
    { ico: 'panel', t: 'Lives where you already are', s: "A Chrome extension that sits inside LinkedIn. No new app to learn, no second tab to keep open." },
    { ico: 'target', t: 'Skip Easy Apply queues', s: 'Thousands apply through LinkedIn and go unseen. Reach founder\'s mail-box directly where your application gets noticed.' },
    { ico: 'forward', t: 'Forwarded to hiring directly', s: 'Founders often move such applications directly into interviews or forward them to HR. These applications carry an advantage and move quicker.' },
    { ico: 'sparkle', t: 'Tailored, never templated', s: 'Every application sent to a founder is unique and personalised based on job description and your resume.' },
    { ico: 'bolt', t: 'Fifteen-second applications', s: 'Detect → enroll → send. Personalized outreach creates stronger intent, and strong intent increases replies.' },
    { ico: 'chart', t: 'Founders reply at multiples', s: 'Founders value candidates who show genuine interest. Personalized outreach leads to more replies and interviews.' },
  ];
  return (
    <section className="section" id="why">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Why this works</span>
          <h2 className="h-section">Stop getting ignored on LinkedIn.<br /><em>Start getting interview calls.</em></h2>
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
  const DASH_APPS = [
    { logo: 'N', bg: '#1e3a5f',  co: 'Northwind',    role: 'Founding Product Engineer',  sent: 'Mon 6:02 AM',  opened: 'Mon 6:48 AM',  status: 'replied',   label: 'Replied ✓' },
    { logo: 'L', bg: '#3730a3',  co: 'Lumen AI',     role: 'Head of Growth',              sent: 'Mon 8:15 AM',  opened: 'Mon 9:00 AM',  status: 'interview', label: 'Interview Set' },
    { logo: 'R', bg: '#7c2d12',  co: 'Reed Labs',    role: 'Backend Engineer',            sent: 'Tue 9:30 AM',  opened: 'Tue 11:00 AM', status: 'fwd',       label: 'Fwd to HR' },
    { logo: 'P', bg: '#5b34a1',  co: 'Plover',       role: 'Product Manager',             sent: 'Tue 11:00 AM', opened: 'Tue 2:45 PM',  status: 'replied',   label: 'Replied ✓' },
    { logo: 'A', bg: '#1b6448',  co: 'Atlas Health', role: 'Full Stack Engineer',         sent: 'Wed 7:00 AM',  opened: 'Wed 10:00 AM', status: 'opened',    label: 'Opened' },
    { logo: 'C', bg: '#374151',  co: 'Cloudpack',    role: 'Infrastructure Engineer',     sent: 'Wed 9:15 AM',  opened: '—',            status: 'sent',      label: 'Sent' },
    { logo: 'V', bg: '#7c3aed',  co: 'Volta',        role: 'Founding Engineer',           sent: 'Thu 8:00 AM',  opened: '—',            status: 'sent',      label: 'Sent' },
    { logo: 'M', bg: '#b45309',  co: 'Meso',         role: 'Growth Engineer',             sent: 'Thu 10:30 AM', opened: '—',            status: 'sent',      label: 'Sent' },
  ];
  const REPLIES = [
    { avatar: 'M', bg: 'linear-gradient(135deg,#f0a17a,#d8543e)', name: 'Marcus Webb', co: 'Northwind', when: 'Tue 3:20 PM', tag: 'INTERVIEW', tagColor: '#1a56db', tagBg: '#e8f0ff', body: 'Stood out from 240+ applications. The v3 reference tells me you actually read what we shipped. Forwarding to Priya — she\'ll set up a chat this week.' },
    { avatar: 'D', bg: 'linear-gradient(135deg,#5562eb,#3a1f9c)', name: 'Devon Reilly', co: 'Plover',    when: 'Tue 11:42 AM', tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea', body: 'Most candidates send the same Notion template. Yours read like a real person. Can we schedule a quick chat — I\'m open Thu/Fri.' },
    { avatar: 'S', bg: 'linear-gradient(135deg,#3aa178,#1b6448)', name: 'Sana Iyer',   co: 'Reed Labs', when: 'Tue 2:08 PM',  tag: 'FWD TO HR',  tagColor: '#b45309', tagBg: '#fff0e0', body: 'The reference to our changelog gave it away — you actually read it. We don\'t see that often. Forwarding to our eng team. Calendar\'s open Thursday.' },
  ];
  const statusStyle = {
    replied:   { bg: '#e6f4ea', color: '#057642' },
    interview: { bg: '#e8f0ff', color: '#1a56db' },
    fwd:       { bg: '#fff0e0', color: '#b45309' },
    opened:    { bg: 'var(--accent-soft)', color: 'var(--accent-ink)' },
    sent:      { bg: '#f0ede8', color: '#666' },
  };

  return (
    <section className="section" id="product">
      <div style={{ maxWidth: 1560, margin: '0 auto', padding: '0 clamp(24px,5vw,72px)' }}>
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Inside the extension</span>
          <h2 className="h-section">Track every application, reply,<br />and interview — in one place.</h2>
          <p className="lead">Your complete outreach dashboard: who opened it, who replied, who's booking interviews — all live.</p>
        </div>

        {/* Full dashboard browser mock */}
        <div className="dash-browser" data-reveal>
          {/* Chrome bar */}
          <div className="dash-browser-chrome">
            <div style={{ display: 'flex', gap: 5 }}>
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff6058', display: 'inline-block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbe2e', display: 'inline-block' }} />
              <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c941', display: 'inline-block' }} />
            </div>
            <div style={{ flex: 1, height: 26, borderRadius: 7, background: 'var(--bg-elev)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 7, fontSize: 12, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>
              <Icon name="lock" size={11} /> app.jobpilot.co/dashboard
            </div>
          </div>

          {/* App body */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* Left nav */}
            <div style={{ width: 192, flexShrink: 0, background: '#111', display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginBottom: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>JobPilot</span>
              </div>
              {[
                { icon: '⊞', label: 'Dashboard', active: true },
                { icon: '↗', label: 'Applications', active: false },
                { icon: '✉', label: 'Emails', active: false },
                { icon: '⚙', label: 'Settings', active: false },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', borderRadius: 8, background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent', color: item.active ? 'white' : 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: item.active ? 600 : 400 }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>{item.label}
                </div>
              ))}
              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>A</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>Arjun Sharma</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>42 credits left</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--bg)' }}>
              {/* Header */}
              <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16, background: 'var(--bg-elev)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}>Dashboard</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-4)', marginTop: 2 }}>Week of May 12, 2026 · Arjun Sharma</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ fontSize: 12, padding: '6px 12px', borderRadius: 7, background: '#e6f4ea', color: '#057642', fontWeight: 600, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#057642', display: 'inline-block', animation: 'pulseGlow 2s ease infinite' }} /> Live
                  </div>
                  <div style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: 'var(--accent)', color: 'white', fontWeight: 600 }}>+ Enroll jobs</div>
                </div>
              </div>

              <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'hidden' }}>
                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                    { k: 'Enrolled',   v: 18, delta: '+8 this week',  color: 'var(--ink-2)' },
                    { k: 'Sent',       v: 14, delta: '78% send rate', color: 'var(--ink-2)' },
                    { k: 'Replied',    v: 6,  delta: '43% reply rate',color: '#057642' },
                    { k: 'Interviews', v: 4,  delta: '2 this week',   color: '#1a56db' },
                  ].map(({ k, v, delta, color }) => (
                    <div key={k} style={{ padding: '14px 16px', background: 'var(--bg-elev)', borderRadius: 12, border: '1px solid var(--line)', boxShadow: 'var(--shadow-1)' }}>
                      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.04em', color, lineHeight: 1 }}>{v}</div>
                      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--ink-2)', marginTop: 5 }}>{k}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--ink-4)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{delta}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, flex: 1, minHeight: 0 }}>
                  {/* App table */}
                  <div style={{ background: 'var(--bg-elev)', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Applications</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>8 total</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 100px 90px', gap: 8, padding: '8px 18px', borderBottom: '1px solid var(--line)', fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                      <div />
                      <div>Company / Role</div>
                      <div>Sent</div>
                      <div style={{ textAlign: 'right' }}>Status</div>
                    </div>
                    {DASH_APPS.map((a, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 100px 90px', gap: 8, padding: '9px 18px', borderBottom: i < DASH_APPS.length - 1 ? '1px solid var(--line)' : 'none', alignItems: 'center', background: i === 0 ? 'color-mix(in oklab, oklch(0.62 0.15 152) 6%, transparent)' : 'transparent' }}>
                        <div style={{ width: 22, height: 22, borderRadius: 5, background: a.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 700 }}>{a.logo}</div>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>{a.co}</div>
                          <div style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>{a.sent.split(' ')[0]}</div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 5, fontWeight: 600, fontFamily: 'var(--font-mono)', ...(statusStyle[a.status]) }}>{a.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply threads */}
                  <div style={{ background: 'var(--bg-elev)', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Founder Replies</div>
                      <div style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: '#e6f4ea', color: '#057642', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>6 new</div>
                    </div>
                    {REPLIES.map((r, i) => (
                      <div key={i} style={{ padding: '12px 18px', borderBottom: i < REPLIES.length - 1 ? '1px solid var(--line)' : 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{r.avatar}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.name} · {r.co}</div>
                            <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>{r.when}</div>
                          </div>
                          <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 5, fontWeight: 700, fontFamily: 'var(--font-mono)', background: r.tagBg, color: r.tagColor }}>{r.tag}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.55, paddingLeft: 40 }}>"{r.body}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
    when: 'Tue 3:20 PM', unread: true,
    subj: 'Re: Head of Growth · loved what you\'ve built',
    preview: 'This stood out from the 240+ applications we got…',
    tag: 'INTERVIEW →', tagColor: '#1a56db', tagBg: '#e8f0ff',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Mon 6:02 AM', dir: 'sent', body: `Hey Marcus,\n\nI'd like to apply for the Founding Product Engineer role at Northwind.\n\nI've built full-stack products end to end — TypeScript, Go, Postgres — and grown one from 2k to 80k MAU in 14 months. API design, zero-friction onboarding, and shipping fast are where I do my best work.\n\nAttaching my resume for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Marcus Webb', time: 'Tue 3:20 PM', dir: 'recv', body: `Arjun —\n\nThis stood out from the 240+ applications we got this week. The v3 reference — that tells me you actually read what we shipped.\n\nForwarding to Priya (Head of Eng). She'll set up a chat this week.\n\n— Marcus` },
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
      { from: 'Arjun (via JobPilot)', time: 'Tue 8:15 AM', dir: 'sent', body: `Hey Devon,\n\nI'd like to apply for the Head of Growth role at Plover.\n\nTook a B2B product from 0 to 80k MAU in 18 months — content, SEO, direct outreach, no paid spend. I work with eng to instrument the product for growth signals early. Growth strategy, content, and funnel analytics are my core strengths.\n\nAttaching my resume for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Devon Reilly', time: 'Tue 11:42 AM', dir: 'recv', body: `Most candidates send the same Notion template. Yours read like a real person.\n\nCan we schedule a quick chat — I'm open Thu/Fri.\n\n— Devon` },
    ],
  },
  {
    id: 2, avatar: 'S', bg: 'linear-gradient(135deg,#3aa178,#1b6448)',
    name: 'Sana Iyer', role: 'Co-founder · Reed Labs',
    when: 'Tue 2:08 PM', unread: false,
    subj: 'Re: Backend Engineer · saw the changelog',
    preview: 'The reference to our changelog gave it away…',
    tag: 'FORWARDED TO HR', tagColor: '#b45309', tagBg: '#fff0e0',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Wed 9:30 AM', dir: 'sent', body: `Hey Sana,\n\nI'd like to apply for the Backend Engineer role at Reed Labs.\n\nI've shipped Go services at 10k+ RPS in production — distributed state, cache invalidation, graceful degradation under partial failures. Systems that hold when things go wrong are what I care about most.\n\nAttaching my resume for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Sana Iyer', time: 'Tue 2:08 PM', dir: 'recv', body: `The reference to our changelog gave it away — you actually read it. We don't see that often.\n\nForwarding this to our eng team. Calendar's open Thursday afternoon.\n\n— Sana` },
    ],
  },
  {
    id: 3, avatar: 'T', bg: 'linear-gradient(135deg,#f472b6,#be185d)',
    name: 'Tanvi Mehta', role: 'Head of Marketing · Tempo',
    when: 'Wed 4:15 PM', unread: false,
    subj: 'Re: Marketing Lead — let\'s talk',
    preview: 'Short and specific — actually refreshing…',
    tag: 'CALL BOOKED', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Wed 9:00 AM', dir: 'sent', body: `Hey Tanvi,\n\nI'd like to apply for the Marketing Lead role at Tempo.\n\nI've run email campaigns, paid channels, and content that converts — grew a newsletter from 400 to 12k subscribers in 8 months. Revenue metrics, not vanity metrics, are what I optimize for.\n\nAttaching my resume for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Tanvi Mehta', time: 'Wed 4:15 PM', dir: 'recv', body: `Short and specific — actually refreshing.\n\nOur current marketing is all over the place. Would be good to talk. Free for a call Thursday?\n\n— Tanvi` },
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
      { from: 'Arjun (via JobPilot)', time: 'Thu 10:00 AM', dir: 'sent', body: `Hey Theo,\n\nI'd like to apply for the Founding Designer role at Lumen AI.\n\nI've shipped design systems across two B2B products, working directly with eng to keep components and tokens in sync. The density problem in AI interfaces is exactly the kind of hard design challenge I want to work on.\n\nAttaching my portfolio for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Theo Marchetti', time: 'Thu 3:51 PM', dir: 'recv', body: `Most cold inbound goes straight to spam. Yours got through because it was specific and short.\n\nSending to our hiring lead now. Expect a note from her tomorrow.\n\n— Theo` },
    ],
  },
  {
    id: 5, avatar: 'P', bg: 'linear-gradient(135deg,#a07ad8,#5b34a1)',
    name: 'Priya Shah', role: 'Founder · Cloudpack',
    when: 'Fri 10:50 AM', unread: false,
    subj: 'Re: One of the best applications we\'ve seen',
    preview: 'Direct, no fluff, no AI smell. Resume on point…',
    tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via JobPilot)', time: 'Fri 7:30 AM', dir: 'sent', body: `Hey Priya,\n\nI'd like to apply for the Infrastructure Engineer role at Cloudpack.\n\nI've shipped Go + Kubernetes infrastructure in production — I own what happens when things break, not just when they don't. On-call reliability, degraded modes, and systems at scale are my core strengths.\n\nAttaching my resume for your reference.\nLooking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Priya Shah', time: 'Fri 10:50 AM', dir: 'recv', body: `Direct, no fluff, no AI smell. Resume on point.\n\nBooked you in with our CEO for next week — calendar invite incoming shortly.\n\n— Priya` },
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
          <p className="lead">These are the actual mailboxes that fill up after using JobPilot. Personal outreach generates real conversations.</p>
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
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: t.unread ? 700 : 500, color: 'var(--ink)' }}>{t.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{t.when}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: t.unread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.subj}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.preview}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: thread view */}
          <div className="inbox-thread">
            <div className="inbox-thread-header">
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{thread.subj}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 5, fontWeight: 700, fontFamily: 'var(--font-mono)', background: thread.tagBg, color: thread.tagColor }}>{thread.tag}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>{thread.role}</span>
                </div>
              </div>
            </div>
            <div className="inbox-thread-body">
              {thread.thread.map((msg, i) => (
                <div key={i} className={`inbox-msg ${msg.dir}`}>
                  <div className="inbox-msg-meta">
                    <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{msg.from}</span>
                    <span style={{ color: '#000000', fontSize: 11, fontFamily: 'var(--font-mono)', marginLeft: 6, marginRight: 6 }}>{msg.time}</span>
                  </div>
                  <div className="inbox-msg-body">{msg.body}</div>
                </div>
              ))}
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
        <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="price-card" data-reveal>
            <div>
              <div className="price-name">Free Trial</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">₹</span>0</span>
              </div>
              <div className="price-sub">Limited credits. Try before you commit.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>5 personalized founder sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>LinkedIn auto-detection</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Basic resume matching</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Reply tracking</div>
            </div>
            <a href="#" className="btn btn-outline" style={{ marginTop: 'auto' }}>Add to Chrome <Icon name="arrow" size={14} className="chev" /></a>
          </div>

          <div className="price-card featured" data-reveal style={{ transitionDelay: '90ms' }}>
            <div className="price-tag">BEST VALUE</div>
            <div>
              <div className="price-name">Starter</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">₹</span>499<span className="per">one-time</span></span>
              </div>
              <div className="price-sub">100 credits. About ₹5 per founder reach.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>100 personalized founder sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Cover letter + cold email pair</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Founder profile enrichment</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Reply, forward & interview tracking</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Credits never expire</div>
            </div>
            <a href="#" className="btn btn-accent" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Get the pack <Icon name="arrow" size={14} className="chev" /></a>
          </div>

          <div className="price-card" data-reveal style={{ transitionDelay: '180ms' }}>
            <div>
              <div className="price-name">Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">₹</span>799<span className="per">one-time</span></span>
              </div>
              <div className="price-sub">200 credits. Best for serious job searches.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>200 personalized founder sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Priority email delivery</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Advanced match scoring</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Full dashboard analytics</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Credits never expire</div>
            </div>
            <a href="#" className="btn btn-primary" style={{ marginTop: 'auto' }}>Go Pro <Icon name="arrow" size={14} className="chev" /></a>
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
          <div style={{ marginTop: 20, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>NO CARD REQUIRED · 5 FREE CREDITS · WORKS ON LINKEDIN</div>
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

window.Benefits = Benefits;
window.DemoShowcase = DemoShowcase;
window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.FinalCTA = FinalCTA;
window.Footer = Footer;
