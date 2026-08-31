import FadeIn from "./FadeIn";

export default function Notice() {
  return (
    <FadeIn className="py-16 max-[720px]:py-10">
      <div className="rounded-3xl border border-[#fde0ea] bg-[#fff5f8] p-8 text-center">
        <p className="m-0 leading-7 font-bold text-[#b83280]">
          現在、本番環境の公開は停止しています。
        </p>
      </div>
    </FadeIn>
  );
}
