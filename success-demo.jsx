// Logic is unchanged; only React/Icon wiring, the logo path, and the export were adapted.

// ToInbox — Success-page walkthrough demo
// 4 scenes, one animated cursor, step captions:
//   1. Chrome Web Store → Add to Chrome
//   2. LinkedIn job → open the ToInbox side panel
//   3. Enroll the role (Send Application → Enrolled)
//   4. Dashboard → application goes Queued → Sent
const { useState: useStateSD, useEffect: useEffectSD, useRef: useRefSD } = React;

const SD_LOGO = '/favicon.png'; // swap for /toinbox-logo.png once added to public/

// LinkedIn job list (left rail)
const SD_JOBS = [
  { title: 'Project Manager', co: 'Birlasoft', loc: 'Pune/Pimpri-Chinchwad', logo: 'b', bg: '#c0362c', meta: '2 weeks ago' },
  { title: 'Program/Project Management Lead', co: 'Accenture', loc: 'Gurugram', logo: '>', bg: '#a100ff', meta: '5 days ago' },
  { title: 'Senior Program Manager', co: 'Esper', loc: 'Bengaluru', logo: 'e', bg: '#6d54c7', meta: '8 hours ago', sel: true },
  { title: 'Program Lead', co: 'Vegapay', loc: 'Mumbai (On-site)', logo: 'V', bg: '#1d2a52', meta: '3 weeks ago' },
];

// Dashboard base applications (newest enrolled row is prepended live)
const SD_DASH_BASE = [
  { role: 'Program Manager — GTM Strategy', co: 'Rupeek', logo: 'R', bg: '#e8552d', status: 'skipped', date: 'Jun 14' },
  { role: 'Program Manager', co: 'Wishlink', logo: 'W', bg: '#f59e0b', status: 'sent', date: 'Jun 14' },
  { role: 'Manager — Partnerships', co: 'GoKwik', logo: 'G', bg: '#16a34a', status: 'sent', date: 'Jun 14' },
  { role: "Founder's Associate", co: 'Fluxton', logo: 'F', bg: '#111827', status: 'skipped', date: 'Jun 14' },
  { role: 'Program Manager', co: 'Porter', logo: 'P', bg: '#1d4ed8', status: 'replied', date: 'Jun 14' },
  { role: 'Senior Consultant — Global', co: 'Deloitte', logo: 'D', bg: '#0f7b3f', status: 'sent', date: 'Jun 13' },
  { role: 'Growth Platforms Specialist', co: 'Deloitte', logo: 'D', bg: '#0f7b3f', status: 'sent', date: 'Jun 13' },
];

function SDPill({ status }) {
  const map = { queued: 'Queued', sent: 'Sent', replied: 'Replied', skipped: 'Skipped' };
  return <span className={`sd-pill ${status}`}><span className="sd-pd" />{map[status]}</span>;
}

