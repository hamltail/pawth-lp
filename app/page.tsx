import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Notice from "../components/Notice";
import ShowcaseWithModal from "../components/ShowcaseWithModal";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ShowcaseWithModal />
        <Notice />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
