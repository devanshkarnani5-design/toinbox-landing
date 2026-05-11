// JobPilot — How It Works (LinkedIn-flow)
const { useState: useStateHIW, useEffect: useEffectHIW, useRef: useRefHIW } = React;

const STEPS = [
  { t: 'Search jobs on LinkedIn', s: 'Use the same filters you already use.' },
  { t: 'Extension detects every role', s: 'JobPilot reads each visible listing on the page.' },
  { t: 'Side panel populates instantly', s: 'Detected jobs appear with company, role, and stage.' },
  { t: 'Click "Enroll" on the ones that fit', s: 'Pick a startup. No portals, no forms.' },
  { t: 'AI builds founder-grade context', s: 'Cross-references resume, JD, and startup data.' },
  { t: 'Drafts a personal email + cover letter', s: 'Specific, short, no template smell.' },
  { t: 'Sends straight to the founder', s: 'Resume attached. Skips the Easy Apply queue entirely.' },
  { t: 'Founder replies or forwards', s: 'You land in a real conversation.' },
];

function HowItWorks() {
  const [active, setActive] = useStateHIW(0);
  const [progress, setProgress] = useStateHIW(0);
  const tickRef = useRefHIW(null);
  const startedRef = useRefHIW(false);

  useEffectHIW(() => {
    const el = document.getElementById('how-section');
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) { startedRef.current = true; start(); }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    // fallback: start anyway after a beat
    const fb = setTimeout(() => { if (!startedRef.current) { startedRef.current = true; start(); } }, 1500);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);

  const start = () => {
    let p = 0, idx = 0;
    setActive(0); setProgress(0);
    tickRef.current = setInterval(() => {
      p += 1.6;
      if (p >= 100) { p = 0; idx = (idx + 1) % STEPS.length; setActive(idx); }
      setProgress(p);
    }, 60);
  };
  useEffectHIW(() => () => clearInterval(tickRef.current), []);

  return (
    <div className="how" id="how-section">
      <div className="how-inner">
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />How it works</span>
          <h2 className="h-section">From LinkedIn tab to founder inbox<br />in fifteen seconds.</h2>
          <p className="lead">JobPilot lives inside the LinkedIn workflow you already use. No new tools to learn.</p>
        </div>
        <div className="how-steps">
          <div className="steps-list">
            {STEPS.map((st, i) => (
              <div key={i} className={`step-row ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`} onClick={() => { setActive(i); setProgress(0); }}>
                <div className="step-num">{i < active ? <Icon name="check" size={12} /> : String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className="step-title">{st.t}</div>
                  <div className="step-sub">{st.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="step-stage">
            <StepStage step={active} />
            <div className="step-progress"><span style={{ width: progress + '%' }} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepStage({ step }) {
  const Wrap = ({ children }) => <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>;
  const Header = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(245,245,244,0.55)' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
      Step {String(step + 1).padStart(2, '0')} · {label}
    </div>
  );

  if (step <= 1) return (
    <Wrap>
      <Header label={step === 0 ? 'browsing' : 'auto-detect'} />
      <div className="mini-browser">
        <div className="browser-chrome" style={{ background: '#f7f6f3', position: 'relative' }}>
          <div className="browser-dots"><span /><span /><span /></div>
          <div className="browser-url"><Icon name="lock" size={11} />jobs.network.com/search?startup=true</div>
          <span className="mini-pin" />
        </div>
        <div style={{ padding: 12 }}>
          {DETECTED.map((j, i) => (
            <div key={i} className={`mini-linjob ${step === 1 ? 'detected' : ''}`} style={{ transitionDelay: (i * 80) + 'ms' }}>
              <div className="sp-job-logo" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{j.role}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{j.co}</div>
              </div>
              {step === 1 && <span className="ok-dot" style={{ background: 'var(--accent)' }} />}
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );

  if (step === 2 || step === 3) return (
    <Wrap>
      <Header label={step === 2 ? 'panel populated' : 'pick a role'} />
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DETECTED.map((j, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 9, border: step === 3 && i === 0 ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.06)' }}>
            <div className="sp-job-logo" style={{ background: j.bg }}>{j.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>{j.role}</div>
              <div style={{ fontSize: 11, color: 'rgba(245,245,244,0.55)' }}>{j.co} · {j.stage}</div>
            </div>
            <button className={`sp-enroll-btn ${step === 3 && i === 0 ? 'enroll' : 'idle'}`} style={{ pointerEvents: 'none' }}>
              {step === 3 && i === 0 ? 'Click Enroll' : 'Enroll'}
            </button>
          </div>
        ))}
      </div>
    </Wrap>
  );

  if (step === 4) return (
    <Wrap>
      <Header label="building context" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[['Resume', 'parsed · 14 signals'], ['Job description', 'parsed · 9 keywords'], ['Founder profile', 'last post 3d ago'], ['Company brief', 'mission · stack · stage']].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.62 0.15 152)' }} />
            <span style={{ fontSize: 14 }}>{k}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245,245,244,0.55)' }}>{v}</span>
          </div>
        ))}
      </div>
    </Wrap>
  );

  if (step === 5) return (
    <Wrap>
      <Header label="drafting" />
      <div style={{ background: 'var(--bg-elev)', color: 'var(--ink)', borderRadius: 12, padding: 18, fontSize: 13.5, lineHeight: 1.6 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 8 }}>To · maya@northwind.co</div>
        <div>Hi Maya,</div>
        <div style={{ marginTop: 8 }}>Saw Northwind's Founding PE role on LinkedIn — your changelog on shipping v3 in 6 weeks resonated. I've spent two years doing exactly that kind of zero-to-one work…</div>
        <div style={{ marginTop: 8, color: 'var(--accent-ink)' }}>— Arjun</div>
      </div>
    </Wrap>
  );

  if (step === 6) return (
    <Wrap>
      <Header label="sending" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '32px 0' }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'pulseRing 2.4s ease-out infinite' }} />
          <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.16)', animation: 'pulseRing 2.4s ease-out infinite .6s' }} />
          <div style={{ position: 'absolute', inset: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2, oklch(0.42 0.2 270)))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Icon name="mail" size={36} />
          </div>
        </div>
        <div style={{ fontSize: 14, color: 'rgba(245,245,244,0.7)' }}>Sending to <span style={{ color: 'white', fontWeight: 500 }}>maya@northwind.co</span></div>
      </div>
      <style>{`@keyframes pulseRing { 0% { transform: scale(.85); opacity: .9; } 100% { transform: scale(1.4); opacity: 0; } }`}</style>
    </Wrap>
  );

  return (
    <Wrap>
      <Header label="founder reply" />
      <div style={{ background: 'var(--bg-elev)', color: 'var(--ink)', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid var(--line)' }}>
          <div className="avatar-bubble" style={{ width: 32, height: 32, fontSize: 12, background: 'linear-gradient(135deg, #f0a17a, #d8543e)' }}>M</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>Maya Okafor</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>Founder · Northwind</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)' }}>2h later</div>
        </div>
        <div style={{ fontSize: 13.5, marginTop: 12, lineHeight: 1.55 }}>
          Arjun — this stood out. Forwarding to Priya (Head of Eng), she'll set up a chat this week. Appreciate the specific reference to v3.
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 5, background: 'color-mix(in oklab, oklch(0.62 0.15 152) 18%, transparent)', color: 'oklch(0.34 0.14 152)', fontFamily: 'var(--font-mono)' }}>FORWARDED</span>
          <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 5, background: 'var(--accent-soft)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)' }}>INTERVIEW SET</span>
        </div>
      </div>
    </Wrap>
  );
}

window.HowItWorks = HowItWorks;
