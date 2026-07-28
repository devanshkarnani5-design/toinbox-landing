// affiliate-dashboard.jsx — ToInbox affiliate dashboard
// Wired to app.toinbox.app/api/affiliate/stats. Handles pending/active/rejected.
const AFF_API = "https://app.toinbox.app";
const SIGNIN_URL = "https://app.toinbox.app/api/auth/linkedin?return=" + encodeURIComponent("https://www.toinbox.app/affiliate-dashboard");
const APPLY_URL = "/affiliate-apply";

const TOKEN_KEY = "jp_token";
function affGetToken() { try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; } }
function affSetToken(t) { try { if (t) localStorage.setItem(TOKEN_KEY, t); } catch (e) {} }
function affAuthHeaders() { const t = affGetToken(); return t ? { Authorization: "Bearer " + t } : {}; }

const affTokens = {
  "--bg": "#f7f6f3", "--bg-elev": "#ffffff", "--bg-soft": "#efede8",
  "--ink": "#0a0a0a", "--ink-2": "#2a2a2a", "--ink-3": "#545454", "--ink-4": "#8a8a85",
  "--line": "rgba(10,10,10,0.08)", "--line-2": "rgba(10,10,10,0.14)",
  "--accent": "oklch(0.58 0.19 252)", "--accent-soft": "oklch(0.94 0.04 252)",
  "--accent-ink": "oklch(0.32 0.16 252)", "--danger": "oklch(0.55 0.2 25)",
  "--cta": "oklch(0.58 0.2 252)",
  fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
  background: "var(--bg)", color: "var(--ink)",
};
const MONO = "'Geist Mono', ui-monospace, monospace";

function DShell({ children }) {
  return (
    <div className="min-h-screen w-full antialiased" style={affTokens}>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] backdrop-blur-[14px]">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 sm:px-7">
          <a href="/" className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em]">
            <img src="/favicon.png" alt="" width="26" height="26" className="rounded-[7px]" style={{ width: 26, height: 26 }} />ToInbox
          </a>
          <a href="/affiliates" className="text-[13.5px] text-[var(--ink-3)] hover:text-[var(--ink)]">Affiliate program</a>
        </div>
      </header>
      <main className="mx-auto max-w-[1120px] px-5 sm:px-7">{children}</main>
    </div>
  );
}
function DCenter({ children }) { return <div className="flex min-h-[70vh] items-center justify-center py-16"><div className="w-full max-w-[460px] text-center">{children}</div></div>; }
function DSpinner() { return <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[var(--line-2)] border-t-[var(--accent)]" />; }

function CopyCode({ code }) {
  const { useState } = React;
  const [done, setDone] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard?.writeText(code); setDone(true); setTimeout(() => setDone(false), 1500); }}
      className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-2)] bg-[var(--bg-elev)] px-2.5 py-1.5 text-[12.5px] font-medium hover:bg-[var(--bg-soft)]">
      {done ? "Copied!" : "Copy"}
    </button>
  );
}

