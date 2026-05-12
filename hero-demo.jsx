// JobPilot — Full LinkedIn workflow simulation
const { useState, useEffect, useRef } = React;

const JOBS = [
  { id: 0, co: 'Northwind', title: 'Founding Product Engineer', logo: 'N', bg: '#1e3a5f', loc: 'San Francisco', match: 94, email: 'marcus@nwind.co', ai: 'High priority' },
  { id: 1, co: 'Lumen AI', title: 'Head of Growth', logo: 'L', bg: '#3730a3', loc: 'Delhi, India', match: 87, email: 'theo@lumen.ai', ai: 'Strong fit' },
  { id: 2, co: 'Reed Labs', title: 'Backend Engineer', logo: 'R', bg: '#7c2d12', loc: 'Remote', match: 78, email: 'sana@reedlabs.io', ai: 'Good match' },
];

const LETTERS = [
  `Hi Marcus,\n\nSaw Northwind's Founding PE role — your v3 changelog is exactly the pace I want.\n\n2 years: solo-shipped 3 products, grew last app 2k → 80k MAU. TS, Go, Postgres.\n\nResume attached. Happy to pair on a real bug.\n\n— Arjun`,
  `Hi Theo,\n\nLumen AI's zero-shot retrieval work caught my eye — exactly the kind of infra problem I want.\n\nI've grown products from 0 → 80k MAU. Comfortable at product × distribution intersection.\n\n— Arjun`,
  `Hi Sana,\n\nReed Labs' distributed systems work stands out. I've shipped Go services at 10k+ RPS.\n\nResume attached — happy to do a take-home.\n\n— Arjun`,
];

