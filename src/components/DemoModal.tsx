import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Loader2, RefreshCw, Link, Check } from 'lucide-react';

export default function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [demoUrl, setDemoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{url: string, title?: string}>;
      setDemoUrl(customEvent.detail.url);
      setTitle(customEvent.detail.title || 'Live Demo');
      setIsLoading(true);
      setReloadKey(prev => prev + 1);
      setIsOpen(true);
      setIsCopied(false);
    };
    window.addEventListener('open-demo-modal', handleOpen);
    return () => window.removeEventListener('open-demo-modal', handleOpen);
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

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setDemoUrl('');
    }, 300); // clear after animation
  }

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey(prev => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(demoUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[1400px] h-[90vh] bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0d0e12]">
              <div className="flex items-center gap-4">
                <h2 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-50 truncate max-w-[200px] sm:max-w-md">{title}</h2>
                <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">Live Preview</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReload}
                  title="Reload Preview"
                  className="hidden sm:flex items-center justify-center p-2 px-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                </button>
                <button 
                  onClick={handleCopy}
                  title="Copy Link"
                  className="hidden sm:flex items-center justify-center p-2 px-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 w-[42px]"
                >
                  {isCopied ? <Check size={14} className="text-emerald-500" /> : <Link size={14} />}
                </button>
                <a 
                  href={demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 p-2 px-4 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  Open in new tab <ExternalLink size={14} />
                </a>
                <button 
                  onClick={handleClose}
                  className="p-2 sm:p-2.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Iframe Container */}
            <div className="relative flex-1 w-full bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
              <AnimatePresence>
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] z-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-neutral-100 dark:border-neutral-900 rounded-full"></div>
                      <div className="absolute w-16 h-16 border-4 border-neutral-900 dark:border-neutral-100 rounded-full border-t-transparent dark:border-t-transparent animate-spin"></div>
                      <Loader2 className="absolute text-neutral-400 dark:text-neutral-500 animate-pulse" size={24} />
                    </div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6 font-mono text-sm tracking-widest text-neutral-500 dark:text-neutral-400 uppercase"
                    >
                      Loading Interface...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {demoUrl && (
                <iframe 
                  key={reloadKey}
                  src={demoUrl}
                  onLoad={() => setIsLoading(false)}
                  className="w-full h-full border-0"
                  title="Project Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
