// ToInbox — How It Works: Continuous cinematic simulation
const { useState: useStateHIW, useEffect: useEffectHIW, useRef: useRefHIW } = React;

const HIW_STEPS = [
  { t: 'Sign in & add the Chrome extension', s: 'Sign in at toinbox.app, then add ToInbox to Chrome in one click. It installs right inside LinkedIn — no setup, no account juggling. You are ready in under a minute.' },
  { t: 'Click a job — ToInbox detects it instantly', s: 'Click any LinkedIn job and ToInbox immediately detects it in the panel. One button. It finds the founder and the relevant department head, matches your resume, and is ready to send in seconds.' },
  { t: 'AI scans resume + JD', s: 'Cross-references your experience and the job description in seconds. Identifies the right signals from your resume automatically.' },
  { t: 'Cover letter generated', s: 'Specific, human-sounding, no template smell. Cites the role, the company\'s work, and the recipient by name. Around 160 words.' },
  { t: 'Sent to leadership inboxes', s: 'Email + resume lands in the founder\'s personal inbox. Skips ATS entirely. No Easy Apply queue.' },
  { t: 'Dashboard tracks it all', s: 'Every metric live: enrolled, sent, replied, interviews scheduled.' },
  { t: 'They reply', s: 'Founders and department heads reply to intent. You land in a real conversation — two steps ahead of every other applicant.' },
];

const STEP_MS = [9000, 6000, 6000, 6000, 6000, 6000, 6000];

const HIW_JOBS = [
  { logo: 'N', bg: '#1e3a5f', title: 'Founding Product Engineer', co: 'Northwind', match: 94, email: 'm.v@northwind.co' },
  { logo: 'L', bg: '#3730a3', title: 'Head of Growth', co: 'Lumen AI', match: 87, email: 'theo@lumen.ai' },
  { logo: 'R', bg: '#7c2d12', title: 'Backend Engineer', co: 'Reed Labs', match: 78, email: 'sana@reedlabs.io' },
];

const FULL_LETTER = `Hey Marcus,

I'd like to apply for the Founding Product Engineer role at Northwind.

I've built full-stack products end to end — TypeScript, Go, Postgres — and grown one from 2k to 80k MAU in 14 months. API design, zero-friction onboarding, and shipping fast are where I do my best work.

Attaching my resume for your reference.
Looking forward to hearing from you.

Best,
Arjun`;

