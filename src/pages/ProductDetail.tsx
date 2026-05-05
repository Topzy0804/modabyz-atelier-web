import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Truck, Shield, Sparkles } from "lucide-react";
import { products } from "@/data/site";
import { contact } from "@/data/site";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState(product?.sizes[0] ?? "");

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="heading-section mb-4">Product not found</h1>
        <Link to="/products" className="text-accent link-underline">Back to collection</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const waMessage = encodeURIComponent(`Hello MODA By Z, I'd like to order: ${product.name} (${size}) — ${product.price}`);

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="container-luxe">
          <Link to="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent mb-10">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-4 aspect-[4/5] overflow-hidden bg-secondary">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square bg-secondary overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div>
              <p className="eyebrow mb-4">{product.category}</p>
              <h1 className="font-serif text-4xl md:text-5xl mb-4">{product.name}</h1>
              <p className="font-serif text-3xl text-accent mb-8">{product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-10">{product.details}</p>

              <div className="mb-8">
                <p className="eyebrow mb-4">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "px-5 py-3 text-xs uppercase tracking-[0.2em] border transition-colors",
                        size === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-gold"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/${contact.whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-gold text-accent-foreground text-xs uppercase tracking-[0.25em] hover:bg-gold-dark transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp
              </a>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border">
                {[
                  { icon: Truck, label: "Nationwide Delivery" },
                  { icon: Shield, label: "Quality Guaranteed" },
                  { icon: Sparkles, label: "Hand Finished" },
                ].map((f, i) => (
                  <div key={i} className="text-center">
                    <f.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/40">
        <div className="container-luxe">
          <h2 className="heading-section text-center mb-12">You may also love</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
