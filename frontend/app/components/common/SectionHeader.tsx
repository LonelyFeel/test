type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      {subtitle ? <span>{subtitle}</span> : null}
    </div>
  );
}
