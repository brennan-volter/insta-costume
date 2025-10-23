import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSubscribeDev } from '@subscribe.dev/react';
import PersonSelector from '../components/person/PersonSelector';
import AddPersonForm from '../components/person/AddPersonForm';
import OutputsCarousel from '../components/output/OutputsCarousel';
import ImageViewerModal from '../components/output/ImageViewerModal';
import BottomNav from '../components/shared/BottomNav';
import { usePersons } from '../hooks/usePersons';
import { useOutputHistory } from '../hooks/useOutputHistory';
import type { Person } from '../types';
import { imageUrlToBase64 } from '../utils/imageConverter';

const WorkflowPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [costume, setCostume] = useState((location.state as any)?.costume || 'Scarecrow costume with burlap mask, straw poking through tattered patchwork clothes, and worn flannel shirt');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'insufficient_credits' | 'other' | null>(null);
  const [showAddPersonForm, setShowAddPersonForm] = useState(false);
  const [viewerImageUrl, setViewerImageUrl] = useState<string | null>(null);

  const { client, subscribe } = useSubscribeDev();
  const { incrementUsage } = usePersons();
  const { addOutput } = useOutputHistory();

  const costumeSuggestions = [
    'Elegant vampire costume with pale makeup, red contact lenses, dramatic black cape, and Victorian attire',
    'Zombie costume with decay makeup effects, distressed tattered clothes, and theatrical blood stains',
    'Mysterious witch costume with pointed black hat, flowing dark robes, and mystical accessories',
    'Wise wizard costume with long white beard prop, star-patterned robes, and wooden staff accessory',
    'Ethereal ghost costume with translucent white fabric sheets, floating effect, and pale makeup',
    'Fierce werewolf costume with faux fur pieces, fake fangs, yellow contact lenses, and torn clothing',
    'Classic Frankenstein costume with green face paint, bolt headpiece accessories, and stitched scar makeup',
    'Egyptian mummy costume wrapped in weathered fabric bandages with aged makeup and desert dust effects',
    'Creepy skeleton costume with bone-printed bodysuit, skull face paint, hollow eye makeup, and dark hooded cloak',
    'Sinister devil costume with red body paint, horn headband, pointed tail prop, and black feathered wings',
    'Heavenly angel costume with white feathered wings, golden halo headpiece, and radiant flowing white robes',
    'Swashbuckling pirate costume with leather eye patch, tricorn hat, weathered captain coat, and belt accessories',
    'Powerful superhero costume with vibrant spandex suit, fabric mask, heroic cape, and emblematic chest logo',
    'Noble medieval knight costume in metallic silver armor pieces, royal crest shield, and foam prop sword',
    'Stealthy ninja costume in black tactical outfit with face mask covering, belt accessories, and combat poses',
  ];

  const handleRandomCostume = () => {
    const randomCostume = costumeSuggestions[Math.floor(Math.random() * costumeSuggestions.length)];
    setCostume(randomCostume);
  };

  // Countdown timer when loading
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading) {
      setCountdown(15);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Auto-open image viewer when result is ready
  useEffect(() => {
    if (result && result.output?.portrait?.image) {
      setViewerImageUrl(result.output.portrait.image);
    }
  }, [result]);

  const handleSubmit = async () => {
    if (!client) {
      setError('Client not initialized');
      return;
    }

    setLoading(true);
    setError(null);
    setErrorType(null);
    setResult(null);

    try {
      const response = await client.run('workflow/6b5a15ea-9961-4a24-b68e-bbfba9adf95d', {
        input: {
          ...(selectedPerson ? { selfie: selectedPerson.photoBase64 } : {}),
          costume: costume
        }
      });

      console.log('Workflow result:', response);
      setResult(response);

      // Save output to history
      if (response.output?.portrait?.image) {
        // Convert image URL to base64 for persistent storage
        const imageBase64 = await imageUrlToBase64(response.output.portrait.image);

        addOutput(
          imageBase64,
          costume,
          'costume', // Output type
          selectedPerson?.id,
          selectedPerson?.name,
          5 // 5 credits per costume generation
        );

        // Increment usage count for the person
        if (selectedPerson) {
          incrementUsage(selectedPerson.id);
        }
      }
    } catch (err: any) {
      console.error('Workflow error:', err);

      if (err.code === 'insufficient_credits' || err.code === 'INSUFFICIENT_BALANCE') {
        setError('Out of candy! Replenish your goodie bag.');
        setErrorType('insufficient_credits');
      } else {
        setError('The cameraman took a bathroom break! Try again in a minute.');
        setErrorType('other');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-20 md:py-20">
      <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
        {/* Main workflow interface */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-md shadow-2xl overflow-hidden">
          <div
            className="px-4 py-3 md:px-6 md:py-5 border-b border-neutral-700"
            style={{ background: 'var(--gradient-card)' }}
          >
            <div className="flex items-center justify-between gap-3">
              <h1 className="font-display font-bold text-xl md:text-3xl text-neutral-100">{t('workflow.title')}</h1>
              <span className="text-xs md:text-sm text-orange-300 font-medium whitespace-nowrap px-2 py-1 md:px-3 bg-orange-600/20 border border-orange-600/40 rounded">
                🍬 5
              </span>
            </div>
            <p className="text-neutral-300 text-xs md:text-base mt-1 md:mt-2">{t('workflow.subtitle')}</p>
          </div>

          {/* Desktop: Regular layout */}
          <div className="hidden md:block p-6">
            <div className="max-w-2xl mx-auto">
              <div>
                <div className="mb-6">
                  <PersonSelector
                    selectedPersonId={selectedPerson?.id || null}
                    onSelect={setSelectedPerson}
                    onAddClick={() => setShowAddPersonForm(true)}
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-200">
                      {t('workflow.costumeLabel')} <span className="text-red-500">{t('workflow.costumeRequired')}</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomCostume}
                      className="px-3 py-1 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-neutral-100 rounded transition-colors whitespace-nowrap"
                    >
                      🎲 Random
                    </button>
                  </div>
                  <textarea
                    value={costume}
                    onChange={(e) => setCostume(e.target.value)}
                    placeholder={t('workflow.costumePlaceholder')}
                    className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    rows={3}
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    {t('workflow.costumeHint')}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !costume.trim() || !selectedPerson}
                  className="w-full py-4 px-6 rounded font-display font-bold text-lg text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  style={{
                    background: loading || !costume.trim() || !selectedPerson ? '#52525b' : 'var(--gradient-primary)',
                    boxShadow: loading || !costume.trim() || !selectedPerson ? 'none' : 'var(--shadow-glow-purple)',
                  }}
                >
                  {loading
                    ? 'Summoning...'
                    : !selectedPerson
                      ? 'Select a person above'
                      : !costume.trim()
                        ? 'Enter a costume description'
                        : t('workflow.generateButton')
                  }
                </button>

                {error && errorType === 'insufficient_credits' && (
                  <div className="mt-4 p-4 bg-orange-950/50 border-l-4 border-orange-500 text-orange-300 rounded">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🍬</span>
                      <div className="flex-1">
                        <p className="font-medium text-lg">{error}</p>
                        <button
                          onClick={() => subscribe()}
                          className="mt-3 px-4 py-2 rounded font-display font-semibold text-sm text-neutral-100 transition-all"
                          style={{
                            background: 'var(--gradient-primary)',
                            boxShadow: 'var(--shadow-glow-purple)',
                          }}
                        >
                          Get More Candy
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {error && errorType === 'other' && (
                  <div className="mt-4 p-4 bg-red-950/50 border-l-4 border-red-500 text-red-300 rounded">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <OutputsCarousel outputType="costume" />
              </div>
            </div>
          </div>

          {/* Mobile: Fixed height container */}
          <div className="md:hidden">
            <div className="p-4 flex flex-col h-[calc(100vh-240px)]">
            <div className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <PersonSelector
                  selectedPersonId={selectedPerson?.id || null}
                  onSelect={setSelectedPerson}
                  onAddClick={() => setShowAddPersonForm(true)}
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-neutral-200">
                    {t('workflow.costumeLabel')} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleRandomCostume}
                    className="px-2 py-1 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-neutral-100 rounded transition-colors whitespace-nowrap"
                  >
                    🎲 Random
                  </button>
                </div>
                <textarea
                  value={costume}
                  onChange={(e) => setCostume(e.target.value)}
                  placeholder={t('workflow.costumePlaceholder')}
                  className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                />
                <p className="text-xs text-neutral-400 mt-1">
                  {t('workflow.costumeHint')}
                </p>
              </div>

              {error && errorType === 'insufficient_credits' && (
                <div className="mb-4 p-3 bg-orange-950/50 border-l-4 border-orange-500 text-orange-300 rounded">
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">🍬</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{error}</p>
                      <button
                        onClick={() => subscribe()}
                        className="mt-2 px-3 py-1 rounded font-display font-semibold text-xs text-neutral-100 transition-all"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        Get More Candy
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {error && errorType === 'other' && (
                <div className="mb-4 p-3 bg-red-950/50 border-l-4 border-red-500 text-red-300 rounded">
                  <p className="font-medium text-sm">{error}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !costume.trim() || !selectedPerson}
              className="mt-4 w-full py-3 px-6 rounded font-display font-bold text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                background: loading || !costume.trim() || !selectedPerson ? '#52525b' : 'var(--gradient-primary)',
                boxShadow: loading || !costume.trim() || !selectedPerson ? 'none' : 'var(--shadow-glow-purple)',
              }}
            >
              {loading
                ? 'Summoning...'
                : !selectedPerson
                  ? 'Select a person above'
                  : !costume.trim()
                    ? 'Enter a costume description'
                    : t('workflow.generateButton')
              }
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Countdown Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-display font-bold text-purple-400">
                  {countdown}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-neutral-100 font-medium text-xl">{t('workflow.processingMessage')}</p>
              <p className="text-neutral-400 mt-2">{t('workflow.processingSubtitle')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Person Form Modal */}
      <AddPersonForm
        isOpen={showAddPersonForm}
        onClose={() => setShowAddPersonForm(false)}
      />

      {/* Image Viewer Modal */}
      {viewerImageUrl && (
        <ImageViewerModal
          imageUrl={viewerImageUrl}
          onClose={() => setViewerImageUrl(null)}
        />
      )}

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default WorkflowPage;
