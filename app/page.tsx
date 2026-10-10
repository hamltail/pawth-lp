import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Notice from "../components/Notice";
import ScrollPawTrail from "../components/ScrollPawTrail";
import ShowcaseWithModal from "../components/ShowcaseWithModal";

export default function Home() {
  return (
    <div className="relative isolate">
      <ScrollPawTrail />

      <main>
        <Hero />
        <ShowcaseWithModal />
        <Notice />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
