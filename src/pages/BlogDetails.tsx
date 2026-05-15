import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { usePosts, DBPost } from "@/hooks/useContent";

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: posts = [], isLoading } = usePosts();
  const post: DBPost | undefined = posts.find((p) => p.slug === slug);

  if (isLoading) return <div className="container-luxe py-32 text-center text-muted-foreground">Loading…</div>;

  if (!post) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="heading-section mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent link-underline">Back to Journal</Link>
      </div>
    );
  }

  const related = posts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container-luxe">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <article>
            {post.image_url && (
              <div className="aspect-[4/3] overflow-hidden bg-secondary mb-8">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="eyebrow mb-4">{post.category} — {new Date(post.published_at).toLocaleDateString()}</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">{post.title}</h1>

            <div className="prose max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 bg-secondary/40">
          <div className="container-luxe">
            <h2 className="heading-section text-center mb-12">You may also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group block p-6 bg-background border border-border hover:border-gold transition-all">
                  {r.image_url && <div className="aspect-[4/3] mb-4 overflow-hidden bg-secondary"><img src={r.image_url} alt={r.title} className="w-full h-full object-cover" /></div>}
                  <h3 className="font-semibold mb-2">{r.title}</h3>
                  <p className="text-xs text-muted-foreground">{new Date(r.published_at).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;
