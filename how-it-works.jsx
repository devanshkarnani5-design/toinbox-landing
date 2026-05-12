// JobPilot — How It Works: Continuous cinematic simulation
const { useState: useStateHIW, useEffect: useEffectHIW, useRef: useRefHIW } = React;

const HIW_STEPS = [
  { t: 'LinkedIn opens', s: 'Jobs page loads with the first role already open. JobPilot extension is already active on the right.' },
  { t: 'Extension detects roles', s: 'JobPilot scans every visible job card, identifies startup roles, and finds direct founder emails.' },
  { t: 'Enroll with one click', s: 'Click Enroll inside the JobPilot panel. Your cursor never leaves the extension sidebar.' },
  { t: 'AI scans resume + JD', s: 'Cross-references your experience, skills, and role requirements. Builds a 94% match profile in seconds.' },
  { t: 'Cover letter generated', s: 'Specific, short, no template smell. Cites the role, the changelog, the founder by name. 200+ words.' },
  { t: 'Sent to founder inbox', s: 'Email goes straight to the founder with resume attached. Skips the ATS. No Easy Apply queue.' },
  { t: 'Dashboard tracks it all', s: 'Every application tracked live: opened, replied, HR-forwarded, interview scheduled.' },
  { t: 'Founder replies', s: 'You land in a real conversation. Founders reply to intent — not to portals.' },
];

const HIW_JOBS = [
  { logo: 'N', bg: '#1e3a5f', title: 'Founding Product Engineer', co: 'Northwind', match: 94, email: 'marcus@northwind.co' },
  { logo: 'L', bg: '#3730a3', title: 'Head of Growth', co: 'Lumen AI', match: 87, email: 'theo@lumen.ai' },
  { logo: 'R', bg: '#7c2d12', title: 'Backend Engineer', co: 'Reed Labs', match: 78, email: 'sana@reedlabs.io' },
];

const FULL_LETTER = `Hi Marcus,

I came across the Founding Product Engineer role and wanted to reach out directly — your March changelog on shipping v3 in six weeks is exactly the pace I want to be working at.

Over the past two years I've worked on building scalable products, improving UX flows, and shipping fast-moving startup features. I've especially enjoyed working on AI-assisted products and user-focused interfaces.

A few strengths I'd bring:
• Full-stack across TypeScript, Go, Postgres
• Grew last product from 2k → 80k MAU in 18 months
• Shipped 3 solo products end-to-end
• Strong product instinct and fast iteration

Resume attached. Happy to pair on a real bug or do a quick take-home.

Looking forward to hearing from you.
— Arjun`;

