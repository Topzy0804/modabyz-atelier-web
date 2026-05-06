import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, session: null, isAdmin: false, loading: true, signOut: async () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);

  const fetchRole = async (userId: string | null) => {
    if (!userId) {
      setIsAdmin(false);
      setRoleLoading(false);
      return;
    }
    setRoleLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) console.error("Role fetch error:", error);
    setIsAdmin(!!data);
    setRoleLoading(false);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setAuthLoading(false);
      // defer role fetch to avoid deadlock inside callback
      setTimeout(() => fetchRole(s?.user?.id ?? null), 0);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthLoading(false);
      fetchRole(s?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const loading = authLoading || (!!session?.user && roleLoading);

  return (
    <Ctx.Provider value={{ user: session?.user ?? null, session, isAdmin, loading, signOut: async () => { await supabase.auth.signOut(); } }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
