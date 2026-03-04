import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSubscribeDev } from '@subscribe.dev/react';
import HeroSection from '../components/landing/HeroSection';
import HowItWorks from '../components/landing/HowItWorks';
import GroupSelfieExamples from '../components/landing/GroupSelfieExamples';
import CostumeExamples from '../components/landing/CostumeExamples';
import FAQSection from '../components/landing/FAQSection';
import FinalCTA from '../components/landing/FinalCTA';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useSubscribeDev();

  // Redirect logged-in users to /app unless they came from header
  useEffect(() => {
    const fromHeader = (location.state as any)?.fromHeader;
    if (isSignedIn && !fromHeader) {
      navigate('/app');
    }
  }, [isSignedIn, location.state, navigate]);

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
