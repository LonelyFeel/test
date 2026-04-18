import { QuickAccessItem } from "@/types/portal";
import { SectionHeader } from "../common/SectionHeader";

type QuickAccessPanelProps = {
  items: QuickAccessItem[];
};

export function QuickAccessPanel({ items }: QuickAccessPanelProps) {
  return (
    <section className="card panel">
      <SectionHeader title="Favorites / Quick Access" />
      <div className="favorites-list">
        {items.map((item) => (
          <button className="fav-item" key={item.title}>
            <span>{item.title}</span>
            <kbd>{item.shortcut}</kbd>
          </button>
        ))}
      </div>
    </section>
  );
}
