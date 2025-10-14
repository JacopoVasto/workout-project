import { useState } from "react";
import supabase from "../../supabase/supabase-client";

export default function AuthPage() {
  const [tab, setTab] = useState("magic"); // 'magic' | 'login' | 'register'
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function sendMagicLink(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: import.meta.env.VITE_SITE_URL || window.location.origin }
    });
    setMsg(error ? error.message : "📩 Ti ho inviato un link via email. Aprilo da questo dispositivo.");
    setBusy(false);
  }

  async function register(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { data, error } = await supabase.auth.signUp({ email, password: pwd });
    setMsg(error ? error.message : (data.user?.email_confirmed_at ? "Registrazione completata ✅" : "Controlla la mail per confermare l’account."));
    setBusy(false);
  }

  async function login(e) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setMsg(error ? error.message : "✅ Login ok!");
    setBusy(false);
  }

  async function loginAnon() {
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.signInAnonymously();
    setMsg(error ? error.message : "✅ Login anonimo ok");
    setBusy(false);
  }

  async function loginWithGoogle() {
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: import.meta.env.VITE_SITE_URL || window.location.origin }
    });
    if (error) { setMsg(error.message); setBusy(false); }
    // altrimenti vieni rediretto da Google → torna qui loggato
  }

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Accedi</h1>

      <div className="flex gap-2 justify-center">
        <button className={`px-3 py-1 rounded ${tab==='magic'?'bg-teal-600 text-white':'bg-gray-100'}`} onClick={()=>setTab('magic')}>Magic Link</button>
        <button className={`px-3 py-1 rounded ${tab==='login'?'bg-teal-600 text-white':'bg-gray-100'}`} onClick={()=>setTab('login')}>Login</button>
        <button className={`px-3 py-1 rounded ${tab==='register'?'bg-teal-600 text-white':'bg-gray-100'}`} onClick={()=>setTab('register')}>Register</button>
      </div>

      {tab === "magic" && (
        <form onSubmit={sendMagicLink} className="space-y-2">
          <input className="w-full border rounded p-2" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <button disabled={busy} className="w-full rounded bg-teal-600 text-white py-2 disabled:opacity-50">{busy?'Invio…':'Invia magic link'}</button>
          <button type="button" onClick={loginAnon} disabled={busy} className="w-full rounded bg-gray-100 py-2 disabled:opacity-50">Login anonimo (test)</button>
          <button type="button" onClick={loginWithGoogle} disabled={busy} className="w-full rounded bg-gray-100 py-2 disabled:opacity-50">Accedi con Google</button>
        </form>
      )}

      {tab === "register" && (
        <form onSubmit={register} className="space-y-2">
          <input className="w-full border rounded p-2" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="w-full border rounded p-2" type="password" placeholder="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/>
          <button disabled={busy} className="w-full rounded bg-teal-600 text-white py-2 disabled:opacity-50">{busy?'Creo…':'Crea account'}</button>
        </form>
      )}

      {tab === "login" && (
        <form onSubmit={login} className="space-y-2">
          <input className="w-full border rounded p-2" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="w-full border rounded p-2" type="password" placeholder="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/>
          <button disabled={busy} className="w-full rounded bg-teal-600 text-white py-2 disabled:opacity-50">{busy?'Entro…':'Accedi'}</button>
        </form>
      )}

      {msg && <p className="text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
