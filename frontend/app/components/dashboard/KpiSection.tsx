import { KpiCardData } from "@/types/portal";
import { KpiCard } from "./KpiCard";

type KpiSectionProps = {
  cards: KpiCardData[];
};

export function KpiSection({ cards }: KpiSectionProps) {
  return (
    <section className="kpi-grid">
      {cards.map((card) => (
        <KpiCard key={card.label} card={card} />
      ))}
    </section>
  );
}