// ── Dashboard full view ──
function HiwDashboard({ replyVisible }) {
  const APPS = [
    { logo: 'N', bg: '#1e3a5f', co: 'Northwind', role: 'Founding PE', sent: 'Mon 6:02 AM', status: replyVisible ? 'replied' : 'opened', statusLabel: replyVisible ? 'Replied ✓' : 'Opened' },
    { logo: 'L', bg: '#3730a3', co: 'Lumen AI', role: 'Head of Growth', sent: 'Mon 8:15 AM', status: 'interview', statusLabel: 'Interview Set' },
    { logo: 'G', bg: '#0f4c3a', co: 'GrowthBase', role: 'Mktg. Intern', sent: 'Tue 9:30 AM', status: 'fwd', statusLabel: 'Fwd to HR' },
    { logo: 'P', bg: '#5b34a1', co: 'Plover', role: 'Product Mgr', sent: 'Tue 11:00 AM', status: 'opened', statusLabel: 'Opened' },
    { logo: 'A', bg: '#1b6448', co: 'Atlas Health', role: 'Full Stack Eng.', sent: 'Wed 7:00 AM', status: 'sent', statusLabel: 'Sent' },
    { logo: 'C', bg: '#374151', co: 'Cloudpack', role: 'Infra Eng.', sent: 'Wed 9:15 AM', status: 'sent', statusLabel: 'Sent' },
  ];
  const statusColor = {
    replied: { bg: '#e6f4ea', color: '#057642' },
    interview: { bg: '#e8f0ff', color: '#1a56db' },
    fwd: { bg: '#fff0e0', color: '#b45309' },
    opened: { bg: 'var(--accent-soft)', color: 'var(--accent-ink)' },
    sent: { bg: '#f0ede8', color: '#666' },
  };
  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#f7f6f3' }}>
      {/* Left nav */}
      <div style={{ width: 150, flexShrink: 0, background: '#1a1a1a', display: 'flex', flexDirection: 'column', padding: '14px 10px', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', marginBottom: 10 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>ToInbox</span>
        </div>
        {[
          { label: 'Dashboard', active: true, icon: '⊞' },
          { label: 'Applications', active: false, icon: '↗' },
          { label: 'Emails', active: false, icon: '✉' },
          { label: 'Settings', active: false, icon: '⚙' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 7, background: item.active ? 'rgba(255,255,255,0.12)' : 'transparent', color: item.active ? 'white' : 'rgba(255,255,255,0.45)', fontSize: 11.5, fontWeight: item.active ? 600 : 400 }}>
            <span style={{ fontSize: 12 }}>{item.icon}</span>{item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '10px 10px 4px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>42 credits left</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '14px 16px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a' }}>Dashboard</div>
            <div style={{ fontSize: 10.5, color: '#666', marginTop: 1 }}>Week of May 12, 2026 · Arjun Sharma</div>
          </div>
          <div style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 6, background: '#e6f4ea', color: '#057642', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>● Live</div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {[
            { k: 'Enrolled',   v: 18,                    color: '#333' },
            { k: 'Sent',       v: 14,                    color: '#333' },
            { k: 'Replied',    v: replyVisible ? 6 : 5,  color: '#057642' },
            { k: 'Interviews', v: 4,                     color: '#1a56db' },
          ].map(({ k, v, color }) => (
            <div key={k} style={{ padding: '8px 8px', background: 'white', borderRadius: 8, border: '1px solid #e8e7e4', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 8.5, color: '#666', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>{k}</div>
            </div>
          ))}
        </div>

        {/* App list */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid #e8e7e4', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 1fr 90px 70px', gap: 8, padding: '6px 10px', borderBottom: '1px solid #f0ede8', fontSize: 9, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', alignItems: 'center' }}>
            <div />
            <div>Company</div>
            <div>Role</div>
            <div>Sent</div>
            <div style={{ textAlign: 'right' }}>Status</div>
          </div>
          {APPS.map((a, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '26px 1fr 1fr 90px 70px', gap: 8, padding: '7px 10px', borderBottom: i < APPS.length - 1 ? '1px solid #f8f7f5' : 'none', alignItems: 'center', background: (replyVisible && i === 0) ? '#f0faf5' : 'white' }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: a.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 700 }}>{a.logo}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a' }}>{a.co}</div>
              <div style={{ fontSize: 10.5, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role}</div>
              <div style={{ fontSize: 10, color: '#777', fontFamily: 'var(--font-mono)' }}>{a.sent}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 600, fontFamily: 'var(--font-mono)', ...(statusColor[a.status] || {}) }}>{a.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reply thread — visible step 6 */}
        {replyVisible && (
          <div style={{ background: 'white', borderRadius: 10, border: '1px solid #b8e6cc', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6, animation: 'fadeSlideIn 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 9, flexShrink: 0 }}>M</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1a1a' }}>Marcus Webb · Northwind</div>
                <div style={{ fontSize: 10, color: '#666' }}>Mon 9:14 AM · 2h after your send</div>
              </div>
              <span style={{ fontSize: 9.5, padding: '3px 8px', borderRadius: 4, background: '#e6f4ea', color: '#057642', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>NEW REPLY</span>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.55, color: '#333' }}>"Arjun — <strong style={{ color: '#1a1a1a' }}>this stood out from 240+ applications</strong> we got. The v3 reference tells me you actually read what we shipped. Forwarding to Priya (Head of Eng) — she'll reach out this week."</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 9.5, padding: '3px 7px', borderRadius: 4, background: '#e6f4ea', color: '#057642', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>FORWARDED TO ENG</span>
              <span style={{ fontSize: 9.5, padding: '3px 7px', borderRadius: 4, background: '#e8f0ff', color: '#1a56db', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>INTERVIEW THIS WEEK</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 0: single-job dark panel with animated cursor ──
function HiwEnrollPanel() {
  const [phase, setPhase] = useStateHIW('detecting'); // 'detecting' | 'ready' | 'sending' | 'sent'
  const [activeJob, setActiveJob] = useStateHIW(null);
  const [curX, setCurX] = useStateHIW(90);
  const [curY, setCurY] = useStateHIW(30);
  const [clicking, setClicking] = useStateHIW(false);

  useEffectHIW(() => {
    let timers = [];
    const after = (ms, fn) => { const t = setTimeout(fn, ms); timers.push(t); };
    const loop = () => {
      setPhase('detecting'); setActiveJob(null);
      setCurX(90); setCurY(30); setClicking(false);
      // Job gets detected
      after(900, () => { setActiveJob(HIW_JOBS[0]); setPhase('ready'); });
      // Cursor moves to Send button
      after(1500, () => { setCurX(90); setCurY(192); });
      // Click
      after(2100, () => { setClicking(true); setPhase('sending'); });
      after(2260, () => setClicking(false));
      // Sent
      after(3100, () => setPhase('sent'));
      after(4600, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, []);

  const job = activeJob || HIW_JOBS[0];

  return (
    <div style={{ position: 'relative', overflow: 'visible', flex: 1, display: 'flex', flexDirection: 'column', background: '#0d0d0d' }}>
      {/* Credits row */}
      <div style={{ padding: '6px 11px 7px', fontSize: 9.5, color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        0 of 42 credits used today
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '9px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[{ k: 'ENROLLED', v: 4 }, { k: 'SENT', v: 2 }, { k: 'REPLIED', v: 1 }].map(({ k, v }) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)', letterSpacing: '0.07em', marginTop: 3, textTransform: 'uppercase' }}>{k}</div>
          </div>
        ))}
      </div>

      {/* Active job card */}
      <div style={{ padding: '9px 11px', borderBottom: '1px solid rgba(255,255,255,0.06)', minHeight: 56 }}>
        {activeJob ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: job.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{job.logo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{job.title}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{job.co}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.28)', fontSize: 10 }}>
            <span className="dotpulse" />
            Detecting active job…
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '9px 11px' }}>
        {phase === 'detecting' && (
          <div style={{ padding: '7px 0', borderRadius: 7, background: 'rgba(37,99,235,0.14)', border: '1px solid rgba(37,99,235,0.18)', color: 'rgba(255,255,255,0.2)', fontSize: 10.5, textAlign: 'center', fontWeight: 600 }}>
            Send Application — 1 credit
          </div>
        )}
        {phase === 'ready' && (
          <div style={{ padding: '7px 0', borderRadius: 7, background: '#2563eb', color: 'white', fontSize: 10.5, textAlign: 'center', fontWeight: 600 }}>
            Send Application — 1 credit
          </div>
        )}
        {phase === 'sending' && (
          <div style={{ padding: '7px 0', borderRadius: 7, background: '#1d4ed8', color: 'rgba(255,255,255,0.7)', fontSize: 10.5, textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Sending…
          </div>
        )}
        {phase === 'sent' && (
          <div style={{ padding: '7px 0', borderRadius: 7, background: 'rgba(5,118,66,0.15)', border: '1px solid rgba(5,118,66,0.3)', color: '#4ade80', fontSize: 10.5, textAlign: 'center', fontWeight: 600 }}>
            ✓ Application Sent
          </div>
        )}
        <div style={{ textAlign: 'center', fontSize: 8.5, color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>
          Personalized email sent from your Gmail.
        </div>
      </div>

      {/* Cursor — positioned relative to this panel wrapper */}
      <div style={{
        position: 'absolute', left: curX, top: curY, pointerEvents: 'none', zIndex: 99,
        transition: 'left 0.44s cubic-bezier(0.22,1,0.36,1), top 0.44s cubic-bezier(0.22,1,0.36,1), transform 0.1s ease',
        transform: clicking ? 'scale(0.74)' : 'scale(1)',
        filter: clicking ? 'drop-shadow(0 0 7px rgba(99,102,241,0.95))' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
      }}>
        <Icon name="cursor" size={20} />
      </div>
    </div>
  );
}

// ── Step 3 sent panel: cursor clicks "View Dashboard" button ──
function HiwSentPanel() {
  const [clicking, setClicking] = useStateHIW(false);
  useEffectHIW(() => {
    let timers = [];
    const after = (ms, fn) => { const t = setTimeout(fn, ms); timers.push(t); };
    const loop = () => {
      setClicking(false);
      after(900,  () => setClicking(true));
      after(1070, () => setClicking(false));
      after(2800, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <div style={{ position: 'relative', overflow: 'visible', flex: 1, display: 'flex', flexDirection: 'column', background: '#0d0d0d' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px 10px 8px', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#4ade80', paddingBottom: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} /> Sent successfully
        </div>
        <div style={{ padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(5,118,66,0.15)', border: '1px solid rgba(5,118,66,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✓</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Sent to m.v@northwind.co</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Resume attached · delivery confirmed</div>
          </div>
        </div>
        <div style={{ padding: '0 2px' }}>
          <div style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, animation: 'pulseGlow 2s ease infinite' }}>
            📊 View Dashboard →
          </div>
        </div>
      </div>
      {/* Cursor on the View Dashboard button */}
      <div style={{
        position: 'absolute', left: 80, top: 155, pointerEvents: 'none', zIndex: 99,
        transition: 'transform 0.12s ease',
        transform: clicking ? 'scale(0.74)' : 'scale(1)',
        filter: clicking ? 'drop-shadow(0 0 8px rgba(99,102,241,1))' : 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))',
      }}>
        <Icon name="cursor" size={22} />
      </div>
    </div>
  );
}

// ── 3-col LinkedIn browser body ──
function HiwLinkedIn({ step, typed }) {
  const jpPanel = () => {
    // Step 1: detect + enroll with animated cursor
    if (step === 1) return <HiwEnrollPanel />;
    // Step 2: AI scanning
    if (step === 2) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px 10px 8px', gap: 6, background: '#0d0d0d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', paddingBottom: 4 }}>
          <span className="dotpulse" /> AI analyzing…
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '2px 0' }}>
          {[
            { k: 'Resume parsed', v: '14 signals' },
            { k: 'JD analyzed', v: '9 keywords' },
            { k: 'Contact found', v: 'm.v@northwind.co' },
          ].map(({ k, v }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 9px', background: 'rgba(5,118,66,0.1)', border: '1px solid rgba(5,118,66,0.22)', borderRadius: 7 }}>
              <span style={{ fontSize: 10, color: '#4ade80' }}>✓</span>
              <span style={{ fontSize: 11, flex: 1, color: 'rgba(255,255,255,0.8)' }}>{k}</span>
              <span style={{ fontSize: 9.5, color: '#4ade80', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    );
    // Step 3: cover letter generation
    if (step === 3) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px 10px 8px', gap: 5, background: '#0d0d0d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', paddingBottom: 4 }}>
          <span className="dotpulse" /> Generating…
        </div>
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>To · m.v@northwind.co</div>
        <div style={{ fontSize: 10.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', flex: 1, overflow: 'hidden' }}>
          {typed}<span className="caret" />
        </div>
      </div>
    );
    // Step 4: sent
    if (step === 4) return <HiwSentPanel />;
    return null;
  };

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#f3f2ef', overflow: 'hidden' }}>
      {/* Job list */}
      <div style={{ width: 168, flexShrink: 0, background: '#f3f2ef', borderRight: '1px solid #e0dfdc', padding: '6px 5px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'hidden' }}>
        <div style={{ padding: '3px 6px 5px', fontSize: 9.5, color: '#666', fontFamily: 'var(--font-mono)' }}>99+ results</div>
        {HIW_JOBS.map((j, i) => (
          <div key={i} style={{ display: 'flex', gap: 5, padding: '6px 7px', borderRadius: 6, background: i === 0 ? 'white' : 'rgba(255,255,255,0.7)', border: i === 0 ? '1px solid #0a66c2' : '1px solid #e0dfdc', boxShadow: i === 0 ? '-2px 0 0 0 #0a66c2 inset' : 'none', alignItems: 'flex-start' }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>{j.title}</div>
              <div style={{ fontSize: 8.5, color: '#666', marginTop: 2 }}>{j.co} · {i === 0 ? '2d · 784' : i === 1 ? '1w · 142' : '5d · 61'}</div>
              <div style={{ display: 'flex', gap: 3, marginTop: 3, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 999, background: '#e8f3ff', color: '#0a66c2', border: '1px solid #b6d4f7' }}>Easy Apply</span>
                {step >= 4 && i === 0 && <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 999, background: '#e6f4ea', color: '#057642', border: '1px solid #b8e6cc' }}>✓ Applied</span>}
              </div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 3, padding: '6px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.5)', border: '1px solid #e0dfdc', display: 'flex', gap: 5, alignItems: 'flex-start' }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, background: '#4c4b99', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 700, flexShrink: 0 }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 500, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>Product Manager</div>
            <div style={{ fontSize: 8.5, color: '#888', marginTop: 2 }}>Atlas Health · SF</div>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex: 1, background: 'white', padding: '11px 13px', minWidth: 0, borderRight: '1px solid #e0dfdc', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 7 }}>
          <div style={{ width: 26, height: 26, borderRadius: 5, background: '#1e3a5f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>N</div>
          <div>
            <div style={{ fontSize: 10, color: '#0a66c2', fontWeight: 600 }}>Northwind</div>
            <div style={{ fontSize: 8.5, color: '#666' }}>Series A · 48 employees</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em', marginBottom: 3, lineHeight: 1.2 }}>Founding Product Engineer</div>
        <div style={{ fontSize: 9, color: '#666', marginBottom: 6, display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>San Francisco</span><span>·</span><span>2d ago</span><span>·</span><span style={{ color: '#d93900', fontWeight: 600 }}>784 applicants</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 7 }}>
          <button style={{ padding: '4px 8px', borderRadius: 4, background: '#0a66c2', color: 'white', fontSize: 10, fontWeight: 600, border: 'none' }}>Easy Apply</button>
          <button style={{ padding: '4px 7px', borderRadius: 4, border: '1px solid #c8c7c4', background: 'white', color: '#333', fontSize: 10, fontWeight: 600 }}>Save</button>
        </div>
        <div style={{ padding: '5px 8px', background: '#f0faf5', borderRadius: 5, border: '1px solid #b8e6cc', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, fontSize: 9.5 }}>
          <span style={{ color: '#057642' }}>✦</span>
          <span style={{ color: '#1a1a1a' }}><strong>Top applicant</strong> — profile matches 94% of JD</span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>About the job</div>
        {[95, 82, 68, 88, 55, 74, 61].map((w, i) => (
          <div key={i} style={{ height: 5, borderRadius: 3, background: '#f0ede8', width: w + '%', marginBottom: 4 }} />
        ))}
        <div style={{ fontSize: 10, fontWeight: 700, color: '#1a1a1a', margin: '8px 0 4px' }}>Skills</div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {['TypeScript', 'Go', 'PostgreSQL', 'React'].map(s => (
            <span key={s} style={{ fontSize: 8.5, padding: '1px 6px', borderRadius: 999, border: '1px solid #0a66c2', color: '#0a66c2', background: '#eef3fa' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* JP sidebar — always dark */}
      <div style={{ width: 220, flexShrink: 0, background: '#0d0d0d', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 12px rgba(0,0,0,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 11px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <div style={{ width: 15, height: 15, borderRadius: 4, flexShrink: 0, background: 'radial-gradient(120% 120% at 20% 10%, rgba(255,255,255,0.5) 0%, transparent 40%), linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'white', flex: 1 }}>ToInbox</span>
          <span style={{ fontSize: 8.5, padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.5)' }}>Dashboard</span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>−</span>
        </div>
        {jpPanel()}
      </div>
    </div>
  );
}

// ── Step 0: Sign in at toinbox.app → add the Chrome extension ──
function HiwInstallScene({ debugPhase } = {}) {
  // phases: 'site' | 'signing' | 'signedin' | 'store' | 'adding' | 'added'
  const [phase, setPhase] = useStateHIW(debugPhase || 'site');
  const [curX, setCurX] = useStateHIW('46%');
  const [curY, setCurY] = useStateHIW(330);
  const [clicking, setClicking] = useStateHIW(false);

  useEffectHIW(() => {
    if (debugPhase) return;
    let timers = [];
    const after = (ms, fn) => { timers.push(setTimeout(fn, ms)); };
    const loop = () => {
      setPhase('site'); setClicking(false); setCurX('46%'); setCurY(320);
      after(700,  () => { setCurX('87%'); setCurY(18); });
      after(1500, () => { setClicking(true); });
      after(1660, () => { setClicking(false); setPhase('signing'); });
      after(2750, () => setPhase('signedin'));
      after(3750, () => { setPhase('store'); setCurX('50%'); setCurY(240); });
      after(4550, () => { setCurX('80%'); setCurY(96); });
      after(5350, () => setClicking(true));
      after(5510, () => { setClicking(false); setPhase('adding'); });
      after(6450, () => setPhase('added'));
      after(8950, loop);
    };
    loop();
    return () => timers.forEach(clearTimeout);
  }, []);

  const onStore = phase === 'store' || phase === 'adding' || phase === 'added';
  const logoGrad = 'radial-gradient(120% 120% at 20% 10%, rgba(255,255,255,0.5) 0%, transparent 40%), linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))';

  return (
    <div className="hiw-browser">
      {/* Chrome bar */}
      <div className="hiw-browser-chrome">
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff6058', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbe2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c941', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, height: 22, borderRadius: 5, background: '#f3f2ef', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 9px', fontSize: 10, color: '#555', fontFamily: 'var(--font-mono)', gap: 5, minWidth: 0, overflow: 'hidden', marginLeft: 10 }}>
          <Icon name="lock" size={9} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {onStore ? 'chromewebstore.google.com/detail/toinbox' : 'toinbox.app'}
          </span>
        </div>
        {/* Pinned extension icon appears once added */}
        <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: phase === 'added' ? logoGrad : '#eceae6', boxShadow: phase === 'added' ? 'inset 0 0 0 1px rgba(255,255,255,0.22), 0 0 0 2px rgba(37,99,235,0.25)' : 'inset 0 0 0 1px var(--line)', transition: 'background 0.3s ease, box-shadow 0.3s ease' }} />
      </div>

      {/* Body */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', background: '#fbfbfa' }}>
        {!onStore && (
          /* ── toinbox.app site ── */
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            {/* nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', borderBottom: '1px solid #f0ede8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: logoGrad, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em' }}>ToInbox</span>
              </div>
              <div style={{ display: 'flex', gap: 20, fontSize: 12.5, color: '#555' }}>
                <span>Why</span><span>How it works</span><span>Product</span><span>Pricing</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '8px 15px', borderRadius: 999,
                background: '#111', color: 'white', fontSize: 12.5, fontWeight: 600,
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                transform: (phase !== 'site') ? 'scale(0.97)' : 'scale(1)',
                boxShadow: (phase !== 'site') ? '0 0 0 3px rgba(37,99,235,0.25)' : '0 2px 8px rgba(0,0,0,0.18)',
              }}>
                Sign In <Icon name="arrow" size={13} />
              </div>
            </div>
            {/* hero */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', maxWidth: 560 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, alignSelf: 'flex-start', fontSize: 10.5, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', padding: '5px 11px', borderRadius: 999, border: '1px solid #e6e3dd', background: 'white' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563eb' }} /> Chrome extension · works inside LinkedIn
              </span>
              <div style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1.08, marginTop: 16 }}>
                Apply through founders,<br />not portals.
              </div>
              <div style={{ fontSize: 13.5, color: '#555', lineHeight: 1.55, marginTop: 14, maxWidth: 420 }}>
                Sign in, add the extension, and ToInbox sends your application straight to the people who decide.
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: 999, background: '#2563eb', color: 'white', fontSize: 13, fontWeight: 600 }}>
                  Sign In <Icon name="arrow" size={14} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 16px', borderRadius: 999, border: '1px solid #e6e3dd', color: '#444', fontSize: 13, fontWeight: 600 }}>
                  <Icon name="play" size={11} /> How it works
                </div>
              </div>
            </div>

            {/* sign-in card overlay */}
            {(phase === 'signing' || phase === 'signedin') && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,22,0.32)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeSlideIn 0.25s ease' }}>
                <div style={{ width: 300, background: 'white', borderRadius: 16, padding: '26px 26px 22px', boxShadow: '0 24px 60px rgba(0,0,0,0.28)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 4 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: logoGrad, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)' }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginTop: 12, letterSpacing: '-0.01em' }}>Sign in to ToInbox</div>
                  {phase === 'signing' ? (
                    <>
                      <div style={{ fontSize: 12, color: '#777', marginTop: 3 }}>Continue with your Google account</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', marginTop: 16, padding: '11px 0', borderRadius: 10, border: '1px solid #e3e0db', background: 'white', fontSize: 13, fontWeight: 600, color: '#333' }}>
                        <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #d6d3cd', borderTopColor: '#2563eb', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                        Signing in…
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#057642', marginTop: 14, animation: 'fadeSlideIn 0.3s ease' }}>
                        <Icon name="check" size={24} />
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1a1a1a', marginTop: 12 }}>Signed in as Arjun</div>
                      <div style={{ fontSize: 11.5, color: '#777', marginTop: 2 }}>arjun.sharma@gmail.com</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {onStore && (
          /* ── Chrome Web Store ── */
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff' }}>
            {/* store top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 22px', borderBottom: '1px solid #eceae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#3c4043' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'conic-gradient(#ea4335,#fbbc04,#34a853,#4285f4,#ea4335)' }} />
                <span style={{ fontWeight: 500 }}>chrome web store</span>
              </div>
            </div>
            {/* product */}
            <div style={{ display: 'flex', gap: 18, padding: '24px 30px 18px', alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: logoGrad, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 700, color: '#202124', letterSpacing: '-0.01em', lineHeight: 1.25 }}>ToInbox — Send your job application directly to leadership mailboxes.</div>
                <div style={{ fontSize: 12.5, color: '#5f6368', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#1a73e8' }}>toinbox.app</span><span>·</span><span>Productivity</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 12, color: '#5f6368' }}>
                  <span style={{ color: '#f9ab00', letterSpacing: 1 }}>★★★★★</span>
                  <span style={{ fontWeight: 600, color: '#202124' }}>4.9</span>
                  <span>(1,284)</span><span>·</span><span>40,000+ users</span>
                </div>
              </div>
              {/* Add to Chrome button */}
              <div style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                background: phase === 'added' ? '#e6f4ea' : '#1a73e8',
                color: phase === 'added' ? '#137333' : 'white',
                border: phase === 'added' ? '1px solid #b8e6cc' : 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                boxShadow: phase === 'adding' ? '0 0 0 3px rgba(26,115,232,0.3)' : 'none',
                transform: phase === 'adding' ? 'scale(0.97)' : 'scale(1)',
              }}>
                {phase === 'added' ? <><Icon name="check" size={15} /> Added to Chrome</> : 'Add to Chrome'}
              </div>
            </div>
            {/* screenshot strip — real Chrome Web Store screenshots */}
            <div style={{ display: 'flex', gap: 12, padding: '4px 30px 20px' }}>
              {['assets/store-shot-1.jpg', 'assets/store-shot-3.jpg', 'assets/store-shot-4.jpg'].map((src, i) => (
                <div key={i} style={{ flex: 1, height: 150, borderRadius: 10, border: '1px solid #eceae6', overflow: 'hidden', background: '#f6f5f3' }}>
                  <img src={src} alt={`ToInbox screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
                </div>
              ))}
            </div>

            {/* add-confirm dialog */}
            {phase === 'adding' && (
              <div style={{ position: 'absolute', top: 8, left: 22, width: 320, background: 'white', borderRadius: 12, border: '1px solid #e3e0db', boxShadow: '0 18px 44px rgba(0,0,0,0.22)', padding: '16px 18px', animation: 'fadeSlideIn 0.22s ease' }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: '#202124' }}>Add “ToInbox — Send your job application directly to leadership mailboxes”?</div>
                <div style={{ fontSize: 12, color: '#5f6368', marginTop: 8, lineHeight: 1.5 }}>It can read and change your data on linkedin.com and mail.google.com</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', padding: '7px 12px' }}>Cancel</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'white', background: '#1a73e8', padding: '7px 14px', borderRadius: 8 }}>Add extension</div>
                </div>
              </div>
            )}

            {/* added toast */}
            {phase === 'added' && (
              <div style={{ position: 'absolute', top: 10, right: 16, width: 250, background: 'white', borderRadius: 12, border: '1px solid #e3e0db', boxShadow: '0 14px 36px rgba(0,0,0,0.2)', padding: '13px 14px', display: 'flex', gap: 10, alignItems: 'center', animation: 'fadeSlideIn 0.3s ease' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: logoGrad, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#202124' }}>ToInbox added to Chrome</div>
                  <div style={{ fontSize: 11, color: '#5f6368', marginTop: 2 }}>Pinned to your toolbar — open LinkedIn</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cursor */}
        <div style={{
          position: 'absolute', left: curX, top: curY, pointerEvents: 'none', zIndex: 120,
          transition: 'left 0.5s cubic-bezier(0.22,1,0.36,1), top 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.1s ease',
          transform: clicking ? 'scale(0.74)' : 'scale(1)',
          filter: clicking ? 'drop-shadow(0 0 7px rgba(37,99,235,0.9))' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))',
        }}>
          <Icon name="cursor" size={20} />
        </div>
      </div>
    </div>
  );
}

function HowitworksBrowser({ step, typed, replyVisible }) {
  if (step === 0) return <HiwInstallScene />;
  const isDash = step >= 5;
  return (
    <div className="hiw-browser">
      {/* Chrome bar */}
      <div className="hiw-browser-chrome">
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff6058', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbe2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c941', display: 'inline-block' }} />
        </div>
        {!isDash && (
          <div style={{ display: 'flex', gap: 3, marginLeft: 10 }}>
            <div style={{ fontSize: 10, padding: '2px 9px', borderRadius: 5, background: 'white', border: '1px solid var(--line)', color: '#555', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#0a66c2', display: 'inline-block' }} />LinkedIn
            </div>
            <div style={{ fontSize: 10, padding: '2px 9px', borderRadius: 5, color: '#888' }}>Gmail</div>
          </div>
        )}
        <div style={{ flex: 1, height: 22, borderRadius: 5, background: isDash ? 'white' : '#f3f2ef', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 9px', fontSize: 10, color: '#555', fontFamily: 'var(--font-mono)', gap: 5, minWidth: 0, overflow: 'hidden', marginLeft: isDash ? 12 : 0 }}>
          <Icon name="lock" size={9} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isDash ? 'app.toinbox.co/dashboard' : 'linkedin.com/jobs/search/?keywords=founding+engineer'}
          </span>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: 'radial-gradient(120% 120% at 20% 10%, rgba(255,255,255,0.5) 0%, transparent 40%), linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)' }} />
      </div>

      {isDash
        ? <HiwDashboard replyVisible={step === 6} />
        : <HiwLinkedIn step={step} typed={typed} />
      }
    </div>
  );
}

function HowItWorks({ speedMultiplier = 1 }) {
  const [active, setActive] = useStateHIW(0);
  const [typed, setTyped] = useStateHIW('');
  const [visible, setVisible] = useStateHIW(true);

  // Inject smooth CSS keyframe for progress bar — avoids rAF/setState jank
  useEffectHIW(() => {
    const s = document.createElement('style');
    s.id = 'hiw-bar-kf';
    s.textContent = '@keyframes hiwBarFill { from { width:0% } to { width:100% } }';
    document.head.appendChild(s);
    return () => { const el = document.getElementById('hiw-bar-kf'); if (el) el.remove(); };
  }, []);
  const tickRef = useRefHIW(null);
  const typeRef = useRefHIW(null);
  const startedRef = useRefHIW(false);
  const activeRef = useRefHIW(0);

  useEffectHIW(() => {
    const el = document.getElementById('how-section');
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) { startedRef.current = true; start(); }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    const fb = setTimeout(() => { if (!startedRef.current) { startedRef.current = true; start(); } }, 1800);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);

  const transitionTo = (idx) => {
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      activeRef.current = idx;
      setTyped('');
      setVisible(true);
    }, 180);
  };

  const start = () => {
    let idx = 0;
    activeRef.current = 0;
    setActive(0); setVisible(true);
    let startTime = Date.now();
    cancelAnimationFrame(tickRef.current);

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= STEP_MS[idx] / speedMultiplier) {
        const next = (idx + 1) % HIW_STEPS.length;
        idx = next;
        startTime = Date.now();
        transitionTo(next);
      }
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
  };

  // Typing effect for step 2 (cover letter)
  useEffectHIW(() => {
    if (active === 3) {
      setTyped('');
      let i = 0;
      const type = () => {
        if (i <= FULL_LETTER.length) {
          setTyped(FULL_LETTER.slice(0, i));
          i += 5;
          typeRef.current = setTimeout(type, 16);
        }
      };
      typeRef.current = setTimeout(type, 200);
    } else {
      clearTimeout(typeRef.current);
    }
    return () => clearTimeout(typeRef.current);
  }, [active]);

  useEffectHIW(() => () => { cancelAnimationFrame(tickRef.current); clearTimeout(typeRef.current); }, []);

  const jumpTo = (i) => {
    cancelAnimationFrame(tickRef.current);
    transitionTo(i);
    let idx = i;
    let startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= STEP_MS[idx] / speedMultiplier) {
        const next = (idx + 1) % HIW_STEPS.length;
        idx = next;
        startTime = Date.now();
        transitionTo(next);
      }
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="how" id="how-section">
      <div style={{ maxWidth: 1560, margin: '0 auto', padding: '0 clamp(24px, 5vw, 72px)' }}>
        <div className="section-head" data-reveal>
          <span className="eyebrow"><span className="dot" />How it works</span>
          <h2 className="h-section">From LinkedIn tab to the right inbox<br />in fifteen seconds.</h2>
          <p className="lead">ToInbox lives inside the LinkedIn workflow you already use. Watch it happen live.</p>
        </div>

        <div className="hiw-cinema-grid" data-reveal>
          {/* Step list */}
          <div className="hiw-steps-col">
            {HIW_STEPS.map((st, i) => (
              <div
                key={i}
                className={`hiw-step-row ${i === active ? 'active' : ''} ${i < active ? 'done' : ''}`}
                onClick={() => jumpTo(i)}
              >
                <div className="hiw-step-num">
                  {i < active ? <Icon name="check" size={11} /> : String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="hiw-step-title">{st.t}</div>
                  {i === active && <div className="hiw-step-sub">{st.s}</div>}
                </div>
                {i === active && (
                  <div className="hiw-step-bar">
                    <span key={active} style={{ animation: `hiwBarFill ${STEP_MS[active]}ms linear forwards` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continuous browser */}
          <div className="hiw-browser-col" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.18s ease' }}>
            <HowitworksBrowser step={active} typed={typed} replyVisible={active === 6} />
          </div>
        </div>
      </div>
    </div>
  );
}


function HeroBrowser({ speedMultiplier = 1 }) {
  const [active, setActive] = useStateHIW(0);
  const [typed, setTyped] = useStateHIW('');
  const [visible, setVisible] = useStateHIW(true);
  const tickRef = useRefHIW(null);
  const typeRef = useRefHIW(null);
  const activeRef = useRefHIW(0);

  const transitionTo = (idx) => {
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      activeRef.current = idx;
      setTyped('');
      setVisible(true);
    }, 180);
  };

  useEffectHIW(() => {
    let idx = 1;
    activeRef.current = 1;
    setActive(1); setVisible(true);
    let startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= STEP_MS[idx] / speedMultiplier) {
        let next = (idx + 1) % HIW_STEPS.length;
        if (next === 0) next = 1;
        idx = next;
        startTime = Date.now();
        transitionTo(next);
      }
      tickRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(tickRef.current); clearTimeout(typeRef.current); };
  }, []);

  useEffectHIW(() => {
    if (active === 3) {
      setTyped('');
      let i = 0;
      const type = () => {
        if (i <= FULL_LETTER.length) {
          setTyped(FULL_LETTER.slice(0, i));
          i += 8;
          typeRef.current = setTimeout(type, 10);
        }
      };
      typeRef.current = setTimeout(type, 100);
    } else {
      clearTimeout(typeRef.current);
    }
    return () => clearTimeout(typeRef.current);
  }, [active]);

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.18s ease' }}>
      <div style={{ height: 620 }} className="hiw-browser-col">
        <HowitworksBrowser step={active} typed={typed} replyVisible={active === 6} />
      </div>
    </div>
  );
}
window.HeroBrowser = HeroBrowser;
window.HiwInstallScene = HiwInstallScene;

window.HowItWorks = HowItWorks;
