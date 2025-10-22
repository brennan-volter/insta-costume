import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePersons } from '../../hooks/usePersons';
import type { Person } from '../../types';

interface PersonSelectorProps {
  selectedPersonId: string | null;
  onSelect: (person: Person | null) => void;
  onManageClick: () => void;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({
  selectedPersonId,
  onSelect,
  onManageClick,
}) => {
  const { t } = useTranslation();
  const { persons } = usePersons();

  const selectedPerson = persons.find((p) => p.id === selectedPersonId);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-neutral-200">
          {t('people.selectPersonLabel')}
        </label>
        <button
          onClick={onManageClick}
          className="text-xs text-purple-400 hover:text-purple-300 font-medium"
        >
          {t('people.manageButton')}
        </button>
      </div>

      {persons.length === 0 ? (
        <div className="bg-neutral-900 border-2 border-dashed border-neutral-700 rounded p-6 text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-neutral-400 text-sm mb-3">{t('people.noPeopleYet')}</p>
          <button
            onClick={onManageClick}
            className="text-sm px-4 py-2 rounded font-medium transition-all"
            style={{ background: 'var(--gradient-primary)', color: 'white' }}
          >
            {t('people.addFirstPerson')}
          </button>
        </div>
      ) : (
        <div>
          {/* Selected Person Display */}
          {selectedPerson ? (
            <div className="bg-neutral-900 border-2 border-purple-600 rounded p-4 mb-3">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPerson.photoBase64}
                  alt={selectedPerson.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-display font-semibold text-neutral-100">
                    {selectedPerson.name}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {t('people.usedCount', { count: selectedPerson.usageCount })}
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
              <p className="text-neutral-500 text-sm">{t('people.noPersonSelected')}</p>
            </div>
          )}

          {/* Person Grid */}
          {!selectedPerson && (
            <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
              {persons.map((person) => (
                <button
                  key={person.id}
                  onClick={() => onSelect(person)}
                  className="bg-neutral-900 border-2 border-neutral-700 hover:border-purple-600 rounded p-3 transition-all group"
                >
                  <img
                    src={person.photoBase64}
                    alt={person.name}
                    className="w-full aspect-square object-cover rounded mb-2"
                  />
                  <p className="text-xs font-medium text-neutral-300 group-hover:text-purple-300 truncate">
                    {person.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonSelector;
