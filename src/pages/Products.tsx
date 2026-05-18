import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useContent";
import { cn } from "@/lib/utils";

import { Helmet } from "react-helmet-async";

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const [active, setActive] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
    <Helmet>
      <title>Products - MODA By Z</title>
      <meta name="description"
      content="Shop the collection of abayas, kaftans, ready-to-wear and bespoke commissions." />
    </Helmet>
    
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

          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading collection…</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
