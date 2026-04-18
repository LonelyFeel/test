import { Activity, KpiCardData, ModuleCardData, QuickAccessItem } from "@/types/portal";

export const kpiCards: KpiCardData[] = [
  { label: "Online Detectors", value: "1,284", change: "+3.2%", trend: "up" },
  { label: "Critical Alerts", value: "08", change: "-12%", trend: "down" },
  { label: "Healthy Rate", value: "97.8%", change: "+0.4%", trend: "up" },
  { label: "Work Orders", value: "42", change: "+6 New", trend: "up" }
];

export const moduleCards: ModuleCardData[] = [
  { title: "Real-time Monitoring", description: "가스 감지기 현황 및 실시간 경보 모니터링", badge: "Core" },
  { title: "Asset Registry", description: "장비 이력, 점검 정보, 상태 라이프사이클 관리", badge: "Ops" },
  { title: "Incident Response", description: "이상 징후 트리아지 및 대응 플로우 실행", badge: "Safety" },
  { title: "Compliance Reports", description: "규정 준수 리포트 및 감사 자료 자동 생성", badge: "QA" }
];

export const recentActivities: Activity[] = [
  { title: "B2 Zone Sensor #A-112", detail: "Calibration completed", time: "5분 전" },
  { title: "West Plant Line 4", detail: "Warning threshold updated", time: "32분 전" },
  { title: "Control Room", detail: "Emergency drill checklist uploaded", time: "1시간 전" },
  { title: "Site-wide", detail: "Night shift summary generated", time: "오늘 07:10" }
];

export const favoriteLinks: QuickAccessItem[] = [
  { title: "긴급 대응 시나리오", shortcut: "Ctrl + 1" },
  { title: "주요 설비 점검표", shortcut: "Ctrl + 2" },
  { title: "최근 사고 리포트", shortcut: "Ctrl + 3" },
  { title: "사용자 권한 관리", shortcut: "Ctrl + 4" }
];
