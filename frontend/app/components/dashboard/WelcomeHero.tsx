export function WelcomeHero() {
  return (
    <section className="hero card">
      <p className="eyebrow">Welcome back, Control Tower</p>
      <h2>가스감지기 통합 시스템 운영 현황을 한 화면에서 관리하세요.</h2>
      <p>
        이번 교대 근무의 핵심 지표, 최신 경보, 자주 사용하는 모듈까지 직관적으로 접근할 수 있도록 설계된 포털 셸입니다.
      </p>
      <div className="hero-actions">
        <button className="primary-btn">Start Monitoring</button>
        <button className="ghost-btn">Open Incident Board</button>
      </div>
    </section>
  );
}
