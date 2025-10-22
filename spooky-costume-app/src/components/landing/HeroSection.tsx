import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import { useNavigate } from 'react-router-dom';
const jillFull = '/images/jill-full.jpeg';
const jillCostume = '/images/jill-costume.jpeg';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isSignedIn, signIn } = useSubscribeDev();
  const navigate = useNavigate();
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);

  const handleCTA = () => {
    if (isSignedIn) {
      navigate('/app');
    } else {
      signIn();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'var(--gradient-hero)' }}
      />

      {/* Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] z-0 opacity-60"
        style={{
          background: 'var(--gradient-glow)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1
              className="font-display font-bold mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('hero.headline')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-neutral-300 mb-8 leading-relaxed">
              {t('hero.subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-6">
              <button
                onClick={handleCTA}
                className="w-full sm:w-auto px-8 py-4 rounded-md font-display font-bold text-lg text-neutral-100 transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-glow-purple)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-primary-hover)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-primary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple)';
                }}
              >
                {t('hero.cta')}
              </button>
            </div>

            {/* No Credit Card Text */}
            <p className="text-sm text-neutral-400">
              {t('hero.noCreditCard')}
            </p>
          </div>

          {/* Right: Before/After Comparison */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {/* Before Image */}
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-400 mb-2">Before</p>
              <div
                className="relative rounded-md overflow-hidden bg-neutral-800 border border-neutral-700 transition-all duration-300"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: '0ms',
                }}
              >
                {!beforeLoaded && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                )}
                <img
                  src={jillFull}
                  alt="Before costume transformation"
                  loading="eager"
                  onLoad={() => setBeforeLoaded(true)}
                  className={`w-full h-auto object-contain transition-opacity duration-500 ${
                    beforeLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>

            {/* After Image */}
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-400 mb-2">After</p>
              <div
                className="relative rounded-md overflow-hidden bg-neutral-800 border border-neutral-700 transition-all duration-300"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: '150ms',
                }}
              >
                {!afterLoaded && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                )}
                <img
                  src={jillCostume}
                  alt="After costume transformation"
                  loading="eager"
                  onLoad={() => setAfterLoaded(true)}
                  className={`w-full h-auto object-contain transition-opacity duration-500 ${
                    afterLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - only visible on desktop */}
        <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hide scrollbar for carousel */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll snapping */
        .snap-x {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
