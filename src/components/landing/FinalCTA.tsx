import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import { useNavigate } from 'react-router-dom';

const FinalCTA: React.FC = () => {
  const { t } = useTranslation();
  const { isSignedIn, signIn } = useSubscribeDev();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isSignedIn) {
      navigate('/app');
    } else {
      signIn();
    }
  };

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'var(--gradient-card)' }}
      />

      {/* Ambient Glows */}
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] opacity-50 pointer-events-none"
        style={{
          background: 'var(--gradient-glow)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(143, 78, 42, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6 text-neutral-100">
          {t('finalCta.title')}
        </h2>

        <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
          {t('finalCta.subtitle')}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleCTA}
          className="inline-block px-10 py-5 rounded-md font-display font-bold text-xl text-neutral-100 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
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
          {t('finalCta.cta')}
        </button>

        <p className="mt-6 text-sm text-neutral-400">
          {t('finalCta.noCreditCard')}
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
