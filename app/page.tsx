import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheProblem from "@/components/TheProblem";
import ProblemReframe from "@/components/ProblemReframe";
import EmployerSkillGaps from "@/components/EmployerSkillGaps";
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
      <ProblemReframe />
      <EmployerSkillGaps />
      <IntroducingCAP />
      <WhyLeapcrestCAP />
      <CAPFramework />
      <CallToAction />
      <Footer />
    </main>
  );
}
