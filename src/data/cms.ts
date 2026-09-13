import { CmsData } from "../types";

export const cmsData: CmsData = {
  projects: [
    {
      id: "falcon-warriors",
      slug: "falcon-warriors",
      title: "FALCON WARRIORS",
      description: "High-impact esports and gaming platform featuring real-time team management and match scheduling.",
      longDescription: "A comprehensive web application designed for competitive gaming communities. FALCON WARRIORS features secure user authentication, robust team management, and real-time leaderboards wrapped in a responsive, esports-inspired modern UI.",
      tags: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
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
      id: "1",
      slug: "wavvy",
      title: "Wavvy",
      description: "Audio streaming & collaborative playlist curation platform with real-time waveform inspection.",
      longDescription: "Wavvy is a cutting-edge platform designed for audiophiles. It supports lossless audio streaming and visualizes tracks in real-time, allowing DJs and curators to perfectly sync their playlists.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Web Audio API"],
      version: "v1.4.0",
      demoUrl: "#",
      githubUrl: "#",
      stats: [
        { label: "Web Audio Buffer", value: "48kHz / 24bit" }
      ]
    },
    {
      id: "2",
      slug: "parcel-ease",
      title: "Parcel Ease",
      description: "Modern courier tracking and logistics management dashboard designed for ultra-low latency queries.",
      longDescription: "A fully custom logistics dashboard tailored for high-volume enterprise sorting centers. Handles thousands of concurrent socket connections for live tracking updates.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      status: "RT-SYNC",
      demoUrl: "#",
      githubUrl: "#",
      stats: [
        { label: "Route #9024", value: "Delivered: 99.4%" },
        { label: "Nodes Verified", value: "2,410 active" }
      ]
    },
    {
      id: "3",
      slug: "paws-elite",
      title: "PawsElite",
      description: "Boutique pet care booking and veterinary scheduling service with real-time calendar synchronization.",
      longDescription: "Integrated with robust IAM and PostgreSQL row-level security to ensure absolute privacy for client veterinary records.",
      tags: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
      status: "CONFIRMED",
      demoUrl: "#",
      githubUrl: "#",
      stats: [
        { label: "Auth Engine", value: "RLS Guarded" }
      ]
    },
    {
      id: "4",
      slug: "lahn",
      title: "Lahn",
      description: "Minimalist markdown publishing tool and CMS tailored specifically for technical writers and developers.",
      longDescription: "Built from the ground up prioritizing AST parsing speed over visual fluff. Easily compiles down to static HTML files with zero JavaScript overhead on the client.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Remark AST"],
      version: "UTF-8",
      demoUrl: "#",
      githubUrl: "#",
      stats: [
        { label: "Bundle Size", value: "< 14kB Gzipped" }
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
