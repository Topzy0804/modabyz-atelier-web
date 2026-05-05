type Props = { eyebrow?: string; title: string; description?: string };

const PageHeader = ({ eyebrow, title, description }: Props) => (
  <section className="bg-gradient-luxe border-b border-border">
    <div className="container-luxe py-20 md:py-28 text-center">
      {eyebrow && <p className="eyebrow mb-5"><span className="gold-line mr-3" />{eyebrow}<span className="gold-line ml-3" /></p>}
      <h1 className="heading-display text-foreground">{title}</h1>
      {description && <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  </section>
);

export default PageHeader;
