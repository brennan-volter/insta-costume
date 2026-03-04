import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePersons } from '../../hooks/usePersons';

interface AddPersonFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addPerson } = usePersons();

  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonPhoto, setNewPersonPhoto] = useState<string | null>(null);

  const handleAddPerson = () => {
    if (!newPersonName.trim() || !newPersonPhoto) return;

    addPerson(newPersonName.trim(), newPersonPhoto);

    // Reset form and close
    setNewPersonName('');
    setNewPersonPhoto(null);
    onClose();
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

  const handleCancel = () => {
    setNewPersonName('');
    setNewPersonPhoto(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4">
      <div className="bg-neutral-800 rounded-md max-w-md w-full border border-neutral-700">
        {/* Header */}
        <div
          className="px-6 py-4 border-b border-neutral-700 flex items-center justify-between"
          style={{ background: 'var(--gradient-card)' }}
        >
          <div>
            <h2 className="font-display font-bold text-2xl text-neutral-100">
              {t('people.addPersonTitle')}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Upload a selfie and add a name
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-neutral-200">
              {t('people.nameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              placeholder={t('people.namePlaceholder')}
              className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 placeholder-neutral-500 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-neutral-200">
              {t('people.photoLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-3 bg-neutral-700 border-2 border-neutral-600 text-neutral-200 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-neutral-100 hover:file:bg-purple-700"
            />
            <div className="mt-2 p-3 bg-purple-950/30 border border-purple-600/40 rounded">
              <div className="flex gap-2">
                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-purple-300">
                  <strong>Tip:</strong> Selfies with clear lighting and a direct view of facial features produce the best results. Avoid shadows, sunglasses, or obstructions.
                </p>
              </div>
            </div>
            {newPersonPhoto && (
              <div className="mt-3 flex justify-center">
                <img
                  src={newPersonPhoto}
                  alt="Preview"
                  className="max-w-xs max-h-48 rounded border-2 border-purple-600"
                />
              </div>
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
              onClick={handleCancel}
              className="px-6 py-3 bg-neutral-700 text-neutral-200 rounded hover:bg-neutral-600 transition-colors font-display font-medium"
            >
              {t('people.cancelButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonForm;
