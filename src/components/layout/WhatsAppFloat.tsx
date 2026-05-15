import { MessageCircle } from "lucide-react";
import { contact } from "@/data/site";

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${contact.whatsapp}`}
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gold text-accent-foreground grid place-items-center shadow-gold hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);

export default WhatsAppFloat;
