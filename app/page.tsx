import Hero from "../components/Hero";
import Screens from "../components/Screens";
import Concept from "../components/Concept";
import Negative from "../components/Negative";

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Screens />
      <Concept />
      <Negative />
    </main>
  );
}
