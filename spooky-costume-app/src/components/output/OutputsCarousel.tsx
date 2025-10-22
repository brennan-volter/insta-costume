import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutputHistory } from '../../hooks/useOutputHistory';
import ImageViewerModal from './ImageViewerModal';

interface OutputsCarouselProps {
  outputType?: 'costume' | 'group_selfie';
  title?: string;
}

const OutputsCarousel: React.FC<OutputsCarouselProps> = ({ outputType, title }) => {
  const { t } = useTranslation();
  const { outputs, getOutputsByType } = useOutputHistory();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Filter by type if specified, otherwise show all
  const filteredOutputs = outputType ? getOutputsByType(outputType) : outputs;

  if (filteredOutputs.length === 0) {
    return null;
  }

  const displayTitle = title || t('outputs.previousGenerations');

  return (
    <>
      <div
        className="mt-6 p-4 rounded border border-purple-900"
        style={{ background: 'var(--gradient-card)' }}
      >
        <h3 className="font-display font-semibold text-sm text-purple-200 mb-3">
          {displayTitle}
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-neutral-800">
          {filteredOutputs.slice(0, 10).map((output) => (
            <button
              key={output.id}
              onClick={() => setSelectedImageUrl(output.imageUrl)}
              className="flex-shrink-0 w-24 h-24 rounded overflow-hidden border-2 border-neutral-700 hover:border-purple-500 transition-all"
            >
              <img
                src={output.imageUrl}
                alt={output.costumeDescription}
                className="w-full h-full object-contain bg-neutral-900"
              />
            </button>
          ))}
        </div>
        {filteredOutputs.length > 10 && (
          <p className="text-xs text-neutral-400 mt-2">
            {t('outputs.showingRecent', { count: 10, total: filteredOutputs.length })}
          </p>
        )}
      </div>

      {selectedImageUrl && (
        <ImageViewerModal
          imageUrl={selectedImageUrl}
          onClose={() => setSelectedImageUrl(null)}
        />
      )}
    </>
  );
};

export default OutputsCarousel;
