// affiliate-dashboard.jsx — ToInbox affiliate dashboard
// Design ported from the ToInboxAffiliate.jsx reference (Section 3), adapted for:
//   - real auth: LinkedIn session (Bearer token in localStorage), not Google
//   - real data: multi-currency (INR via Razorpay, USD via Dodo), approval states
const AFF_API = "https://app.toinbox.app";
const SIGNIN_URL = "https://app.toinbox.app/api/auth/linkedin?return=" + encodeURIComponent("https://www.toinbox.app/affiliate-dashboard");
const APPLY_URL = "/affiliate-apply";
const SUPPORT_EMAIL = "affiliates@toinbox.app";
const CHECKOUT_URL = "toinbox.app";
const DASH_MONO = "'Geist Mono', ui-monospace, monospace";

const TOKEN_KEY = "jp_token";
function affGetToken() { try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; } }
function affSetToken(t) { try { if (t) localStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
function affAuthHeaders() { const t = affGetToken(); return t ? { Authorization: "Bearer " + t } : {}; }

const dashTokens = {
  "--bg": "#f7f6f3", "--bg-elev": "#ffffff", "--bg-soft": "#efede8",
  "--ink": "#0a0a0a", "--ink-2": "#2a2a2a", "--ink-3": "#545454", "--ink-4": "#8a8a85",
  "--line": "rgba(10,10,10,0.08)", "--line-2": "rgba(10,10,10,0.14)",
  "--accent": "oklch(0.58 0.19 252)", "--accent-soft": "oklch(0.94 0.04 252)",
  "--accent-ink": "oklch(0.32 0.16 252)",
  "--cta": "#0a6fe0", "--cta-glow": "oklch(0.62 0.21 252 / 0.45)",
  "--ok": "oklch(0.45 0.14 152)", "--ok-soft": "oklch(0.94 0.06 152)",
  "--danger": "oklch(0.55 0.19 25)",
  fontFamily: "'Geist', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontFeatureSettings: "'ss01','cv11'", background: "var(--bg)", color: "var(--ink)",
};

const dk = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const DIc = {
  copy: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><rect x="9" y="9" width="11" height="11" rx="2.4"/><path d="M15.5 6.2A2.2 2.2 0 0 0 13.4 4.5H6.7A2.2 2.2 0 0 0 4.5 6.7v6.7c0 1 .7 1.9 1.7 2.1"/></g></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="m5 12.5 4.5 4.5L19 7.5"/></g></svg>),
  coin: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><circle cx="12" cy="12" r="8.5"/><path d="M14.3 9.3a2.6 2.6 0 0 0-2.3-1.2c-1.4 0-2.4.8-2.4 1.9 0 2.6 4.9 1.3 4.9 3.9 0 1.2-1.1 2-2.5 2a2.7 2.7 0 0 1-2.4-1.3"/></g></svg>),
  cart: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="M3 4.5h2.2l2.2 10.2h9.4l2-7.2H6.2"/><circle cx="9.2" cy="19" r="1.3"/><circle cx="16.4" cy="19" r="1.3"/></g></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.4V12l3 1.8"/></g></svg>),
  bank: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="M3.5 9.5 12 4.5l8.5 5M5.5 9.5v8M9.8 9.5v8M14.2 9.5v8M18.5 9.5v8M3.5 19.5h17"/></g></svg>),
  cal: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><rect x="3.5" y="5.5" width="17" height="15" rx="2.4"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4"/></g></svg>),
  alert: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.8v4.8M12 16.1v.1"/></g></svg>),
  out: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="M15 8.5V6.2A1.7 1.7 0 0 0 13.3 4.5H6.2A1.7 1.7 0 0 0 4.5 6.2v11.6c0 .9.8 1.7 1.7 1.7h7.1a1.7 1.7 0 0 0 1.7-1.7v-2.3"/><path d="M9.5 12h10M16.5 8.8 19.8 12l-3.3 3.2"/></g></svg>),
  in: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="M9.5 15.5V12l3-1.8 3 1.8v3.5"/><path d="M4.5 19.5v-11l7.5-4.5 7.5 4.5v11"/></g></svg>),
  ticket: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6Z"/><path d="M14.5 9.5l-5 5"/></g></svg>),
  share: (p) => (<svg viewBox="0 0 24 24" {...p}><g {...dk}><circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.8 15.8 6.8M8.2 13.2l7.6 4"/></g></svg>),
};