function AffiliateDashboard() {
  const { useState, useEffect, useCallback } = React;
  const [state, setState] = useState("loading"); // loading | signin | none | pending | rejected | ready | error
  const [data, setData] = useState(null);

  const load = useCallback(async () => {
    const url = new URL(window.location.href);
    const tok = url.searchParams.get("token");
    if (tok) {
      affSetToken(tok);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.pathname + (url.search || ""));
    }
    const haveToken = !!affGetToken();
    setState("loading");
    try {
      const r = await fetch(`${AFF_API}/api/affiliate/stats`, {
        credentials: "include",
        headers: { Accept: "application/json", ...affAuthHeaders() },
      });
      if (r.status === 401 || r.status === 403) {
        if (haveToken) return setState("signin");
        window.location.href = SIGNIN_URL;
        return;
      }
      if (r.status === 404) { window.location.href = APPLY_URL; return; }
      if (!r.ok) throw new Error();
      const j = await r.json();
      setData(j);
      if (j.status === "pending") return setState("pending");
      if (j.status === "rejected") return setState("rejected");
      return setState("ready");
    } catch {
      if (haveToken) return setState("signin");
      window.location.href = SIGNIN_URL;
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  if (state === "loading") return <DShell><DCenter><DSpinner /></DCenter></DShell>;

  if (state === "signin") return (
    <DShell><DCenter>
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">Sign in to view your dashboard</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">Sign in with your ToInbox account, then return to this page.</p>
      <a href={SIGNIN_URL} className="mt-8 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 text-[15px] font-medium text-white transition hover:brightness-110">Sign in</a>
    </DCenter></DShell>
  );

  if (state === "none") return (
    <DShell><DCenter>
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">You haven't applied yet</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">Apply to the affiliate program to get your code and start earning 25%.</p>
      <a href={APPLY_URL} className="mt-8 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 text-[15px] font-medium text-white transition hover:brightness-110">Apply now</a>
    </DCenter></DShell>
  );

  if (state === "pending") return (
    <DShell><DCenter>
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>
      </div>
      <h1 className="text-[24px] font-medium tracking-[-0.03em]">Your application is under review</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">We review every affiliate by hand. Your code will activate as soon as you're approved.</p>
      {data?.code && <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--line-2)] bg-[var(--bg-elev)] px-4 py-2.5" style={{ fontFamily: MONO }}><span className="text-[12px] text-[var(--ink-4)]">CODE</span><span className="text-[15px] font-medium">{data.code}</span><span className="text-[11px] text-[var(--ink-4)]">· inactive</span></div>}
    </DCenter></DShell>
  );

  if (state === "rejected") return (
    <DShell><DCenter>
      <h1 className="text-[24px] font-medium tracking-[-0.03em]">Application not approved</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">Questions? <a className="font-medium text-[var(--cta)] hover:underline" href="mailto:affiliates@toinbox.app">affiliates@toinbox.app</a></p>
    </DCenter></DShell>
  );

  if (state === "error") return (
    <DShell><DCenter>
      <h1 className="text-[24px] font-medium tracking-[-0.03em]">Couldn't load your stats</h1>
      <button onClick={load} className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--cta)] px-6 text-[14.5px] font-medium text-white hover:brightness-110">Try again</button>
    </DCenter></DShell>
  );

  // ready
  const first = String(data.name || "").split(" ")[0];
  const cur = data.by_currency || [];
  const sales = data.recent_sales || [];
  const shareUrl = `https://toinbox.app/?ref=${encodeURIComponent(data.code)}`;
  return (
    <DShell>
      <div className="py-[44px] sm:py-[56px]">
        <div style={{ fontFamily: MONO }} className="text-[11px] uppercase tracking-[0.08em] text-[var(--ink-4)]">Affiliate dashboard</div>
        <h1 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-medium tracking-[-0.035em]">Welcome back{first ? `, ${first}` : ""}.</h1>
        <p className="mt-3 text-[15px] text-[var(--ink-3)]">{data.total_sales > 0 ? "Here's how your code is performing." : "Your code is active — share it to start earning."}</p>

        {/* code card */}
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[16px] border border-[var(--line)] bg-[var(--bg-elev)] p-5">
          <div>
            <div className="text-[12px] uppercase tracking-wide text-[var(--ink-4)]" style={{ fontFamily: MONO }}>Your code</div>
            <div className="mt-1 text-[22px] font-medium tracking-wide" style={{ fontFamily: MONO }}>{data.code}</div>
          </div>
          <div className="ml-auto flex items-center gap-2"><CopyCode code={data.code} /></div>
        </div>

        {/* per-currency stats */}
        {cur.length === 0 ? (
          <div className="mt-4 rounded-[16px] border border-dashed border-[var(--line-2)] bg-[var(--bg-elev)] p-8 text-center text-[14px] text-[var(--ink-3)]">No sales yet. Share your code and they'll show up here.</div>
        ) : cur.map((c) => (
          <div key={c.currency} className="mt-4">
            <div className="mb-2 text-[12px] font-medium uppercase tracking-wide text-[var(--ink-4)]">{c.currency} earnings</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Sales", c.total_sales, false], ["Earned", c.earned, true], ["Pending", c.pending, true], ["Paid", c.paid, true]].map(([lbl, val, money]) => (
                <div key={lbl} className="rounded-[14px] border border-[var(--line)] bg-[var(--bg-elev)] p-4">
                  <div className="text-[12px] text-[var(--ink-4)]">{lbl}</div>
                  <div className="mt-1.5 text-[22px] font-medium tracking-[-0.02em] tabular-nums">{money ? `${c.symbol}${Number(val).toLocaleString()}` : val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* payout note */}
        <div className="mt-5 rounded-[14px] bg-[var(--bg-soft)] px-4 py-3 text-[13px] text-[var(--ink-3)]">
          Commission is 25% of each sale, paid monthly to your PayPal. Next payout: <span className="font-medium text-[var(--ink)]">{data.next_payout_date}</span>.
        </div>

        {/* recent sales */}
        {sales.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--bg-elev)]">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 border-b border-[var(--line)] px-4 py-3 text-[11px] uppercase tracking-wide text-[var(--ink-4)]" style={{ fontFamily: MONO }}>
              <span>Date</span><span>Plan</span><span className="text-right">Sale</span><span className="text-right">Commission</span>
            </div>
            {sales.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 border-b border-[var(--line)] px-4 py-3 text-[13.5px] last:border-0">
                <span className="text-[var(--ink-3)]">{new Date(s.date).toLocaleDateString()}</span>
                <span className="capitalize">{s.plan}</span>
                <span className="text-right tabular-nums">{s.symbol}{Number(s.amount).toLocaleString()}</span>
                <span className="text-right font-medium tabular-nums">{s.symbol}{Number(s.commission).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        {/* share */}
        <div className="mt-6 rounded-[16px] border border-[var(--line)] bg-[var(--bg-elev)] p-5">
          <div className="text-[13.5px] font-medium">Share your link</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-[var(--bg-soft)] px-3 py-2 text-[13px]" style={{ fontFamily: MONO }}>{shareUrl}</code>
            <CopyCode code={shareUrl} />
          </div>
          <p className="mt-2 text-[12.5px] text-[var(--ink-4)]">Anyone who buys after using your code gets 10% off, and you earn 25%.</p>
        </div>
      </div>
    </DShell>
  );
}
window.AffiliateDashboard = AffiliateDashboard;
