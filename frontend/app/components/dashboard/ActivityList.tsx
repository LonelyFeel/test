import { Activity } from "@/types/portal";
import { SectionHeader } from "../common/SectionHeader";

type ActivityListProps = {
  activities: Activity[];
};

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <section className="card panel">
      <SectionHeader title="Recent Activity" />
      <ul className="activity-list">
        {activities.map((activity) => (
          <li key={`${activity.title}-${activity.time}`}>
            <div>
              <strong>{activity.title}</strong>
              <p>{activity.detail}</p>
            </div>
            <span>{activity.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
