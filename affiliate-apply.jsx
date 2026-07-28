// affiliate-apply.jsx — ToInbox affiliate application (approval-gated)
// Wired to app.toinbox.app/api/affiliate/*. Uses the existing jp_session cookie.
const AFF_API = "https://app.toinbox.app";
const SIGNIN_URL = "https://app.toinbox.app"; // your normal login
const DASH_URL = "/affiliate-dashboard";

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

function Shell({ children }) {
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

function Center({ children }) {
  return <div className="flex min-h-[70vh] items-center justify-center py-16"><div className="w-full max-w-[440px] text-center">{children}</div></div>;
}

function Spinner() {
  return <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[var(--line-2)] border-t-[var(--accent)]" />;
}

function AffiliateApply() {
  const { useState, useEffect } = React;
  const [state, setState] = useState("loading"); // loading | signin | form | pending | active | rejected | done
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ linkedin: "", payoutEmail: "", about: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${AFF_API}/api/affiliate/me`, { credentials: "include", headers: { Accept: "application/json" } });
        if (r.status === 401 || r.status === 403) return setState("signin");
        if (!r.ok) throw new Error();
        const j = await r.json();
        setMe(j);
        if (!j.onboarded) return setState("form");
        if (j.status === "active") return setState("active");
        if (j.status === "rejected") return setState("rejected");
        return setState("pending");
      } catch { setState("signin"); }
    })();
  }, []);

  const set = (k) => (e) => { const v = e.target.value; setForm((f) => ({ ...f, [k]: v })); setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p)); };

  const validate = () => {
    const e = {};
    if (!form.linkedin.trim()) e.linkedin = "Add your LinkedIn profile URL.";
    else if (!/linkedin\.com\/(in|company)\//i.test(form.linkedin.trim())) e.linkedin = "Enter a full LinkedIn URL (linkedin.com/in/…).";
    if (!form.payoutEmail.trim()) e.payoutEmail = "We need this to send payouts.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.payoutEmail.trim())) e.payoutEmail = "That doesn't look like a valid email.";
    return e;
  };

  const submit = async () => {
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true); setErrMsg("");
    try {
      const r = await fetch(`${AFF_API}/api/affiliate/onboard`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedin: form.linkedin.trim(), payoutMethod: "PayPal", payoutEmail: form.payoutEmail.trim(), about: form.about.trim() }),
      });
      if (r.status === 401) return setState("signin");
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Request failed");
      setState("done");
    } catch (err) { setErrMsg(String(err.message || "Network error")); } finally { setBusy(false); }
  };

  if (state === "loading") return <Shell><Center><Spinner /></Center></Shell>;

  if (state === "signin") return (
    <Shell><Center>
      <h1 className="text-[28px] font-medium tracking-[-0.03em]">Sign in to apply</h1>
      <p className="mt-3 text-[15px] leading-[1.55] text-[var(--ink-3)]">Affiliates use the same ToInbox account. Sign in, then come back to this page to finish your application.</p>
      <a href={SIGNIN_URL} className="mt-8 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 text-[15px] font-medium text-white transition hover:brightness-110">Sign in to ToInbox</a>
    </Center></Shell>
  );

  if (state === "done" || state === "pending") return (
    <Shell><Center>
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>
      </div>
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">Application under review</h1>
      <p className="mt-3 text-[15px] leading-[1.55] text-[var(--ink-3)]">Thanks{me?.name ? `, ${String(me.name).split(" ")[0]}` : ""} — your application is in. Every affiliate is personally reviewed. You'll be able to start sharing your code as soon as it's approved.</p>
      {me?.code && <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--line-2)] bg-[var(--bg-elev)] px-4 py-2.5" style={{ fontFamily: MONO }}><span className="text-[12px] text-[var(--ink-4)]">YOUR CODE</span><span className="text-[15px] font-medium tracking-wide">{me.code}</span><span className="text-[11px] text-[var(--ink-4)]">(inactive until approved)</span></div>}
      <div className="mt-8"><a href={DASH_URL} className="text-[14px] font-medium text-[var(--cta)] hover:underline">Go to your dashboard →</a></div>
    </Center></Shell>
  );

  if (state === "active") return (
    <Shell><Center>
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">You're an affiliate 🎉</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">Your code is active. Head to your dashboard to grab it and track earnings.</p>
      <a href={DASH_URL} className="mt-8 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--cta)] px-7 text-[15px] font-medium text-white transition hover:brightness-110">Open dashboard</a>
    </Center></Shell>
  );

  if (state === "rejected") return (
    <Shell><Center>
      <h1 className="text-[26px] font-medium tracking-[-0.03em]">Application not approved</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-3)]">Your affiliate application wasn't approved this time. If you think this was a mistake, reach out at <a className="font-medium text-[var(--cta)] hover:underline" href="mailto:affiliates@toinbox.app">affiliates@toinbox.app</a>.</p>
    </Center></Shell>
  );

  // form
  return (
    <Shell>
      <div className="grid grid-cols-1 gap-12 py-[56px] lg:grid-cols-[1fr_360px] lg:gap-16">
        <div>
          <span style={{ fontFamily: MONO }} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-3 py-1.5 text-[11.5px] uppercase tracking-[0.06em] text-[var(--ink-3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />Apply to the program
          </span>
          <h1 className="mt-6 max-w-[540px] text-[clamp(30px,4vw,46px)] font-medium leading-[1.03] tracking-[-0.035em]">Become a ToInbox affiliate.</h1>
          <p className="mt-4 max-w-[480px] text-[16px] leading-[1.55] text-[var(--ink-3)]">Two quick details. Every affiliate is personally reviewed — once approved, your unique code is live and starts earning 25%.</p>

          <div className="mt-9 rounded-[20px] border border-[var(--line)] bg-[var(--bg-elev)] p-6 shadow-[0_1px_0_rgba(10,10,10,0.03),0_30px_70px_-46px_rgba(10,10,10,0.35)] sm:p-8">
            <div className="mb-6 flex items-center gap-3 rounded-[12px] bg-[var(--bg-soft)] px-4 py-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[var(--accent-soft)] text-[13px] font-medium text-[var(--accent-ink)]">{(me?.name || "?").charAt(0).toUpperCase()}</span>
              <div className="truncate text-[13.5px] text-[var(--ink-2)]"><span className="font-medium text-[var(--ink)]">{me?.name}</span> · {me?.email}</div>
            </div>

            <label className="block text-[13.5px] font-medium text-[var(--ink-2)]">LinkedIn profile</label>
            <input value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/you"
              className="mt-2 h-11 w-full rounded-[12px] border bg-[var(--bg-elev)] px-3.5 text-[15px] outline-none transition placeholder:text-[var(--ink-4)]"
              style={{ borderColor: errors.linkedin ? "var(--danger)" : "var(--line-2)" }} />
            {errors.linkedin && <p className="mt-1.5 text-[12.5px] text-[var(--danger)]">{errors.linkedin}</p>}

            <label className="mt-5 block text-[13.5px] font-medium text-[var(--ink-2)]">PayPal email <span className="text-[var(--ink-4)]">· for payouts</span></label>
            <input value={form.payoutEmail} onChange={set("payoutEmail")} placeholder="you@example.com"
              className="mt-2 h-11 w-full rounded-[12px] border bg-[var(--bg-elev)] px-3.5 text-[15px] outline-none transition placeholder:text-[var(--ink-4)]"
              style={{ borderColor: errors.payoutEmail ? "var(--danger)" : "var(--line-2)" }} />
            {errors.payoutEmail && <p className="mt-1.5 text-[12.5px] text-[var(--danger)]">{errors.payoutEmail}</p>}

            <label className="mt-5 block text-[13.5px] font-medium text-[var(--ink-2)]">How will you share ToInbox? <span className="text-[var(--ink-4)]">· optional</span></label>
            <textarea value={form.about} onChange={set("about")} rows={3} placeholder="Newsletter, YouTube, a coaching community…"
              className="mt-2 w-full resize-none rounded-[12px] border border-[var(--line-2)] bg-[var(--bg-elev)] px-3.5 py-3 text-[15px] outline-none transition placeholder:text-[var(--ink-4)]" />

            {errMsg && <p className="mt-4 text-[13px] text-[var(--danger)]">{errMsg}</p>}
            <button onClick={submit} disabled={busy}
              className="mt-7 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--cta)] text-[15px] font-medium text-white transition hover:brightness-110 disabled:opacity-60">
              {busy ? "Submitting…" : "Submit application"}
            </button>
            <p className="mt-3 text-center text-[12.5px] text-[var(--ink-4)]">No approval queue for your audience — your code discounts 10% and pays you 25%, once approved.</p>
          </div>
        </div>

        <aside className="lg:pt-[92px]">
          <div className="rounded-[20px] border border-[var(--line)] bg-[var(--bg-elev)] p-6">
            <h3 className="text-[15px] font-medium">What happens next</h3>
            <ol className="mt-4 space-y-4 text-[13.5px] leading-[1.5] text-[var(--ink-3)]">
              <li><span className="font-medium text-[var(--ink)]">1. We review.</span> Every affiliate is approved by hand.</li>
              <li><span className="font-medium text-[var(--ink)]">2. Your code goes live.</span> A unique code, tied to your account.</li>
              <li><span className="font-medium text-[var(--ink)]">3. You earn 25%.</span> On every sale, paid monthly to PayPal.</li>
            </ol>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
window.AffiliateApply = AffiliateApply;
