import { NavItem } from "@/types/portal";

type SidebarProps = {
  navItems: NavItem[];
};

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="sidebar card">
      <div className="brand">GDS</div>
      <nav>
        {navItems.map((item, idx) => (
          <button key={item.label} className={`nav-item ${idx === 0 ? "active" : ""}`}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>Shift: A Team</p>
        <small>All systems synced</small>
      </div>
    </aside>
  );
}
