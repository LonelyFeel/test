import { ModuleCardData } from "@/types/portal";

type ModuleCardProps = {
  module: ModuleCardData;
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <article className="card module-card">
      <span className="badge">{module.badge}</span>
      <h4>{module.title}</h4>
      <p>{module.description}</p>
      <button>Launch →</button>
    </article>
  );
}
