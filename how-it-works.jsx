// JobPilot — How It Works: Continuous cinematic simulation
const { useState: useStateHIW, useEffect: useEffectHIW, useRef: useRefHIW } = React;

const HIW_STEPS = [
  { t: 'LinkedIn opens, JobPilot detects roles', s: 'Extension loads instantly on any LinkedIn jobs page — scans every card, identifies startup roles, and surfaces founder emails in the sidebar.' },
  { t: 'Enroll with one click', s: 'Hit Enroll inside the panel. Your cursor never leaves the extension — no form, no portal, no separate tab.' },
  { t: 'AI scans resume + JD', s: 'Cross-references your experience and the job description in seconds. Builds a 94% match profile automatically.' },
  { t: 'Cover letter generated', s: 'Specific, short, no template smell. Cites the role, the changelog, the founder by name. 200+ words.' },
  { t: 'Sent to founder inbox', s: 'Email + resume lands in the founder\'s personal inbox. Skips ATS entirely. No Easy Apply queue.' },
  { t: 'Dashboard tracks it all', s: 'Click "View Dashboard" in the panel — every metric live: enrolled, sent, opened, replied, interviews scheduled.' },
  { t: 'Founder replies', s: 'Founders reply to intent. You land in a real conversation — two steps ahead of every other applicant.' },
];

const STEP_MS = [3000, 2000, 2800, 3200, 2000, 3200, 3200];

const HIW_JOBS = [
  { logo: 'N', bg: '#1e3a5f', title: 'Founding Product Engineer', co: 'Northwind', match: 94, email: 'm.v@northwind.co' },
  { logo: 'L', bg: '#3730a3', title: 'Head of Growth', co: 'Lumen AI', match: 87, email: 'theo@lumen.ai' },
  { logo: 'R', bg: '#7c2d12', title: 'Backend Engineer', co: 'Reed Labs', match: 78, email: 'sana@reedlabs.io' },
];

const FULL_LETTER = `Hi Marcus,

Saw Northwind's Founding PE role — your March changelog on shipping v3 in six weeks is exactly the pace I want.

Two years doing this: solo-shipped 3 products, grew last app 2k → 80k MAU. Full-stack across TS, Go, Postgres.

Resume attached. Happy to pair on a real bug.

— Arjun`;

