import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscribeDev } from '@subscribe.dev/react';
import OutputGridDualSelector from '../components/output/OutputGridDualSelector';
import OutputsCarousel from '../components/output/OutputsCarousel';
import ImageViewerModal from '../components/output/ImageViewerModal';
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
  const [countdown, setCountdown] = useState(15);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'insufficient_credits' | 'other' | null>(null);
  const [viewerImageUrl, setViewerImageUrl] = useState<string | null>(null);

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
    if (result && result.output?.group_selfie?.image) {
      setViewerImageUrl(result.output.group_selfie.image);
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
        addOutput(
          response.output.group_selfie.image,
          setting,
          'group_selfie', // Output type
          undefined, // No single person ID for group selfie
          undefined,
          7 // 7 credits per group selfie generation
        );
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
                🍬 7 {t('user.candy')}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              {/* Input Section */}
              <div>
                <div className="mb-6">
                  <OutputGridDualSelector
                    selectedOutput1={output1}
                    selectedOutput2={output2}
                    onSelect1={setOutput1}
                    onSelect2={setOutput2}
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
              <p className="text-neutral-100 font-medium text-xl">{t('groupSelfie.processingMessage')}</p>
              <p className="text-neutral-400 mt-2">{t('groupSelfie.processingSubtitle')}</p>
            </div>
          </div>
        </div>
      )}

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

export default GroupSelfiePage;
