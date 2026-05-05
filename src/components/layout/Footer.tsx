import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { contact, navLinks } from "@/data/site";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-luxe py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div>
        <div className="flex items-baseline gap-2 mb-6">
          <span className="font-serif text-3xl">MODA</span>
          <span className="font-serif text-sm italic text-gold tracking-[0.2em]">by Z</span>
        </div>
        <p className="text-sm text-primary-foreground/70 leading-relaxed">
          A Lagos atelier crafting modest, modern garments — abayas, kaftans and bespoke tailoring made to last.
        </p>
        <div className="flex gap-4 mt-6">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 grid place-items-center border border-primary-foreground/20 hover:bg-gold hover:border-gold transition-colors"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="eyebrow mb-6 text-gold">Explore</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/80">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="link-underline hover:text-gold transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="eyebrow mb-6 text-gold">Atelier</h4>
        <ul className="space-y-4 text-sm text-primary-foreground/80">
          <li className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" /> {contact.address}</li>
          <li className="flex gap-3"><Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" /> {contact.phone}</li>
          <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" /> {contact.email}</li>
        </ul>
      </div>

      <div>
        <h4 className="eyebrow mb-6 text-gold">Hours</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          <li className="flex justify-between"><span>Mon — Fri</span><span>9:00 — 19:00</span></li>
          <li className="flex justify-between"><span>Saturday</span><span>10:00 — 18:00</span></li>
          <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-primary-foreground/10">
      <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
        <p>© {new Date().getFullYear()} MODA By Z. All rights reserved.</p>
        <p>Crafted with care in Lagos.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
