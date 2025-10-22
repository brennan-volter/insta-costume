import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ImageViewerModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ imageUrl, onClose }) => {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(0);

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

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Check if image is rotated 90 or 270 degrees (sideways)
  const isSideways = rotation === 90 || rotation === 270;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 pt-20 pb-24"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rotate button */}
        <button
          onClick={handleRotate}
          className="absolute -top-16 left-0 text-white hover:text-neutral-300 transition-colors z-10"
          title="Rotate image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 text-white hover:text-neutral-300 transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <img
            src={imageUrl}
            alt="Full size preview"
            className="object-contain rounded transition-all duration-300"
            style={{
              transform: `rotate(${rotation}deg)`,
              maxWidth: isSideways ? '100vh' : '100%',
              maxHeight: isSideways ? '100vw' : '100%',
            }}
          />
        </div>

        {/* Download button - Always visible */}
        <div className="mt-4 flex justify-center flex-shrink-0">
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
