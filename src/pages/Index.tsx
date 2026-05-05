import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles, Award, Heart, Gem, Eye } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { useProducts, useServices } from "@/hooks/useContent";
import aboutImg from "@/assets/about.jpg";

const whyUs = [
  { icon: Award, title: "Quality Craftsmanship", text: "Every seam is hand-finished by master tailors." },
  { icon: Gem, title: "Elegant Designs", text: "Silhouettes designed to flatter and endure." },
  { icon: Heart, title: "Customer First", text: "Personal styling and unhurried fittings, always." },
  { icon: Eye, title: "Attention to Detail", text: "From the chosen thread to the final stitch." },
];

const Index = () => {
  const { data: products = [] } = useProducts();
  const { data: services = [] } = useServices();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const showProducts = featured.length ? featured : products.slice(0, 4);
  return (
  <>
    <Hero />

    {/* About Preview */}
    <section className="py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={aboutImg} alt="MODA By Z atelier" loading="lazy" className="w-full aspect-[4/5] object-cover shadow-elegant" />
          <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-background border border-border p-8 max-w-[240px] shadow-soft">
            <p className="font-serif text-5xl text-accent">10<span className="text-gold-light">+</span></p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Years crafting timeless modest fashion</p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5"><span className="gold-line mr-3" />Our Story</p>
          <h2 className="heading-section mb-6">An atelier where heritage meets the modern wardrobe.</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MODA By Z is a Lagos-based fashion house dedicated to the quiet confidence of well-made clothes. We design and tailor abayas, kaftans and bespoke ready-to-wear for women who choose elegance over excess.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Each garment passes through trusted hands — measured, cut and embroidered — until it feels unmistakably yours.
          </p>
          <Link to="/about" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent link-underline">
            Discover our journey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="What We Offer"
          title="Crafted services for the considered wardrobe"
          description="From bespoke commissions to ready-to-wear, every service begins with a conversation about you."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {services.map((s) => {
            const Icon = (Icons as any)[s.icon] ?? Sparkles;
            return (
              <div key={i} className="group p-8 bg-background border border-border hover:border-gold transition-all duration-500 hover:shadow-elegant">
                <div className="w-14 h-14 mb-6 grid place-items-center bg-accent-soft text-accent group-hover:bg-gold group-hover:text-accent-foreground transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.description}</p>
                <Link to="/services" className="text-xs uppercase tracking-[0.2em] text-accent link-underline">Learn more</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <p className="eyebrow mb-5"><span className="gold-line mr-3" />Featured Pieces</p>
            <h2 className="heading-section">The current collection</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent link-underline">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-24 md:py-32 bg-gradient-dark text-primary-foreground">
      <div className="container-luxe">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-gold mb-5"><span className="gold-line mr-3 bg-gold" />Why MODA By Z<span className="gold-line ml-3 bg-gold" /></p>
          <h2 className="heading-section text-primary-foreground">A house built on details that last.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
          {whyUs.map((w, i) => (
            <div key={i} className="bg-primary p-10 text-center">
              <w.icon className="w-8 h-8 text-gold mx-auto mb-5" />
              <h3 className="font-serif text-xl mb-3">{w.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container-luxe max-w-3xl text-center">
        <p className="eyebrow mb-5"><span className="gold-line mr-3" />Stay Close</p>
        <h2 className="heading-section mb-5">Subscribe for updates &amp; new collections</h2>
        <p className="text-muted-foreground mb-10">Be the first to receive lookbooks, atelier stories and private invitations.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input type="email" required placeholder="Your email address" className="flex-1 px-5 py-4 bg-background border border-border focus:border-gold focus:outline-none text-sm" />
          <button className="px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors">Subscribe</button>
        </form>
      </div>
    </section>
  </>
);

export default Index;
