import PageHeader from "@/components/PageHeader";
import { posts } from "@/data/site";
import { ArrowRight } from "lucide-react";

const Blog = () => (
  <>
    <PageHeader eyebrow="Journal" title="Stories from the atelier" description="Notes on craft, fabric, fittings and the women who wear MODA By Z." />

    <section className="py-24">
      <div className="container-luxe grid lg:grid-cols-3 gap-10">
        {posts.map((p, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden bg-secondary mb-6">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              <span className="text-accent">{p.category}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{p.date}</span>
            </div>
            <h2 className="font-serif text-2xl mb-3 group-hover:text-accent transition-colors">{p.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent link-underline">
              Read More <ArrowRight className="w-3 h-3" />
            </span>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
