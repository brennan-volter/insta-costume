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

      {/* Person Carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: 'thin' }}>
        {persons.map((person) => {
          const isSelected = person.id === selectedPersonId;
          return (
            <button
              key={person.id}
              onClick={() => onSelect(isSelected ? null : person)}
              className={`flex-shrink-0 w-24 bg-neutral-900 rounded p-2 transition-all group ${
                isSelected
                  ? 'border-2 border-purple-600'
                  : 'border-2 border-neutral-700 hover:border-purple-600'
              }`}
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
          );
        })}

        {/* Add New Person Card */}
        <button
          onClick={onManageClick}
          className="flex-shrink-0 w-24 bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-purple-600 rounded p-2 transition-all flex flex-col items-center justify-center gap-2"
        >
          <div className="w-full aspect-square flex items-center justify-center">
            <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-xs font-medium text-neutral-500 text-center">
            Add New
          </p>
        </button>
      </div>
    </div>
  );
};

export default PersonSelector;
