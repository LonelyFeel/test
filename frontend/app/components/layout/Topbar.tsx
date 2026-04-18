"use client";

type TopbarProps = {
  isDark: boolean;
  onToggleDark: () => void;
};

export function Topbar({ isDark, onToggleDark }: TopbarProps) {
  return (
    <header className="topbar card">
      <div>
        <p className="eyebrow">Gas Detector Integrated Platform</p>
        <h1>Main Portal</h1>
      </div>
      <div className="topbar-actions">
        <input className="search" placeholder="모듈, 설비, 작업 검색" aria-label="search" />
        <button className="icon-btn" onClick={onToggleDark} aria-label="toggle dark mode">
          {isDark ? "☀️" : "🌙"}
        </button>
        <button className="profile-pill">OPS Team</button>
      </div>
    </header>
  );
}
