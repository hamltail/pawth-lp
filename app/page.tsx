import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Notice from "../components/Notice";
import ScreensWithModal from "../components/ScreensWithModal";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ScreensWithModal />
        <Notice />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
