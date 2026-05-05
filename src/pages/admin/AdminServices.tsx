import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServices, DBService } from "@/hooks/useContent";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";

const empty: Partial<DBService> = { title: "", description: "", icon: "Sparkles", sort_order: 0 };
const ICONS = ["Scissors", "Sparkles", "ShoppingBag", "Palette", "Award", "Gem", "Heart", "Feather"];

const AdminServices = () => {
  const { data: services = [], isLoading } = useServices();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<DBService> | null>(null);

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title || "",
      description: editing.description || "",
      icon: editing.icon || "Sparkles",
      sort_order: Number(editing.sort_order) || 0,
    };
    if (!payload.title) return toast.error("Title required");
    const { error } = editing.id
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["services"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["services"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Services</h1>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors">
          <Plus className="w-4 h-4" /> New Service
        </button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="space-y-2">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4 border border-border">
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg truncate">{s.title}</p>
                <p className="text-sm text-muted-foreground truncate">{s.description}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.icon}</span>
              <button onClick={() => setEditing(s)} className="p-2 hover:text-accent"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(s.id)} className="p-2 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm grid place-items-center p-6 overflow-auto">
          <div className="bg-background w-full max-w-xl border border-border p-8">
            <h2 className="font-serif text-2xl mb-6">{editing.id ? "Edit service" : "New service"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Title</label>
                <input className="input" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Description</label>
                <textarea className="input min-h-[100px]" value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Icon</label>
                  <select className="input" value={editing.icon ?? "Sparkles"} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Sort order</label>
                  <input type="number" className="input" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
                </div>
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

export default AdminServices;
