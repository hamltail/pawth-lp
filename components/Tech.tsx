import FadeIn from "./FadeIn";

const technologies = [
  "制約設計",
  "UX改善視点",
  "継続しやすいUI",
  "アクセシビリティ配慮",
  "ユーティリティファースト（Tailwind CSS）",
  "自動テスト（Playwright）",
  "開発環境の再現性（Docker）",
  "本番運用を見据えた設計（AWS）",
];

export default function Tech() {
  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          技術・設計ポイント
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          開発で重視したこと
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6 max-[960px]:grid-cols-2 max-[720px]:grid-cols-1">
        {technologies.map((technology) => (
          <div
            key={technology}
            className="rounded-[20px] bg-(--surface) p-6 text-center font-bold text-(--text)"
          >
            {technology}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
