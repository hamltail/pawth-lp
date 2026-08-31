import FadeIn from "./FadeIn";

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "1日1投稿まで",
    description: "毎日の記録に制約を設けることで、投稿の価値を高めます。",
  },
  {
    title: "当日内は削除不可",
    description: "今日の記録はその日の自分への約束として残します。",
  },
  {
    title: "編集は最大3回まで",
    description: "振り返りを促しつつ、過度な修正を防ぎます。",
  },
  {
    title: "翌日以降は削除可",
    description: "時間を置いた判断で整理できる柔軟性を残します。",
  },
];

export default function Concept() {
  return (
    <FadeIn className="py-16 max-[720px]:py-10" id="concept">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          コンセプト
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          目的は、今日の自分にコミットすること
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6 max-[720px]:grid-cols-1">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="overflow-hidden rounded-3xl border border-(--border) bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <h3 className="mb-3 text-[1.1rem] font-extrabold text-(--text)">
              {feature.title}
            </h3>

            <p className="m-0 leading-7 text-(--muted)">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </FadeIn>
  );
}
