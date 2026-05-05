import { Phone, Mail, MessageCircle } from "lucide-react";
import { contact } from "@/data/site";

const TopBar = () => (
  <div className="hidden md:block bg-primary text-primary-foreground/80 text-xs">
    <div className="container-luxe flex items-center justify-between h-10">
      <p className="tracking-widest uppercase text-[10px]">
        Free consultation on bespoke orders above ₦100,000
      </p>
      <div className="flex items-center gap-6">
        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
          <Phone className="w-3 h-3" /> {contact.phone}
        </a>
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
          <Mail className="w-3 h-3" /> {contact.email}
        </a>
      </div>
    </div>
  </div>
);

export default TopBar;
