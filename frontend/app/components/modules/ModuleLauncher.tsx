import { ModuleCardData } from "@/types/portal";
import { SectionHeader } from "../common/SectionHeader";
import { ModuleCard } from "./ModuleCard";

type ModuleLauncherProps = {
  modules: ModuleCardData[];
};

export function ModuleLauncher({ modules }: ModuleLauncherProps) {
  return (
    <section>
      <SectionHeader title="Module Launcher" subtitle="핵심 모듈 바로가기" />
      <div className="module-grid">
        {modules.map((module) => (
          <ModuleCard key={module.title} module={module} />
        ))}
      </div>
    </section>
  );
}
