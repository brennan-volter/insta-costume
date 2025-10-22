import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePersons } from '../../hooks/usePersons';

interface PersonManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonManager: React.FC<PersonManagerProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { persons, addPerson, deletePerson, syncStatus } = usePersons();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonPhoto, setNewPersonPhoto] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleAddPerson = () => {
    if (!newPersonName.trim() || !newPersonPhoto) return;

    addPerson(newPersonName.trim(), newPersonPhoto);
    setNewPersonName('');
    setNewPersonPhoto(null);
    setShowAddForm(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setNewPersonPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (personId: string) => {
    deletePerson(personId);
    setDeleteConfirmId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4">
      <div className="bg-neutral-800 rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-neutral-700">
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-neutral-700 flex items-center justify-between sticky top-0 z-10"
          style={{ background: 'var(--gradient-card)' }}
        >
          <div>
            <h2 className="font-display font-bold text-2xl text-neutral-100">
              {t('people.managerTitle')}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              {t('people.managerSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {syncStatus && (
              <span className={`text-xs px-2 py-1 rounded ${
                syncStatus === 'synced' ? 'bg-green-900/30 text-green-400' :
                syncStatus === 'syncing' ? 'bg-yellow-900/30 text-yellow-400' :
                syncStatus === 'error' ? 'bg-red-900/30 text-red-400' :
                'bg-neutral-700 text-neutral-400'
              }`}>
                {syncStatus === 'synced' && '✓ Synced'}
                {syncStatus === 'syncing' && '⟳ Syncing...'}
                {syncStatus === 'error' && '✗ Error'}
                {syncStatus === 'local' && 'Local'}
              </span>
            )}
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Person Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-4 px-6 rounded border-2 border-dashed border-neutral-600 hover:border-purple-500 text-neutral-400 hover:text-purple-300 transition-all font-display font-semibold mb-6"
            >
              + {t('people.addPersonButton')}
            </button>
          )}

          {/* Add Person Form */}
          {showAddForm && (
            <div className="bg-neutral-900 border border-neutral-700 rounded p-6 mb-6">
              <h3 className="font-display font-semibold text-lg text-neutral-100 mb-4">
                {t('people.addPersonTitle')}
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-neutral-200">
                  {t('people.nameLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  placeholder={t('people.namePlaceholder')}
                  className="w-full p-3 bg-neutral-800 border-2 border-neutral-700 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-neutral-200">
                  {t('people.photoLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full p-3 bg-neutral-800 border-2 border-neutral-700 text-neutral-200 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-neutral-100 hover:file:bg-purple-700"
                />
                {newPersonPhoto && (
                  <img
                    src={newPersonPhoto}
                    alt="Preview"
                    className="mt-3 max-w-xs max-h-48 rounded border-2 border-purple-600"
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddPerson}
                  disabled={!newPersonName.trim() || !newPersonPhoto}
                  className="flex-1 py-3 px-6 rounded font-display font-bold text-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    background: (!newPersonName.trim() || !newPersonPhoto) ? '#52525b' : 'var(--gradient-primary)',
                  }}
                >
                  {t('people.saveButton')}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewPersonName('');
                    setNewPersonPhoto(null);
                  }}
                  className="px-6 py-3 bg-neutral-700 text-neutral-200 rounded hover:bg-neutral-600 transition-colors font-display font-medium"
                >
                  {t('people.cancelButton')}
                </button>
              </div>
            </div>
          )}

          {/* People List */}
          {persons.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg font-medium">{t('people.emptyState')}</p>
              <p className="text-sm mt-1">{t('people.emptyStateSubtitle')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {persons.map((person) => (
                <div
                  key={person.id}
                  className="bg-neutral-900 border border-neutral-700 rounded p-4 hover:border-purple-600 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={person.photoBase64}
                      alt={person.name}
                      className="w-20 h-20 rounded object-cover border-2 border-neutral-700"
                    />
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-neutral-100 text-lg">
                        {person.name}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1">
                        {t('people.usedCount', { count: person.usageCount })}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {t('people.createdDate', { date: new Date(person.createdAt).toLocaleDateString() })}
                      </p>
                    </div>
                    <div>
                      {deleteConfirmId === person.id ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleDelete(person.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
                          >
                            {t('people.confirmDelete')}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded text-xs font-medium hover:bg-neutral-600"
                          >
                            {t('people.cancelButton')}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(person.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonManager;
