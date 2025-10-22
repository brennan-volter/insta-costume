import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ImageViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ imageUrl, onClose }) => {
  const { t } = useTranslation();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-neutral-300 transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt="Full size preview"
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>

        {/* Download button - Always visible */}
        <div className="mt-4 flex justify-center">
          <a
            href={imageUrl}
            download="costume-portrait.jpg"
            className="px-6 py-3 rounded font-display font-bold text-neutral-100 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--shadow-glow-purple)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('workflow.downloadButton')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
