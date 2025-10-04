import { type FormEvent, useState } from "react";
import { getMe, loginUser } from "../api";
type Props = { onLoggedIn: (user: any) => void };

export default function Login({ onLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await loginUser(email, password);
      const { data } = await getMe();
      onLoggedIn(data);
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
      <h2>Login</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading}>{loading ? "…" : "Login"}</button>
    </form>
  );
}
