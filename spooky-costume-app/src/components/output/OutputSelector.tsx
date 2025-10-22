import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useOutputHistory } from '../../hooks/useOutputHistory';
import type { CostumeOutput } from '../../types';

interface OutputSelectorProps {
  selectedOutputId: string | null;
  onSelect: (output: CostumeOutput | null) => void;
  label: string;
}

const OutputSelector: React.FC<OutputSelectorProps> = ({
  selectedOutputId,
  onSelect,
  label,
}) => {
  const { t } = useTranslation();
  const { outputs } = useOutputHistory();

  const selectedOutput = outputs.find((o) => o.id === selectedOutputId);

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-neutral-200">
        {label}
      </label>

      {outputs.length === 0 ? (
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
      ) : (
        <div>
          {/* Selected Output Display */}
          {selectedOutput ? (
            <div className="bg-neutral-900 border-2 border-purple-600 rounded p-4 mb-3">
              <div className="flex items-center gap-4">
                <img
                  src={selectedOutput.imageUrl}
                  alt={selectedOutput.costumeDescription}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-neutral-100 text-sm">
                    {selectedOutput.costumeDescription}
                  </h4>
                  {selectedOutput.personName && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {selectedOutput.personName}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500">
                    {new Date(selectedOutput.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onSelect(null)}
                  className="text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 rounded p-4 text-center mb-3">
              <p className="text-neutral-500 text-sm">{t('outputs.noOutputSelected')}</p>
            </div>
          )}

          {/* Output Grid */}
          {!selectedOutput && (
            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
              {outputs.map((output) => (
                <button
                  key={output.id}
                  onClick={() => onSelect(output)}
                  className="bg-neutral-900 border-2 border-neutral-700 hover:border-purple-600 rounded overflow-hidden transition-all group"
                >
                  <img
                    src={output.imageUrl}
                    alt={output.costumeDescription}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs font-medium text-neutral-300 group-hover:text-purple-300 truncate">
                      {output.costumeDescription}
                    </p>
                    {output.personName && (
                      <p className="text-xs text-neutral-500 truncate">
                        {output.personName}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputSelector;
