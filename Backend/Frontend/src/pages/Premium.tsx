
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesList from "@/components/FeaturesList";
import PricingPlans from "@/components/PricingPlans";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/layout/Footer";

const Premium = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesList />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Premium;