function JPPanel({ detecting, jobStates, activeJobIdx, typed, showDash, dashStats, dashRows, replyVisible, enrollRefs }) {
  return (
    <div className="jp-sidebar">
      <div className="jp-sidebar-header">
        <div className="jp-sidebar-logo-mark" />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#1a1a1a' }}>JobPilot</span>
        <span className="jp-sidebar-credits">{showDash ? 'Dashboard' : '42 credits'}</span>
      </div>

      {!showDash ? (
        <div className="jp-sidebar-body">
          <div className="jp-detect-status">
            {detecting
              ? <><span className="dotpulse" /> Detecting jobs on page…</>
              : <><span className="ok-dot" style={{ background: '#057642', width: 7, height: 7, borderRadius: '50%', display: 'inline-block' }} /> 3 startup roles detected</>}
          </div>

          {JOBS.map((j, i) => {
            const st = jobStates[i];
            const isActive = activeJobIdx === i;
            const isWorking = st === 'working' || st === 'generating' || st === 'sending';
            return (
              <div key={j.id} className={`jp-job-entry${isActive ? ' active' : ''}${st === 'sent' ? ' done' : ''}`}>
                <div className="jp-job-entry-row">
                  <div className="jp-job-logo-sm" style={{ background: j.bg }}>{j.logo}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1a1a1a' }}>{j.title}</div>
                    <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{j.co}</div>
                    <div style={{ fontSize: 10, color: '#057642', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 8 }}>●</span>
                      <span style={{ color: '#555' }}>{j.email}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.03em', color: st === 'sent' ? '#057642' : 'var(--accent)' }}>{j.match}%</div>
                    <button
                      ref={el => enrollRefs.current[i] = el}
                      className={`jp-enroll-btn-new ${st}`}
                      disabled={st !== 'idle' || detecting}
                    >
                      {isWorking && <span className="spinner" style={{ width: 9, height: 9, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />}
                      {st === 'sent' ? '✓ Sent' : isWorking ? 'Working…' : 'Enroll'}
                    </button>
                  </div>
                </div>

                {isActive && typed && (st === 'generating' || st === 'sending') && (
                  <div className="jp-letter-expand">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#aaa', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                      AI Cover Letter · To {j.email}
                    </div>
                    <div style={{ fontSize: 11, lineHeight: 1.55, color: '#333', whiteSpace: 'pre-wrap', maxHeight: 120, overflow: 'hidden' }}>
                      {typed}{st === 'generating' && <span className="caret" />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="jp-sidebar-body">
          <div className="jp-dash-stats-row">
            {[
              { k: 'Sent', v: dashStats.sent, color: '#555' },
              { k: 'Opened', v: dashStats.opened, color: 'var(--accent)' },
              { k: 'Replied', v: dashStats.replied, color: '#057642' },
            ].map(({ k, v, color }) => (
              <div key={k} className="jp-dash-stat-cell">
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em', color }}>{v}</div>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>{k}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dashRows.map((row, i) => (
              <div key={i} className={`jp-dash-app-row${row.status === 'replied' ? ' replied' : ''}`}>
                <div className="jp-job-logo-sm" style={{ background: row.job.bg, flexShrink: 0 }}>{row.job.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: '#1a1a1a' }}>{row.job.co}</div>
                  <div style={{ fontSize: 10, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.job.email}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  <span className={`jp-status-pill ${row.status}`}>{row.status}</span>
                  <span style={{ fontSize: 9, color: '#bbb', fontFamily: 'var(--font-mono)' }}>{row.time}</span>
                </div>
              </div>
            ))}
          </div>

          {replyVisible && (
            <div className="jp-reply-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg,#f0a17a,#d8543e)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 10, flexShrink: 0 }}>M</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Marcus Webb · Northwind</div>
                  <div style={{ fontSize: 10, color: '#888' }}>2 hours ago</div>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#057642', display: 'inline-block' }} />
              </div>
              <div style={{ fontSize: 12, color: '#333', lineHeight: 1.5 }}>
                "This stood out from 240+ applications. <strong style={{ color: '#1a1a1a' }}>Forwarding to Priya</strong> (Head of Eng) — she'll reach out this week."
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 9 }}>
                <span className="jp-status-pill replied">Replied</span>
                <span className="jp-status-pill interview">Interview →</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HeroDemo() {
  const [jobStates, setJobStates] = useState(['idle', 'idle', 'idle']);
  const [activeJobIdx, setActiveJobIdx] = useState(null);
  const [detecting, setDetecting] = useState(true);
  const [typed, setTyped] = useState('');
  const [showDash, setShowDash] = useState(false);
  const [dashStats, setDashStats] = useState({ sent: 0, opened: 0, replied: 0 });
  const [dashRows, setDashRows] = useState([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [cur, setCur] = useState({ x: 320, y: 28 });
  const [curClick, setCurClick] = useState(false);

  const browserRef = useRef(null);
  const enrollRefs = useRef([]);

  const moveTo = (el, dx = 0, dy = 0) => {
    if (!el || !browserRef.current) return;
    const br = browserRef.current.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    setCur({ x: tr.left - br.left + tr.width / 2 + dx, y: tr.top - br.top + tr.height / 2 + dy });
  };

  const setJobState = (idx, state) =>
    setJobStates(prev => { const n = [...prev]; n[idx] = state; return n; });

  useEffect(() => {
    let dead = false;
    const ts = [];
    const wait = ms => new Promise(r => { const t = setTimeout(r, ms); ts.push(t); });

    const enrollJob = async (idx) => {
      const btn = enrollRefs.current[idx];
      if (btn) moveTo(btn);
      await wait(900);
      setCurClick(true);
      await wait(140);
      setCurClick(false);
      setJobState(idx, 'working');
      setActiveJobIdx(idx);
      setTyped('');
      await wait(600);
      setJobState(idx, 'generating');
      const letter = LETTERS[idx];
      for (let i = 0; i <= letter.length; i += 3) {
        if (dead) return;
        setTyped(letter.slice(0, i));
        await wait(idx === 0 ? 22 : 13);
      }
      setTyped(letter);
      await wait(350);
      setJobState(idx, 'sending');
      await wait(900);
      setJobState(idx, 'sent');
      setActiveJobIdx(null);
      setTyped('');
    };

    const run = async () => {
      while (!dead) {
        setJobStates(['idle', 'idle', 'idle']);
        setActiveJobIdx(null);
        setTyped('');
        setDetecting(true);
        setShowDash(false);
        setDashStats({ sent: 0, opened: 0, replied: 0 });
        setDashRows([]);
        setReplyVisible(false);
        setCur({ x: 320, y: 28 });
        await wait(1000);
        if (dead) return;

        await wait(1300);
        setDetecting(false);
        await wait(800);

        await enrollJob(0);
        if (dead) return;
        await wait(300);

        await enrollJob(1);
        if (dead) return;
        await wait(300);

        await enrollJob(2);
        if (dead) return;
        await wait(700);

        setShowDash(true);
        setDashRows([
          { job: JOBS[0], status: 'sent', time: '3h ago' },
          { job: JOBS[1], status: 'sent', time: '2h ago' },
          { job: JOBS[2], status: 'sent', time: '1h ago' },
        ]);
        setDashStats({ sent: 3, opened: 0, replied: 0 });
        await wait(1400);
        setDashStats(s => ({ ...s, opened: 1 }));
        setDashRows(prev => { const n = [...prev]; n[0] = { ...n[0], status: 'opened' }; return n; });
        await wait(1200);
        setDashStats(s => ({ ...s, replied: 1 }));
        setDashRows(prev => { const n = [...prev]; n[0] = { ...n[0], status: 'replied' }; return n; });
        setReplyVisible(true);
        await wait(3500);
        if (dead) return;
      }
    };

    run();
    return () => { dead = true; ts.forEach(clearTimeout); };
  }, []);

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
            <div key={j.id} className={`lin-job-card${i === 0 ? ' sel' : ''}${jobStates[i] === 'sent' ? ' applied' : ''}`}>
              <div className="lin-job-logo" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="lin-job-title">{j.title}</div>
                <div className="lin-job-co">{j.co} · {j.loc}</div>
                <div className="lin-job-time">1d ago · 344 applicants</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <span className="lin-badge-easy">Easy Apply</span>
                  {jobStates[i] === 'sent' && <span className="lin-badge-applied">✓ Applied</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CENTER: LinkedIn detail — first job always pre-shown */}
        <div style={{ flex: 1, background: 'white', padding: '14px 16px', overflow: 'hidden', minWidth: 0, borderRight: '1px solid #e0dfdc' }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#1e3a5f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>N</div>
            <div>
              <div style={{ fontSize: 11.5, color: '#0a66c2', fontWeight: 600 }}>Northwind</div>
              <div style={{ fontSize: 10, color: '#888' }}>Series A · 48 employees · San Francisco</div>
            </div>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.015em', margin: '0 0 5px', lineHeight: 1.2 }}>Founding Product Engineer</h3>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 8, display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            <span>Remote</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
            <span>2 days ago</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
            <span>344 applicants · Promoted</span>
          </div>
          <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
            <button style={{ padding: '6px 11px', borderRadius: 5, background: '#0a66c2', color: 'white', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>Easy Apply</button>
            <button style={{ padding: '6px 10px', borderRadius: 5, border: '1px solid #c8c7c4', background: 'white', color: '#333', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Save</button>
          </div>
          <div style={{ padding: '8px 10px', background: '#f0faf5', borderRadius: 7, border: '1px solid #b8e6cc', display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 12, fontSize: 11.5 }}>
            <span style={{ color: '#057642', fontSize: 13, flexShrink: 0 }}>✦</span>
            <span><strong>Top applicant</strong> — your profile matches 94% of the JD</span>
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
              <div style={{ fontSize: 10, color: '#888' }}>Head of Engineering · Northwind</div>
            </div>
          </div>
        </div>

        {/* RIGHT: JobPilot extension panel */}
        <JPPanel
          detecting={detecting}
          jobStates={jobStates}
          activeJobIdx={activeJobIdx}
          typed={typed}
          showDash={showDash}
          dashStats={dashStats}
          dashRows={dashRows}
          replyVisible={replyVisible}
          enrollRefs={enrollRefs}
        />

        {/* Animated cursor — absolute within .browser */}
      </div>

      {/* Cursor sits outside the body div so it's relative to .browser */}
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
