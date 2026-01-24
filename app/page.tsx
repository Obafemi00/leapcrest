import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import InsightsSplit from "@/components/InsightsSplit";
import IntroducingCAP from "@/components/IntroducingCAP";
import WhyLeapcrestCAP from "@/components/WhyLeapcrestCAP";
import CAPFramework from "@/components/CAPFramework";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TheProblem />
      <InsightsSplit />
      <IntroducingCAP />
      <WhyLeapcrestCAP />
      <CAPFramework />
      <CallToAction />
      <Footer />
    </main>
  );
}
