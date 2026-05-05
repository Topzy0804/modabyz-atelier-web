import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useServices } from "@/hooks/useContent";

const Services = () => {
  const { data: services = [], isLoading } = useServices();

  return (
    <>
      <PageHeader eyebrow="Services" title="Tailored to your every occasion" description="From a single fitting to an entire bridal trousseau — discover the full breadth of the MODA By Z atelier." />

      <section className="py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-2 gap-8">
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            services.map((s) => {
              const Icon = (Icons as any)[s.icon] ?? Icons.Sparkles;
              return (
                <div key={s.id} className="group relative p-12 bg-background border border-border hover:border-gold hover:shadow-elegant transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-0 group-hover:opacity-10 blur-3xl transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 grid place-items-center bg-accent-soft text-accent mb-8">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-3xl mb-5">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">{s.description}</p>
                    <Link to="/contact" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent link-underline">
                      Book Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="py-24 bg-gradient-dark text-primary-foreground">
        <div className="container-luxe text-center max-w-2xl">
          <p className="eyebrow text-gold mb-5"><span className="gold-line mr-3 bg-gold" />Begin Your Commission<span className="gold-line ml-3 bg-gold" /></p>
          <h2 className="heading-section text-primary-foreground mb-6">Ready to create something one of a kind?</h2>
          <p className="text-primary-foreground/70 mb-10">Tell us about the piece you have in mind. We'll respond within one business day.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-accent-foreground text-xs uppercase tracking-[0.25em] hover:bg-gold-light transition-colors">
            Start a Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
