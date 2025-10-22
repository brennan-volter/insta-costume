import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOutputHistory } from '../../hooks/useOutputHistory';
import type { CostumeOutput } from '../../types';

interface OutputGridDualSelectorProps {
  selectedOutput1: CostumeOutput | null;
  selectedOutput2: CostumeOutput | null;
  onSelect1: (output: CostumeOutput | null) => void;
  onSelect2: (output: CostumeOutput | null) => void;
}

const OutputGridDualSelector: React.FC<OutputGridDualSelectorProps> = ({
  selectedOutput1,
  selectedOutput2,
  onSelect1,
  onSelect2,
}) => {
  const { t } = useTranslation();
  const { outputsForSelection } = useOutputHistory();

  // Filter to only costume outputs
  const costumeOutputs = outputsForSelection.filter((output) => output.outputType === 'costume');

  if (costumeOutputs.length === 0) {
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          Select two portraits to combine into a group selfie
        </label>
        <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 rounded p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-neutral-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-neutral-400 font-medium mb-2">{t('outputs.noOutputsYet')}</p>
          <Link
            to="/app"
            className="text-sm text-purple-400 hover:text-purple-300 underline transition-colors"
          >
            {t('outputs.createFirstOutput')}
          </Link>
        </div>
      </div>
    );
  }

  const handleOutputClick = (output: CostumeOutput) => {
    // If clicking on an already selected output, deselect it
    if (selectedOutput1?.id === output.id) {
      onSelect1(null);
      return;
    }
    if (selectedOutput2?.id === output.id) {
      onSelect2(null);
      return;
    }

    // Select to the first empty slot, or replace person 1
    if (!selectedOutput1) {
      onSelect1(output);
    } else if (!selectedOutput2) {
      onSelect2(output);
    } else {
      // Both slots filled, replace person 1
      onSelect1(output);
    }
  };

  const getBorderClass = (output: CostumeOutput) => {
    if (selectedOutput1?.id === output.id) {
      return 'border-2 border-purple-600';
    }
    if (selectedOutput2?.id === output.id) {
      return 'border-2 border-orange-600';
    }
    return 'border-2 border-neutral-700 hover:border-purple-600';
  };

  const getBadge = (output: CostumeOutput) => {
    if (selectedOutput1?.id === output.id) {
      return (
        <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded shadow-lg">
          1
        </div>
      );
    }
    if (selectedOutput2?.id === output.id) {
      return (
        <div className="absolute top-2 right-2 px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded shadow-lg">
          2
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-200 mb-2">
        Select two portraits to combine into a group selfie
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {costumeOutputs.map((output) => (
          <button
            key={output.id}
            onClick={() => handleOutputClick(output)}
            className={`relative bg-neutral-900 rounded p-2 transition-all group ${getBorderClass(output)}`}
          >
            <div className="aspect-square rounded overflow-hidden mb-2">
              <img
                src={output.imageUrl}
                alt={output.costumeDescription}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {getBadge(output)}
            {output.personName && (
              <p className="text-xs font-medium text-neutral-300 group-hover:text-purple-300 truncate">
                {output.personName}
              </p>
            )}
          </button>
        ))}

        {/* Add New Portrait Card */}
        <Link
          to="/app"
          className="relative bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-purple-600 rounded p-2 transition-all group flex flex-col items-center justify-center"
        >
          <div className="aspect-square rounded overflow-hidden mb-2 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-xs font-medium text-neutral-500 group-hover:text-purple-300 transition-colors text-center">
            Add Portrait
          </p>
        </Link>
      </div>

      {(selectedOutput1 || selectedOutput2) && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {selectedOutput1 && (
            <button
              onClick={() => onSelect1(null)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            >
              <span>Person 1: {selectedOutput1.personName || 'Portrait'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {selectedOutput2 && (
            <button
              onClick={() => onSelect2(null)}
              className="px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            >
              <span>Person 2: {selectedOutput2.personName || 'Portrait'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputGridDualSelector;
