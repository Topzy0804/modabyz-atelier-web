import React, { useCallback } from "react";
import { ArrowUp } from "lucide-react";

const ArrowUpFloat: React.FC = () => {
  const scrollToTop = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-accent-foreground grid place-items-center shadow-gold hover:scale-110 transition-transform"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ArrowUpFloat;
