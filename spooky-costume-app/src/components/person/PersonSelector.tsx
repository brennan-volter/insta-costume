import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePersons } from '../../hooks/usePersons';
import type { Person } from '../../types';

interface PersonSelectorProps {
  selectedPersonId: string | null;
  onSelect: (person: Person | null) => void;
  onAddClick: () => void;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({
  selectedPersonId,
  onSelect,
  onAddClick,
}) => {
  const { t } = useTranslation();
  const { persons } = usePersons();

  if (persons.length === 0) {
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-200 mb-2">
          {t('people.selectPersonLabel')}
        </label>
        <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 rounded p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-neutral-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-neutral-400 font-medium mb-3">No selfies added yet</p>
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded transition-colors"
          >
            Add Your First Selfie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-200 mb-2">
        {t('people.selectPersonLabel')}
      </label>

      <div className="max-h-[400px] overflow-y-auto overflow-x-hidden rounded border-2 border-neutral-700 p-3 bg-neutral-900/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {persons.map((person) => {
            const isSelected = person.id === selectedPersonId;
            return (
              <button
                key={person.id}
                onClick={() => onSelect(isSelected ? null : person)}
                className={`relative bg-neutral-900 rounded p-2 transition-all group ${
                  isSelected
                    ? 'border-2 border-purple-600'
                    : 'border-2 border-neutral-700 hover:border-purple-600'
                }`}
              >
                <div className="aspect-square rounded overflow-hidden mb-2">
                  <img
                    src={person.photoBase64}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded shadow-lg">
                    ✓
                  </div>
                )}
                <p className="text-xs font-medium text-neutral-300 group-hover:text-purple-300 truncate">
                  {person.name}
                </p>
              </button>
            );
          })}

          {/* Add New Person Card */}
          <button
            onClick={onAddClick}
            className="relative bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-purple-600 rounded p-2 transition-all group flex flex-col items-center justify-center"
          >
            <div className="aspect-square rounded overflow-hidden mb-2 flex items-center justify-center">
              <svg className="w-12 h-12 text-neutral-600 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-xs font-medium text-neutral-500 group-hover:text-purple-300 transition-colors text-center">
              Add New
            </p>
          </button>
        </div>
      </div>

      {selectedPersonId && (
        <div className="mt-3">
          {persons.map((person) => {
            if (person.id === selectedPersonId) {
              return (
                <button
                  key={person.id}
                  onClick={() => onSelect(null)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
                >
                  <span>Selected: {person.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default PersonSelector;
