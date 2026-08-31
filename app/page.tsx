import BackToTop from "../components/BackToTop";
import Concept from "../components/Concept";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Negative from "../components/Negative";
import Notice from "../components/Notice";
import ScreensWithModal from "../components/ScreensWithModal";
import Tech from "../components/Tech";

export default function Home() {
  return (
    <>
      <main className="mx-auto w-[min(1200px,calc(100%-2.5rem))] py-12 pb-16 max-[960px]:w-[calc(100%-2rem)]">
        <Hero />
        <ScreensWithModal />
        <Concept />
        <Negative />
        <Tech />
        <Highlights />
        <Notice />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
