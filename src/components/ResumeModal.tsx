import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const resumeUrl = import.meta.env.VITE_RESUME_URL;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume-modal', handleOpen);
    return () => window.removeEventListener('open-resume-modal', handleOpen);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!resumeUrl) return null;

  // Convert Google Drive /view to /preview for better iframe embedding
  let embedUrl = resumeUrl;
  if (resumeUrl.includes('drive.google.com') && resumeUrl.includes('/view')) {
    embedUrl = resumeUrl.replace('/view', '/preview');
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="font-display font-semibold text-lg text-neutral-900 dark:text-neutral-50">Resume</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 w-full bg-neutral-100 dark:bg-neutral-950">
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                title="Resume PDF"
                allow="autoplay"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
