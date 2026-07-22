export default function Concept() {
  return (
    <section className="section section--concept fade-in" id="concept">
      <div className="section__header">
        <p className="section__eyebrow">コンセプト</p>

        <h2 className="section__title">
          目的は、今日の自分にコミットすること
        </h2>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h3 className="feature-card__title">1日1投稿まで</h3>

          <p className="feature-card__text">
            毎日の記録に制約を設けることで、投稿の価値を高めます。
          </p>
        </article>

        <article className="feature-card">
          <h3 className="feature-card__title">当日内は削除不可</h3>

          <p className="feature-card__text">
            今日の記録はその日の自分への約束として残します。
          </p>
        </article>

        <article className="feature-card">
          <h3 className="feature-card__title">編集は最大3回まで</h3>

          <p className="feature-card__text">
            振り返りを促しつつ、過度な修正を防ぎます。
          </p>
        </article>

        <article className="feature-card">
          <h3 className="feature-card__title">翌日以降は削除可</h3>

          <p className="feature-card__text">
            時間を置いた判断で整理できる柔軟性を残します。
          </p>
        </article>
      </div>
    </section>
  );
}
