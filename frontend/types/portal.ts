export type TrendDirection = "up" | "down";

export type KpiCardData = {
  label: string;
  value: string;
  change: string;
  trend: TrendDirection;
};

export type ModuleCardData = {
  title: string;
  description: string;
  badge: string;
};

export type Activity = {
  title: string;
  detail: string;
  time: string;
};

export type QuickAccessItem = {
  title: string;
  shortcut: string;
};

export type NavItem = {
  key: string;
  label: string;
};
