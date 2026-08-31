import FadeIn from "./FadeIn";

const highlights = [
  "単なるCRUDではなく、習慣化と内省を支える設計。",
  "UIだけでなく、使い方の制約まで設計している。",
  "QA・UX視点を意識した個人開発。",
];

export default function Highlights() {
  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          ポートフォリオとしての見どころ
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          単なるCRUDを超えた設計
        </h2>
      </div>

      <div className="grid gap-5">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className="rounded-3xl border border-(--border) bg-(--card) p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            <p className="m-0 leading-7 font-bold">{highlight}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
