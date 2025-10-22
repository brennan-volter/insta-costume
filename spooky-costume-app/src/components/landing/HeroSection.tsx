import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isSignedIn, signIn } = useSubscribeDev();
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const examples = [
    {
      id: 1,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079141588-tmpssopnx2m.jpeg',
      alt: 'Example costume portrait 1',
      costume: 'Vampire',
    },
    {
      id: 2,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079098812-tmpo5uoqp21.jpeg',
      alt: 'Example costume portrait 2',
      costume: 'Super hero',
    },
    {
      id: 3,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079241787-tmplmkuuwpq.jpeg',
      alt: 'Example costume portrait 3',
      costume: 'Wizard',
    },
  ];

  const handleCTA = () => {
    if (isSignedIn) {
      navigate('/app');
    } else {
      signIn();
    }
  };

  const handleCostumeClick = (costume: string) => {
    if (isSignedIn) {
      navigate('/app', { state: { costume } });
    } else {
      signIn();
    }
  };

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
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

          {/* Right: Example Images */}
          {/* Desktop: 3-column grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <div
                key={example.id}
                className="group relative rounded-md overflow-hidden bg-neutral-800 border border-neutral-700 transition-all duration-300 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#8f4e2a';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow-orange)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#242428';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {!loadedImages.has(example.id) && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                )}
                <div className="aspect-[3/4] w-full">
                  <img
                    src={example.url}
                    alt={example.alt}
                    loading="eager"
                    onLoad={() => handleImageLoad(example.id)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      loadedImages.has(example.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <button
                    onClick={() => handleCostumeClick(example.costume)}
                    className="px-4 py-2 rounded font-medium text-sm transition-all hover:scale-105"
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'white',
                    }}
                  >
                    Try on a {example.costume} costume!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Horizontal scroll carousel */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
              {examples.map((example, index) => (
                <div
                  key={example.id}
                  className="flex-shrink-0 w-[70%] sm:w-[45%] snap-center"
                >
                  <div
                    className="relative rounded-md overflow-hidden bg-neutral-800 border border-neutral-700"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    {!loadedImages.has(example.id) && (
                      <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                    )}
                    <div className="aspect-[3/4] w-full">
                      <img
                        src={example.url}
                        alt={example.alt}
                        loading="eager"
                        onLoad={() => handleImageLoad(example.id)}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          loadedImages.has(example.id) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex items-end justify-center p-3">
                      <button
                        onClick={() => handleCostumeClick(example.costume)}
                        className="px-3 py-2 rounded font-medium text-xs transition-all"
                        style={{
                          background: 'var(--gradient-primary)',
                          color: 'white',
                        }}
                      >
                        Try on a {example.costume} costume!
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {examples.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-neutral-600"
                />
              ))}
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
