"use client";

type ScreenImage = {
  src: string;
  alt: string;
};

type ScreensProps = {
  onImageClick: (image: ScreenImage) => void;
};

export default function Screens({ onImageClick }: ScreensProps) {
  return (
    <section className="section section--intro" id="screens">
      <div className="section__header">
        <p className="section__eyebrow">アプリ画面紹介</p>
        <h2 className="section__title">Pawth の3つの画面</h2>
      </div>

      <div className="screen-grid">
        <article className="screen-card">
          <img
            className="screen-card__image"
            src="/images/pawth-calendar.png"
            alt="カレンダー画面"
            onClick={() =>
              onImageClick({
                src: "/images/pawth-calendar.png",
                alt: "カレンダー画面",
              })
            }
          />

          <div className="screen-card__body">
            <h3 className="screen-card__title">カレンダー画面</h3>
            <p className="screen-card__text">
              日々の足あとを一目で確認し、投稿のリズムを可視化します。
            </p>
          </div>
        </article>

        <article className="screen-card">
          <img
            className="screen-card__image"
            src="/images/pawth-list.png"
            alt="日記一覧画面"
            onClick={() =>
              onImageClick({
                src: "/images/pawth-list.png",
                alt: "日記一覧画面",
              })
            }
          />

          <div className="screen-card__body">
            <h3 className="screen-card__title">日記一覧画面</h3>
            <p className="screen-card__text">
              過去の投稿を振り返りやすく、内省のための一覧表示です。
            </p>
          </div>
        </article>

        <article className="screen-card">
          <img
            className="screen-card__image"
            src="/images/pawth-modal.png"
            alt="日記投稿モーダル画面"
            onClick={() =>
              onImageClick({
                src: "/images/pawth-modal.png",
                alt: "日記投稿モーダル画面",
              })
            }
          />

          <div className="screen-card__body">
            <h3 className="screen-card__title">日記投稿モーダル</h3>
            <p className="screen-card__text">
              1日1投稿のシンプルな入力体験で、気軽に記録できます。
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
