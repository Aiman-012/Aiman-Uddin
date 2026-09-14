import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjectBySlug } from "../data/cms";
import { Project } from "../types";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchProjectBySlug(slug).then((res) => {
        setProject(res as Project);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <SEO title="Loading..." />
        <div className="w-6 h-6 border-2 border-neutral-900 dark:border-neutral-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <SEO title="Project Not Found" />
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 font-mono text-sm underline underline-offset-4">Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto px-6 pt-24 pb-40"
    >
      <SEO title={project.title} description={project.description} name="Aiman Uddin" />
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-16">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">{project.title}</h1>
      
      <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-16 max-w-2xl">
        {project.description}
      </p>

      {/* Visual Header Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full aspect-video rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-16 flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <span className="font-mono text-sm text-neutral-400 dark:text-neutral-600">Visual Assets Placeholder</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-neutral-200 dark:border-neutral-800 pt-16"
      >
        <div className="md:col-span-2 prose prose-neutral dark:prose-invert">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4">Links</h3>
            <div className="flex flex-col gap-3 font-mono text-sm">
              {project.demoUrl && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-demo-modal', { detail: { url: project.demoUrl, title: project.title } }));
                  }}
                  className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors text-left"
                >
                  Live Demo ↗
                </button>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">GitHub Repository ↗</a>
              )}
            </div>
          </div>
          
          {project.stats && (
            <div>
              <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-4">Key Metrics</h3>
              <div className="flex flex-col gap-4">
                {project.stats.map(stat => (
                  <div key={stat.label} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
                    <div className="text-xs font-mono text-neutral-500 mb-1">{stat.label}</div>
                    <div className="font-medium">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
