import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { profileData } from "../data/profile";
import SEO from "../components/SEO";

export default function AllProjects() {
  const projects = profileData.projects;

  return (
    <div className="w-full">
      <SEO title="All Projects" description="A complete list of my web applications, enterprise integrations, and selected works." name="Aiman Uddin" />
      
      <section className="py-20 md:py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <p className="font-mono text-xs text-neutral-500 tracking-widest uppercase mb-4">Portfolio Archive</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">All Projects</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              A complete collection of my work, ranging from client projects and freelance work to personal experiments and enterprise applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-2xl border border-neutral-200 dark:border-[#22242b] bg-neutral-50 dark:bg-[#0d0e12] p-8 transition-all hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-[#383b46] hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-900 dark:bg-emerald-500" />
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Live</span>
                  </div>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.fullDescription}
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 border-t border-neutral-200 dark:border-neutral-800/50 pt-6 text-sm font-medium">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { url: project.demoUrl, title: project.title } }));
                    }}
                    className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 transition-colors hover:text-neutral-900 dark:hover:text-white"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </button>
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      <Github size={16} /> GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
