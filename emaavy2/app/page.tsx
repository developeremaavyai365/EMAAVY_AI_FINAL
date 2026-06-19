import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Features from '@/components/sections/Features';
import ProductShowcase from '@/components/sections/ProductShowcase';
import WorkflowShowcase from '@/components/sections/WorkflowShowcase';
import IntegrationsOrbit from '@/components/sections/IntegrationsOrbit';
import AIAgents from '@/components/sections/AIAgents';
import Metrics from '@/components/sections/Metrics';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <ProductShowcase />
        <WorkflowShowcase />
        <IntegrationsOrbit />
        <AIAgents />
        <Metrics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
