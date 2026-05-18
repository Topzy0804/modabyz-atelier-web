import { Sparkles, Heart, Award, Feather } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import aboutImg from "@/assets/about.jpg";

import { Helmet } from "react-helmet-async";

const values = [
  { icon: Sparkles, title: "Elegance", text: "Quiet, considered design that outlasts trend." },
  { icon: Award, title: "Quality", text: "Premium fabrics and meticulous handwork only." },
  { icon: Heart, title: "Integrity", text: "Honest pricing and transparent craftsmanship." },
  { icon: Feather, title: "Creativity", text: "Heritage techniques reimagined for today." },
];

const About = () => (
  <>
    <Helmet>
      <title>About Us - MODA By Z</title>

      <meta name="description" 
      content="Discover the story behind MODA By Z." />
    </Helmet>
    <PageHeader eyebrow="About Us" title="The atelier behind MODA By Z" description="A Lagos-born fashion house dedicated to the modern, modest wardrobe." />

    <section className="py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <img src={aboutImg} alt="Atelier interior" loading="lazy" className="w-full aspect-[4/5] object-cover shadow-elegant" />
        <div>
          <p className="eyebrow mb-5"><span className="gold-line mr-3" />Our Story</p>
          <h2 className="heading-section mb-6">From a single sewing room to a celebrated house of craft.</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            MODA By Z began with a simple belief: that modest fashion deserves the same artistry, fit and finish as the world's finest couture. What started as one tailor with a measuring tape and an obsession for clean seams has grown into a beloved Lagos atelier.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today we dress women across Nigeria and beyond — for weddings, work, prayer and the everyday — with garments built to be worn, loved and remembered.
          </p>
        </div>
      </div>
    </section>

    <section className="py-24 bg-secondary/40">
      <div className="container-luxe grid md:grid-cols-2 gap-12">
        <div className="bg-background p-12 border-l-2 border-gold">
          <p className="eyebrow mb-4">Vision</p>
          <h3 className="font-serif text-3xl mb-4">A modest wardrobe without compromise.</h3>
          <p className="text-muted-foreground leading-relaxed">To become Africa's most-loved atelier for modest fashion — celebrated for craftsmanship, integrity and timeless design.</p>
        </div>
        <div className="bg-background p-12 border-l-2 border-gold">
          <p className="eyebrow mb-4">Mission</p>
          <h3 className="font-serif text-3xl mb-4">Craft garments that feel personal.</h3>
          <p className="text-muted-foreground leading-relaxed">To design and tailor exceptional clothing that empowers every woman to feel confidently herself, in pieces made to last a lifetime.</p>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container-luxe">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-5"><span className="gold-line mr-3" />Core Values<span className="gold-line ml-3" /></p>
          <h2 className="heading-section">What guides every stitch.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="text-center p-8 border border-border hover:border-gold hover:shadow-soft transition-all">
              <v.icon className="w-8 h-8 text-gold mx-auto mb-5" />
              <h3 className="font-serif text-xl mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
