import Hero from "./sections/hero";
import Journey from "./sections/journey";
import CaseStudies from "./sections/case-studies";
import JourneyMap from "./sections/journey-map";
import WhyChooseUs from "./sections/why-choose-us";
import FAQ from "./sections/faq";

export default function HomeView() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Journey />
      <CaseStudies />
      <JourneyMap />
      <WhyChooseUs />
      <FAQ />
    </main>
  );
}
