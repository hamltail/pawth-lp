export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 pb-12 text-center">
      <p className="m-0 text-[0.9rem] tracking-[0.04em] text-(--muted)">
        © {currentYear} Pawth
      </p>
    </footer>
  );
}
