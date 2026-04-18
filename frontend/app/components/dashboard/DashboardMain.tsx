import { Activity, KpiCardData, ModuleCardData, QuickAccessItem } from "@/types/portal";
import { ActivityList } from "./ActivityList";
import { KpiSection } from "./KpiSection";
import { QuickAccessPanel } from "./QuickAccessPanel";
import { WelcomeHero } from "./WelcomeHero";
import { ModuleLauncher } from "../modules/ModuleLauncher";

type DashboardMainProps = {
  kpiCards: KpiCardData[];
  moduleCards: ModuleCardData[];
  activities: Activity[];
  quickAccessItems: QuickAccessItem[];
};

export function DashboardMain({ kpiCards, moduleCards, activities, quickAccessItems }: DashboardMainProps) {
  return (
    <>
      <WelcomeHero />
      <KpiSection cards={kpiCards} />
      <ModuleLauncher modules={moduleCards} />
      <section className="two-col">
        <ActivityList activities={activities} />
        <QuickAccessPanel items={quickAccessItems} />
      </section>
    </>
  );
}
