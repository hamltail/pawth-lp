import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Notice from "../components/Notice";
import ScreensWithModal from "../components/ScreensWithModal";
import ThemeColors from "../components/ThemeColors";
import Usability from "../components/Usability";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ScreensWithModal />
        <Usability />
        <ThemeColors />
        <Notice />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
