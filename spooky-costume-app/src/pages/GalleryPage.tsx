import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useOutputHistory } from '../hooks/useOutputHistory';
import ImageViewerModal from '../components/output/ImageViewerModal';
import BottomNav from '../components/shared/BottomNav';

const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const { outputs } = useOutputHistory();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'costume' | 'group_selfie'>('all');

  // Filter outputs based on selected filter
  const filteredOutputs = filterType === 'all'
    ? outputs
    : outputs.filter(output => output.outputType === filterType);

  return (
    <div className="min-h-screen bg-neutral-950 py-20 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-md shadow-2xl overflow-hidden">
          <div
            className="px-4 py-3 md:px-6 md:py-5 border-b border-neutral-700"
            style={{ background: 'var(--gradient-card)' }}
          >
            <h1 className="font-display font-bold text-xl md:text-3xl text-neutral-100">{t('gallery.title')}</h1>
            <p className="text-neutral-300 text-xs md:text-base mt-1 md:mt-2">{t('gallery.subtitle')}</p>
          </div>

          <div className="p-6">
            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded font-display font-medium text-sm transition-all ${
                  filterType === 'all'
                    ? 'bg-purple-600 text-neutral-100'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {t('gallery.filterAll')} ({outputs.length})
              </button>
              <button
                onClick={() => setFilterType('costume')}
                className={`px-4 py-2 rounded font-display font-medium text-sm transition-all ${
                  filterType === 'costume'
                    ? 'bg-purple-600 text-neutral-100'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {t('gallery.filterCostumes')} ({outputs.filter(o => o.outputType === 'costume').length})
              </button>
              <button
                onClick={() => setFilterType('group_selfie')}
                className={`px-4 py-2 rounded font-display font-medium text-sm transition-all ${
                  filterType === 'group_selfie'
                    ? 'bg-purple-600 text-neutral-100'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {t('gallery.filterGroupSelfies')} ({outputs.filter(o => o.outputType === 'group_selfie').length})
              </button>
            </div>

            {/* Gallery grid */}
            {filteredOutputs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-4">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg font-medium">{t('gallery.empty')}</p>
                <p className="text-sm">{t('gallery.emptySubtitle')}</p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to="/app"
                    className="px-4 py-2 rounded font-display font-medium text-sm transition-all"
                    style={{ background: 'var(--gradient-primary)', color: 'white' }}
                  >
                    {t('gallery.createCostume')}
                  </Link>
                  <Link
                    to="/group-selfie"
                    className="px-4 py-2 bg-purple-700 text-neutral-200 rounded hover:bg-purple-600 transition-colors font-display font-medium text-sm"
                  >
                    {t('gallery.createGroupSelfie')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredOutputs.map((output) => (
                  <div
                    key={output.id}
                    className="group relative bg-neutral-900 rounded overflow-hidden border-2 border-neutral-700 hover:border-purple-500 transition-all cursor-pointer"
                    onClick={() => setSelectedImageUrl(output.imageSrc)}
                  >
                    <img
                      src={output.imageSrc}
                      alt={output.costumeDescription}
                      className="w-full aspect-square object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-neutral-100 text-sm font-medium line-clamp-2 mb-1">
                          {output.costumeDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded ${
                            output.outputType === 'costume'
                              ? 'bg-orange-600/80 text-orange-100'
                              : 'bg-purple-600/80 text-purple-100'
                          }`}>
                            {output.outputType === 'costume' ? t('gallery.typeCostume') : t('gallery.typeGroupSelfie')}
                          </span>
                          {output.personName && (
                            <span className="text-xs text-neutral-400">
                              {output.personName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImageUrl && (
        <ImageViewerModal
          imageUrl={selectedImageUrl}
          onClose={() => setSelectedImageUrl(null)}
        />
      )}

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default GalleryPage;
