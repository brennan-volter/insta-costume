import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import { useNavigate } from 'react-router-dom';

const CostumeExamples: React.FC = () => {
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
    <section className="relative py-16 sm:py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            {t('examples.title')}
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {t('examples.subtitle')}
          </p>
        </div>

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
                  loading="lazy"
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
                      loading="lazy"
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

export default CostumeExamples;
