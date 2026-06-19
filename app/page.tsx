import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import UnifiedPlatform from '@/components/sections/UnifiedPlatform';
import IntegrationsOrbit from '@/components/sections/IntegrationsOrbit';
import EnterpriseCapabilities from '@/components/sections/EnterpriseCapabilities';
import CaseStudies from '@/components/sections/CaseStudies';
import Metrics from '@/components/sections/Metrics';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <UnifiedPlatform />
        <IntegrationsOrbit />
        <EnterpriseCapabilities />
        <CaseStudies />
        <Metrics />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
