import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: hero1,
    eyebrow: "Spring Collection 2026",
    title: "Elegant Abayas\nfor Every Occasion",
    description: "Heritage craftsmanship meets contemporary silhouette.",
    cta: { label: "Shop the Collection", href: "/products" },
  },
  {
    image: hero2,
    eyebrow: "Bespoke Atelier",
    title: "Tailored to You,\nThread by Thread",
    description: "Custom garments measured, cut and finished by hand.",
    cta: { label: "Book a Fitting", href: "/contact" },
  },
  {
    image: hero3,
    eyebrow: "Ready-to-Wear",
    title: "Modest. Modern.\nUnmistakably Yours.",
    description: "A curated wardrobe of essentials, ready to wear today.",
    cta: { label: "Explore Pieces", href: "/products" },
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[600px] overflow-hidden bg-primary">
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === active ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <img
            src={s.image}
            alt={s.title.replace("\n", " ")}
            className={cn("w-full h-full object-cover", i === active && "animate-scale-in")}
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full container-luxe flex items-center">
        <div key={active} className="max-w-2xl text-primary-foreground animate-fade-in-up">
          <p className="eyebrow text-gold mb-6">
            <span className="gold-line mr-4" />
            {slides[active].eyebrow}
          </p>
          <h1 className="heading-display whitespace-pre-line mb-8">
            {slides[active].title}
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-md font-light">
            {slides[active].description}
          </p>
          <Link
            to={slides[active].cta.href}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-accent-foreground text-xs uppercase tracking-[0.25em] hover:bg-gold-dark transition-colors"
          >
            {slides[active].cta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "h-px transition-all",
              i === active ? "w-16 bg-gold" : "w-8 bg-primary-foreground/40"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
