import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProducts, DBProduct } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const empty: Partial<DBProduct> = {
  slug: "",
  name: "",
  price: "",
  category: "",
  image_url: null,
  description: "",
  details: "",
  sizes: [],
  featured: false,
  sort_order: 0,
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const AdminProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<DBProduct> | null>(null);
  const [sizesText, setSizesText] = useState("");

  useEffect(() => {
    setSizesText((editing?.sizes ?? []).join(", "));
  }, [editing]);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug || slugify(editing.name || ""),
      name: editing.name || "",
      price: editing.price || "",
      category: editing.category || "",
      image_url: editing.image_url ?? null,
      description: editing.description || "",
      details: editing.details || "",
      sizes: sizesText.split(",").map((s) => s.trim()).filter(Boolean),
      featured: !!editing.featured,
      sort_order: Number(editing.sort_order) || 0,
    };
    if (!payload.name || !payload.price || !payload.category) {
      toast.error("Name, price and category are required");
      return;
    }
    const { error } = editing.id
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Products</h1>
        <button
          onClick={() => setEditing({ ...empty })}
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors"
        >
          <Plus className="w-4 h-4" /> New Product
        </button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 border border-border">
              <div className="w-16 h-16 bg-secondary shrink-0">
                {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">{p.category} · {p.price}{p.featured ? " · Featured" : ""}</p>
              </div>
              <button onClick={() => setEditing(p)} className="p-2 hover:text-accent"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(p.id)} className="p-2 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm grid place-items-center p-6 overflow-auto">
          <div className="bg-background w-full max-w-2xl border border-border p-8 my-10">
            <h2 className="font-serif text-2xl mb-6">{editing.id ? "Edit product" : "New product"}</h2>
            <div className="space-y-4">
              <Field label="Name">
                <input className="input" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price">
                  <input className="input" placeholder="₦65,000" value={editing.price ?? ""} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
                </Field>
                <Field label="Category">
                  <input className="input" placeholder="Abayas" value={editing.category ?? ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </Field>
              </div>
              <Field label="Image">
                <ImageUpload value={editing.image_url ?? null} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="products" />
              </Field>
              <Field label="Short description">
                <textarea className="input min-h-[70px]" value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>
              <Field label="Details">
                <textarea className="input min-h-[110px]" value={editing.details ?? ""} onChange={(e) => setEditing({ ...editing, details: e.target.value })} />
              </Field>
              <Field label="Sizes (comma separated)">
                <input className="input" value={sizesText} onChange={(e) => setSizesText(e.target.value)} placeholder="S, M, L, XL" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Sort order">
                  <input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
                </Field>
                <label className="flex items-end gap-2 pb-2">
                  <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                  <span className="text-xs uppercase tracking-[0.2em]">Featured on home</span>
                </label>
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

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</label>
    {children}
  </div>
);

export default AdminProducts;
