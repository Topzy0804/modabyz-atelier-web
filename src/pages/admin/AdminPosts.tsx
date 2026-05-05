import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePosts, DBPost } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const empty: Partial<DBPost> = {
  slug: "", title: "", excerpt: "", content: "", image_url: null, category: "",
  published_at: new Date().toISOString().slice(0, 10),
};

const AdminPosts = () => {
  const { data: posts = [], isLoading } = usePosts();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<DBPost> | null>(null);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug || slugify(editing.title || ""),
      title: editing.title || "",
      excerpt: editing.excerpt || "",
      content: editing.content || "",
      image_url: editing.image_url ?? null,
      category: editing.category || "",
      published_at: editing.published_at ? new Date(editing.published_at).toISOString() : new Date().toISOString(),
    };
    if (!payload.title) return toast.error("Title required");
    const { error } = editing.id
      ? await supabase.from("posts").update(payload).eq("id", editing.id)
      : await supabase.from("posts").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["posts"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Blog Posts</h1>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="space-y-2">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 border border-border">
              <div className="w-16 h-16 bg-secondary shrink-0">
                {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">{p.category} · {new Date(p.published_at).toLocaleDateString()}</p>
              </div>
              <button onClick={() => setEditing({ ...p, published_at: p.published_at.slice(0, 10) })} className="p-2 hover:text-accent"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(p.id)} className="p-2 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm grid place-items-center p-6 overflow-auto">
          <div className="bg-background w-full max-w-2xl border border-border p-8 my-10">
            <h2 className="font-serif text-2xl mb-6">{editing.id ? "Edit post" : "New post"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Title</label>
                <input className="input" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Category</label>
                  <input className="input" value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Published date</label>
                  <input type="date" className="input" value={(editing.published_at ?? "").slice(0, 10)} onChange={(e) => setEditing({ ...editing, published_at: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Cover image</label>
                <ImageUpload value={editing.image_url ?? null} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="posts" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Excerpt</label>
                <textarea className="input min-h-[80px]" value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Content</label>
                <textarea className="input min-h-[200px]" value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setEditing(null)} className="px-5 py-3 text-xs uppercase tracking-[0.2em] hover:text-accent">Cancel</button>
              <button onClick={save} className="px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;
