import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/site";

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/products/${product.id}`} className="group block">
    <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 text-[10px] uppercase tracking-[0.2em]">
        {product.category}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em]">View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
    <div className="pt-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
      </div>
      <span className="font-serif text-lg text-accent shrink-0">{product.price}</span>
    </div>
  </Link>
);

export default ProductCard;
