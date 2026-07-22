export default function Negative() {
  return (
    <section className="section section--negative fade-in">
      <div className="section__header">
        <p className="section__eyebrow">非採用機能</p>
        <h2 className="section__title">Pawth の設計思想</h2>
      </div>

      <ul className="negative-list">
        <li className="negative-list__item">SNS化しない</li>
        <li className="negative-list__item">タイムラインなし</li>
        <li className="negative-list__item">フォロー/フォロワーなし</li>
        <li className="negative-list__item">内省に最適化</li>
      </ul>
    </section>
  );
}
