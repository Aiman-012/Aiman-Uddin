import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { profileData } from "../data/profile";
import WhatsAppForm from "../components/WhatsAppForm";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsShowcase from "../components/ProjectsShowcase";
import SEO from "../components/SEO";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiSupabase } from "react-icons/si";

const skillIcons: Record<string, React.ReactNode> = {
  "Next.js": <SiNextdotjs size={18} />,
  "React": <SiReact size={18} />,
  "TypeScript": <SiTypescript size={18} />,
  "Tailwind CSS": <SiTailwindcss size={18} />,
  "Node.js": <SiNodedotjs size={18} />,
  "Express": <SiExpress size={18} />,
  "MongoDB": <SiMongodb size={18} />,
  "Supabase": <SiSupabase size={18} />
};

export default function Home() {
  const data = profileData;

  return (
    <div className="w-full">
      <SEO title="Portfolio" description={data.bio} />
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 mb-8">
              <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-pulse" />
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Available for new opportunities</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Full-Stack Developer crafting clean web solutions.
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg leading-relaxed">
              I build robust, scalable, and human-centric web applications specializing in React, Next.js, TypeScript, and Node.js.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                className="bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 px-8 py-3.5 rounded-md font-medium hover:bg-neutral-800 dark:hover:bg-white transition-colors"
              >
                View Work
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3.5 rounded-md font-medium border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Developer Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full aspect-[4/3] lg:aspect-square bg-neutral-200/50 dark:bg-neutral-800/50 rounded-2xl relative overflow-hidden flex items-end justify-center pt-12 px-8 lg:pt-16 lg:px-12 border border-neutral-200 dark:border-neutral-800"
          >
             <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
             
             <img 
               src="/profile.png" 
               alt="Aiman Siam" 
               className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
             />

             <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/70 dark:bg-black/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-6 flex justify-between items-center">
                <div className="font-mono text-xs sm:text-sm font-bold tracking-wide">Aiman Uddin Siam</div>
                <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-right">SE & Architecture</div>
             </div>
          </motion.div>
        </div>
      </section>
      
      <ExperienceSection />
      
      <ProjectsShowcase />

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32 border-t border-neutral-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase mb-4">Capability</p>
              <h2 className="text-4xl sm:text-5xl font-bold">Tech Stack</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
              Core toolchain, environments, and languages leveraged across modern production stacks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(data.skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50 dark:bg-neutral-950 flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <h3 className="text-sm font-mono tracking-widest text-neutral-500 uppercase mb-6">{category}</h3>
                <ul className="space-y-4">
                  {items.map(skill => (
                    <li key={skill} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 shadow-sm transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                        {skillIcons[skill] || <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-[2px]" />}
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 bg-white dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-10 sm:p-16 lg:p-24 bg-neutral-50 dark:bg-neutral-950"
          >
            <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase mb-6">Communication</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-2xl leading-[1.1] mb-6">
              Let's build something clean together.
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
              Open for full-time engineering positions, contract architecture, or tech consultations.
            </p>
            
            <WhatsAppForm />

            <div className="mt-16 flex flex-wrap gap-8 text-sm font-mono text-neutral-500">
              <a href="https://github.com/Aiman03-del" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">GitHub →</a>
              <a href="https://www.linkedin.com/in/aiman-uddin-721011204" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">LinkedIn →</a>
              <a href="https://x.com/au_siaam" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Twitter / X →</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
