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

function Testimonials() {
  // Gmail-style founder reply cards
  const items = [
    { name: 'Maya Okafor', role: 'Founder · Northwind', avatar: 'M', bg: 'linear-gradient(135deg,#f0a17a,#d8543e)', when: 'Mon 9:14 AM', subj: 'Re: Founding PE · from a 0→1 builder', body: <>Arjun — <strong>this stood out</strong> from the 240+ applications we got this week. Forwarding to Priya (Head of Eng), she'll set up a chat. Appreciate the v3 reference.</>, tag: 'Forwarded to Eng' },
    { name: 'Devon Reilly', role: 'CEO · Plover', avatar: 'D', bg: 'linear-gradient(135deg,#5562eb,#3a1f9c)', when: 'Tue 11:42 AM', subj: 'Re: Loved the initiative', body: <>Most candidates send the same Notion-template cover letter. Yours read like a real person — and you actually understood the brief. <strong>Can we schedule a quick chat this week?</strong></>, tag: 'Interview set' },
    { name: 'Sana Iyer', role: 'Co-founder · Reed Labs', avatar: 'S', bg: 'linear-gradient(135deg,#3aa178,#1b6448)', when: 'Wed 2:08 PM', subj: 'Re: Growth Engineer · saw the changelog', body: <>The reference to our changelog gave it away — you <strong>actually read it</strong>. We don't see that often. Calendar's open Thursday afternoon.</>, tag: 'Replied' },
    { name: 'Theo Marchetti', role: 'Founder · Lumen AI', avatar: 'T', bg: 'linear-gradient(135deg,#e1b14a,#a67919)', when: 'Wed 5:31 PM', subj: 'Re: Founding Designer', body: <>Most cold inbound goes straight to spam. Yours got through because it was specific and short. <strong>Sending to our hiring lead now.</strong></>, tag: 'Forwarded to HR' },
    { name: 'Priya Shah', role: 'CTO · Atlas Health', avatar: 'P', bg: 'linear-gradient(135deg,#5fb6c4,#1f6b78)', when: 'Thu 8:04 AM', subj: 'Re: Backend Engineer', body: <>Strong signal. The way you framed the v3 migration tells me you'd ship from week one. <strong>Let's do a working session</strong> instead of a panel.</>, tag: 'Replied' },
    { name: 'Jules Bennett', role: 'Founder · Cloudpack', avatar: 'J', bg: 'linear-gradient(135deg,#a07ad8,#5b34a1)', when: 'Fri 10:50 AM', subj: 'Re: One of the best applications', body: <>Direct, no fluff, no AI smell. Resume on point. <strong>Booked you in with our CEO</strong> for next week — calendar invite incoming.</>, tag: 'Interview set' },
  ];
  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />Founder replies</span>
          <h2 className="h-section">Founders reply to intent.<br />Here's what that looks like.</h2>
        </div>
        <div className="tests-grid">
          {items.map((t, i) => (
            <div className="gmail-card" key={i} data-reveal style={{ transitionDelay: (i * 50) + 'ms' }}>
              <div className="gmail-head">
                <div className="avatar-bubble" style={{ background: t.bg }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="gmail-name-row">
                    <span className="name">{t.name}</span>
                    <span className="when">{t.when}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>{t.role}</div>
                </div>
              </div>
              <div className="gmail-subj">{t.subj}</div>
              <div className="gmail-body">{t.body}</div>
              <div className="gmail-foot">
                <span className="pill">{t.tag.toUpperCase()}</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                  <Icon name="forward" size={12} /> Reply
                </span>
              </div>
            </div>
          ))}
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
