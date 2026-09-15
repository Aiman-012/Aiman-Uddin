import { motion } from "motion/react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase
} from "react-icons/si";

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Supabase", icon: SiSupabase }
];

export default function TechMarquee() {
  // Duplicate the list so the loop appears seamless (translating to -50% perfectly matches the second set)
  const items = [...techStack, ...techStack];

  return (
    <section className="w-full overflow-hidden border-y border-neutral-200 dark:border-neutral-800 py-6 bg-white dark:bg-[#0a0a0a]">
      <div 
        className="w-full max-w-7xl mx-auto"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' 
        }}
      >
        <motion.div
          className="flex w-max gap-12 pr-12 cursor-default"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25, // Proportional duration for smooth constant-speed scroll
            ease: "linear",
            repeat: Infinity,
          }}
          // Note: Pausing Framer Motion's inline animate mid-flight using CSS `animation-play-state` 
          // or React state would break the translation interpolation. We keep the requested animate API.
        >
          {items.map((tech, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 grayscale transition-all duration-300 hover:grayscale-0 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <tech.icon size={18} />
              <span className="font-mono text-sm tracking-wide whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
