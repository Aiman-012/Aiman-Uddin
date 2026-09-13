export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-neutral-500 dark:text-neutral-500">
          © {currentYear} Aiman Uddin Siam. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-medium">
          <a href="https://github.com/Aiman03-del" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/aiman-uddin-721011204" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">LinkedIn</a>
          <a href="https://x.com/au_siaam" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">Twitter / X</a>
        </div>
      </div>
    </footer>
  );
}
