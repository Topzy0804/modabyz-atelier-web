import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/site";
import { cn } from "@/lib/utils";

const Products = () => {
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <PageHeader eyebrow="The Collection" title="Shop the atelier" description="A curated edit of abayas, kaftans, ready-to-wear and bespoke commissions." />

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "px-5 py-2 text-xs uppercase tracking-[0.2em] border transition-colors",
                  active === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-foreground border-border hover:border-gold hover:text-accent"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
