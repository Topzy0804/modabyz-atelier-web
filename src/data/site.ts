import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export const contact = {
  phone: "+234 805 125 4412",
  whatsapp: "2348051254412",
  email: "modabyz026@gmail.com",
  address: "No 3 Omobogie Street, Akiode, Ikeja, Lagos",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  details: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "noir-abaya",
    name: "Noir Embroidered Abaya",
    price: "₦85,000",
    category: "Abayas",
    image: product1,
    description: "Hand-finished black abaya with antique gold embroidery.",
    details:
      "A timeless silhouette tailored from premium nidha fabric, hand-embroidered along the placket with antique gold thread. Designed to fall gracefully and crafted for everyday luxury.",
    sizes: ["S", "M", "L", "XL", "Custom"],
  },
  {
    id: "ivoire-kaftan",
    name: "Ivoire Heritage Kaftan",
    price: "₦120,000",
    category: "Kaftans",
    image: product2,
    description: "Cream kaftan with intricate gold heritage motifs.",
    details:
      "An ivory kaftan in feather-light cotton silk, intricately embroidered with traditional motifs. Finished with a hand-tasseled drawstring.",
    sizes: ["One Size", "Custom"],
  },
  {
    id: "sahara-midi",
    name: "Sahara Belted Midi",
    price: "₦65,000",
    category: "Ready-to-Wear",
    image: product3,
    description: "Sand-toned midi dress with sculpted gold belt.",
    details:
      "A modest midi-length dress in fluid crepe, defined by a sculpted gold buckle. Effortlessly elegant from desk to dinner.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "obsidian-suite",
    name: "Obsidian Tailored Suite",
    price: "₦145,000",
    category: "Tailoring",
    image: product4,
    description: "Bespoke two-piece suit, sharp and softly powerful.",
    details:
      "A fully bespoke two-piece tailored to your measurements. Single-button blazer with signature gold buttons and slim-leg trousers.",
    sizes: ["Bespoke"],
  },
];

export const services = [
  {
    title: "Custom Tailoring",
    description: "Bespoke garments cut and crafted to your exact measurements.",
    icon: "Scissors",
  },
  {
    title: "Abaya Sewing & Sales",
    description: "Heritage abayas, designed and finished by hand.",
    icon: "Sparkles",
  },
  {
    title: "Ready-to-Wear",
    description: "A curated collection of modest, contemporary essentials.",
    icon: "ShoppingBag",
  },
  {
    title: "Fabric Consultation",
    description: "Personal guidance on textiles, drape and seasonal palettes.",
    icon: "Palette",
  },
];

export const posts = [
  {
    slug: "the-art-of-the-perfect-fit",
    title: "The Art of the Perfect Fit",
    excerpt:
      "What separates an ordinary outfit from a tailored masterpiece — a study in measurements, posture and fabric.",
    image: blog1,
    date: "Apr 18, 2026",
    category: "Tailoring",
  },
  {
    slug: "modest-fashion-evolved",
    title: "Modest Fashion, Evolved",
    excerpt:
      "How modern silhouettes are reshaping modest dressing without sacrificing tradition or grace.",
    image: blog2,
    date: "Mar 02, 2026",
    category: "Style",
  },
  {
    slug: "behind-the-silk",
    title: "Behind the Silk: Choosing Heritage Fabrics",
    excerpt:
      "A guide to the textiles we love — from cream nidha to gold-shot silk — and why they last a lifetime.",
    image: blog3,
    date: "Feb 11, 2026",
    category: "Materials",
  },
];
