import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GroupSelfieExamples: React.FC = () => {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const examples = [
    {
      id: 1,
      url: 'https://images.subscribe.dev/uploads/d584d421-e338-40ee-80b0-88e36fdbdd46/user_31cHaEsOS9OSslhwbVspAY8sc3Z/1761080028004-tmp3ldpxz7l.jpeg',
      alt: 'Example group selfie 1',
    },
    {
      id: 2,
      url: 'https://images.subscribe.dev/uploads/322a5318-4ab4-42ee-816c-a3a06ee0304d/system/1761087141603-tmpk95y00x6.jpeg',
      alt: 'Example group selfie 2',
    },
    {
      id: 3,
      url: 'https://images.subscribe.dev/uploads/322a5318-4ab4-42ee-816c-a3a06ee0304d/system/1761089273294-tmpf090t_f_.jpeg',
      alt: 'Example group selfie 3',
    },
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section id="group-selfie-examples" className="relative py-16 sm:py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            {t('groupSelfieExamples.title')}
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {t('groupSelfieExamples.subtitle')}
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
              <div className="aspect-[16/9] w-full">
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
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
            {examples.map((example, index) => (
              <div
                key={example.id}
                className="flex-shrink-0 w-[85%] sm:w-[70%] snap-center"
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
                  <div className="aspect-[16/9] w-full">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent"></div>
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

export default GroupSelfieExamples;
