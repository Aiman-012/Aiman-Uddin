import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const links = [
    { name: "Projects", path: "/#projects" },
    { name: "Skills", path: "/#skills" },
    { name: "Contact", path: "/#contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col z-50 relative">
          <span className="font-display font-bold text-lg leading-none tracking-tight">Aiman Uddin</span>
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Full-Stack Dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.path} 
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4 z-50 relative">
          <ThemeToggle />
          {import.meta.env.VITE_RESUME_URL && (
            <button 
              onClick={() => window.dispatchEvent(new Event('open-resume-modal'))}
              className="hidden sm:inline-flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-md px-4 py-2 text-xs font-mono tracking-wide text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
            >
              Resume
            </button>
          )}
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-xl md:hidden flex flex-col p-6 gap-6"
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            {import.meta.env.VITE_RESUME_URL && (
              <button 
                onClick={() => {
                  window.dispatchEvent(new Event('open-resume-modal'));
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex w-full sm:hidden items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-md px-4 py-3 text-sm font-mono tracking-wide text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
              >
                Resume
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
