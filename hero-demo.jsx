// JobPilot — LinkedIn-style hero with extension bubble + side-panel demo
const { useState, useEffect, useRef } = React;

const DETECTED = [
  { co: 'Northwind', role: 'Founding Product Engineer', logo: 'N', bg: 'linear-gradient(135deg,#1b1b1b,#404040)', stage: 'Series A · YC W24' },
  { co: 'Lumen AI', role: 'Founding Designer', logo: 'L', bg: 'linear-gradient(135deg,#5562eb,#2a1c7a)', stage: 'Seed · 8 people' },
  { co: 'Reed Labs', role: 'Growth Engineer', logo: 'R', bg: 'linear-gradient(135deg,#d8543e,#7a1f12)', stage: 'YC S25' },
];

const EMAIL_BODY = `Hi Maya,

Saw Northwind's Founding PE role on the boards — your changelog on shipping v3 in six weeks is exactly the loop I want to be in.

Last two years I've done the 0→1 work: solo-shipped 3 products, took our last app from 2k → 80k MAU. Comfortable across the stack (TS, Go, Postgres).

Resume attached. Happy to do a take-home or pair on a real bug if useful.

— Arjun`;

function HeroDemo() {
  // bubble -> detect -> enroll -> thinking -> typing -> attach -> sending -> done -> loop
  const [phase, setPhase] = useState('bubble');
  const [typed, setTyped] = useState('');
  const [activeJob, setActiveJob] = useState(0);
  const [showAttach, setShowAttach] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [cursor, setCursor] = useState({ x: '90%', y: '85%', hide: false });
  const stageRef = useRef(null);
  const bubbleRef = useRef(null);
  const enrollRefs = useRef([]);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const delay = (ms) => new Promise((r) => { const t = setTimeout(r, ms); timers.push(t); });

    const moveToRef = (target) => {
      if (!stageRef.current || !target) return;
      const s = stageRef.current.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      setCursor({ x: t.left - s.left + t.width / 2 + 'px', y: t.top - s.top + t.height / 2 + 'px', hide: false });
    };

    const run = async () => {
      while (!cancelled) {
        setPhase('bubble'); setTyped(''); setShowAttach(false); setShowStatus(false); setActiveJob(0);
        setCursor({ x: '92%', y: '88%', hide: false });
        await delay(900);
        moveToRef(bubbleRef.current);
        await delay(700);
        setPhase('open');
        await delay(900);
        setPhase('detect');
        await delay(1100);
        moveToRef(enrollRefs.current[0]);
        await delay(700);
        setPhase('enroll'); setActiveJob(0);
        await delay(400);
        setPhase('thinking');
        setCursor((c) => ({ ...c, hide: true }));
        await delay(1100);
        setPhase('typing');
        for (let i = 0; i <= EMAIL_BODY.length; i += 3) {
          if (cancelled) return;
          setTyped(EMAIL_BODY.slice(0, i));
          await delay(20);
        }
        setTyped(EMAIL_BODY);
        await delay(400);
        setPhase('attaching'); setShowAttach(true);
        await delay(800);
        setPhase('sending');
        await delay(900);
        setPhase('done'); setShowStatus(true);
        await delay(2400);
      }
    };

    run();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  const panelOpen = phase !== 'bubble';

  return (
    <div className="browser" ref={stageRef}>
      <div className="browser-chrome">
        <div className="browser-dots"><span /><span /><span /></div>
        <div className="browser-tabs">
          <div className="browser-tab active">Jobs · Startup</div>
        </div>
        <div className="browser-url">
          <Icon name="lock" size={11} />
          <span>jobs.network.com/search?startup=true</span>
        </div>
        <div className="ext-bar">
          <span className="ext-pin" ref={bubbleRef}>
            <span className="ext-pin-dot" />
            <span className="ext-pin-mark" />
          </span>
        </div>
      </div>
      <div className="browser-body">
        {/* Fake LinkedIn-style jobs page (generic professional network look) */}
        <div className="linpage">
          <div className="linpage-header">
            <div className="linpage-search">
              <Icon name="search" size={13} />
              <span>"founding engineer" startup</span>
            </div>
            <div className="linpage-filters">
              <span className="chip">Remote</span>
              <span className="chip">Easy Apply</span>
              <span className="chip">Past week</span>
            </div>
          </div>
          <div className="linpage-grid">
            <div className="linpage-list">
              {DETECTED.concat([{ co: 'Atlas', role: 'Backend Engineer', logo: 'A', bg: 'linear-gradient(135deg,#3aa178,#1b6448)', stage: 'Seed' }]).map((j, i) => (
                <div key={i} className={`linjob ${i === 0 ? 'sel' : ''}`}>
                  <div className="linjob-logo" style={{ background: j.bg }}>{j.logo}</div>
                  <div className="linjob-body">
                    <div className="linjob-title">{j.role}</div>
                    <div className="linjob-sub">{j.co} · Remote</div>
                    <div className="linjob-meta">{j.stage}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="linpage-detail">
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>Founding Product Engineer</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Northwind · Remote · 2d ago</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <span className="chip">Easy Apply</span>
                <span className="chip">Series A</span>
              </div>
              <div className="jobpage-line w-90" style={{ marginTop: 12 }} />
              <div className="jobpage-line w-80" />
              <div className="jobpage-line w-70" />
              <div className="jobpage-line w-90" />
              <div className="jobpage-line w-60" />
            </div>
          </div>
        </div>

        {/* JobPilot side panel — slides in from right */}
        <div className={`sidepanel ${panelOpen ? 'open' : 'closed'}`}>
          <div className="sidepanel-header">
            <div className="pilot-mark" />
            <div className="title">JobPilot</div>
            <div className="credits">42 credits</div>
          </div>
          <div className="sidepanel-body">
            <div className="sp-detect-label">
              {phase === 'detect' || phase === 'open' ? (
                <><span className="dotpulse" />Detecting jobs on this page…</>
              ) : (
                <><span className="ok-dot" />3 startup roles detected</>
              )}
            </div>

            {DETECTED.map((j, i) => {
              const isActive = i === activeJob && (phase === 'thinking' || phase === 'typing' || phase === 'attaching' || phase === 'sending' || phase === 'done' || phase === 'enroll');
              const isPending = phase === 'open' || phase === 'detect';
              const enrollState = isActive
                ? (phase === 'done' ? 'done' : (phase === 'enroll' ? 'enroll' : 'working'))
                : 'idle';
              return (
                <div key={i} className={`sp-job ${isActive ? 'active' : ''}`}>
                  <div className="sp-job-row">
                    <div className="sp-job-logo" style={{ background: j.bg }}>{j.logo}</div>
                    <div className="sp-job-meta">
                      <div className="sp-job-title">{j.role}</div>
                      <div className="sp-job-sub">{j.co} · {j.stage}</div>
                    </div>
                    <button
                      ref={(el) => (enrollRefs.current[i] = el)}
                      className={`sp-enroll-btn ${enrollState}`}
                      disabled={isPending}
                    >
                      {enrollState === 'working' && <span className="spinner" />}
                      {enrollState === 'done' && <Icon name="check" size={11} />}
                      <span>{enrollState === 'done' ? 'Sent' : enrollState === 'working' ? 'Working' : 'Enroll'}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {(phase === 'typing' || phase === 'attaching' || phase === 'sending' || phase === 'done') && (
              <div className="sp-email">
                <div className="sp-email-head">
                  <div className="field"><span className="k">to</span><span className="v">maya@northwind.co</span></div>
                  <div className="field"><span className="k">re</span><span className="v">Founding PE · from a 0→1 builder</span></div>
                </div>
                <div className="sp-email-body">
                  {typed}
                  {phase === 'typing' && <span className="caret" />}
                </div>
              </div>
            )}

            {showAttach && (
              <div className="sp-attach">
                <div className="file-ico" />
                <div className="file-name">arjun-resume-2026.pdf</div>
                <div className="file-size">182 KB</div>
              </div>
            )}

            {showStatus && (
              <div className="sp-status">
                <span className="ok-dot" />
                <span>Sent to founder · delivery confirmed</span>
              </div>
            )}
          </div>

          <div
            className="cursor-ghost"
            style={{ left: `calc(${cursor.x} - 4px)`, top: `calc(${cursor.y} - 4px)`, opacity: cursor.hide ? 0 : 1 }}
          >
            <Icon name="cursor" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

window.HeroDemo = HeroDemo;
