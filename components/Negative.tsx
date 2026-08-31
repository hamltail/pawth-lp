import FadeIn from "./FadeIn";

const excludedFeatures = [
  "SNS化しない",
  "タイムラインなし",
  "フォロー/フォロワーなし",
  "内省に最適化",
];

export default function Negative() {
  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="mb-8">
        <p className="mb-4 text-[0.78rem] font-bold tracking-[0.12em] text-(--accent) uppercase">
          非採用機能
        </p>

        <h2 className="m-0 text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-extrabold">
          Pawth の設計思想
        </h2>
      </div>

      <ul className="m-0 grid list-none gap-4 p-0">
        {excludedFeatures.map((feature) => (
          <li
            key={feature}
            className="rounded-[20px] bg-(--surface) px-6 py-5 font-bold text-(--text)"
          >
            {feature}
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
