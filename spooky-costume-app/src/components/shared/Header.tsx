import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useSubscribeDev } from '@subscribe.dev/react';
import LanguageSelector from './LanguageSelector';
const instaCostumeLogo = '/images/insta-costume.png';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isSignedIn, signIn, user, usage, subscriptionStatus, subscribe, signOut } = useSubscribeDev();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const isLandingPage = location.pathname === '/';
  const isAppPage = location.pathname === '/app' || location.pathname === '/group-selfie' || location.pathname === '/gallery';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 overflow-visible ${
        isScrolled
          ? 'bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800/30 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-neutral-100 hover:text-orange-300 transition-colors flex-shrink-0"
          >
            <img src={instaCostumeLogo} alt="Insta Costume" className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="italic text-orange-400 text-lg sm:text-xl tracking-wide">INSTA COSTUME</span>
          </Link>

          {/* Navigation - landing page */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-neutral-300 hover:text-orange-300 transition-colors text-sm font-medium"
              >
                {t('nav.howItWorks')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-neutral-300 hover:text-orange-300 transition-colors text-sm font-medium"
              >
                {t('nav.faq')}
              </button>
            </nav>
          )}

          {/* Navigation - app pages */}
          {isAppPage && isSignedIn && (
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/app"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  location.pathname === '/app'
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-600/40'
                    : 'text-neutral-300 hover:text-orange-300'
                }`}
              >
                {t('nav.app')}
              </Link>
              <Link
                to="/group-selfie"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  location.pathname === '/group-selfie'
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-600/40'
                    : 'text-neutral-300 hover:text-orange-300'
                }`}
              >
                {t('nav.groupSelfie')}
              </Link>
              <Link
                to="/gallery"
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  location.pathname === '/gallery'
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-600/40'
                    : 'text-neutral-300 hover:text-orange-300'
                }`}
              >
                {t('nav.gallery')}
              </Link>
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LanguageSelector />

            {isSignedIn ? (
              <div className="relative" ref={userMenuRef}>
                {/* User Badge */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all"
                >
                  <span className="text-lg">🍬</span>
                  <span className="text-sm font-semibold text-neutral-100">
                    {usage?.remainingCredits ?? 0}
                  </span>
                  <svg
                    className={`w-4 h-4 text-neutral-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-neutral-800 border border-neutral-700 rounded shadow-2xl overflow-hidden">
                    {/* User Info */}
                    <div className="p-4 border-b border-neutral-700">
                      <div className="flex items-center gap-3 mb-3">
                        {user?.avatarUrl && (
                          <img
                            src={user.avatarUrl}
                            alt="User"
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-100 truncate">
                            {user?.email || 'User'}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {subscriptionStatus?.hasActiveSubscription ? (
                              <span className="text-green-400">
                                {subscriptionStatus.plan?.name || t('user.activeSubscription')}
                              </span>
                            ) : (
                              t('user.freePlan')
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Candy Count */}
                      <div
                        className="rounded px-3 py-2"
                        style={{ background: 'var(--gradient-card)' }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-400">{t('user.candy')}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">🍬</span>
                            <span className="font-display font-bold text-lg text-neutral-100">
                              {usage?.remainingCredits ?? 0} / {usage?.allocatedCredits ?? 0}
                            </span>
                          </div>
                        </div>
                        {usage && usage.remainingCredits < 10 && (
                          <button
                            onClick={() => {
                              subscribe();
                              setIsUserMenuOpen(false);
                            }}
                            className="text-xs text-purple-400 hover:text-purple-300 font-medium mt-1 w-full text-left"
                          >
                            {t('user.getMoreCandy')}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          subscribe();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 rounded transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        {t('user.manageSubscription')}
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-700 rounded transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t('user.signOut')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signIn}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded font-display font-semibold text-xs sm:text-sm text-neutral-100 transition-all duration-300 flex-shrink-0 whitespace-nowrap"
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
                {t('nav.signIn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
