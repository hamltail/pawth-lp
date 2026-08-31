"use client";

import Image from "next/image";

type ScreenImage = {
  src: string;
  alt: string;
};

type Screen = ScreenImage & {
  title: string;
  description: string;
};

type ScreensProps = {
  onImageClick: (image: ScreenImage) => void;
};

const screens: Screen[] = [
  {
    src: "/images/pawth-calendar.png",
    alt: "カレンダー画面",
    title: "カレンダー画面",
    description: "日々の足あとを一目で確認し、投稿のリズムを可視化します。",
  },
  {
    src: "/images/pawth-list.png",
    alt: "日記一覧画面",
    title: "日記一覧画面",
    description: "過去の投稿を振り返りやすく、内省のための一覧表示です。",
  },
  {
    src: "/images/pawth-modal.png",
    alt: "日記投稿モーダル画面",
    title: "日記投稿モーダル",
    description: "1日1投稿のシンプルな入力体験で、気軽に記録できます。",
  },
];

export default function Screens({ onImageClick }: ScreensProps) {
  return (
    <section
      className="rounded-4xl bg-(--surface-strong) p-12 max-[720px]:p-8"
      id="screens"
    >
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          アプリ画面紹介
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          Pawth の3つの画面
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-2 max-[720px]:grid-cols-1">
        {screens.map((screen) => (
          <article
            key={screen.src}
            className="screen-card overflow-hidden rounded-3xl border border-(--border) bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <button
              type="button"
              className="relative block aspect-4/3 w-full cursor-zoom-in bg-(--surface)"
              onClick={() =>
                onImageClick({
                  src: screen.src,
                  alt: screen.alt,
                })
              }
              aria-label={`${screen.alt}を拡大表示`}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                sizes="(max-width: 720px) 100vw, (max-width: 960px) 50vw, 33vw"
                className="object-contain p-4"
              />
            </button>

            <div className="p-6">
              <h3 className="mb-3 text-[1.1rem] font-extrabold">
                {screen.title}
              </h3>

              <p className="m-0 leading-7 text-(--muted)">
                {screen.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
