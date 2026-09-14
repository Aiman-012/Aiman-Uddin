import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profileData } from "../data/profile";

export default function ExperienceSection() {
  const experiences = profileData.experience;

  return (
    <section id="experience" className="py-32 border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase mb-4">Career</p>
          <h2 className="text-4xl sm:text-5xl font-bold">Experience</h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-[8.5rem] top-2 w-3 h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full z-10" />
              <div className="hidden md:block absolute left-[8.8rem] top-4 bottom-[-3rem] w-px bg-neutral-200 dark:border-neutral-800" />
              
              <div className="md:grid md:grid-cols-[130px_1fr] md:gap-16">
                <div className="font-mono text-sm text-neutral-500 mb-4 md:mb-0 md:pt-1">
                  {exp.duration}
                </div>
                
                <div className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-[#22242b] bg-neutral-50 dark:bg-[#0d0e12] p-8 transition-all hover:border-neutral-400 dark:hover:border-[#383b46] shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                        {exp.company} <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {exp.description}
                  </p>

                  <ul className="mb-8 space-y-3">
                    {exp.keyResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                        <span className="mr-3 mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800/50">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
