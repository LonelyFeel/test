"use client";

import { AppShell } from "@/app/components/layout/AppShell";
import { FAVORITE_LINKS, KPI_CARDS, MODULE_CARDS, NAV_ITEMS, RECENT_ACTIVITIES } from "@/lib/constants";

export default function HomePage() {
  return (
    <AppShell
      navItems={NAV_ITEMS}
      kpiCards={KPI_CARDS}
      moduleCards={MODULE_CARDS}
      activities={RECENT_ACTIVITIES}
      quickAccessItems={FAVORITE_LINKS}
    />
  );
}
