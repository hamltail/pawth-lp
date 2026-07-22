import Concept from "../components/Concept";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Negative from "../components/Negative";
import Notice from "../components/Notice";
import Screens from "../components/Screens";
import Tech from "../components/Tech";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Screens />
      <Concept />
      <Negative />
      <Tech />
      <Highlights />
      <Notice />
    </main>
  );
}
