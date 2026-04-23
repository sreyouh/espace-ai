"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import WhyPortfolioSection from "../components/WhyPortfolioSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <WhyPortfolioSection />
      <PricingSection />
      <Footer />
    </main>
  );
}

