// ToInbox — Benefits, Demo, Testimonials, Pricing, Final CTA
const { useEffect: useEffectS } = React;

function Benefits() {
  const items = [
    { ico: 'panel', t: 'Lives where you already are', s: "A Chrome extension that sits inside LinkedIn. No new app to learn, no second tab to keep open." },
    { ico: 'target', t: 'Skip Easy Apply queues', s: 'Thousands apply through LinkedIn and go unseen. Reach the relevant department head & recruiter directly, where your application gets noticed.' },
    { ico: 'forward', t: 'Forwarded to hiring directly', s: 'Leadership often move such applications straight to interviews or forward them to HR. These applications carry an advantage and move quicker.' },
    { ico: 'sparkle', t: 'Tailored, never templated', s: 'Every application — to a relevant department head and a recruiter — is unique and personalised based on job description and your resume.' },
    { ico: 'bolt', t: 'Fifteen-second applications', s: 'Detect → enroll → send. Personalized outreach creates stronger intent, and strong intent increases replies.' },
    { ico: 'chart', t: 'Decision-makers reply at multiples', s: 'Hiring Manager value candidates who show genuine interest. Personalized outreach leads to more replies and interviews.' },
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
              <Icon name="lock" size={11} /> app.toinbox.co/dashboard
            </div>
          </div>

          {/* App body */}
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            {/* Left nav */}
            <div style={{ width: 192, flexShrink: 0, background: '#111', display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginBottom: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>ToInbox</span>
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
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>Replies that matter</div>
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
    email: 'marcus@northwindai.com',
    when: 'Tue 3:20 PM', unread: true,
    subj: 'Re: Founding Product Eng — loved what you\'ve built',
    preview: 'This stood out from the 240+ applications we got…',
    tag: 'INTERVIEW →', tagColor: '#1a56db', tagBg: '#e8f0ff',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Mon 6:02 AM', dir: 'sent', attachment: 'resume_arjun.pdf', body: `Hey Marcus,\n\nI came across the Founding Product Engineer opening at Northwind and wanted to reach out directly — felt like the right move rather than applying through a portal.\n\nI've been building products from scratch for about three years now, mostly using TypeScript, Go, and Postgres. I joined a startup as the third engineer, and by the time I left, the product had grown from 2,000 to 80,000 monthly users. I handled everything from the database design to user-facing features to being the person who got paged at 2 AM when something broke — and fixed it.\n\nI've learned that the early decisions on a product are the ones that come back to haunt you. I try really hard to get those right — not over-engineer, but not cut corners that cost more to fix six months later either.\n\nI also noticed you just shipped v3 — the new dashboard flow is genuinely impressive. You can tell a lot of thought went into how users actually move through the product.\n\nMy resume is attached. Would love to connect if this sounds like a fit.\n\nBest,\nArjun` },
      { from: 'Marcus Webb', time: 'Tue 3:20 PM', dir: 'recv', body: `Arjun —\n\nThis stood out from the 240+ applications we got this week. The v3 reference — that tells me you actually read what we shipped.\n\nForwarding to Priya (Head of Eng). She'll set up a chat this week.\n\n— Marcus` },
    ],
  },
  {
    id: 1, avatar: 'D', bg: 'linear-gradient(135deg,#5562eb,#3a1f9c)',
    name: 'Devon Reilly', role: 'CEO · Plover',
    email: 'devon@plover.io',
    when: 'Tue 11:42 AM', unread: false,
    subj: 'Re: Head of Growth — your approach stood out',
    preview: 'Most candidates send the same Notion template…',
    tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Tue 8:15 AM', dir: 'sent', attachment: 'resume_arjun.pdf', body: `Hey Devon,\n\nI saw the Head of Growth opening at Plover and wanted to reach out personally instead of applying through a form — this role felt too relevant to let it get lost in a queue.\n\nI've spent the last few years doing growth at early-stage B2B startups where budgets were tight and results had to be real. My biggest result: I took a product from zero to 80,000 monthly active users in 18 months — entirely through content, SEO, and direct outreach, no paid ads. I also worked closely with engineering to build growth signals into the product early, so we always knew what was actually working.\n\nWhat I care most about is growth you can explain to someone who looks at revenue, not just at charts. I like building systems that keep working even after I've moved on to the next problem.\n\nI also had a look at how Plover currently talks to its users and I think there's a real opportunity you're not fully going after yet — happy to share my thinking on a call.\n\nResume attached. Looking forward to hearing from you.\n\nBest,\nArjun` },
      { from: 'Devon Reilly', time: 'Tue 11:42 AM', dir: 'recv', body: `Most candidates send the same Notion template. Yours read like a real person.\n\nCan we schedule a quick chat — I'm open Thu/Fri.\n\n— Devon` },
    ],
  },
  {
    id: 2, avatar: 'S', bg: 'linear-gradient(135deg,#3aa178,#1b6448)',
    name: 'Sana Iyer', role: 'Co-founder · Reed Labs',
    email: 'sana@reedlabs.co',
    when: 'Tue 2:08 PM', unread: false,
    subj: 'Re: Backend Engineer · saw the changelog',
    preview: 'The reference to our changelog gave it away…',
    tag: 'FORWARDED TO HR', tagColor: '#b45309', tagBg: '#fff0e0',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Wed 9:30 AM', dir: 'sent', attachment: 'resume_arjun.pdf', body: `Hey Sana,\n\nI spotted the Backend Engineer opening at Reed Labs and wanted to apply directly — the kind of infrastructure problems you're solving are exactly what I want to be spending my time on.\n\nI've been building Go services in production for the past few years, mostly in environments where downtime actually costs money. At one point I was running services handling over 10,000 requests per second, and I had to design the system to fall back gracefully when parts of it failed — instead of everything going down at once. That kind of reliability engineering is where I feel most at home.\n\nI also went through your recent changelog — the way you're approaching the caching layer is really thoughtful. It tells me this is a team that cares about getting the internals right, not just shipping features on top of something fragile.\n\nI don't enjoy writing code that only works when everything is perfect. I want to own the 3 AM pages too — and make sure they stop happening.\n\nMy resume is attached. Would love to chat if this sounds like a match.\n\nBest,\nArjun` },
      { from: 'Sana Iyer', time: 'Tue 2:08 PM', dir: 'recv', body: `The reference to our changelog gave it away — you actually read it. We don't see that often.\n\nForwarding this to our eng team. Calendar's open Thursday afternoon.\n\n— Sana` },
    ],
  },
  {
    id: 3, avatar: 'T', bg: 'linear-gradient(135deg,#f472b6,#be185d)',
    name: 'Tanvi Mehta', role: 'Head of Marketing · Tempo',
    email: 'tanvi@tempo.app',
    when: 'Wed 4:15 PM', unread: false,
    subj: 'Re: Marketing Lead — let\'s talk',
    preview: 'Short and specific — actually refreshing…',
    tag: 'CALL BOOKED', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Wed 9:00 AM', dir: 'sent', attachment: 'resume_arjun.pdf', body: `Hey Tanvi,\n\nI came across the Marketing Lead opening at Tempo and wanted to reach out directly — the way you're positioning the product caught my attention, and I think I can help push it further.\n\nI've spent the last few years running marketing end-to-end for early-stage startups — email, paid channels, content, and everything in between. My most concrete result: I grew a newsletter from 400 to 12,000 subscribers in eight months, which turned into a real customer acquisition channel that cost almost nothing compared to running ads.\n\nWhat makes me a bit different from most marketing hires is that I don't separate strategy from execution. I'll build the campaign, write the copy, track the numbers, and keep adjusting until it's actually working. I don't hand things off and wait — I stay in it.\n\nI had a look at how Tempo currently talks to users across different channels, and I think there are a few places where the message isn't landing as strongly as it could. I'd love to share some specific ideas on a call.\n\nMy resume is attached.\n\nBest,\nArjun` },
      { from: 'Tanvi Mehta', time: 'Wed 4:15 PM', dir: 'recv', body: `Short and specific — actually refreshing.\n\nOur current marketing is all over the place. Would be good to talk. Free for a call Thursday?\n\n— Tanvi` },
    ],
  },
  {
    id: 4, avatar: 'T', bg: 'linear-gradient(135deg,#e1b14a,#a67919)',
    name: 'Theo Marchetti', role: 'Founder · Lumen AI',
    email: 'theo@lumenai.com',
    when: 'Thu 3:51 PM', unread: false,
    subj: 'Re: Founding Designer — loved the specificity',
    preview: 'Most cold inbound goes straight to spam…',
    tag: 'FORWARDED TO HR', tagColor: '#b45309', tagBg: '#fff0e0',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Thu 10:00 AM', dir: 'sent', attachment: 'portfolio_arjun.pdf', body: `Hey Theo,\n\nI saw the Founding Designer opening at Lumen AI and wanted to reach out personally — this one matched closely enough with what I actually want to work on that I didn't want it to disappear into a portal.\n\nI've spent the last few years designing for B2B products, building design systems and working side by side with engineers so that what gets built actually matches what was designed. The part I care most about is the handoff — keeping components and tokens in sync so the product doesn't quietly drift away from the designs over time.\n\nWhat drew me specifically to Lumen AI is the density problem in AI interfaces. Most AI tools look like they were designed for a feature list, not for a real person using it every day at a desk. Getting that right is genuinely hard, and it's exactly the kind of problem I want to be solving.\n\nI've also worked at a founding stage before, so I understand what it means to make design decisions fast — ship something, get it in front of real users, and iterate without losing the thread.\n\nMy portfolio and resume are attached. Would love to connect.\n\nBest,\nArjun` },
      { from: 'Theo Marchetti', time: 'Thu 3:51 PM', dir: 'recv', body: `Most cold inbound goes straight to spam. Yours got through because it was specific and short.\n\nSending to our hiring lead now. Expect a note from her tomorrow.\n\n— Theo` },
    ],
  },
  {
    id: 5, avatar: 'P', bg: 'linear-gradient(135deg,#a07ad8,#5b34a1)',
    name: 'Priya Shah', role: 'Head of Product · Cloudpack',
    email: 'priya@cloudpack.io',
    when: 'Fri 10:50 AM', unread: false,
    subj: 'Re: One of the best applications we\'ve seen',
    preview: 'Direct, no fluff, no AI smell. Resume on point…',
    tag: 'INTERVIEW SET', tagColor: '#057642', tagBg: '#e6f4ea',
    thread: [
      { from: 'Arjun (via ToInbox)', time: 'Fri 7:30 AM', dir: 'sent', attachment: 'resume_arjun.pdf', body: `Hey Priya,\n\nI came across the Infrastructure Engineer role at Cloudpack and wanted to apply directly — cloud infrastructure at scale is the work I've been doing for the past few years and it's what I genuinely want to keep doing.\n\nMy background is mostly Go and Kubernetes in production environments where the stakes are real. I've been on call when services go down at 3 AM and someone has to figure out why, fast — I've been that person more than once. I design systems with the assumption that things will break, not the hope that they won't. That mindset changes a lot of early decisions.\n\nThe project I'm most proud of: I led a reliability overhaul that cut incident response time by over 60%. No new features, no product announcements — just better alerting, cleaner runbooks, and smarter degraded-mode handling. It made the team's lives significantly better.\n\nI've looked at how Cloudpack handles multi-region failover and I have some specific thoughts on where the gaps might be. Happy to share on a call.\n\nMy resume is attached. Looking forward to hearing from you.\n\nBest,\nArjun` },
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
          <span className="eyebrow"><span className="dot" />Real replies from department heads & recruiters</span>
          <h2 className="h-section">The people who decide reply to intent.<br /><em>Here's what that looks like.</em></h2>
          <p className="lead">These are the actual mailboxes that fill up after using ToInbox. Personal outreach generates real conversations.</p>
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

        {/* Real inbox label */}
        <div style={{ textAlign: 'center' }} data-reveal>
          <span className="inbox-real-label">Real Inbox Replies — Founders Real Founder Inbox Replies Hiring Leads</span>
        </div>

        {/* Gmail inbox mock */}
        <div className="inbox-shell" data-reveal>

          {/* Gmail top bar */}
          <div className="gmail-topbar">
            <div className="gmail-topbar-brand">
              <div className="gmail-m-logo">M</div>
              <span className="gmail-brand-name">mail</span>
            </div>
            <div className="gmail-search-bar">
              <Icon name="search" size={14} />
              <span>Search mail</span>
            </div>
            <div className="gmail-topbar-actions">
              <div className="gmail-icon-btn" title="Settings">⚙</div>
              <div className="gmail-icon-btn" title="Apps">⊞</div>
            </div>
          </div>

          {/* 2-column body */}
          <div className="inbox-shell-body">

            {/* Left: sidebar nav + thread list */}
            <div className="inbox-list">
              <div className="gmail-compose-btn">
                <span className="gmail-compose-plus">+</span>
                <span>Compose</span>
              </div>
              <nav className="gmail-nav">
                <div className="gmail-nav-item active">
                  <Icon name="inbox" size={15} />
                  <span>Inbox</span>
                  <span className="gmail-nav-count">{INBOX_THREADS.filter(t => t.unread).length}</span>
                </div>
                <div className="gmail-nav-item">
                  <Icon name="star" size={15} />
                  <span>Starred</span>
                </div>
                <div className="gmail-nav-item">
                  <Icon name="forward" size={15} />
                  <span>Sent</span>
                </div>
                <div className="gmail-nav-item">
                  <Icon name="file" size={15} />
                  <span>Drafts</span>
                </div>
              </nav>
              <div className="gmail-nav-divider" />

              {/* Email rows */}
              {INBOX_THREADS.map((t, i) => (
                <div
                  key={t.id}
                  className={`inbox-row${activeThread === i ? ' active' : ''}${t.unread ? ' unread' : ''}`}
                  onClick={() => activate(i)}
                >
                  {t.unread && <div className="inbox-unread-dot" />}
                  <div className="inbox-row-av" style={{ background: t.bg }}>{t.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                      <span className="inbox-row-name" style={{ fontWeight: t.unread ? 700 : 500 }}>{t.name}</span>
                      <span className="inbox-row-time">{t.when}</span>
                    </div>
                    <div className="inbox-row-subj" style={{ fontWeight: t.unread ? 600 : 400 }}>{t.subj}</div>
                    <div className="inbox-row-preview">{t.preview}</div>
                  </div>
                  <div className="inbox-row-tag" style={{ background: t.tagBg, color: t.tagColor }}>{t.tag}</div>
                </div>
              ))}
            </div>

            {/* Right: thread view */}
            <div className="inbox-thread">
              <div className="inbox-thread-header">
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{thread.subj}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 5, fontWeight: 700, fontFamily: 'var(--font-mono)', background: thread.tagBg, color: thread.tagColor }}>{thread.tag}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>{thread.role}</span>
                </div>
              </div>
              <div className="inbox-thread-body">
                {thread.thread.map((msg, i) => (
                  <div key={i} className={`inbox-msg ${msg.dir}`}>
                    <div className="inbox-email-hdr">
                      <div className="inbox-email-av" style={{ background: msg.dir === 'sent' ? 'var(--accent)' : thread.bg }}>
                        {msg.dir === 'sent' ? 'A' : thread.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>{msg.from}</span>
                          <span style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>
                            {msg.dir === 'sent' ? '<arjun@gmail.com>' : `<${thread.email}>`}
                          </span>
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 1 }}>
                          to {msg.dir === 'sent' ? thread.name : 'me'}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>{msg.time}</div>
                    </div>
                    <div className="inbox-msg-body">{msg.body}</div>
                    {msg.attachment && (
                      <div className="inbox-attachment-chip">
                        <Icon name="paperclip" size={12} />
                        <span>{msg.attachment}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  // Auto-detect region for currency. India -> INR (Razorpay), else USD (Dodo).
  // Static page has no backend, so we use a lightweight browser geo lookup,
  // with a manual toggle as a fallback when detection is wrong/blocked.
  const { useState: useStateP, useEffect: useEffectP } = React;
  const [region, setRegion] = useStateP('in'); // default to India; flips on detect

  useEffectP(() => {
    let cancelled = false;
    // Cloudflare trace is fast and CORS-friendly: returns "loc=IN" etc.
    fetch('https://www.cloudflare.com/cdn-cgi/trace')
      .then((r) => r.text())
      .then((txt) => {
        if (cancelled) return;
        const m = txt.match(/loc=([A-Z]{2})/);
        if (m) setRegion(m[1] === 'IN' ? 'in' : 'intl');
      })
      .catch(() => {
        // Fallback: timezone heuristic (India has one tz).
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
          if (!/Kolkata|Calcutta/i.test(tz)) setRegion('intl');
        } catch (_) {}
      });
    return () => { cancelled = true; };
  }, []);

  const isIndia = region === 'in';
  const cur = isIndia ? '\u20B9' : '$';
  const starter = isIndia ? '299' : '14';
  const pro = isIndia ? '499' : '24';

  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head center" data-reveal>
          <span className="eyebrow"><span className="dot" />Pricing</span>
          <h2 className="h-section">Simple one-time credit packs. Pay only for what you send.</h2>
          <p className="lead" style={{ textAlign: 'center' }}>No subscription. Buy credits once — they stay valid for 60 days.</p>
        </div>

        <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="price-card" data-reveal>
            <div>
              <div className="price-name">Free Trial</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">{cur}</span>0</span>
              </div>
              <div className="price-sub">Try before you commit.</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>4 personalized sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>4 follow-up credits</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Dashboard + Analytics</div>
            </div>
            <a href="https://app.toinbox.app" className="btn btn-outline" style={{ marginTop: 'auto' }}>Sign In <Icon name="arrow" size={14} className="chev" /></a>
          </div>

          <div className="price-card featured" data-reveal style={{ transitionDelay: '90ms' }}>
            <div className="price-tag">BEST VALUE</div>
            <div>
              <div className="price-name">Starter</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">{cur}</span>{starter}<span className="per">one-time</span></span>
              </div>
              <div className="price-sub">50 credits · valid 60 days</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>40 personalized sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>40 follow-up credits</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Dashboard + Analytics</div>
            </div>
            <a href="https://app.toinbox.app" className="btn btn-accent" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Sign In <Icon name="arrow" size={14} className="chev" /></a>
          </div>

          <div className="price-card" data-reveal style={{ transitionDelay: '180ms' }}>
            <div>
              <div className="price-name">Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 8 }}>
                <span className="price-amt"><span className="currency">{cur}</span>{pro}<span className="per">one-time</span></span>
              </div>
              <div className="price-sub">100 credits · valid 60 days</div>
            </div>
            <div className="price-feats">
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>80 personalized sends</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>80 follow-up credits</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Dashboard + Analytics</div>
              <div className="price-feat"><span className="check"><Icon name="check" size={11} /></span>Best for an active search</div>
            </div>
            <a href="https://app.toinbox.app" className="btn btn-primary" style={{ marginTop: 'auto' }}>Sign In <Icon name="arrow" size={14} className="chev" /></a>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 13, marginTop: 24 }}>
          One job placed through ToInbox pays for the entire pack 100 times over.
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
          <p className="lead oneline"><span>Send personalised job applications to leadership and dept heads behind any LinkedIn job in just one click.</span><span>Show genuine intent, get noticed, land more interviews, and secure your dream job.</span></p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.toinbox.app" className="btn btn-accent">Sign In <Icon name="arrow" size={14} className="chev" /></a>
            <a href="#how-section" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.8)' }}>See how it works</a>
          </div>
          <div style={{ marginTop: 36, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>NO CARD REQUIRED · 4 FREE CREDITS · WORKS ON LINKEDIN</div>
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
            <div className="brand"><span className="brand-mark" /> ToInbox</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-4)' }}>The Chrome extension that reaches relevant department heads & recruiters on LinkedIn.</div>
          </div>
          <div className="foot-links">
            <a href="#why">Why</a>
            <a href="#how-section">How</a>
            <a href="#product">Product</a>
            <a href="#proof">Replies</a>
            <a href="#pricing">Pricing</a>
            <a href="/affiliates">Affiliates</a>
            <a href="/privacy.html">Privacy</a>
            <a href="/terms.html">Terms</a>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>© 2026 ToInbox · v0.4</div>
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
