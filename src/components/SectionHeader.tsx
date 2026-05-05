import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeader = ({ eyebrow, title, description, align = "center", className }: Props) => (
  <div
    className={cn(
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}
  >
    {eyebrow && (
      <p className="eyebrow mb-5">
        <span className="gold-line mr-3" />
        {eyebrow}
        <span className="gold-line ml-3" />
      </p>
    )}
    <h2 className="heading-section text-foreground">{title}</h2>
    {description && (
      <p className="mt-5 text-muted-foreground leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeader;
