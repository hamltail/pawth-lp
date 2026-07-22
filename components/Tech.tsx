export default function Tech() {
  return (
    <section className="section section--tech fade-in">
      <div className="section__header">
        <p className="section__eyebrow">技術・設計ポイント</p>
        <h2 className="section__title">開発で重視したこと</h2>
      </div>

      <div className="tech-grid">
        <div className="tech-card">制約設計</div>
        <div className="tech-card">UX改善視点</div>
        <div className="tech-card">継続しやすいUI</div>
        <div className="tech-card">アクセシビリティ配慮</div>
        <div className="tech-card">
          ユーティリティファースト（Tailwind CSS）
        </div>
        <div className="tech-card">自動テスト（Playwright）</div>
        <div className="tech-card">開発環境の再現性（Docker）</div>
        <div className="tech-card">
          本番運用を見据えた設計（AWS）
        </div>
      </div>
    </section>
  );
}
