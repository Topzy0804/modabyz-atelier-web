import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav("/admin", { replace: true });
  }, [user, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        // If a session is returned the user is signed in, otherwise an email
        // confirmation flow is required (no session).
        if (data?.session) {
          toast.success("Account created. You're signed in.");
          nav("/admin", { replace: true });
        } else {
          toast.success("Account created. Check your email to confirm your account.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.session) nav("/admin", { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="min-h-[80vh] grid place-items-center py-20">
      <div className="w-full max-w-md bg-background border border-border p-10">
        <p className="eyebrow mb-3">Atelier Admin</p>
        <h1 className="font-serif text-3xl mb-8">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none text-sm"
            />
          )}
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none text-sm"
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full px-6 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-gold transition-colors disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          disabled={busy}
          className="mt-6 text-xs uppercase tracking-[0.2em] text-accent link-underline disabled:opacity-50"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          The first account created becomes the site administrator.
        </p>
      </div>
    </section>
  );
};

export default Auth;
