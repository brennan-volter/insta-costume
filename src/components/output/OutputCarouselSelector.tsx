import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useOutputHistory } from '../../hooks/useOutputHistory';
import type { CostumeOutput } from '../../types';

interface OutputCarouselSelectorProps {
  selectedOutput: CostumeOutput | null;
  onSelect: (output: CostumeOutput | null) => void;
  label: string;
  excludeOutputId?: string; // To prevent selecting the same output twice
}

const OutputCarouselSelector: React.FC<OutputCarouselSelectorProps> = ({
  selectedOutput,
  onSelect,
  label,
  excludeOutputId,
}) => {
  const { t } = useTranslation();
  const { getOutputsByType } = useOutputHistory();

  // Get only costume outputs (not group selfies)
  const costumeOutputs = getOutputsByType('costume');

  // Filter out the excluded output
  const availableOutputs = excludeOutputId
    ? costumeOutputs.filter((output) => output.id !== excludeOutputId)
    : costumeOutputs;

  if (availableOutputs.length === 0) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2 text-neutral-200">
          {label}
        </label>
        <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 rounded p-6 text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-neutral-400 text-sm mb-3">{t('outputs.noOutputsYet')}</p>
          <Link
            to="/app"
            className="inline-block text-sm px-4 py-2 rounded font-medium transition-all"
            style={{ background: 'var(--gradient-primary)', color: 'white' }}
          >
            {t('outputs.createFirstOutput')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-neutral-200">
        {label}
      </label>

      {/* Carousel */}
      <div className="bg-neutral-900 border-2 border-neutral-700 rounded p-3">
        <p className="text-xs text-neutral-400 mb-2">
          {selectedOutput ? t('outputs.selectDifferent') : t('outputs.selectFromPrevious')}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-neutral-800">
          {availableOutputs.map((output) => {
            const isSelected = selectedOutput?.id === output.id;
            return (
              <div
                key={output.id}
                className="relative flex-shrink-0"
              >
                <button
                  onClick={() => !isSelected && onSelect(output)}
                  disabled={isSelected}
                  className={`w-24 h-24 rounded overflow-hidden border-2 transition-all ${
                    isSelected
                      ? 'border-purple-600 cursor-default'
                      : 'border-neutral-700 hover:border-purple-500'
                  }`}
                >
                  <img
                    src={output.imageSrc}
                    alt={output.costumeDescription}
                    className="w-full h-full object-contain bg-neutral-900"
                  />
                </button>
                {isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(null);
                    }}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 transition-colors shadow-lg"
                    aria-label="Deselect"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {availableOutputs.length > 5 && (
          <p className="text-xs text-neutral-500 mt-2">
            ← {t('outputs.scrollToSeeMore')} →
          </p>
        )}
      </div>
    </div>
  );
};

export default OutputCarouselSelector;
