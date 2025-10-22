import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useSubscribeDev } from '@subscribe.dev/react';
import PersonSelector from '../components/person/PersonSelector';
import PersonManager from '../components/person/PersonManager';
import OutputsCarousel from '../components/output/OutputsCarousel';
import ImageViewerModal from '../components/output/ImageViewerModal';
import BottomNav from '../components/shared/BottomNav';
import { usePersons } from '../hooks/usePersons';
import { useOutputHistory } from '../hooks/useOutputHistory';
import type { Person } from '../types';

const WorkflowPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [costume, setCostume] = useState((location.state as any)?.costume || 'Scooby doo');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'insufficient_credits' | 'other' | null>(null);
  const [showPersonManager, setShowPersonManager] = useState(false);
  const [viewerImageUrl, setViewerImageUrl] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const { client, subscribe } = useSubscribeDev();
  const { incrementUsage } = usePersons();
  const { addOutput } = useOutputHistory();

  const costumeSuggestions = [
    'Vampire',
    'Zombie',
    'Witch',
    'Wizard',
    'Ghost',
    'Werewolf',
    'Frankenstein monster',
    'Mummy',
    'Skeleton',
    'Devil',
    'Angel',
    'Pirate',
    'Superhero',
    'Medieval knight',
    'Ninja',
  ];

  const handleRandomCostume = () => {
    const randomCostume = costumeSuggestions[Math.floor(Math.random() * costumeSuggestions.length)];
    setCostume(randomCostume);
  };

  // Auto-scroll to results on mobile when result is ready
  useEffect(() => {
    if (result && resultsRef.current && window.innerWidth < 1024) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        addOutput(
          response.output.portrait.image,
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

      if (err.type === 'insufficient_credits') {
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
    <div className="min-h-screen bg-neutral-950 py-20 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main workflow interface */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-md shadow-2xl overflow-hidden">
          <div
            className="px-6 py-5 border-b border-neutral-700"
            style={{ background: 'var(--gradient-card)' }}
          >
            <h1 className="font-display font-bold text-3xl text-neutral-100">{t('workflow.title')}</h1>
            <p className="text-neutral-300 mt-2">{t('workflow.subtitle')}</p>
            <div className="mt-3 inline-block px-3 py-1 bg-orange-600/20 border border-orange-600/40 rounded">
              <span className="text-sm text-orange-300 font-medium">
                💰 5 {t('user.candy')}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-100">{t('workflow.title')}</h2>

                <div className="mb-6">
                  <PersonSelector
                    selectedPersonId={selectedPerson?.id || null}
                    onSelect={setSelectedPerson}
                    onManageClick={() => setShowPersonManager(true)}
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
                      className="px-3 py-1 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-neutral-100 rounded transition-colors"
                    >
                      🎲 Decide for me
                    </button>
                  </div>
                  <textarea
                    value={costume}
                    onChange={(e) => setCostume(e.target.value)}
                    placeholder={t('workflow.costumePlaceholder')}
                    className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    rows={4}
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    {t('workflow.costumeHint')}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !costume.trim()}
                  className="w-full py-4 px-6 rounded font-display font-bold text-lg text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  style={{
                    background: loading || !costume.trim() ? '#52525b' : 'var(--gradient-primary)',
                    boxShadow: loading || !costume.trim() ? 'none' : 'var(--shadow-glow-purple)',
                  }}
                >
                  {loading ? 'Summoning...' : t('workflow.generateButton')}
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

                {/* Previous Generations Carousel */}
                <OutputsCarousel outputType="costume" />
              </div>

              {/* Results Section */}
              <div ref={resultsRef}>
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-100">{t('workflow.resultsTitle')}</h2>
                <div className="min-h-[500px] bg-neutral-900 rounded p-6 border-2 border-neutral-700">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-pulse text-2xl">🎃</div>
                        </div>
                      </div>
                      <p className="text-neutral-300 font-medium">{t('workflow.processingMessage')}</p>
                      <p className="text-sm text-neutral-500">{t('workflow.processingSubtitle')}</p>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      {result.output?.portrait?.image && (
                        <div className="space-y-3">
                          <div className="relative group cursor-pointer bg-neutral-900 rounded" onClick={() => setViewerImageUrl(result.output.portrait.image)}>
                            <img
                              src={result.output.portrait.image}
                              alt="Generated costume portrait"
                              className="w-full rounded shadow-2xl object-contain"
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/90 px-4 py-2 rounded">
                                <p className="text-neutral-100 text-sm font-medium">{t('outputs.clickToView')}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-950/30 border-l-4 border-green-500 p-4 rounded">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <p className="text-green-300 font-medium">{t('workflow.successMessage')}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {result.errors && result.errors.length > 0 && (
                        <div className="bg-yellow-950/30 border-l-4 border-yellow-500 p-4 rounded">
                          <p className="text-yellow-300 font-medium">{t('workflow.warningsTitle')}:</p>
                          <ul className="list-disc list-inside text-sm text-yellow-400 mt-1">
                            {result.errors.map((err: any, idx: number) => (
                              <li key={idx}>{err.message}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-500 gap-4">
                      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium">{t('workflow.resultsEmpty')}</p>
                      <p className="text-sm">{t('workflow.resultsEmptySubtitle')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Manager Modal */}
      <PersonManager
        isOpen={showPersonManager}
        onClose={() => setShowPersonManager(false)}
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
