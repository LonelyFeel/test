"use client";

import { useDarkMode } from "@/app/hooks/useDarkMode";
import { Activity, KpiCardData, ModuleCardData, NavItem, QuickAccessItem } from "@/types/portal";
import { DashboardMain } from "../dashboard/DashboardMain";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type AppShellProps = {
  navItems: NavItem[];
  kpiCards: KpiCardData[];
  moduleCards: ModuleCardData[];
  activities: Activity[];
  quickAccessItems: QuickAccessItem[];
};

export function AppShell({ navItems, kpiCards, moduleCards, activities, quickAccessItems }: AppShellProps) {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <main className="layout">
      <Sidebar navItems={navItems} />
      <div className="main-content">
        <Topbar isDark={isDark} onToggleDark={toggleDarkMode} />
        <DashboardMain
          kpiCards={kpiCards}
          moduleCards={moduleCards}
          activities={activities}
          quickAccessItems={quickAccessItems}
        />
      </div>
    </main>
  );
}
