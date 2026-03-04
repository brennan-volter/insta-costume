import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ExampleGallery: React.FC = () => {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const examples = [
    {
      id: 1,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079141588-tmpssopnx2m.jpeg',
      alt: 'Example costume portrait 1',
    },
    {
      id: 2,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079098812-tmpo5uoqp21.jpeg',
      alt: 'Example costume portrait 2',
    },
    {
      id: 3,
      url: 'https://images.subscribe.dev/uploads/e10d06b1-2614-4d44-8926-b6b220a7957e/system/1761079241787-tmplmkuuwpq.jpeg',
      alt: 'Example costume portrait 3',
    },
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section id="examples" className="relative py-16 sm:py-24 bg-neutral-900">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="group relative rounded-md overflow-hidden bg-neutral-800 border border-neutral-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
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
              {/* Loading Placeholder */}
              {!loadedImages.has(example.id) && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              )}

              {/* Image with Portrait Aspect Ratio */}
              <div className="aspect-[3/4] w-full bg-neutral-900">
                <img
                  src={example.url}
                  alt={example.alt}
                  loading="lazy"
                  onLoad={() => handleImageLoad(example.id)}
                  className={`w-full h-full object-contain transition-opacity duration-500 ${
                    loadedImages.has(example.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleGallery;
