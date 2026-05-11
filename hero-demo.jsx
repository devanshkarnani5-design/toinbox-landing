// JobPilot — Realistic LinkedIn Hero Demo
const { useState, useEffect, useRef } = React;

const JOBS = [
  { id: 0, co: 'Northwind', title: 'Founding Product Engineer', logo: 'N', bg: '#1e3a5f', loc: 'Remote', time: '2d ago', n: '84 applicants', stage: 'Series A · YC W24', easy: true, early: true },
  { id: 1, co: 'Lumen AI', title: 'Head of Growth', logo: 'L', bg: '#3730a3', loc: 'Remote', time: '1d ago', n: '47 applicants', stage: 'Seed · 12 people', easy: true, early: false },
  { id: 2, co: 'Reed Labs', title: 'Senior Backend Engineer', logo: 'R', bg: '#7c2d12', loc: 'Remote', time: '3d ago', n: '126 applicants', stage: 'YC S25', easy: false, early: false },
  { id: 3, co: 'Atlas Health', title: 'Product Manager', logo: 'A', bg: '#14532d', loc: 'SF, CA', time: '5h ago', n: '23 applicants', stage: 'Series B', easy: true, early: true },
];

const COVER = `Hi Marcus,

Saw Northwind's Founding PE role — your March changelog on shipping v3 in six weeks is exactly the pace I want.

Two years doing this: solo-shipped 3 products, grew last app 2k → 80k MAU. Full-stack across TS, Go, Postgres.

Resume attached. Happy to pair on a real bug.

— Arjun`;

