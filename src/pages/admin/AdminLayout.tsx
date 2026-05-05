import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { LogOut, Package, Newspaper, Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/posts", label: "Blog Posts", icon: Newspaper },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="font-serif text-3xl mb-3">Not authorized</h1>
          <p className="text-muted-foreground mb-6">This account does not have admin access.</p>
          <button onClick={signOut} className="text-xs uppercase tracking-[0.2em] text-accent link-underline">Sign out</button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <header className="bg-background border-b border-border">
        <div className="container-luxe flex items-center justify-between h-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent">
            <ArrowLeft className="w-3 h-3" /> Back to site
          </Link>
          <span className="font-serif text-xl">Atelier Admin</span>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent">
            <LogOut className="w-3 h-3" /> Sign out
          </button>
        </div>
      </header>
      <div className="container-luxe py-10 grid lg:grid-cols-[220px_1fr] gap-10 flex-1">
        <nav className="flex lg:flex-col gap-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.2em] border border-transparent",
                  isActive ? "bg-background border-border text-accent" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <it.icon className="w-4 h-4" /> {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="bg-background border border-border p-8 min-h-[60vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
