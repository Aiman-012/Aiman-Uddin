import { CmsData } from "../types";

export const cmsData: CmsData = {
   projects: [
    {
      id: "falcon-warriors",
      slug: "falcon-warriors",
      title: "FALCON WARRIORS",
      description: "High-impact esports and gaming platform featuring real-time team management and match scheduling.",
      longDescription: "A comprehensive web application designed for competitive gaming communities. FALCON WARRIORS features secure user authentication, robust team management, and real-time leaderboards wrapped in a responsive, esports-inspired modern UI.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
      version: "v1.0.0",
      status: "LIVE",
      demoUrl: "https://falcon-warriors.vercel.app",
      githubUrl: "https://github.com/Aiman03-del/FALCON-WARRIORS",
      stats: [
        { label: "Category", value: "Esports Platform" },
        { label: "Auth & DB", value: "Real-time sync" }
      ]
    },
    {
      id: "l-or-sombre",
      slug: "l-or-sombre",
      title: "L'OR SOMBRE",
      description: "Elegant dark-themed fashion & lifestyle showcase built with a premium, cinematic UI aesthetic.",
      longDescription: "L'OR SOMBRE is a visually rich frontend experience crafted for a luxury brand feel — combining smooth animations, moody color palettes, and refined typography to create an immersive browsing experience.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      version: "v1.0.0",
      status: "LIVE",
      demoUrl: "https://l-or-sombre.vercel.app",
      githubUrl: "https://github.com/Aiman03-del/L-OR-SOMBRE",
      stats: [
        { label: "Category", value: "Fashion / Lifestyle" },
        { label: "Design", value: "Cinematic UI" }
      ]
    },
    {
      id: "glowify",
      slug: "glowify",
      title: "Glowify",
      description: "Modern skincare & beauty e-commerce interface with a clean, glow-focused product presentation.",
      longDescription: "Glowify is a sleek storefront concept for a beauty and skincare brand, featuring product highlights, category browsing, and a bright, conversion-optimized UI layout.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      version: "v1.0.0",
      status: "LIVE",
      demoUrl: "https://glowify-phi.vercel.app",
      githubUrl: "https://github.com/Aiman03-del/Glowify",
      stats: [
        { label: "Category", value: "E-commerce" },
        { label: "Focus", value: "Beauty & Skincare" }
      ]
    },
    {
      id: "healers",
      slug: "healers",
      title: "Healers",
      description: "Healthcare-oriented platform connecting patients with medical support through a clean, trustworthy UI.",
      longDescription: "Healers is a healthcare service concept focused on accessibility and trust, offering a structured layout for patient information, appointment flow, and medical service discovery.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      version: "v1.0.0",
      status: "LIVE",
      demoUrl: "https://healers1.netlify.app",
      githubUrl: "https://github.com/Aiman03-del/Healers",
      stats: [
        { label: "Category", value: "Healthcare" },
        { label: "Hosting", value: "Netlify" }
      ]
    },
    {
      id: "noir-expresso",
      slug: "noir-expresso",
      title: "Noir Expresso",
      description: "Stylish coffee brand landing page with a dark, moody aesthetic and premium product showcase.",
      longDescription: "Noir Expresso is a coffee shop / brand website concept designed with a rich dark theme, warm accent tones, and elegant typography to reflect a premium coffee experience.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      version: "v1.0.0",
      status: "LIVE",
      demoUrl: "https://noir-expresso.vercel.app",
      githubUrl: "https://github.com/Aiman03-del/Noir-Expresso",
      stats: [
        { label: "Category", value: "Coffee / Brand" },
        { label: "Design", value: "Dark Aesthetic" }
      ]
    }
  ],
  skills: [
    { id: "s1", category: "FRONTEND FRAMEWORK", name: "Next.js", description: "Server-rendered React applications with optimal SEO." },
    { id: "s2", category: "UI LIBRARY", name: "React", description: "Component-based architecture and state management." },
    { id: "s3", category: "TYPE SAFETY", name: "TypeScript", description: "Strict typing for robust, scalable applications." },
    { id: "s4", category: "STYLING ENGINE", name: "Tailwind CSS", description: "Utility-first design system for rapid UI development." },
    { id: "s5", category: "BACKEND RUNTIME", name: "Node.js", description: "Asynchronous event-driven JavaScript runtime." },
    { id: "s6", category: "REST API LAYER", name: "Express", description: "Fast, unopinionated, minimalist web framework." },
    { id: "s7", category: "DOCUMENT STORE", name: "MongoDB", description: "NoSQL database for flexible data modeling." },
    { id: "s8", category: "BAAS & POSTGRES", name: "Supabase", description: "Open source Firebase alternative with Postgres." }
  ]
};

// Mock async fetch for CMS
export const fetchCmsData = async (): Promise<CmsData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cmsData), 400); // Simulate network latency
  });
};

export const fetchProjectBySlug = async (slug: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cmsData.projects.find(p => p.slug === slug) || null);
    }, 300);
  });
};
