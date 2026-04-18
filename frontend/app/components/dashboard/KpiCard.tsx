import { KpiCardData } from "@/types/portal";

type KpiCardProps = {
  card: KpiCardData;
};

export function KpiCard({ card }: KpiCardProps) {
  return (
    <article className="card metric">
      <p>{card.label}</p>
      <h3>{card.value}</h3>
      <span className={card.trend === "up" ? "trend up" : "trend down"}>{card.change}</span>
    </article>
  );
}