/* ── Formatting ──────────────────────────────────────────────────────────*/
const SYM = { INR: "₹", USD: "$" };
function money(amount, currency) {
  const sym = SYM[currency] || "";
  const n = Number(amount || 0);
  return currency === "INR" ? `${sym}${n.toLocaleString("en-IN")}` : `${sym}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
const humanDate = (iso) => {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch (e) { return iso; }
};

/* ── Shared bits ─────────────────────────────────────────────────────────*/
function CopyButton({ value, label = "Copy", className = "" }) {
  const { useState } = React;
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = value; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    setDone(true); setTimeout(() => setDone(false), 1800);
  };
  return (
    <button type="button" onClick={copy} aria-live="polite" className={`inline-flex h-[38px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-all duration-150 ${done ? "bg-[var(--ok-soft)] text-[var(--ok)]" : "bg-[linear-gradient(180deg,#1785f5,#0a6fe0)] text-white shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_8px_26px_-10px_var(--cta-glow)] hover:brightness-[1.06]"} ${className}`}>
      {done ? <DIc.check className="h-[15px] w-[15px]" /> : <DIc.copy className="h-[15px] w-[15px]" />}
      {done ? "Copied" : label}
    </button>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen w-full antialiased" style={dashTokens}>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:px-7">
          <a href="/" className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em]">
            <img src="/favicon.png" alt="" width="26" height="26" className="rounded-[7px] object-contain" style={{ width: 26, height: 26 }} />ToInbox
            <span className="ml-1 hidden rounded-full border border-[var(--line)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11px] font-medium text-[var(--ink-3)] sm:inline">Affiliate</span>
          </a>
          <a href="/affiliates" className="text-[13.5px] text-[var(--ink-3)] hover:text-[var(--ink)]">Affiliate program</a>
        </div>
      </header>
      <main className="mx-auto max-w-[1120px] px-5 pb-[96px] sm:px-7">{children}</main>
    </div>
  );
}

function CenterCard({ icon, title, body, children }) {
  return (
    <div className="mx-auto max-w-[460px] py-[76px] text-center sm:py-[120px]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--line)] bg-[var(--bg-elev)] shadow-[0_1px_0_rgba(10,10,10,0.03)]">{icon}</div>
      <h1 className="mt-7 text-[clamp(26px,3.4vw,34px)] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h1>
      <p className="mx-auto mt-4 max-w-[380px] text-[15.5px] leading-[1.6] text-[var(--ink-3)]">{body}</p>
      <div className="mt-8 flex flex-col items-center gap-4">{children}</div>
    </div>
  );
}

function LoadingState() {
  const bar = "animate-pulse rounded-[8px] bg-[color-mix(in_oklab,var(--ink)_7%,transparent)]";
  return (
    <div className="py-[52px] sm:py-[64px]">
      <div className={`${bar} h-[18px] w-[180px]`} />
      <div className={`${bar} mt-4 h-[38px] w-[300px] max-w-full`} />
      <div className={`${bar} mt-8 h-[92px] w-full rounded-[18px]`} />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => <div key={i} className={`${bar} h-[122px] rounded-[18px]`} />)}
      </div>
      <div className={`${bar} mt-4 h-[280px] w-full rounded-[18px]`} />
      <p className="mt-6 text-center text-[13px] text-[var(--ink-4)]">Loading your stats…</p>
    </div>
  );
}

/* ── Data views ──────────────────────────────────────────────────────────*/
function CodeCard({ code }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[20px] border border-[var(--line)] bg-[var(--bg-elev)] p-6 shadow-[0_1px_0_rgba(10,10,10,0.03),0_24px_60px_-46px_rgba(10,10,10,0.4)] sm:p-7">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-[280px] w-[280px] rounded-full" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 14%, transparent), transparent 68%)" }} />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div style={{ fontFamily: DASH_MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[var(--ink-4)]">Your discount code</div>
          <div className="mt-2.5 flex items-center gap-3">
            <span style={{ fontFamily: DASH_MONO }} className="rounded-[10px] border border-[color-mix(in_oklab,var(--accent)_32%,transparent)] bg-[var(--accent-soft)] px-3.5 py-2 text-[22px] font-medium tracking-[0.02em] text-[var(--accent-ink)] sm:text-[26px]">{code}</span>
          </div>
          <p className="mt-3 max-w-[380px] text-[13.5px] leading-[1.5] text-[var(--ink-3)]">Your audience gets 10% off with this code. You earn 25% of every sale it makes.</p>
        </div>
        <CopyButton value={code} label="Copy code" />
      </div>
    </div>
  );
}

// Per-currency stat cards, same visual language as the original single-currency version.
function StatCards({ byCurrency }) {
  return (
    <div className="flex flex-col gap-5">
      {byCurrency.map((c) => (
        <div key={c.currency}>
          <div style={{ fontFamily: DASH_MONO }} className="mb-2.5 text-[11px] uppercase tracking-[0.08em] text-[var(--ink-4)]">{c.currency} earnings</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: DIc.cart, label: "Sales", value: String(c.total_sales), sub: "Orders using your code" },
              { icon: DIc.coin, label: "Commission earned", value: money(c.earned, c.currency), sub: "Pending + paid", accent: true },
              { icon: DIc.clock, label: "Pending", value: money(c.pending, c.currency), sub: "Included in the next payout" },
              { icon: DIc.bank, label: "Paid out", value: money(c.paid, c.currency), sub: "Sent to your PayPal" },
            ].map(({ icon: I, label, value, sub, accent }) => (
              <div key={label} className="rounded-[18px] border border-[var(--line)] bg-[var(--bg-elev)] p-5 shadow-[0_1px_0_rgba(10,10,10,0.02)]">
                <div className="flex items-center gap-2 text-[var(--ink-3)]">
                  <I className="h-[16px] w-[16px]" />
                  <span className="text-[13px] font-medium">{label}</span>
                </div>
                <div className={`mt-4 text-[30px] font-medium leading-none tracking-[-0.035em] tabular-nums ${accent ? "text-[var(--accent-ink)]" : ""}`}>{value}</div>
                <div className="mt-2.5 text-[12.5px] text-[var(--ink-4)]">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PayoutCallout({ byCurrency, nextPayoutDate }) {
  const pendingLine = byCurrency.filter((c) => c.pending > 0).map((c) => money(c.pending, c.currency)).join(" + ");
  return (
    <div className="flex flex-col gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--bg-elev)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[12px] bg-[var(--ok-soft)] text-[var(--ok)]"><DIc.cal className="h-[19px] w-[19px]" /></span>
        <div>
          <div className="text-[14.5px] font-medium">Next payout · {humanDate(nextPayoutDate)}</div>
          <div className="mt-1 text-[13px] leading-[1.5] text-[var(--ink-3)]">{pendingLine || "Nothing"} pending will be sent to your PayPal account.</div>
        </div>
      </div>
      <span style={{ fontFamily: DASH_MONO }} className="self-start rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 text-[10.5px] uppercase tracking-[0.08em] text-[var(--ink-3)] sm:self-auto">Monthly</span>
    </div>
  );
}

function SalesTable({ sales }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--bg-elev)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-5 py-4 sm:px-6">
        <h2 className="text-[15px] font-medium tracking-[-0.015em]">Recent sales</h2>
        <span className="text-[12.5px] text-[var(--ink-4)]">Last {sales.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr style={{ fontFamily: DASH_MONO }} className="text-[10.5px] uppercase tracking-[0.08em] text-[var(--ink-4)]">
              <th className="px-5 py-3 font-normal sm:px-6">Date</th>
              <th className="px-5 py-3 font-normal sm:px-6">Plan</th>
              <th className="px-5 py-3 font-normal sm:px-6">Gateway</th>
              <th className="px-5 py-3 text-right font-normal sm:px-6">Sale amount</th>
              <th className="px-5 py-3 text-right font-normal sm:px-6">Your commission</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr key={`${s.date}-${i}`} className="border-t border-[var(--line)]">
                <td className="whitespace-nowrap px-5 py-4 text-[14px] text-[var(--ink-3)] sm:px-6">{humanDate(s.date)}</td>
                <td className="px-5 py-4 text-[14px] font-medium capitalize sm:px-6">{s.plan}</td>
                <td className="px-5 py-4 text-[13px] capitalize text-[var(--ink-3)] sm:px-6">{s.provider}</td>
                <td className="whitespace-nowrap px-5 py-4 text-right text-[14px] tabular-nums text-[var(--ink-3)] sm:px-6">{money(s.amount, s.currency)}</td>
                <td className="whitespace-nowrap px-5 py-4 text-right text-[14px] font-medium tabular-nums text-[var(--ok)] sm:px-6">+{money(s.commission, s.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ShareSection({ code }) {
  const line = `I use ToInbox to find the hiring managers behind LinkedIn job listings and email them directly. Use code ${code} for 10% off: ${CHECKOUT_URL}`;
  return (
    <div className="rounded-[18px] border border-[var(--line)] bg-[var(--bg-elev)] p-5 sm:p-6">
      <div className="flex items-center gap-2 text-[var(--ink-3)]"><DIc.share className="h-[16px] w-[16px]" /><h2 className="text-[15px] font-medium tracking-[-0.015em] text-[var(--ink)]">Share your code</h2></div>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex items-center justify-between gap-4 rounded-[14px] border border-[var(--line)] bg-[var(--bg)] px-4 py-3.5 lg:w-[280px] lg:flex-none">
          <span style={{ fontFamily: DASH_MONO }} className="text-[18px] font-medium tracking-[0.02em] text-[var(--accent-ink)]">{code}</span>
          <CopyButton value={code} label="Copy" />
        </div>
        <div className="flex flex-1 flex-col gap-3 rounded-[14px] border border-[var(--line)] bg-[var(--bg)] p-4">
          <p className="text-[13.5px] leading-[1.6] text-[var(--ink-2)]">{line}</p>
          <div className="flex justify-end"><CopyButton value={line} label="Copy message" /></div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ code }) {
  const steps = [
    ["01", "Share your code", "Put it in a newsletter, a video description, a coaching call, or a community post."],
    ["02", "They save 10%", "Your code applies the discount at checkout — that's also how the sale is attributed to you."],
    ["03", "You earn 25%", "A quarter of every sale lands here, and is paid out to your PayPal each month."],
  ];
  return (
    <div className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-elev)] p-7 text-center sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--accent-soft)] text-[var(--accent-ink)]"><DIc.ticket className="h-[22px] w-[22px]" /></div>
      <h2 className="mt-6 text-[22px] font-medium tracking-[-0.025em]">No sales yet — your code is live and ready.</h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-[var(--ink-3)]">The moment someone checks out with <span style={{ fontFamily: DASH_MONO }} className="font-medium text-[var(--accent-ink)]">{code}</span>, it shows up right here.</p>
      <div className="mx-auto mt-9 grid max-w-[820px] grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--line)] text-left sm:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <div key={n} className="bg-[var(--bg-elev)] p-5">
            <span style={{ fontFamily: DASH_MONO }} className="text-[11px] tracking-[0.08em] text-[var(--ink-4)]">{n}</span>
            <div className="mt-3 text-[14.5px] font-medium tracking-[-0.015em]">{t}</div>
            <div className="mt-1.5 text-[13px] leading-[1.55] text-[var(--ink-3)]">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────*/
function AffiliateDashboard() {
  const { useState, useEffect, useCallback } = React;
  // loading | signin | none | pending | rejected | empty | ready | error
  const [state, setState] = useState("loading");
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const load = useCallback(async () => {
    const url = new URL(window.location.href);
    const tok = url.searchParams.get("token");
    if (tok) { affSetToken(tok); url.searchParams.delete("token"); window.history.replaceState({}, "", url.pathname + (url.search || "")); }
    const haveToken = !!affGetToken();

    setState("loading");
    try {
      const res = await fetch(`${AFF_API}/api/affiliate/stats`, { credentials: "include", headers: { Accept: "application/json", ...affAuthHeaders() } });
      if (res.status === 401 || res.status === 403) {
        if (haveToken) return setState("signin");
        window.location.href = SIGNIN_URL;
        return;
      }
      if (res.status === 404) { window.location.href = APPLY_URL; return; }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      setData(json);
      if (json.status === "pending") return setState("pending");
      if (json.status === "rejected") return setState("rejected");
      setState(Number(json.total_sales) > 0 ? "ready" : "empty");
    } catch (err) {
      if (!affGetToken()) { window.location.href = SIGNIN_URL; return; }
      setErrorMsg(err && err.message ? err.message : "Network error");
      setState("error");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (state === "loading") return <Shell><LoadingState /></Shell>;

  if (state === "signin") return (
    <Shell>
      <CenterCard icon={<DIc.in className="h-[22px] w-[22px]" />} title="Please sign in." body="Your session has expired or you're not signed in. Sign in with your ToInbox account to see your affiliate stats.">
        <a href={SIGNIN_URL} className="inline-flex h-[48px] w-full items-center justify-center gap-3 rounded-[12px] border border-[var(--line-2)] bg-[var(--bg-elev)] px-6 text-[15px] font-medium shadow-[0_1px_0_rgba(10,10,10,0.03),0_12px_32px_-22px_rgba(10,10,10,0.45)] transition-all duration-150 hover:-translate-y-px hover:bg-[var(--bg-soft)]">
          <DIc.in className="h-[19px] w-[19px]" />Sign in to ToInbox
        </a>
      </CenterCard>
    </Shell>
  );

  if (state === "pending") return (
    <Shell>
      <CenterCard icon={<DIc.clock className="h-[22px] w-[22px] text-[var(--accent-ink)]" />} title="Your application is under review." body="We review every affiliate by hand. Your code will activate as soon as you're approved.">
        {data?.code && (
          <div className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--line-2)] bg-[var(--bg-elev)] px-4 py-2.5" style={{ fontFamily: DASH_MONO }}>
            <span className="text-[12px] text-[var(--ink-4)]">CODE</span>
            <span className="text-[15px] font-medium">{data.code}</span>
            <span className="text-[11px] text-[var(--ink-4)]">· inactive</span>
          </div>
        )}
      </CenterCard>
    </Shell>
  );

  if (state === "rejected") return (
    <Shell>
      <CenterCard icon={<DIc.alert className="h-[22px] w-[22px] text-[var(--danger)]" />} title="Application not approved." body={<>Questions? <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-[var(--cta)] underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a></>} />
    </Shell>
  );

  if (state === "error") return (
    <Shell>
      <CenterCard icon={<DIc.alert className="h-[22px] w-[22px] text-[var(--danger)]" />} title="We couldn't load your stats." body={`${errorMsg}. This is usually temporary — try again in a moment.`}>
        <button type="button" onClick={load} className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#1785f5,#0a6fe0)] px-6 text-[14.5px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_10px_34px_-10px_var(--cta-glow)] transition-all duration-150 hover:-translate-y-px hover:brightness-[1.06]">Try again</button>
        <p className="text-[13px] text-[var(--ink-3)]">Still stuck? <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-[var(--cta)] underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a></p>
      </CenterCard>
    </Shell>
  );

  const byCurrency = Array.isArray(data.by_currency) ? data.by_currency : [];
  const sales = Array.isArray(data.recent_sales) ? data.recent_sales : [];
  const firstName = String(data.name || "").split(" ")[0];

  return (
    <Shell>
      <div className="py-[44px] sm:py-[56px]">
        <div style={{ fontFamily: DASH_MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[var(--ink-4)]">Affiliate dashboard</div>
        <h1 className="mt-3 text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.05] tracking-[-0.035em]">Welcome back{firstName ? `, ${firstName}` : ""}.</h1>
        <p className="mt-3 max-w-[520px] text-[15.5px] leading-[1.55] text-[var(--ink-3)]">
          {state === "empty" ? "Your code is active — here's everything you need to start earning." : "Here's how your code is performing."}
        </p>

        <div className="mt-9 flex flex-col gap-4">
          <CodeCard code={data.code} />
          {state === "empty" ? <EmptyState code={data.code} /> : (
            <>
              <StatCards byCurrency={byCurrency} />
              <PayoutCallout byCurrency={byCurrency} nextPayoutDate={data.next_payout_date} />
              {sales.length > 0 && <SalesTable sales={sales} />}
            </>
          )}
          <ShareSection code={data.code} />
        </div>

        <p className="mt-8 text-[13px] leading-[1.55] text-[var(--ink-4)]">
          Commission is 25% of each sale, paid monthly to your PayPal. Questions? <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[var(--ink-3)] underline decoration-[var(--line-2)] underline-offset-4 hover:text-[var(--cta)]">{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </Shell>
  );
}

window.AffiliateDashboard = AffiliateDashboard;
