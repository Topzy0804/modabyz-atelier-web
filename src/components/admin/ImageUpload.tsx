import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
};

const ImageUpload = ({ value, onChange, folder }: Props) => {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }
    setBusy(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative w-40 h-40 border border-border bg-secondary">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-1 right-1 bg-background border border-border p-1 hover:bg-accent hover:text-accent-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="w-40 h-40 border border-dashed border-border grid place-items-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-gold hover:text-accent disabled:opacity-50"
        >
          <div className="text-center">
            <Upload className="w-5 h-5 mx-auto mb-2" />
            {busy ? "Uploading…" : "Upload Image"}
          </div>
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageUpload;