// ============ SCENE 1 — Chrome Web Store ============
function StoreScene({ storeState, addRef, confirmRef }) {
  return (
    <div className="sd-cws">
      <div className="sd-cws-top">
        <div className="sd-cws-brand">
          <span className="sd-chrome" />
          <span>chrome web store</span>
        </div>
        <div className="sd-cws-search"><Icon name="search" size={12} /><span>Search extensions and themes</span></div>
      </div>
      <div className="sd-cws-tabs">
        <span>Discover</span><span className="on">Extensions</span><span>Themes</span>
      </div>

      <div className="sd-cws-hero">
        <img className="sd-cws-icon" src={SD_LOGO} alt="" />
        <div className="sd-cws-info">
          <h3 className="sd-cws-title">ToInbox — Send your job application directly to leadership mailboxes.</h3>
          <div className="sd-cws-verified"><span className="sd-vbadge"><Icon name="check" size={9} /></span>toinbox.app</div>
          <div className="sd-cws-tags"><span>Extension</span><span>Tools</span></div>
        </div>
        <div className="sd-cws-action">
          <button
            ref={addRef}
            className={`sd-cws-add ${storeState === 'added' ? 'added' : ''} ${storeState === 'checking' ? 'checking' : ''}`}
          >
            {storeState === 'added' ? <><Icon name="check" size={14} /> Added to Chrome</>
              : storeState === 'checking' ? 'Checking…'
              : 'Add to Chrome'}
          </button>
        </div>
      </div>

      <div className="sd-cws-shots">
        <div className="sd-shot dark">
          <div className="sd-shot-eyebrow">CHROME EXTENSION · FOR JOB-SEEKERS</div>
          <div className="sd-shot-head">Apply while<br /><em>you sleep.</em></div>
        </div>
        <div className="sd-shot light" />
        <div className="sd-shot light" />
      </div>

      {storeState === 'confirm' && (
        <div className="sd-confirm">
          <div className="sd-confirm-row">
            <img src={SD_LOGO} alt="" />
            <div>
              <div className="sd-confirm-q">Add “ToInbox”?</div>
              <div className="sd-confirm-perm">It can read and change your data on linkedin.com</div>
            </div>
          </div>
          <div className="sd-confirm-btns">
            <button ref={confirmRef} className="sd-confirm-add">Add extension</button>
            <button className="sd-confirm-cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ SCENES 2 & 3 — LinkedIn + ToInbox panel ============
function LinkedInScene({ panelOpen, enrollState, stats, credits, bubbleRef, sendRef, dashRef }) {
  return (
    <div className="sd-li">
      <div className="sd-li-top">
        <span className="sd-li-logo">in</span>
        <div className="sd-li-search"><Icon name="search" size={12} /><span>program Manager</span></div>
        <div className="sd-li-nav"><span /><span /><span /><span className="av" /></div>
      </div>
      <div className="sd-li-filters">
        {['Jobs', 'Date posted', 'Experience', 'Remote', 'Easy Apply'].map(f => <span key={f} className="sd-li-chip">{f}</span>)}
      </div>

      <div className="sd-li-body">
        <div className="sd-li-list">
          {SD_JOBS.map((j, i) => (
            <div key={i} className={`sd-li-card ${j.sel ? 'sel' : ''}`}>
              <span className="sd-li-cardlogo" style={{ background: j.bg }}>{j.logo}</span>
              <div style={{ minWidth: 0 }}>
                <div className="sd-li-cardtitle">{j.title}</div>
                <div className="sd-li-cardco">{j.co}</div>
                <div className="sd-li-cardloc">{j.loc}</div>
                <div className="sd-li-cardmeta">{j.meta}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sd-li-detail">
          <div className="sd-li-dco"><span className="sd-li-cardlogo" style={{ background: '#6d54c7' }}>e</span>Esper</div>
          <h3 className="sd-li-dtitle">Senior Program Manager</h3>
          <div className="sd-li-dmeta">Bengaluru, Karnataka, India · Reposted 11 hours ago</div>
          <div className="sd-li-dbtns">
            <button className="sd-li-apply">Apply</button>
            <button className="sd-li-save">Save</button>
          </div>
          <div className="sd-li-dcard">
            <div className="sd-li-dcard-h">Your profile and resume</div>
            {[96, 80, 88, 60].map((w, i) => <div key={i} className="sd-li-skel" style={{ width: w + '%' }} />)}
          </div>
        </div>
      </div>

      {/* minimized bubble */}
      {!panelOpen && (
        <div className="sd-bubble-wrap">
          <span className="sd-bubble-tip">Open ToInbox</span>
          <button ref={bubbleRef} className="sd-bubble">
            <img src={SD_LOGO} alt="" />
            <span>ToInbox</span>
          </button>
        </div>
      )}

      {/* expanded panel */}
      {panelOpen && (
        <div className="sd-panel">
          <div className="sd-panel-head">
            <img src={SD_LOGO} alt="" />
            <span className="sd-panel-name">ToInbox</span>
            <button ref={dashRef} className="sd-panel-dash">Dashboard</button>
            <span className="sd-panel-min">−</span>
          </div>
          <div className="sd-panel-credits">{credits} of 50 credits used today</div>
          <div className="sd-panel-stats">
            {[['ENROLLED', stats.enrolled], ['SENT', stats.sent], ['REPLIED', stats.replied]].map(([k, v]) => (
              <div key={k} className="sd-panel-stat">
                <div className="sd-panel-statnum">{v}</div>
                <div className="sd-panel-statlbl">{k}</div>
              </div>
            ))}
          </div>
          <div className="sd-panel-job">
            <span className="sd-li-cardlogo" style={{ background: '#6d54c7' }}>e</span>
            <div><div className="sd-panel-jobtitle">Senior Program Manager</div><div className="sd-panel-jobco">Esper</div></div>
          </div>
          <button
            ref={sendRef}
            className={`sd-panel-send ${enrollState === 'enrolled' ? 'done' : ''} ${enrollState === 'enrolling' ? 'busy' : ''}`}
          >
            {enrollState === 'enrolled' ? <><Icon name="check" size={15} /> Enrolled</>
              : enrollState === 'enrolling' ? <><span className="sd-spin" /> Enrolling…</>
              : 'Send Application'}
          </button>
          <div className="sd-panel-foot">Personalized email sent from your Gmail.</div>
        </div>
      )}
    </div>
  );
}

// ============ SCENE 4 — Dashboard ============
function DashboardScene({ dashStats, newRowStatus, dashScale }) {
  const rows = [{ role: 'Senior Program Manager', co: 'Esper', logo: 'e', bg: '#6d54c7', status: newRowStatus, date: 'Jun 09', isNew: true }, ...SD_DASH_BASE];
  const sent = newRowStatus === 'sent';
  return (
    <div className="sd-dash-fit">
    <div className="sd-dash" style={{ transform: `translate(-50%,-50%) scale(${dashScale})` }}>
      <div className="sd-dash-side">
        <div className="sd-dash-brand"><img src={SD_LOGO} alt="" /><span>ToInbox</span></div>
        <div className="sd-dash-menu-lbl">Menu</div>
        <div className="sd-dash-nav">
          <span className="on"><Icon name="panel" size={18} />Dashboard</span>
          <span><Icon name="sliders" size={18} />Settings</span>
          <span><Icon name="card" size={18} />Billing</span>
        </div>
        <div className="sd-dash-spacer" />
        <div className="sd-dash-today">
          <div className="t"><span className="lbl">Sent today</span><span className="v"><b>{dashStats.sent}</b> / 25</span></div>
          <div className="sd-dash-bar"><span style={{ width: '92%' }} /></div>
        </div>
        <div className="sd-dash-user"><span className="sd-dash-ava">DK</span><div style={{ minWidth: 0 }}><div className="sd-dash-uname">Devansh Karnani</div><div className="sd-dash-umail">devanshkarnani45@gmail.com</div></div></div>
      </div>

      <div className="sd-dash-main">
        <div className="sd-dash-stats">
          {[
            { k: 'ENROLLED', v: dashStats.enrolled, cap: 'roles in range', icon: 'inbox', lead: true },
            { k: 'SENT', v: dashStats.sent, cap: '98% send rate', icon: 'forward' },
            { k: 'REPLIED', v: dashStats.replied, cap: '13.8% reply rate', icon: 'mail' },
          ].map(s => (
            <div key={s.k} className={`sd-dash-stat ${s.lead ? 'lead' : ''}`}>
              <div className="sd-dash-statlbl"><span className="sd-dash-staticon"><Icon name={s.icon} size={15} /></span>{s.k}</div>
              <div className="sd-dash-statnum">{s.v}</div>
              <div className="sd-dash-statcap">{s.cap}</div>
            </div>
          ))}
        </div>

        <div className="sd-dash-content">
          {/* applications list */}
          <div className="sd-dash-card">
            <div className="sd-dash-cardhead"><h4>Applications</h4><span>51 in range</span></div>
            <div className="sd-dash-thead"><span>ROLE</span><span>STATUS</span><span>DATE</span></div>
            {rows.map((r, i) => (
              <div key={i} className={`sd-dash-row ${r.isNew ? 'isnew' : ''}`}>
                <div className="sd-dash-role">
                  <span className="sd-li-cardlogo" style={{ background: r.bg, width: 30, height: 30, borderRadius: 8, fontSize: 13 }}>{r.logo}</span>
                  <div style={{ minWidth: 0 }}><div className="sd-dash-rolename">{r.role}</div><div className="sd-dash-roleco">{r.co}</div></div>
                </div>
                <div><SDPill status={r.status} /></div>
                <div className="sd-dash-date">{r.date}</div>
              </div>
            ))}
          </div>

          {/* email detail — who it went to + the email */}
          <div className="sd-dash-detail">
            <div className="sd-dd-head">
              <span className="sd-li-cardlogo" style={{ background: '#6d54c7', width: 42, height: 42, borderRadius: 11, fontSize: 17 }}>e</span>
              <div>
                <div className="sd-dd-name">Shiv Sundar</div>
                <div className="sd-dd-title">Founder &amp; COO</div>
              </div>
              <span className="sd-dd-gmail">Gmail <Icon name="arrow" size={14} style={{ transform: 'rotate(-45deg)' }} /></span>
            </div>

            <div className="sd-dd-status"><SDPill status={newRowStatus} /></div>
            <div className="sd-dd-sentto">{sent ? 'SENT TO 2 PEOPLE · CLICK TO VIEW EACH' : 'QUEUED · SENDING TO 2 PEOPLE…'}</div>
            <div className="sd-dd-recip primary">
              <div className="rn">Shiv Sundar <span>&lt;shiv@esper.io&gt;</span></div>
              <div className="rt">Founder &amp; COO</div>
            </div>
            <div className="sd-dd-recip">
              <div className="rn">Anna George <span>&lt;anna@esper.io&gt;</span></div>
              <div className="rt">Director of Operations · India</div>
            </div>

            <div className="sd-dd-email">
              <h5>Application for Senior Program Manager opening at Esper.</h5>
              <p>Hey Shiv,</p>
              <p>I'd like to apply for the Senior Program Manager role at Esper. I've built TopFounder, a 1:1 founder mentorship platform, and led B2B &amp; B2C growth at Masai.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// ============ MAIN ============
const SD_CAPTIONS = {
  store: ['1', 'Install ToInbox from the Chrome Web Store'],
  open: ['2', 'Open any job on LinkedIn, then open the ToInbox panel'],
  enroll: ['3', 'Enroll the role — we email the founder from your Gmail'],
  enrolled: ['3', 'Enrolled — your application is queued to send'],
  dash: ['4', 'Track every application in your dashboard'],
  sent: ['4', 'Queued → Sent — your email just left your inbox'],
};

function SuccessDemo() {
  const [scene, setScene] = useStateSD('store');       // store | linkedin | dashboard
  const [url, setUrl] = useStateSD('chromewebstore.google.com/detail/toinbox');
  const [caption, setCaption] = useStateSD(SD_CAPTIONS.store);
  const [storeState, setStoreState] = useStateSD('idle'); // idle | confirm | checking | added
  const [panelOpen, setPanelOpen] = useStateSD(false);
  const [enrollState, setEnrollState] = useStateSD('idle'); // idle | enrolling | enrolled
  const [stats, setStats] = useStateSD({ enrolled: 23, sent: 22, replied: 9 });
  const [credits, setCredits] = useStateSD(0);
  const [dashStats, setDashStats] = useStateSD({ enrolled: 24, sent: 22, replied: 9 });
  const [newRowStatus, setNewRowStatus] = useStateSD('queued');
  const [dashScale, setDashScale] = useStateSD(0.62);
  const [cur, setCur] = useStateSD({ x: 380, y: 60 });
  const [click, setClick] = useStateSD(false);

  const browserRef = useRefSD(null);
  const stageRef = useRefSD(null);
  const addRef = useRefSD(null);
  const confirmRef = useRefSD(null);
  const bubbleRef = useRefSD(null);
  const sendRef = useRefSD(null);
  const dashRef = useRefSD(null);

  // scale the large dashboard canvas to fit the stage (matches a real app at full size)
  useEffectSD(() => {
    const fit = () => {
      const st = stageRef.current; if (!st) return;
      const r = st.getBoundingClientRect();
      if (r.width && r.height) setDashScale(Math.min(r.width / 1100, r.height / 780));
    };
    fit();
    const id = setTimeout(fit, 120);
    window.addEventListener('resize', fit);
    return () => { clearTimeout(id); window.removeEventListener('resize', fit); };
  }, [scene]);

  const moveTo = (el, dx = 0, dy = 0) => {
    if (!el || !stageRef.current) return;
    const br = stageRef.current.getBoundingClientRect();
    const tr = el.getBoundingClientRect();
    setCur({ x: tr.left - br.left + tr.width / 2 + dx, y: tr.top - br.top + tr.height / 2 + dy });
  };

  useEffectSD(() => {
    let dead = false;
    const ts = [];
    const wait = ms => new Promise(r => { const t = setTimeout(r, ms); ts.push(t); });
    const moveRef = async (ref, dx, dy) => {
      // wait a frame so the target has rendered after a scene change
      await wait(60);
      if (!dead) moveTo(ref.current, dx, dy);
    };
    const tap = async () => { setClick(true); await wait(150); setClick(false); };

    const run = async () => {
      while (!dead) {
        // ---- reset ----
        setScene('store'); setUrl('chromewebstore.google.com/detail/toinbox');
        setCaption(SD_CAPTIONS.store); setStoreState('idle');
        setPanelOpen(false); setEnrollState('idle');
        setStats({ enrolled: 23, sent: 22, replied: 9 });
        setCredits(0); setDashStats({ enrolled: 24, sent: 22, replied: 9 });
        setNewRowStatus('queued'); setCur({ x: 380, y: 70 });
        await wait(1100); if (dead) return;

        // ---- Scene 1: Chrome Web Store ----
        await moveRef(addRef); await wait(950); if (dead) return;
        await tap(); setStoreState('confirm'); await wait(850); if (dead) return;
        await moveRef(confirmRef); await wait(800); if (dead) return;
        await tap(); setStoreState('checking'); await wait(950); if (dead) return;
        setStoreState('added'); await wait(1250); if (dead) return;

        // ---- Scene 2: LinkedIn + bubble ----
        setScene('linkedin'); setUrl('linkedin.com/jobs/search-results/?keywords=program+manager');
        setCaption(SD_CAPTIONS.open); setCur({ x: 360, y: 80 });
        await wait(1050); if (dead) return;
        await moveRef(bubbleRef); await wait(950); if (dead) return;
        await tap(); setPanelOpen(true); await wait(800); if (dead) return;

        // ---- Scene 3: Enroll ----
        setCaption(SD_CAPTIONS.enroll); await wait(650); if (dead) return;
        await moveRef(sendRef); await wait(900); if (dead) return;
        await tap(); setEnrollState('enrolling'); await wait(1150); if (dead) return;
        setEnrollState('enrolled'); setCredits(1);
        setStats(s => ({ ...s, enrolled: 24 }));
        setCaption(SD_CAPTIONS.enrolled);
        await wait(1450); if (dead) return;

        // ---- Scene 4: Dashboard ----
        setCaption(SD_CAPTIONS.dash);
        await moveRef(dashRef); await wait(800); if (dead) return;
        await tap();
        setScene('dashboard'); setUrl('app.toinbox.app');
        setDashStats({ enrolled: 24, sent: 22, replied: 9 });
        setNewRowStatus('queued');
        await wait(1600); if (dead) return;
        // queued -> sent
        setNewRowStatus('sent');
        setDashStats(s => ({ ...s, sent: 23 }));
        setCaption(SD_CAPTIONS.sent);
        await wait(3400); if (dead) return;
      }
    };
    run();
    return () => { dead = true; ts.forEach(clearTimeout); };
  }, []);

  return (
    <div className="browser sd-browser" ref={browserRef}>
      <div className="browser-chrome">
        <div className="browser-dots"><span /><span /><span /></div>
        <div className="sd-url"><Icon name="lock" size={11} /><span>{url}</span></div>
        <div className="sd-extbar"><span className="sd-extpin" /></div>
      </div>

      <div className="sd-stage" ref={stageRef}>
        <div className="sd-scene" key={scene}>
          {scene === 'store' && <StoreScene storeState={storeState} addRef={addRef} confirmRef={confirmRef} />}
          {scene === 'linkedin' && (
            <LinkedInScene panelOpen={panelOpen} enrollState={enrollState} stats={stats} credits={credits}
              bubbleRef={bubbleRef} sendRef={sendRef} dashRef={dashRef} />
          )}
          {scene === 'dashboard' && <DashboardScene dashStats={dashStats} newRowStatus={newRowStatus} dashScale={dashScale} />}
        </div>

        <div className="sd-caption">
          <span className="sd-caption-num">{caption[0]}</span>
          {caption[1]}
        </div>

        {scene !== 'dashboard' && (
          <div className={`hero-cursor${click ? ' clicking' : ''}`} style={{ left: cur.x, top: cur.y }}>
            <Icon name="cursor" size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

window.SuccessDemo = SuccessDemo;