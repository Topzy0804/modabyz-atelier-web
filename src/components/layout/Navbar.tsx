import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl shadow-soft" : "bg-background"
      )}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-3xl tracking-tight text-primary">MODA</span>
          <span className="font-serif text-sm italic text-accent tracking-[0.2em]">by Z</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end
              className={({ isActive }) =>
                cn(
                  "text-sm uppercase tracking-[0.18em] link-underline transition-colors",
                  isActive ? "text-accent" : "text-foreground/80 hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors"
        >
          Book a Fitting
        </Link>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container-luxe flex flex-col py-6 gap-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                end
                className={({ isActive }) =>
                  cn(
                    "text-sm uppercase tracking-[0.2em] py-2",
                    isActive ? "text-accent" : "text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]"
            >
              Book a Fitting
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
