import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import OutputCarouselSelector from '../components/output/OutputCarouselSelector';
import OutputsCarousel from '../components/output/OutputsCarousel';
import BottomNav from '../components/shared/BottomNav';
import { useOutputHistory } from '../hooks/useOutputHistory';
import type { CostumeOutput } from '../types';

const GroupSelfiePage: React.FC = () => {
  const { t } = useTranslation();
  const [output1, setOutput1] = useState<CostumeOutput | null>(null);
  const [output2, setOutput2] = useState<CostumeOutput | null>(null);
  const [setting, setSetting] = useState('Halloween party');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'insufficient_credits' | 'other' | null>(null);

  const { client, subscribe } = useSubscribeDev();
  const { addOutput } = useOutputHistory();

  const settingSuggestions = [
    'Haunted mansion hallway',
    'Spooky graveyard at midnight',
    'Halloween costume party with decorations',
    'Dark forest with fog',
    'Abandoned carnival at night',
    'Gothic castle interior',
    'Misty cemetery with tombstones',
    'Creepy pumpkin patch',
    'Witch\'s cauldron room',
    'Vampire\'s lair',
    'Zombie apocalypse street',
    'Haunted house entrance',
    'Full moon night sky',
    'Trick-or-treating neighborhood',
    'Spooky cornfield maze',
  ];

  const handleRandomSetting = () => {
    const randomSetting = settingSuggestions[Math.floor(Math.random() * settingSuggestions.length)];
    setSetting(randomSetting);
  };

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
      const response = await client.run('workflow/85975d99-929e-4aa3-a69d-71ad2e77bb1d', {
        input: {
          ...(output1 ? { person_1: output1.imageUrl } : {}),
          ...(output2 ? { person_2: output2.imageUrl } : {}),
          setting: setting
        }
      });

      console.log('Workflow result:', response);
      setResult(response);

      // Save group selfie output to history
      if (response.output?.group_selfie?.image) {
        const description = `Group selfie: ${setting}`;
        addOutput(
          response.output.group_selfie.image,
          description,
          'group_selfie', // Output type
          undefined, // No single person ID for group selfie
          undefined,
          7 // 7 credits per group selfie generation
        );
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
            <h1 className="font-display font-bold text-3xl text-neutral-100">{t('groupSelfie.title')}</h1>
            <p className="text-neutral-300 mt-2">{t('groupSelfie.subtitle')}</p>
            <div className="mt-3 inline-block px-3 py-1 bg-orange-600/20 border border-orange-600/40 rounded">
              <span className="text-sm text-orange-300 font-medium">
                {t('groupSelfie.costBadge')}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-100">{t('groupSelfie.inputTitle')}</h2>

                <div className="mb-6">
                  <OutputCarouselSelector
                    selectedOutput={output1}
                    onSelect={setOutput1}
                    label={t('groupSelfie.person1Label')}
                    excludeOutputId={output2?.id}
                  />
                </div>

                <div className="mb-6">
                  <OutputCarouselSelector
                    selectedOutput={output2}
                    onSelect={setOutput2}
                    label={t('groupSelfie.person2Label')}
                    excludeOutputId={output1?.id}
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-neutral-200">
                      {t('groupSelfie.settingLabel')} <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomSetting}
                      className="px-3 py-1 text-xs font-medium bg-purple-600 hover:bg-purple-500 text-neutral-100 rounded transition-colors"
                    >
                      🎲 Decide for me
                    </button>
                  </div>

                  {/* Quick Setting Selections */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setSetting('Haunted mansion hallway')}
                      className="px-3 py-1.5 bg-neutral-700 hover:bg-purple-600 text-neutral-300 hover:text-neutral-100 rounded transition-colors text-sm font-medium border border-neutral-600 hover:border-purple-500"
                    >
                      👻 Haunted Mansion
                    </button>
                    <button
                      type="button"
                      onClick={() => setSetting('Spooky graveyard at midnight')}
                      className="px-3 py-1.5 bg-neutral-700 hover:bg-purple-600 text-neutral-300 hover:text-neutral-100 rounded transition-colors text-sm font-medium border border-neutral-600 hover:border-purple-500"
                    >
                      🪦 Spooky Graveyard
                    </button>
                    <button
                      type="button"
                      onClick={() => setSetting('Halloween costume party with decorations')}
                      className="px-3 py-1.5 bg-neutral-700 hover:bg-purple-600 text-neutral-300 hover:text-neutral-100 rounded transition-colors text-sm font-medium border border-neutral-600 hover:border-purple-500"
                    >
                      🎃 Halloween Party
                    </button>
                  </div>

                  <textarea
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                    placeholder={t('groupSelfie.settingPlaceholder')}
                    className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    rows={4}
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    {t('groupSelfie.settingHint')}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !setting.trim()}
                  className="w-full py-4 px-6 rounded font-display font-bold text-lg text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                  style={{
                    background: loading || !setting.trim() ? '#52525b' : 'var(--gradient-primary)',
                    boxShadow: loading || !setting.trim() ? 'none' : 'var(--shadow-glow-purple)',
                  }}
                >
                  {loading ? 'Bobbing for Apples...' : t('groupSelfie.generateButton')}
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
                <OutputsCarousel outputType="group_selfie" />
              </div>

              {/* Results Section */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4 text-neutral-100">{t('groupSelfie.resultsTitle')}</h2>
                <div className="min-h-[500px] bg-neutral-900 rounded p-6 border-2 border-neutral-700">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-pulse text-2xl">👥</div>
                        </div>
                      </div>
                      <p className="text-neutral-300 font-medium">{t('groupSelfie.processingMessage')}</p>
                      <p className="text-sm text-neutral-500">{t('groupSelfie.processingSubtitle')}</p>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      {result.output?.group_selfie?.image && (
                        <div className="space-y-3">
                          <div className="relative group bg-neutral-900 rounded">
                            <img
                              src={result.output.group_selfie.image}
                              alt="Generated group selfie"
                              className="w-full rounded shadow-2xl object-contain"
                            />
                            <a
                              href={result.output.group_selfie.image}
                              download="group-selfie.jpg"
                              className="absolute bottom-4 right-4 bg-neutral-900/90 hover:bg-neutral-900 text-neutral-100 px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center gap-2 border border-neutral-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {t('workflow.downloadButton')}
                            </a>
                          </div>

                          <div className="bg-green-950/30 border-l-4 border-green-500 p-4 rounded">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <p className="text-green-300 font-medium">{t('groupSelfie.successMessage')}</p>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-lg font-medium">{t('groupSelfie.resultsEmpty')}</p>
                      <p className="text-sm">{t('groupSelfie.resultsEmptySubtitle')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default GroupSelfiePage;
