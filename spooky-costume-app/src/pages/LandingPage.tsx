import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import GroupSelfieExamples from '../components/landing/GroupSelfieExamples';
import CostumeExamples from '../components/landing/CostumeExamples';
import FAQSection from '../components/landing/FAQSection';
import FinalCTA from '../components/landing/FinalCTA';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GroupSelfieExamples />
      <HowItWorks />
      <FAQSection />
      <CostumeExamples />
      <FinalCTA />
    </div>
  );
};

export default LandingPage;
