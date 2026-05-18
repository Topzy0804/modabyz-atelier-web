import PageHeader from "@/components/PageHeader";
import { usePosts } from "@/hooks/useContent";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";

const Blog = () => {
  const { data: posts = [], isLoading } = usePosts();

  return (
    <>
    <Helmet>
      <title>Blog - MODA By Z</title>
      <meta name="description" 
      content="Blogs on craft, fabric, fashion and lifestyle." />
    </Helmet>
    
    <PageHeader eyebrow="Journal" title="Stories from the atelier" description="Notes on craft, fabric, fittings and the women who wear MODA By Z." />

      <section className="py-24">
        <div className="container-luxe">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading</p>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {posts.length === 0 ? (
                <p className="text-center text-muted-foreground">No posts yet.</p>
              ) : (
                posts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="group relative p-12 bg-background border border-border hover:border-gold hover:shadow-elegant transition-all overflow-hidden"
                  >
                    <article className="group cursor-pointer">
                      <div className="aspect-[4/3] overflow-hidden bg-secondary mb-6">
                        {p.image_url && (
                          <img
                            src={p.image_url}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                        <span className="text-accent">{p.category}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{new Date(p.published_at).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}</span>
                      </div>
                      <h2 className="font-serif text-2xl mb-3 group-hover:text-accent transition-colors">{p.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent link-underline">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </article>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
