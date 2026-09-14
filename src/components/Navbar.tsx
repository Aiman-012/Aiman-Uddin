import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../lib/utils";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Projects", path: "/#projects" },
    { name: "Skills", path: "/#skills" },
    { name: "Contact", path: "/#contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-display font-bold text-lg leading-none tracking-tight">Aiman Uddin</span>
          <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase mt-1">Full-Stack Dev</span>
        </Link>

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

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {import.meta.env.VITE_RESUME_URL && (
            <button 
              onClick={() => window.dispatchEvent(new Event('open-resume-modal'))}
              className="hidden sm:inline-flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-md px-4 py-2 text-xs font-mono tracking-wide text-neutral-900 dark:text-neutral-100 transition-colors cursor-pointer"
            >
              Resume
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
