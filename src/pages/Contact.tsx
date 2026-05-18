import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { contact } from "@/data/site";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you. We'll be in touch within 24 hours.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <>
    <Helmet>
      <title>Contact - MODA By Z</title>
      <meta name="description"
      content="Get in touch with the MODA By Z atelier. Book a fitting, request a bespoke piece, or simply come say hello." />
    </Helmet>
      <PageHeader eyebrow="Contact" title="Visit the atelier" description="Book a fitting, request a bespoke piece, or simply come say hello." />

      <section className="py-24">
        <div className="container-luxe grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="eyebrow mb-3">Address</p>
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" />
                <p className="text-foreground leading-relaxed">{contact.address}</p>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Phone</p>
              <a href={`tel:${contact.phone}`} className="flex gap-4 hover:text-accent transition-colors">
                <Phone className="w-5 h-5 text-gold mt-1 shrink-0" />
                <span>{contact.phone}</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">WhatsApp</p>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="flex gap-4 hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5 text-gold mt-1 shrink-0" />
                <span>{contact.whatsapp}</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Email</p>
              <a href={`mailto:${contact.email}`} className="flex gap-4 hover:text-accent transition-colors">
                <Mail className="w-5 h-5 text-gold mt-1 shrink-0" />
                <span>{contact.email}</span>
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Follow</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 grid place-items-center border border-border hover:bg-gold hover:border-gold hover:text-accent-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-background p-10 border border-border shadow-soft space-y-5">
            <div>
              <label className="eyebrow block mb-2">Name</label>
              <input required maxLength={100} className="w-full px-4 py-3 bg-secondary/40 border border-transparent focus:border-gold focus:bg-background focus:outline-none text-sm transition-colors" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="eyebrow block mb-2">Email</label>
                <input required type="email" maxLength={255} className="w-full px-4 py-3 bg-secondary/40 border border-transparent focus:border-gold focus:bg-background focus:outline-none text-sm transition-colors" />
              </div>
              <div>
                <label className="eyebrow block mb-2">Phone</label>
                <input maxLength={30} className="w-full px-4 py-3 bg-secondary/40 border border-transparent focus:border-gold focus:bg-background focus:outline-none text-sm transition-colors" />
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-2">Message</label>
              <textarea required rows={6} maxLength={1000} className="w-full px-4 py-3 bg-secondary/40 border border-transparent focus:border-gold focus:bg-background focus:outline-none text-sm transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-gold transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="pb-0">
        <div className="container-luxe">
          <div className="aspect-[16/7] overflow-hidden border border-border">
            <iframe
              title="MODA By Z location"
              src="https://www.google.com/maps?q=Akiode+Ikeja+Lagos&output=embed"
              className="w-full h-full grayscale-[40%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