// ── Dashboard full view ──
function HiwDashboard({ replyVisible }) {
  const APPS = [
    { logo: 'N', bg: '#1e3a5f', co: 'Northwind', role: 'Founding PE', sent: 'Mon 6:02 AM', status: replyVisible ? 'replied' : 'opened', statusLabel: replyVisible ? 'Replied ✓' : 'Opened' },
    { logo: 'L', bg: '#3730a3', co: 'Lumen AI', role: 'Head of Growth', sent: 'Mon 8:15 AM', status: 'interview', statusLabel: 'Interview Set' },
    { logo: 'R', bg: '#7c2d12', co: 'Reed Labs', role: 'Backend Eng.', sent: 'Tue 9:30 AM', status: 'fwd', statusLabel: 'Fwd to HR' },
    { logo: 'P', bg: '#5b34a1', co: 'Plover', role: 'Product Mgr', sent: 'Tue 11:00 AM', status: 'opened', statusLabel: 'Opened' },
    { logo: 'A', bg: '#1b6448', co: 'Atlas Health', role: 'Backend Eng.', sent: 'Wed 7:00 AM', status: 'sent', statusLabel: 'Sent' },
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
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>JobPilot</span>
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
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>42 credits left</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '14px 16px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a' }}>Dashboard</div>
            <div style={{ fontSize: 10.5, color: '#888', marginTop: 1 }}>Week of May 12, 2026 · Arjun Sharma</div>
          </div>
          <div style={{ fontSize: 10.5, padding: '4px 10px', borderRadius: 6, background: '#e6f4ea', color: '#057642', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>● Live</div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {[
            { k: 'Enrolled', v: 18, color: '#555' },
            { k: 'Sent', v: 14, color: '#555' },
            { k: 'Opened', v: 11, color: 'var(--accent)' },
            { k: 'Replied', v: replyVisible ? 6 : 5, color: '#057642' },
            { k: 'Interviews', v: 4, color: '#1a56db' },
            { k: 'Queue skip', v: 14, color: '#b45309' },
          ].map(({ k, v, color }) => (
            <div key={k} style={{ padding: '8px 8px', background: 'white', borderRadius: 8, border: '1px solid #e8e7e4', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', color, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 8.5, color: '#999', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>{k}</div>
            </div>
          ))}
        </div>

        {/* App list */}
        <div style={{ background: 'white', borderRadius: 10, border: '1px solid #e8e7e4', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '26px 1fr 1fr 90px 70px', gap: 8, padding: '6px 10px', borderBottom: '1px solid #f0ede8', fontSize: 9, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)', alignItems: 'center' }}>
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
              <div style={{ fontSize: 10.5, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role}</div>
              <div style={{ fontSize: 10, color: '#999', fontFamily: 'var(--font-mono)' }}>{a.sent}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, fontWeight: 600, fontFamily: 'var(--font-mono)', ...(statusColor[a.status] || {}) }}>{a.statusLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reply thread — visible step 6 */}
        {replyVisible && (
          <div style={{ background: 'white', borderRadius: 10, border: '1px solid #b8e6cc', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6, animation: 'fadeSlideIn 0.35s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 9, flexShrink: 0 }}>M</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1a1a' }}>Marcus Webb · Northwind</div>
                <div style={{ fontSize: 10, color: '#888' }}>Mon 9:14 AM · 2h after your send</div>
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

// ── 3-col LinkedIn browser body ──
function HiwLinkedIn({ step, typed }) {
  const jpPanel = () => {
    if (step === 0) return (
      <div className="jp-sidebar-body">
        <div className="jp-detect-status"><span className="ok-dot" /> 3 startup roles detected</div>
        {HIW_JOBS.map((j, i) => (
          <div key={i} className="jp-job-entry">
            <div className="jp-job-entry-row">
              <div className="jp-job-logo-sm" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                <div style={{ fontSize: 9.5, color: '#057642', marginTop: 2 }}>{j.email}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{j.match}%</div>
            </div>
          </div>
        ))}
      </div>
    );
    if (step === 1) return (
      <div className="jp-sidebar-body">
        <div className="jp-detect-status"><span className="ok-dot" /> 3 startup roles detected</div>
        {HIW_JOBS.map((j, i) => (
          <div key={i} className={`jp-job-entry${i === 0 ? ' active' : ''}`}>
            <div className="jp-job-entry-row">
              <div className="jp-job-logo-sm" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.title}</div>
                <div style={{ fontSize: 9.5, color: '#888' }}>{j.co}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? 'var(--accent)' : '#bbb' }}>{j.match}%</div>
                <button className="jp-enroll-btn-new idle" style={{ fontSize: 9.5, padding: '3px 8px', opacity: i === 0 ? 1 : 0.45 }}>{i === 0 ? '⚡ Enroll' : 'Enroll'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    if (step === 2) return (
      <div className="jp-sidebar-body">
        <div className="jp-detect-status"><span className="dotpulse" /> AI analyzing…</div>
        <div style={{ padding: '8px 8px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { k: 'Resume parsed', v: '14 signals', ok: true },
            { k: 'JD analyzed', v: '9 keywords', ok: true },
            { k: 'Founder found', v: 'm.v@northwind.co', ok: true },
            { k: 'Match score', v: '94%', ok: true },
          ].map(({ k, v, ok }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 9px', background: '#f0faf5', border: '1px solid #b8e6cc', borderRadius: 7 }}>
              <span style={{ fontSize: 10, color: '#057642' }}>✓</span>
              <span style={{ fontSize: 11, flex: 1 }}>{k}</span>
              <span style={{ fontSize: 9.5, color: '#057642', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ padding: '8px 10px', background: 'var(--accent-soft)', borderRadius: 7, border: '1px solid color-mix(in oklab, var(--accent) 30%, transparent)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)' }}>94%</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-ink)' }}>Match score</div>
              <div style={{ fontSize: 9.5, color: 'var(--accent-ink)', opacity: 0.7 }}>Top 6% of applicants</div>
            </div>
          </div>
        </div>
      </div>
    );
    if (step === 3) return (
      <div className="jp-sidebar-body">
        <div className="jp-detect-status"><span className="dotpulse" /> Generating…</div>
        <div style={{ flex: 1, padding: '6px 8px 0', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>To · m.v@northwind.co</div>
          <div style={{ fontSize: 10.5, lineHeight: 1.55, color: '#333', whiteSpace: 'pre-wrap', flex: 1, overflow: 'hidden' }}>
            {typed}<span className="caret" />
          </div>
        </div>
      </div>
    );
    if (step === 4) return (
      <div className="jp-sidebar-body">
        <div className="jp-detect-status"><span className="ok-dot" /> Sent successfully</div>
        <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✓</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>Sent to m.v@northwind.co</div>
            <div style={{ fontSize: 10.5, color: '#888', marginTop: 3 }}>Resume attached · delivery confirmed</div>
          </div>
        </div>
        <div style={{ padding: '0 10px 10px' }}>
          <div style={{ width: '100%', padding: '10px 0', borderRadius: 8, background: 'var(--ink)', color: 'white', fontWeight: 600, fontSize: 12, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, animation: 'pulseGlow 2s ease infinite' }}>
            📊 View Dashboard →
          </div>
        </div>
      </div>
    );
    return null;
  };

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0, background: '#f3f2ef', overflow: 'hidden' }}>
      {/* Job list */}
      <div style={{ width: 168, flexShrink: 0, background: '#f3f2ef', borderRight: '1px solid #e0dfdc', padding: '6px 5px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'hidden' }}>
        <div style={{ padding: '3px 6px 5px', fontSize: 9.5, color: '#888', fontFamily: 'var(--font-mono)' }}>99+ results</div>
        {HIW_JOBS.map((j, i) => (
          <div key={i} style={{ display: 'flex', gap: 5, padding: '6px 7px', borderRadius: 6, background: i === 0 ? 'white' : 'rgba(255,255,255,0.7)', border: i === 0 ? '1px solid #0a66c2' : '1px solid #e0dfdc', boxShadow: i === 0 ? '-2px 0 0 0 #0a66c2 inset' : 'none', alignItems: 'flex-start' }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: j.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8.5, fontWeight: 700, flexShrink: 0 }}>{j.logo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>{j.title}</div>
              <div style={{ fontSize: 8.5, color: '#888', marginTop: 2 }}>{j.co} · {i === 0 ? 'San Francisco' : i === 1 ? 'Delhi, India' : 'Remote'}</div>
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
            <div style={{ fontSize: 9.5, fontWeight: 500, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>Product Manager</div>
            <div style={{ fontSize: 8.5, color: '#aaa', marginTop: 2 }}>Atlas Health · SF</div>
          </div>
        </div>
      </div>

      {/* Detail */}
      <div style={{ flex: 1, background: 'white', padding: '11px 13px', minWidth: 0, borderRight: '1px solid #e0dfdc', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', marginBottom: 7 }}>
          <div style={{ width: 26, height: 26, borderRadius: 5, background: '#1e3a5f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>N</div>
          <div>
            <div style={{ fontSize: 10, color: '#0a66c2', fontWeight: 600 }}>Northwind</div>
            <div style={{ fontSize: 8.5, color: '#888' }}>Series A · 48 employees</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em', marginBottom: 3, lineHeight: 1.2 }}>Founding Product Engineer</div>
        <div style={{ fontSize: 9, color: '#888', marginBottom: 6, display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>San Francisco</span><span>·</span><span>1w ago</span><span>·</span><span style={{ color: '#d93900', fontWeight: 600 }}>811 applicants</span>
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 7 }}>
          <button style={{ padding: '4px 8px', borderRadius: 4, background: '#0a66c2', color: 'white', fontSize: 10, fontWeight: 600, border: 'none' }}>Easy Apply</button>
          <button style={{ padding: '4px 7px', borderRadius: 4, border: '1px solid #c8c7c4', background: 'white', color: '#333', fontSize: 10, fontWeight: 600 }}>Save</button>
        </div>
        <div style={{ padding: '5px 8px', background: '#f0faf5', borderRadius: 5, border: '1px solid #b8e6cc', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, fontSize: 9.5 }}>
          <span style={{ color: '#057642' }}>✦</span>
          <span><strong>Top applicant</strong> — profile matches 94% of JD</span>
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

      {/* JP sidebar */}
      <div style={{ width: 220, flexShrink: 0, background: 'white', display: 'flex', flexDirection: 'column', boxShadow: '-2px 0 10px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', borderBottom: '1px solid #f0ede8', flexShrink: 0 }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700 }}>JobPilot</span>
          <span style={{ marginLeft: 'auto', fontSize: 9, padding: '2px 6px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)' }}>42 credits</span>
        </div>
        {jpPanel()}
      </div>
    </div>
  );
}

function HowitworksBrowser({ step, typed, replyVisible }) {
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
            <div style={{ fontSize: 10, padding: '2px 9px', borderRadius: 5, color: '#999' }}>Gmail</div>
          </div>
        )}
        <div style={{ flex: 1, height: 22, borderRadius: 5, background: isDash ? 'white' : '#f3f2ef', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 9px', fontSize: 10, color: '#888', fontFamily: 'var(--font-mono)', gap: 5, minWidth: 0, overflow: 'hidden', marginLeft: isDash ? 12 : 0 }}>
          <Icon name="lock" size={9} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isDash ? 'app.jobpilot.co/dashboard' : 'linkedin.com/jobs/search/?keywords=founding+engineer'}
          </span>
        </div>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: 'linear-gradient(135deg, oklch(0.65 0.21 252), oklch(0.42 0.2 270))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: 'white', fontSize: 7.5, fontWeight: 700 }}>JP</span>
        </div>
      </div>

      {isDash
        ? <HiwDashboard replyVisible={step === 6} />
        : <HiwLinkedIn step={step} typed={typed} />
      }
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

  const start = () => {
    let idx = 0;
    setActive(0); setProgress(0);
    let startTime = Date.now();
    cancelAnimationFrame(tickRef.current);

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

  // Typing effect for step 3 (cover letter)
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
    setActive(i); setProgress(0); setTyped('');
    start();
  };

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
                    <span style={{ width: progress + '%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continuous browser */}
          <div className="hiw-browser-col">
            <HowitworksBrowser step={active} typed={typed} replyVisible={active === 6} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.HowItWorks = HowItWorks;
