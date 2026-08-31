export default function Notice() {
  return (
    <section className="fade-in py-16 max-[720px]:py-10">
      <div className="rounded-3xl border border-(--border) bg-(--surface) p-8 text-center">
        <p className="m-0 leading-7 font-semibold text-(--muted)">
          現在、本番環境の公開は停止しています。
        </p>
      </div>
    </section>
  );
}
