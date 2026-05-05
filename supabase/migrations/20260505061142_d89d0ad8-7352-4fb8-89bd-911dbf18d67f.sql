
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-assign admin to the first user that signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  description TEXT NOT NULL DEFAULT '',
  details TEXT NOT NULL DEFAULT '',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  category TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Admins manage posts" ON public.posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Media is publicly readable" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Seed existing content
INSERT INTO public.products (slug, name, price, category, image_url, description, details, sizes, featured, sort_order) VALUES
('noir-abaya', 'Noir Embroidered Abaya', '₦85,000', 'Abayas', '/src/assets/product-1.jpg', 'Hand-finished black abaya with antique gold embroidery.', 'A timeless silhouette tailored from premium nidha fabric, hand-embroidered along the placket with antique gold thread. Designed to fall gracefully and crafted for everyday luxury.', ARRAY['S','M','L','XL','Custom'], true, 1),
('ivoire-kaftan', 'Ivoire Heritage Kaftan', '₦120,000', 'Kaftans', '/src/assets/product-2.jpg', 'Cream kaftan with intricate gold heritage motifs.', 'An ivory kaftan in feather-light cotton silk, intricately embroidered with traditional motifs. Finished with a hand-tasseled drawstring.', ARRAY['One Size','Custom'], true, 2),
('sahara-midi', 'Sahara Belted Midi', '₦65,000', 'Ready-to-Wear', '/src/assets/product-3.jpg', 'Sand-toned midi dress with sculpted gold belt.', 'A modest midi-length dress in fluid crepe, defined by a sculpted gold buckle. Effortlessly elegant from desk to dinner.', ARRAY['S','M','L','XL'], true, 3),
('obsidian-suite', 'Obsidian Tailored Suite', '₦145,000', 'Tailoring', '/src/assets/product-4.jpg', 'Bespoke two-piece suit, sharp and softly powerful.', 'A fully bespoke two-piece tailored to your measurements. Single-button blazer with signature gold buttons and slim-leg trousers.', ARRAY['Bespoke'], true, 4);

INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Custom Tailoring', 'Bespoke garments cut and crafted to your exact measurements.', 'Scissors', 1),
('Abaya Sewing & Sales', 'Heritage abayas, designed and finished by hand.', 'Sparkles', 2),
('Ready-to-Wear', 'A curated collection of modest, contemporary essentials.', 'ShoppingBag', 3),
('Fabric Consultation', 'Personal guidance on textiles, drape and seasonal palettes.', 'Palette', 4);

INSERT INTO public.posts (slug, title, excerpt, content, image_url, category, published_at) VALUES
('the-art-of-the-perfect-fit', 'The Art of the Perfect Fit', 'What separates an ordinary outfit from a tailored masterpiece — a study in measurements, posture and fabric.', '', '/src/assets/blog-1.jpg', 'Tailoring', '2026-04-18'),
('modest-fashion-evolved', 'Modest Fashion, Evolved', 'How modern silhouettes are reshaping modest dressing without sacrificing tradition or grace.', '', '/src/assets/blog-2.jpg', 'Style', '2026-03-02'),
('behind-the-silk', 'Behind the Silk: Choosing Heritage Fabrics', 'A guide to the textiles we love — from cream nidha to gold-shot silk — and why they last a lifetime.', '', '/src/assets/blog-3.jpg', 'Materials', '2026-02-11');