function HeroDemo() {
  const [phase, setPhase] = useState('idle');
  const [selJob, setSelJob] = useState(null);
  const [detailVis, setDetailVis] = useState(false);
  const [extVis, setExtVis] = useState(false);
  const [typed, setTyped] = useState('');
  const [score, setScore] = useState(0);
  const [scanPct, setScanPct] = useState(0);
  const [applied, setApplied] = useState(false);
  const [cur, setCur] = useState({ x: 260, y: 36, visible: true, clicking: false });

  const browserRef = useRef(null);
  const jobRefs = useRef([]);
  const applyRef = useRef(null);

  const moveTo = (elOrRef, dx = 0, dy = 0) => {
    if (!browserRef.current) return;
    const el = elOrRef && elOrRef.current !== undefined ? elOrRef.current : elOrRef;
    if (!el) return;
    const br = browserRef.current.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    setCur(c => ({
      ...c,
      x: tr.left - br.left + tr.width / 2 + dx,
      y: tr.top - br.top + tr.height / 2 + dy,
      clicking: false,
    }));
  };

  const doClick = (setCurFn) => {
    setCurFn(c => ({ ...c, clicking: true }));
    return new Promise(r => setTimeout(() => {
      setCurFn(c => ({ ...c, clicking: false }));
      r();
    }, 160));
  };

  useEffect(() => {
    let dead = false;
    const ts = [];
    const wait = ms => new Promise(r => { const t = setTimeout(r, ms); ts.push(t); });

    const run = async () => {
      while (!dead) {
        setPhase('idle');
        setSelJob(null);
        setDetailVis(false);
        setExtVis(false);
        setTyped('');
        setScore(0);
        setScanPct(0);
        setApplied(false);
        setCur({ x: 270, y: 32, visible: true, clicking: false });
        await wait(1100);
        if (dead) return;

        // Browse: hover job 1, then job 0
        setPhase('browse');
        if (jobRefs.current[1]) moveTo(jobRefs.current[1]);
        await wait(650);
        if (jobRefs.current[0]) moveTo(jobRefs.current[0]);
        await wait(700);

        // Click job 0
        setCur(c => ({ ...c, clicking: true }));
        await wait(160);
        setCur(c => ({ ...c, clicking: false }));
        setSelJob(0);
        await wait(220);
        setDetailVis(true);
        setPhase('detail');
        await wait(1900);
        if (dead) return;

        // Move to Apply with JobPilot button
        if (applyRef.current) moveTo(applyRef);
        await wait(950);

        // Click Apply with JobPilot
        setCur(c => ({ ...c, clicking: true }));
        await wait(160);
        setCur(c => ({ ...c, clicking: false }));
        setExtVis(true);
        setPhase('ext-open');
        await wait(700);

        // Scan resume
        setPhase('scanning');
        for (let i = 0; i <= 100; i += 5) {
          if (dead) return;
          setScanPct(Math.min(i, 100));
          await wait(32);
        }
        await wait(350);

        // Score + generate letter simultaneously
        setPhase('generating');
        let scoreVal = 0;
        const scoreTimer = setInterval(() => {
          scoreVal = Math.min(scoreVal + 3, 94);
          setScore(scoreVal);
          if (scoreVal >= 94) clearInterval(scoreTimer);
        }, 28);

        for (let i = 0; i <= COVER.length; i += 3) {
          if (dead) { clearInterval(scoreTimer); return; }
          setTyped(COVER.slice(0, i));
          await wait(20);
        }
        setTyped(COVER);
        clearInterval(scoreTimer);
        setScore(94);
        await wait(750);

        // Send
        setPhase('sending');
        await wait(1300);

        // Success
        setPhase('success');
        setApplied(true);
        await wait(3200);
      }
    };

    run();
    return () => { dead = true; ts.forEach(clearTimeout); };
  }, []);

  const showExt = extVis;
  const showScan = phase === 'scanning';
  const showGen = phase === 'generating' || phase === 'sending' || phase === 'success';
  const showSending = phase === 'sending';
  const showSuccess = phase === 'success';
  const showExtIdle = phase === 'ext-open';

  return (
    <div className="browser" ref={browserRef}>
      {/* Chrome toolbar */}
      <div className="browser-chrome">
        <div className="browser-dots"><span /><span /><span /></div>
        <div className="browser-tabs">
          <div className="browser-tab active" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 13, height: 13, borderRadius: 3, background: '#0a66c2', flexShrink: 0, display: 'inline-block' }} />
            LinkedIn
          </div>
          <div className="browser-tab" style={{ color: 'var(--ink-4)', fontSize: 11 }}>Gmail</div>
        </div>
        <div className="browser-url">
          <Icon name="lock" size={11} />
          <span>linkedin.com/jobs/search/?keywords=founding+engineer&f_TPR=r604800</span>
        </div>
        <div className="ext-bar">
          <span className="ext-pin">
            <span className="ext-pin-dot" />
            <span className="ext-pin-mark" />
          </span>
        </div>
      </div>

      {/* Page content */}
      <div style={{ display: 'flex', minHeight: 460, background: '#f3f2ef', position: 'relative', overflow: 'hidden' }}>

        {/* Left rail — job list */}
        <div className="lin-rail">
          <div className="lin-search-bar">
            <div className="lin-searchbox">
              <Icon name="search" size={12} />
              <span>founding engineer</span>
            </div>
            <div className="lin-filters-row">
              {['Past week', 'Remote', 'Easy Apply'].map(f => (
                <span key={f} className="lin-filter-chip">{f}</span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#666', paddingTop: 4, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>99+ results</div>
          </div>

          {JOBS.map((j, i) => (
            <div
              key={j.id}
              ref={el => jobRefs.current[i] = el}
              className={`lin-job-card${selJob === i ? ' sel' : ''}${applied && i === 0 ? ' applied' : ''}`}
            >
              <div className="lin-job-logo" style={{ background: j.bg }}>{j.logo}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="lin-job-title">{j.title}</div>
                <div className="lin-job-co">{j.co} · {j.loc}</div>
                <div className="lin-job-time">{j.time} · {j.n}</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 5, flexWrap: 'wrap' }}>
                  {j.easy && <span className="lin-badge-easy">Easy Apply</span>}
                  {j.early && !applied && <span className="lin-badge-early">Be an early applicant</span>}
                  {applied && i === 0 && <span className="lin-badge-applied">✓ Applied via JobPilot</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job detail panel */}
        <div className={`lin-detail-panel${detailVis ? ' vis' : ''}`}>
          <div className="ldp-company-row">
            <div className="ldp-company-logo" style={{ background: JOBS[0].bg }}>{JOBS[0].logo}</div>
            <div>
              <div style={{ fontSize: 12, color: '#0a66c2', fontWeight: 600, letterSpacing: '-0.005em' }}>Northwind</div>
              <div style={{ fontSize: 10.5, color: '#666' }}>Series A · 48 employees · San Francisco, CA</div>
            </div>
          </div>

          <h3 className="ldp-title">Founding Product Engineer</h3>
          <div className="ldp-meta-row">
            <span>Remote</span>
            <span className="ldp-dot" />
            <span>2 days ago</span>
            <span className="ldp-dot" />
            <span>84 applicants</span>
          </div>
          <div className="ldp-tags-row">
            <span className="ldp-tag">On-site</span>
            <span className="ldp-tag">Full-time</span>
          </div>

          <div className="ldp-actions">
            <button ref={applyRef} className="ldp-jobpilot-btn">
              <span style={{ fontSize: 11 }}>⚡</span> Apply with JobPilot
            </button>
            <button className="ldp-easy-apply-btn">
              <span style={{ fontSize: 10, background: '#0a66c2', color: 'white', padding: '1px 5px', borderRadius: 3, fontWeight: 700 }}>in</span>
              Easy Apply
            </button>
            <button className="ldp-save-btn">Save</button>
          </div>

          <div className="ldp-top-applicant-banner">
            <span style={{ color: '#057642', fontSize: 14, lineHeight: 1 }}>✦</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>You'd be a top applicant</div>
              <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>Your profile matches 94% of the job description</div>
            </div>
          </div>

          <div className="ldp-section-label">About the job</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {[100, 88, 78, 95, 65, 82].map((w, i) => (
              <div key={i} className="ldp-skeleton-line" style={{ width: w + '%' }} />
            ))}
          </div>

          <div className="ldp-section-label">Skills</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
            {['TypeScript', 'Go', 'PostgreSQL', 'React', 'System Design'].map(s => (
              <span key={s} className="ldp-skill-tag">{s}</span>
            ))}
          </div>

          <div className="ldp-section-label">Meet the hiring team</div>
          <div className="ldp-recruiter-row">
            <div className="ldp-recruiter-av" style={{ background: 'linear-gradient(135deg, #f0a17a, #d8543e)' }}>M</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0a66c2' }}>Marcus Webb</div>
              <div style={{ fontSize: 10.5, color: '#666' }}>Head of Engineering · Northwind</div>
            </div>
          </div>

          <div className="ldp-section-label">Company insights</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['Employees', '45–50'], ['Founded', '2022'], ['Funding', 'Series A']].map(([k, v]) => (
              <div key={k} className="ldp-insight-card">
                <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888' }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* JobPilot Chrome extension panel */}
        <div className={`jp-ext-panel${showExt ? ' open' : ''}`}>
          <div className="jp-ext-header">
            <div className="jp-ext-logo-mark" />
            <span className="jp-ext-name">JobPilot</span>
            <span className="jp-ext-badge">
              {showSuccess ? '✓ Applied' : '42 credits'}
            </span>
          </div>

          <div className="jp-ext-body">
            {/* Job context */}
            <div className="jp-ext-job-ctx">
              <div className="jp-ext-job-logo" style={{ background: JOBS[0].bg }}>N</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Founding Product Engineer</div>
                <div style={{ fontSize: 10.5, color: '#888' }}>Northwind · Remote</div>
              </div>
            </div>

            {/* Resume */}
            <div className="jp-ext-section">
              <div className="jp-ext-section-label">Resume</div>
              <div className="jp-ext-file-row">
                <div className="jp-ext-file-icon">PDF</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 500 }}>arjun-resume-2026.pdf</div>
                  <div style={{ fontSize: 10, color: '#888' }}>182 KB · auto-detected</div>
                </div>
                <span style={{ color: '#057642', fontWeight: 700, fontSize: 14 }}>✓</span>
              </div>
            </div>

            {/* Scanning phase */}
            {showScan && (
              <div className="jp-ext-section">
                <div className="jp-ext-section-label">Analyzing job description…</div>
                <div className="jp-ext-progress-track">
                  <div className="jp-ext-progress-fill" style={{ width: scanPct + '%' }} />
                </div>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[['Experience', '14 signals found'], ['Skills', '9 keywords matched'], ['Projects', '3 relevant']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: '#555', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
                        {k}
                      </span>
                      <span style={{ color: '#888', fontFamily: 'var(--font-mono)', fontSize: 10 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generating / match score */}
            {showGen && (
              <>
                <div className="jp-ext-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div className="jp-ext-section-label" style={{ marginBottom: 0 }}>Match score</div>
                    <div style={{
                      fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em',
                      color: showSuccess ? '#057642' : 'var(--accent)',
                      transition: 'color 0.5s ease'
                    }}>{score}%</div>
                  </div>
                  <div className="jp-ext-progress-track">
                    <div className="jp-ext-progress-fill" style={{
                      width: score + '%',
                      background: showSuccess ? '#057642' : undefined,
                      transition: 'background 0.5s ease'
                    }} />
                  </div>
                </div>

                <div className="jp-ext-section" style={{ flex: 1 }}>
                  <div className="jp-ext-section-label">AI cover letter</div>
                  <div className="jp-ext-letter">
                    {typed}
                    {phase === 'generating' && typed.length < COVER.length && <span className="caret" />}
                  </div>
                </div>
              </>
            )}

            {/* Idle state after opening */}
            {showExtIdle && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '18px 0', color: '#999' }}>
                <span className="dotpulse" />
                <span style={{ fontSize: 12 }}>Detecting job details…</span>
              </div>
            )}

            {/* Sending button */}
            {showSending && (
              <button className="jp-send-btn" style={{ marginTop: 'auto' }} disabled>
                <span className="spinner" />
                Sending to marcus@northwind.co…
              </button>
            )}

            {/* Success */}
            {showSuccess && (
              <div className="jp-success-row">
                <div className="jp-success-check">✓</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Application sent!</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Delivered to marcus@northwind.co</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animated cursor */}
        <div
          className={`hero-cursor${cur.clicking ? ' clicking' : ''}`}
          style={{ left: cur.x, top: cur.y, opacity: cur.visible ? 1 : 0 }}
        >
          <Icon name="cursor" size={22} />
        </div>
      </div>
    </div>
  );
}

window.HeroDemo = HeroDemo;
