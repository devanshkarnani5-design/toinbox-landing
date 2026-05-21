// JobPilot — Hero demo: click job → extension detects → send application
const { useState, useEffect, useRef } = React;

const JOBS = [
  { id: 0, co: 'Northwind', title: 'Founding Product Engineer', logo: 'N', bg: '#1e3a5f', loc: 'San Francisco', match: 94, email: 'm.v@northwind.co' },
  { id: 1, co: 'Lumen AI', title: 'Head of Growth', logo: 'L', bg: '#3730a3', loc: 'Delhi, India', match: 87, email: 'theo@lumen.ai' },
  { id: 2, co: 'Reed Labs', title: 'Backend Engineer', logo: 'R', bg: '#7c2d12', loc: 'Remote', match: 78, email: 'sana@reedlabs.io' },
];

const JOB_META = [
  { time: '2d ago', applicants: '784 applicants' },
  { time: '1w ago', applicants: '142 applicants' },
  { time: '5d ago', applicants: '61 applicants' },
];

function JPPanel({ phase, activeJob, sentToday, stats, sendBtnRef, showDash, dashStats, dashRows, replyVisible }) {
  if (showDash) {
    return (
      <div className="jp-sidebar" style={{ background: '#0d0d0d', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg,#6366f1,#4338ca)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 7.5, fontWeight: 800 }}>JP</span>
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'white', letterSpacing: '-0.01em', flex: 1 }}>JobPilot</span>
          <span style={{ fontSize: 9.5, padding: '2px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.6)' }}>Dashboard</span>
        </div>
        <div className="jp-sidebar-body" style={{ background: '#0d0d0d' }}>
          <div className="jp-dash-stats-row">
            {[
              { k: 'Sent', v: dashStats.sent, color: 'rgba(255,255,255,0.8)' },
              { k: 'Opened', v: dashStats.opened, color: '#60a5fa' },
              { k: 'Replied', v: dashStats.replied, color: '#4ade80' },
            ].map(({ k, v, color }) => (
              <div key={k} className="jp-dash-stat-cell">
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em', color }}>{v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>{k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dashRows.map((row, i) => (
              <div key={i} className={`jp-dash-app-row${row.status === 'replied' ? ' replied' : ''}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="jp-job-logo-sm" style={{ background: row.job.bg, flexShrink: 0 }}>{row.job.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{row.job.co}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.job.email}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <span className={`jp-status-pill ${row.status}`}>{row.status}</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-mono)' }}>{row.time}</span>
                </div>
              </div>
            ))}
          </div>
          {replyVisible && (
            <div className="jp-reply-card" style={{ background: 'rgba(5,118,66,0.1)', border: '1px solid rgba(5,118,66,0.25)', borderRadius: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10, flexShrink: 0 }}>M</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Marcus Webb · Northwind</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>2 hours ago</div>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                "This stood out from 240+ applications. <strong style={{ color: 'white' }}>Forwarding to Priya</strong> — she'll reach out this week."
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 9 }}>
                <span className="jp-status-pill replied">Replied</span>
                <span className="jp-status-pill interview">Interview →</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="jp-sidebar" style={{ background: '#0d0d0d', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg,#6366f1,#4338ca)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: 7.5, fontWeight: 800 }}>JP</span>
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'white', letterSpacing: '-0.01em', flex: 1 }}>JobPilot</span>
        <span style={{ fontSize: 9.5, padding: '2px 7px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Dashboard</span>
        <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.22)', cursor: 'pointer', lineHeight: 1, marginLeft: 2 }}>−</span>
      </div>

      {/* Credits used today */}
      <div style={{ padding: '6px 12px 7px', fontSize: 10.5, color: 'rgba(255,255,255,0.32)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {sentToday} of 42 credits used today
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '10px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { k: 'ENROLLED', v: stats.enrolled },
          { k: 'SENT', v: stats.sent },
          { k: 'REPLIED', v: stats.replied },
        ].map(({ k, v }) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)', letterSpacing: '0.07em', marginTop: 4, textTransform: 'uppercase' }}>{k}</div>
          </div>
        ))}
      </div>

      {/* Active job card */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', minHeight: 64 }}>
        {activeJob ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: activeJob.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{activeJob.logo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>{activeJob.title}</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{activeJob.co}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.28)', fontSize: 11 }}>
            <span className="dotpulse" />
            Detecting active job…
          </div>
        )}
      </div>

      {/* CTA button */}
      <div style={{ padding: '11px 12px' }}>
        {phase === 'detecting' && (
          <div style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.18)', color: 'rgba(255,255,255,0.22)', fontWeight: 600, fontSize: 12, textAlign: 'center' }}>
            Send Application — 1 credit
          </div>
        )}
        {phase === 'ready' && (
          <button ref={sendBtnRef} style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: '#2563eb', color: 'white', fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', display: 'block' }}>
            Send Application — 1 credit
          </button>
        )}
        {phase === 'sending' && (
          <div style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: '#1d4ed8', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
            Sending…
          </div>
        )}
        {phase === 'sent' && (
          <div style={{ width: '100%', padding: '9px 0', borderRadius: 8, background: 'rgba(5,118,66,0.16)', border: '1px solid rgba(5,118,66,0.35)', color: '#4ade80', fontWeight: 600, fontSize: 12, textAlign: 'center' }}>
            ✓ Application Sent
          </div>
        )}
        <div style={{ textAlign: 'center', fontSize: 9.5, color: 'rgba(255,255,255,0.2)', marginTop: 6 }}>
          Personalized email sent from your Gmail.
        </div>
      </div>
    </div>
  );
}

function HeroDemo() {
  const [phase, setPhase] = useState('detecting');
  const [selectedJobIdx, setSelectedJobIdx] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [sentJobs, setSentJobs] = useState([]);
  const [sentToday, setSentToday] = useState(0);
  const [stats, setStats] = useState({ enrolled: 4, sent: 2, replied: 1 });
  const [showDash, setShowDash] = useState(false);
  const [dashStats, setDashStats] = useState({ sent: 0, opened: 0, replied: 0 });
  const [dashRows, setDashRows] = useState([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [cur, setCur] = useState({ x: 320, y: 28 });
  const [curClick, setCurClick] = useState(false);

  const browserRef = useRef(null);
  const jobCardRefs = useRef([]);
  const sendBtnRef = useRef(null);

  const moveTo = (el, dx = 0, dy = 0) => {
    if (!el || !browserRef.current) return;
    const br = browserRef.current.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    setCur({ x: tr.left - br.left + tr.width / 2 + dx, y: tr.top - br.top + tr.height / 2 + dy });
  };

  useEffect(() => {
    let dead = false;
    const ts = [];
    const wait = ms => new Promise(r => { const t = setTimeout(r, ms); ts.push(t); });

    const sendJob = async (idx) => {
      // Move cursor to job card in left panel
      const card = jobCardRefs.current[idx];
      if (card) moveTo(card, 0, 0);
      await wait(750);
      if (dead) return;

      // Click job card
      setCurClick(true);
      await wait(140);
      setCurClick(false);
      setSelectedJobIdx(idx);
      setPhase('detecting');
      setActiveJob(null);
      await wait(500);
      if (dead) return;

      // Extension detects the job
      setActiveJob(JOBS[idx]);
      setPhase('ready');
      await wait(550);
      if (dead) return;

      // Move cursor to Send button
      if (sendBtnRef.current) moveTo(sendBtnRef.current);
      await wait(700);
      if (dead) return;

      // Click Send button
      setCurClick(true);
      await wait(140);
      setCurClick(false);
      setPhase('sending');
      await wait(900);
      if (dead) return;

      setPhase('sent');
      setSentJobs(prev => [...prev, idx]);
      setSentToday(prev => prev + 1);
      setStats(prev => ({ ...prev, sent: prev.sent + 1 }));
      await wait(1100);
      if (dead) return;
    };

    const run = async () => {
      while (!dead) {
        // Reset state
        setPhase('detecting');
        setSelectedJobIdx(null);
        setActiveJob(null);
        setSentJobs([]);
        setSentToday(0);
        setStats({ enrolled: 4, sent: 2, replied: 1 });
        setShowDash(false);
        setDashStats({ sent: 0, opened: 0, replied: 0 });
        setDashRows([]);
        setReplyVisible(false);
        setCur({ x: 320, y: 28 });
        await wait(1100);
        if (dead) return;

        await sendJob(0);
        if (dead) return;
        await wait(400);

        await sendJob(1);
        if (dead) return;
        await wait(400);

        await sendJob(2);
        if (dead) return;
        await wait(700);

        // Transition to dashboard
        setShowDash(true);
        setDashRows([
          { job: JOBS[0], status: 'sent', time: '3h ago' },
          { job: JOBS[1], status: 'sent', time: '2h ago' },
          { job: JOBS[2], status: 'sent', time: '1h ago' },
        ]);
        setDashStats({ sent: 3, opened: 0, replied: 0 });
        await wait(1400);
        if (dead) return;
        setDashStats(s => ({ ...s, opened: 1 }));
        setDashRows(prev => { const n = [...prev]; n[0] = { ...n[0], status: 'opened' }; return n; });
        await wait(1200);
        if (dead) return;
        setDashStats(s => ({ ...s, replied: 1 }));
        setDashRows(prev => { const n = [...prev]; n[0] = { ...n[0], status: 'replied' }; return n; });
        setReplyVisible(true);
        await wait(3600);
        if (dead) return;
      }
    };

    run();
    return () => { dead = true; ts.forEach(clearTimeout); };
  }, []);

  const detailJob = selectedJobIdx !== null ? JOBS[selectedJobIdx] : JOBS[0];
  const detailMeta = selectedJobIdx !== null ? JOB_META[selectedJobIdx] : JOB_META[0];

  return (
    <div className="browser" ref={browserRef}>
      {/* Chrome bar */}
      <div className="browser-chrome">
        <div className="browser-dots"><span /><span /><span /></div>
        <div className="browser-tabs">
          <div className="browser-tab active" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 13, height: 13, borderRadius: 3, background: '#0a66c2', flexShrink: 0, display: 'inline-block' }} />
            LinkedIn
          </div>
          <div className="browser-tab" style={{ fontSize: 11, color: 'var(--ink-4)' }}>Gmail</div>
        </div>
        <div className="browser-url">
          <Icon name="lock" size={11} />
          <span>linkedin.com/jobs/search/?keywords=founding+engineer</span>
        </div>
        <div className="ext-bar">
          <span className="ext-pin">
            <span className="ext-pin-dot" />
            <span className="ext-pin-mark" />
          </span>
        </div>
      </div>

      {/* Three-column body */}
      <div style={{ display: 'flex', minHeight: 480, background: '#f3f2ef', position: 'relative', overflow: 'hidden' }}>

        {/* LEFT: LinkedIn job list */}
        <div className="lin-rail">
          <div className="lin-search-bar">
            <div className="lin-searchbox">
              <Icon name="search" size={12} />
              <span>founding engineer</span>
            </div>
            <div className="lin-filters-row">
              {['Past week', 'Remote', 'Easy Apply'].map(f => <span key={f} className="lin-filter-chip">{f}</span>)}
            </div>
            <div style={{ fontSize: 10, color: '#666', paddingTop: 4, fontFamily: 'var(--font-mono)' }}>99+ results</div>
          </div>
          {JOBS.map((j, i) => (
            <div
              key={j.id}
              ref={el => jobCardRefs.current[i] = el}
              className={`lin-job-card${selectedJobIdx === i ? ' sel' : ''}${sentJobs.includes(i) ? ' applied' : ''}`}
            >
              <div className="lin-job-logo" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="lin-job-title">{j.title}</div>
                <div className="lin-job-co">{j.co} · {j.loc}</div>
                <div className="lin-job-time">{JOB_META[i].time} · {JOB_META[i].applicants}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <span className="lin-badge-easy">Easy Apply</span>
                  {sentJobs.includes(i) && <span className="lin-badge-applied">✓ Applied</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CENTER: LinkedIn job detail — updates with selected job */}
        <div style={{ flex: 1, background: 'white', padding: '14px 16px', overflow: 'hidden', minWidth: 0, borderRight: '1px solid #e0dfdc' }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: detailJob.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{detailJob.logo}</div>
            <div>
              <div style={{ fontSize: 11.5, color: '#0a66c2', fontWeight: 600 }}>{detailJob.co}</div>
              <div style={{ fontSize: 10, color: '#666' }}>Series A · 48 employees · San Francisco</div>
            </div>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.015em', margin: '0 0 5px', lineHeight: 1.2 }}>{detailJob.title}</h3>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 8, display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            <span>{detailJob.loc}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
            <span>{detailMeta.time}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
            <span>{detailMeta.applicants} · Promoted</span>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <button style={{ padding: '6px 11px', borderRadius: 5, background: '#0a66c2', color: 'white', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Easy Apply</button>
            <button style={{ padding: '6px 10px', borderRadius: 5, border: '1px solid #c8c7c4', background: 'white', color: '#333', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Save</button>
          </div>
          <div style={{ padding: '8px 10px', background: '#f0faf5', borderRadius: 7, border: '1px solid #b8e6cc', display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 12, fontSize: 11.5 }}>
            <span style={{ color: '#057642', fontSize: 13, flexShrink: 0 }}>✦</span>
            <span style={{ color: '#1a1a1a' }}><strong>Top applicant</strong> — your profile matches {detailJob.match}% of the JD</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>About the job</div>
          {[98, 85, 72, 90, 60, 78, 68].map((w, i) => (
            <div key={i} style={{ height: 7, borderRadius: 3, background: '#f0ede8', width: w + '%', marginBottom: 5 }} />
          ))}
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', margin: '11px 0 6px' }}>Skills</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 11 }}>
            {['TypeScript', 'Go', 'PostgreSQL', 'React'].map(s => (
              <span key={s} style={{ fontSize: 10.5, padding: '3px 8px', borderRadius: 999, border: '1px solid #0a66c2', color: '#0a66c2', background: '#eef3fa' }}>{s}</span>
            ))}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>Meet the hiring team</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>M</div>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: '#0a66c2' }}>Marcus Webb</div>
              <div style={{ fontSize: 10, color: '#666' }}>Head of Engineering · Northwind</div>
            </div>
          </div>
        </div>

        {/* RIGHT: JobPilot extension panel */}
        <JPPanel
          phase={phase}
          activeJob={activeJob}
          sentToday={sentToday}
          stats={stats}
          sendBtnRef={sendBtnRef}
          showDash={showDash}
          dashStats={dashStats}
          dashRows={dashRows}
          replyVisible={replyVisible}
        />
      </div>

      {/* Cursor */}
      <div
        className={`hero-cursor${curClick ? ' clicking' : ''}`}
        style={{ left: cur.x, top: cur.y }}
      >
        <Icon name="cursor" size={22} />
      </div>
    </div>
  );
}

window.HeroDemo = HeroDemo;
