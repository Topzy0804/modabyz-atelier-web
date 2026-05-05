import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DBProduct = {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  image_url: string | null;
  description: string;
  details: string;
  sizes: string[];
  featured: boolean;
  sort_order: number;
};

export type DBService = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

export type DBPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  published_at: string;
};

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order");
      if (error) throw error;
      return data as DBProduct[];
    },
  });

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data as DBService[];
    },
  });

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
      if (error) throw error;
      return data as DBPost[];
    },
  });