function HowitworksBrowser({ step, typed, jobStates, showDash, dashStats, replyVisible }) {
  const jpPanelContent = () => {
    if (step === 0) {
      return (
        <div className="jp-sidebar-body" style={{ justifyContent: 'center', alignItems: 'center', color: '#aaa', fontSize: 12 }}>
          <div style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>JP</span>
            </div>
            <div style={{ fontSize: 11.5, color: '#888' }}>Extension active</div>
          </div>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="jp-sidebar-body">
          <div className="jp-detect-status">
            <span className="dotpulse" /> Scanning jobs on page…
          </div>
          {HIW_JOBS.map((j, i) => (
            <div key={i} className="jp-job-entry" style={{ opacity: 0.6 + i * 0.1, animationDelay: i * 200 + 'ms' }}>
              <div className="jp-job-entry-row">
                <div className="jp-job-logo-sm" style={{ background: j.bg }}>{j.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{j.co}</div>
                </div>
                <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: '#e8f4ea', color: '#057642', fontFamily: 'var(--font-mono)' }}>found</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="jp-sidebar-body">
          <div className="jp-detect-status">
            <span className="ok-dot" /> 3 startup roles detected
          </div>
          {HIW_JOBS.map((j, i) => (
            <div key={i} className={`jp-job-entry${i === 0 ? ' active' : ''}`}>
              <div className="jp-job-entry-row">
                <div className="jp-job-logo-sm" style={{ background: j.bg }}>{j.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>{j.co}</div>
                  <div style={{ fontSize: 9.5, color: '#057642', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 7 }}>●</span>{j.email}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? 'var(--accent)' : '#aaa' }}>{j.match}%</div>
                  <button className={`jp-enroll-btn-new${i === 0 ? ' idle' : ' idle'}`} style={{ opacity: i === 0 ? 1 : 0.5, fontSize: 10, padding: '4px 8px' }}>{i === 0 ? '← Enroll' : 'Enroll'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="jp-sidebar-body">
          <div className="jp-detect-status">
            <span className="dotpulse" /> AI analyzing…
          </div>
          <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              { k: 'Resume parsed', v: '14 signals', ok: true },
              { k: 'JD analyzed', v: '9 matches', ok: true },
              { k: 'Founder found', v: 'marcus@northwind.co', ok: true },
              { k: 'Match score', v: '', ok: false },
            ].map(({ k, v, ok }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: ok ? '#f0faf5' : '#f5f5f3', border: `1px solid ${ok ? '#b8e6cc' : '#e8e7e4'}`, borderRadius: 7, transition: 'all 0.3s' }}>
                <span style={{ fontSize: 13, flexShrink: 0 }}>{ok ? '✓' : '⟳'}</span>
                <span style={{ fontSize: 11.5, flex: 1, color: '#333' }}>{k}</span>
                {ok ? <span style={{ fontSize: 10, color: '#057642', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</span>
                  : <div style={{ height: 8, borderRadius: 4, background: 'linear-gradient(90deg, var(--accent) 60%, #e8e7e4 60%)', width: 60 }} />}
              </div>
            ))}
            <div style={{ padding: '8px 10px', background: 'var(--accent-soft)', border: '1px solid color-mix(in oklab, var(--accent) 30%, transparent)', borderRadius: 7, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)' }}>94%</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-ink)' }}>Match score</div>
                <div style={{ fontSize: 10, color: 'var(--accent-ink)', opacity: 0.7 }}>Top 6% of applicants</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (step === 4 || step === 5) {
      return (
        <div className="jp-sidebar-body">
          <div className="jp-detect-status">
            {step === 4 ? <><span className="dotpulse" /> Generating cover letter…</> : <><span className="ok-dot" /> Ready to send</>}
          </div>
          <div style={{ flex: 1, padding: '8px 8px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>To · marcus@northwind.co</div>
            <div style={{ fontSize: 10.5, lineHeight: 1.55, color: '#333', whiteSpace: 'pre-wrap', flex: 1, overflow: 'hidden' }}>
              {typed || FULL_LETTER}
              {step === 4 && <span className="caret" />}
            </div>
            {step === 5 && (
              <div style={{ padding: '8px 10px', background: 'var(--ink)', color: 'white', borderRadius: 6, textAlign: 'center', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span>↑</span> Send Email
              </div>
            )}
          </div>
        </div>
      );
    }
    if (step === 6 || step === 7) {
      return (
        <div className="jp-sidebar-body">
          <div className="jp-dash-stats-row">
            {[
              { k: 'Sent', v: 3, color: '#555' },
              { k: 'Opened', v: 2, color: 'var(--accent)' },
              { k: 'Replied', v: step === 7 ? 1 : 0, color: '#057642' },
            ].map(({ k, v, color }) => (
              <div key={k} className="jp-dash-stat-cell">
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color }}>{v}</div>
                <div style={{ fontSize: 9.5, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>{k}</div>
              </div>
            ))}
          </div>
          {[
            { job: HIW_JOBS[0], status: step === 7 ? 'replied' : 'opened', time: '2h ago' },
            { job: HIW_JOBS[1], status: 'sent', time: '1h ago' },
            { job: HIW_JOBS[2], status: 'sent', time: '30m ago' },
          ].map((row, i) => (
            <div key={i} className={`jp-dash-app-row${row.status === 'replied' ? ' replied' : ''}`}>
              <div className="jp-job-logo-sm" style={{ background: row.job.bg, flexShrink: 0 }}>{row.job.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{row.job.co}</div>
                <div style={{ fontSize: 9.5, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.job.email}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span className={`jp-status-pill ${row.status}`}>{row.status}</span>
                <span style={{ fontSize: 9, color: '#bbb', fontFamily: 'var(--font-mono)' }}>{row.time}</span>
              </div>
            </div>
          ))}
          {step === 7 && (
            <div className="jp-reply-card" style={{ marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 9, flexShrink: 0 }}>M</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Marcus · Northwind</div>
                <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#057642', display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: 11, color: '#333', lineHeight: 1.5 }}>
                "Stood out from 240+ apps. <strong>Forwarding to Priya</strong> — she'll reach out this week."
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 8 }}>
                <span className="jp-status-pill replied">Replied</span>
                <span className="jp-status-pill interview">Interview →</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="hiw-browser">
      {/* Chrome bar */}
      <div className="hiw-browser-chrome">
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff6058', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbe2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c941', display: 'inline-block' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, marginLeft: 10 }}>
          <div style={{ fontSize: 10.5, padding: '3px 10px', borderRadius: 5, background: 'white', border: '1px solid var(--line)', color: '#555', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 11, height: 11, borderRadius: 2, background: '#0a66c2', display: 'inline-block' }} />LinkedIn
          </div>
          <div style={{ fontSize: 10.5, padding: '3px 10px', borderRadius: 5, color: '#999', display: 'flex', alignItems: 'center', gap: 3 }}>Gmail</div>
        </div>
        <div style={{ flex: 1, height: 22, borderRadius: 5, background: '#f3f2ef', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 9px', fontSize: 10.5, color: '#888', fontFamily: 'var(--font-mono)', gap: 5, minWidth: 0, overflow: 'hidden' }}>
          <Icon name="lock" size={10} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>linkedin.com/jobs/search/?keywords=founding+engineer&f_TPR=r604800</span>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: 'white', fontSize: 8, fontWeight: 700 }}>JP</span>
        </div>
      </div>

      {/* 3-column body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#f3f2ef', overflow: 'hidden' }}>
        {/* Left: Job list */}
        <div style={{ width: 175, flexShrink: 0, background: '#f3f2ef', borderRight: '1px solid #e0dfdc', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'hidden' }}>
          <div style={{ padding: '4px 6px 6px', fontSize: 10, color: '#888', fontFamily: 'var(--font-mono)' }}>99+ results</div>
          {HIW_JOBS.map((j, i) => (
            <div key={i} style={{
              display: 'flex', gap: 6, padding: '7px 8px', borderRadius: 6,
              background: i === 0 ? 'white' : 'rgba(255,255,255,0.7)',
              border: i === 0 ? '1px solid #0a66c2' : '1px solid #e0dfdc',
              boxShadow: i === 0 ? '-2px 0 0 0 #0a66c2 inset' : 'none',
              alignItems: 'flex-start',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>{j.title}</div>
                <div style={{ fontSize: 9, color: '#888', marginTop: 2 }}>{j.co} · Remote</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 8.5, padding: '1px 5px', borderRadius: 999, background: '#e8f3ff', color: '#0a66c2', border: '1px solid #b6d4f7' }}>Easy Apply</span>
                  {(step >= 5 && i === 0) && <span style={{ fontSize: 8.5, padding: '1px 5px', borderRadius: 999, background: '#e6f4ea', color: '#057642', border: '1px solid #b8e6cc' }}>✓ Applied</span>}
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 4, padding: '7px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.5)', border: '1px solid #e0dfdc', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: '#4c4b99', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>Product Manager</div>
              <div style={{ fontSize: 9, color: '#aaa', marginTop: 2 }}>Atlas Health · SF</div>
            </div>
          </div>
        </div>

        {/* Center: LinkedIn detail */}
        <div style={{ flex: 1, background: 'white', padding: '12px 14px', minWidth: 0, borderRight: '1px solid #e0dfdc', overflowY: 'hidden' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 5, background: '#1e3a5f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>N</div>
            <div>
              <div style={{ fontSize: 10.5, color: '#0a66c2', fontWeight: 600 }}>Northwind</div>
              <div style={{ fontSize: 9, color: '#888' }}>Series A · 48 employees</div>
            </div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.2 }}>Founding Product Engineer</div>
          <div style={{ fontSize: 9.5, color: '#888', marginBottom: 7, display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            <span>Remote</span><span>·</span><span>2d ago</span><span>·</span><span>702 applicants</span>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
            <button style={{ padding: '5px 9px', borderRadius: 4, background: '#0a66c2', color: 'white', fontSize: 10.5, fontWeight: 600, border: 'none' }}>Easy Apply</button>
            <button style={{ padding: '5px 8px', borderRadius: 4, border: '1px solid #c8c7c4', background: 'white', color: '#333', fontSize: 10.5, fontWeight: 600 }}>Save</button>
          </div>
          <div style={{ padding: '6px 9px', background: '#f0faf5', borderRadius: 6, border: '1px solid #b8e6cc', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 10.5 }}>
            <span style={{ color: '#057642', fontSize: 11 }}>✦</span>
            <span><strong>Top applicant</strong> — profile matches 94% of JD</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', marginBottom: 5 }}>About the job</div>
          {[95, 82, 68, 88, 55, 74].map((w, i) => (
            <div key={i} style={{ height: 6, borderRadius: 3, background: '#f0ede8', width: w + '%', marginBottom: 5 }} />
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a', margin: '10px 0 5px' }}>Skills</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {['TypeScript', 'Go', 'PostgreSQL'].map(s => (
              <span key={s} style={{ fontSize: 9.5, padding: '2px 7px', borderRadius: 999, border: '1px solid #0a66c2', color: '#0a66c2', background: '#eef3fa' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Right: JobPilot sidebar */}
        <div style={{ width: 228, flexShrink: 0, background: 'white', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderBottom: '1px solid #f0ede8', flexShrink: 0 }}>
            <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))' }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>JobPilot</span>
            <span style={{ marginLeft: 'auto', fontSize: 9.5, padding: '2px 7px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)' }}>
              {step >= 6 ? 'Dashboard' : '42 credits'}
            </span>
          </div>
          {jpPanelContent()}
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const [active, setActive] = useStateHIW(0);
  const [progress, setProgress] = useStateHIW(0);
  const [typed, setTyped] = useStateHIW('');
  const tickRef = useRefHIW(null);
  const typeRef = useRefHIW(null);
  const startedRef = useRefHIW(false);

  // Step durations in ms (roughly proportional to content)
  const STEP_MS = [2500, 2500, 2000, 2800, 3200, 2000, 2500, 3000];

  useEffectHIW(() => {
    const el = document.getElementById('how-section');
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) { startedRef.current = true; start(); }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    const fb = setTimeout(() => { if (!startedRef.current) { startedRef.current = true; start(); } }, 1800);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);

  const start = () => {
    let idx = 0;
    setActive(0); setProgress(0);
    const step_ms = STEP_MS[0];
    let startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / STEP_MS[idx]) * 100);
      setProgress(p);
      if (p >= 100) {
        idx = (idx + 1) % HIW_STEPS.length;
        startTime = Date.now();
        setActive(idx);
        setProgress(0);
        setTyped('');
      }
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
  };

  // Typing effect for step 4
  useEffectHIW(() => {
    if (active === 4) {
      setTyped('');
      let i = 0;
      const type = () => {
        if (i <= FULL_LETTER.length) {
          setTyped(FULL_LETTER.slice(0, i));
          i += 4;
          typeRef.current = setTimeout(type, 18);
        }
      };
      typeRef.current = setTimeout(type, 200);
    } else {
      clearTimeout(typeRef.current);
    }
    return () => clearTimeout(typeRef.current);
  }, [active]);

  useEffectHIW(() => () => { cancelAnimationFrame(tickRef.current); clearTimeout(typeRef.current); }, []);

  const jobStates = active >= 5 ? ['sent', active >= 6 ? 'sent' : 'idle', active >= 6 ? 'sent' : 'idle'] : ['idle', 'idle', 'idle'];

  return (
    <div className="how" id="how-section">
      <div style={{ maxWidth: 1560, margin: '0 auto', padding: '0 clamp(24px, 5vw, 72px)' }}>
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />How it works</span>
          <h2 className="h-section">From LinkedIn tab to founder inbox<br />in fifteen seconds.</h2>
          <p className="lead">JobPilot lives inside the LinkedIn workflow you already use. Watch it happen live.</p>
        </div>

        <div className="hiw-cinema-grid" data-reveal>
          {/* Step list */}
          <div className="hiw-steps-col">
            {HIW_STEPS.map((st, i) => (
              <div
                key={i}
                className={`hiw-step-row ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
                onClick={() => { setActive(i); setProgress(0); setTyped(''); cancelAnimationFrame(tickRef.current); start(); }}
              >
                <div className="hiw-step-num">
                  {i < active ? <Icon name="check" size={12} /> : String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="hiw-step-title">{st.t}</div>
                  {i === active && <div className="hiw-step-sub">{st.s}</div>}
                </div>
                {i === active && (
                  <div className="hiw-step-bar">
                    <span style={{ width: progress + '%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continuous browser simulation */}
          <div className="hiw-browser-col">
            <HowitworksBrowser
              step={active}
              typed={typed}
              jobStates={jobStates}
              showDash={active >= 6}
              replyVisible={active === 7}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

window.HowItWorks = HowItWorks;
