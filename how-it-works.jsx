// JobPilot — How It Works (LinkedIn-flow)
const { useState: useStateHIW, useEffect: useEffectHIW, useRef: useRefHIW } = React;

const STEPS = [
  { t: 'Browse jobs on LinkedIn', s: 'Use your usual filters — Remote, Easy Apply, Past week.' },
  { t: 'Extension detects every role', s: 'JobPilot scans each visible listing automatically.' },
  { t: 'Click a job — detail panel opens', s: 'The full job description slides in from the right.' },
  { t: 'Click "Apply with JobPilot"', s: 'One button injected into the LinkedIn UI by the extension.' },
  { t: 'AI scans resume + JD', s: 'Cross-references your experience, skills, and the role requirements.' },
  { t: 'Generates a tailored cover letter', s: 'Specific, short, no template smell. Reads like a real human wrote it.' },
  { t: 'Sends straight to the founder', s: 'Resume attached. Skips Easy Apply queues entirely.' },
  { t: 'Founder replies or forwards', s: 'You land in a real conversation — two steps ahead.' },
];

const LIN_JOBS_MINI = [
  { logo: 'N', bg: '#1e3a5f', title: 'Founding Product Engineer', co: 'Northwind' },
  { logo: 'L', bg: '#3730a3', title: 'Head of Growth', co: 'Lumen AI' },
  { logo: 'R', bg: '#7c2d12', title: 'Senior Backend Engineer', co: 'Reed Labs' },
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
    const fb = setTimeout(() => { if (!startedRef.current) { startedRef.current = true; start(); } }, 1500);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);

  const start = () => {
    let p = 0, idx = 0;
    setActive(0); setProgress(0);
    tickRef.current = setInterval(() => {
      p += 1.4;
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

function MiniLinkedIn({ highlightIdx, showDetail, showJP }) {
  return (
    <div style={{
      background: '#f3f2ef', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
      display: 'flex', minHeight: 200
    }}>
      {/* Job list */}
      <div style={{ width: showDetail ? 160 : '100%', borderRight: showDetail ? '1px solid #e0dfdc' : 'none', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 4, background: '#f3f2ef', transition: 'width 0.4s ease' }}>
        {LIN_JOBS_MINI.map((j, i) => (
          <div key={i} style={{
            display: 'flex', gap: 7, padding: '7px 8px', borderRadius: 6,
            background: highlightIdx === i ? 'white' : 'rgba(255,255,255,0.6)',
            border: highlightIdx === i ? '1px solid #0a66c2' : '1px solid #e0dfdc',
            boxShadow: highlightIdx === i ? '2px 0 0 0 #0a66c2 inset' : 'none',
            alignItems: 'flex-start',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
              <div style={{ fontSize: 9.5, color: '#666', marginTop: 2 }}>{j.co} · Remote</div>
              {highlightIdx === i && <span style={{ display: 'inline-block', marginTop: 3, fontSize: 9, padding: '1px 5px', borderRadius: 999, background: '#e8f3ff', color: '#0a66c2', border: '1px solid #b6d4f7' }}>Easy Apply</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {showDetail && (
        <div style={{
          flex: 1, background: 'white', padding: '10px 12px',
          display: 'flex', flexDirection: 'column', gap: 6,
          animation: 'slideInRight 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, background: '#1e3a5f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>N</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#0a66c2' }}>Northwind</div>
              <div style={{ fontSize: 9.5, color: '#888' }}>Series A · 48 people</div>
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>Founding Product Engineer</div>
          <div style={{ fontSize: 10, color: '#666' }}>Remote · 2d ago · 84 applicants</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {showJP ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 9px', borderRadius: 6, background: 'var(--accent)', color: 'white', fontSize: 11, fontWeight: 600, boxShadow: '0 4px 12px -4px var(--accent-glow)' }}>
                ⚡ Apply with JobPilot
              </div>
            ) : null}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 6, background: '#e8f3ff', color: '#0a66c2', fontSize: 11, fontWeight: 600, border: '1px solid #b6d4f7' }}>
              Easy Apply
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
            {[90, 78, 65, 82].map((w, i) => (
              <div key={i} style={{ height: 7, borderRadius: 3, background: '#f0ede8', width: w + '%' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepStage({ step }) {
  const Wrap = ({ children }) => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
  );

  const StepLabel = ({ label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(245,245,244,0.5)' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
      Step {String(step + 1).padStart(2, '0')} · {label}
    </div>
  );

  // Step 0: Browse
  if (step === 0) return (
    <Wrap>
      <StepLabel label="browsing" />
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ background: '#fafaf9', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff6058', display: 'inline-block' }} /><span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbe2e', display: 'inline-block' }} /><span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c941', display: 'inline-block' }} /></div>
          <div style={{ flex: 1, height: 20, background: 'white', borderRadius: 5, border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 5, fontSize: 10, color: '#666' }}>
            <Icon name="lock" size={9} />
            linkedin.com/jobs/search
          </div>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: 'white', opacity: 0.9 }} />
          </div>
        </div>
        <div style={{ padding: 10, background: '#f3f2ef' }}>
          {LIN_JOBS_MINI.map((j, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 7, background: 'white', border: '1px solid #e0dfdc', marginBottom: 5, alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: 5, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1a1a' }}>{j.title}</div>
                <div style={{ fontSize: 10, color: '#666', marginTop: 1 }}>{j.co} · Remote</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>JobPilot lives in your browser as a Chrome extension. No new tab. No separate app.</p>
    </Wrap>
  );

  // Step 1: Auto-detect
  if (step === 1) return (
    <Wrap>
      <StepLabel label="auto-detect" />
      <div style={{ background: '#f3f2ef', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', padding: 10 }}>
        {LIN_JOBS_MINI.map((j, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 7, background: 'white', border: '1px solid var(--accent)', boxShadow: '0 0 0 2px color-mix(in oklab, var(--accent) 18%, transparent)', marginBottom: 5, alignItems: 'center', transition: 'all 0.3s ease', transitionDelay: (i * 80) + 'ms' }}>
            <div style={{ width: 24, height: 24, borderRadius: 5, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1a1a' }}>{j.title}</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 1 }}>{j.co}</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 999, background: 'color-mix(in oklab, oklch(0.62 0.15 152) 16%, transparent)', color: 'oklch(0.34 0.14 152)', fontFamily: 'var(--font-mono)' }}>detected</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>Extension scans every visible job card and outlines matching roles instantly.</p>
    </Wrap>
  );

  // Step 2: Detail panel
  if (step === 2) return (
    <Wrap>
      <StepLabel label="detail panel" />
      <MiniLinkedIn highlightIdx={0} showDetail={true} showJP={false} />
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>Click any job. The full listing, recruiter, and company insights slide in from the right.</p>
    </Wrap>
  );

  // Step 3: Apply with JobPilot
  if (step === 3) return (
    <Wrap>
      <StepLabel label="one click" />
      <MiniLinkedIn highlightIdx={0} showDetail={true} showJP={true} />
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>The extension injects an "Apply with JobPilot" button directly into the LinkedIn job detail.</p>
    </Wrap>
  );

  // Step 4: Scan
  if (step === 4) return (
    <Wrap>
      <StepLabel label="AI scan" />
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { k: 'Resume', v: '14 experience signals' },
          { k: 'Job description', v: '9 keywords matched' },
          { k: 'Founder profile', v: 'Last post 3 days ago' },
          { k: 'Company brief', v: 'Mission · stage · stack' },
        ].map(({ k, v }) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.62 0.15 152)', flexShrink: 0 }} />
            <span style={{ fontSize: 13.5, flex: 1 }}>{k}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(245,245,244,0.5)' }}>{v}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>AI cross-references your resume against the JD and founder's LinkedIn activity.</p>
    </Wrap>
  );

  // Step 5: Cover letter
  if (step === 5) return (
    <Wrap>
      <StepLabel label="drafting" />
      <div style={{ background: 'white', color: '#1a1a1a', borderRadius: 12, padding: 16, fontSize: 13, lineHeight: 1.6, flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>To · marcus@northwind.co</div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Hi Marcus,</div>
        <div style={{ color: '#333' }}>Saw Northwind's Founding PE role — your changelog on shipping v3 in six weeks is exactly the pace I want.</div>
        <div style={{ marginTop: 8, color: '#333' }}>Two years doing this: solo-shipped 3 products, grew last app 2k → 80k MAU. Full-stack on TS, Go, Postgres.</div>
        <div style={{ marginTop: 8, color: 'var(--accent-ink)', fontStyle: 'italic' }}>— Arjun</div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>Specific, short, no AI smell. Every email cites the job, the changelog, the founder.</p>
    </Wrap>
  );

  // Step 6: Sending
  if (step === 6) return (
    <Wrap>
      <StepLabel label="sending" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '28px 0', flex: 1 }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'pulseRing 2.4s ease-out infinite' }} />
          <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.16)', animation: 'pulseRing 2.4s ease-out infinite 0.7s' }} />
          <div style={{ position: 'absolute', inset: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), oklch(0.42 0.2 270))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="mail" size={28} />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Sent to marcus@northwind.co</div>
          <div style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', marginTop: 4 }}>Resume attached · delivery confirmed</div>
        </div>
      </div>
      <style>{`@keyframes pulseRing { 0% { transform: scale(.8); opacity:.9; } 100% { transform: scale(1.5); opacity:0; } }`}</style>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>Email goes straight to the founder. Skips the ATS. No Easy Apply queue.</p>
    </Wrap>
  );

  // Step 7: Founder reply
  return (
    <Wrap>
      <StepLabel label="founder reply" />
      <div style={{ background: 'white', color: '#1a1a1a', borderRadius: 12, padding: 16, border: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid #f0ede8' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #f0a17a, #d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>M</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>Marcus Webb</div>
            <div style={{ fontSize: 11, color: '#888' }}>Head of Engineering · Northwind</div>
          </div>
          <div style={{ fontSize: 11, color: '#888', fontFamily: 'var(--font-mono)' }}>2h later</div>
        </div>
        <div style={{ fontSize: 13.5, marginTop: 12, lineHeight: 1.55, color: '#333' }}>
          Arjun — <strong style={{ color: '#1a1a1a' }}>this stood out</strong> from the 240+ applications we got. Forwarding to Priya (Head of Eng), she'll set up a chat this week.
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
          <span style={{ fontSize: 11, padding: '3px 7px', borderRadius: 5, background: '#e6f4ea', color: '#0d652d', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>FORWARDED</span>
          <span style={{ fontSize: 11, padding: '3px 7px', borderRadius: 5, background: '#e8f0ff', color: '#1a56db', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>INTERVIEW SET</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(245,245,244,0.5)', margin: 0 }}>Founders reply to intent. You land in a real conversation — two steps ahead.</p>
    </Wrap>
  );
}

window.HowItWorks = HowItWorks;
