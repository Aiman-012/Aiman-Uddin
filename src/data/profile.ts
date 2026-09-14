export const profileData = {
  personal: {
    name: "Aiman Uddin Siam",
    role: "Full-Stack Software Engineer",
    bio: "I build robust, scalable, and human-centric web applications specializing in React, Next.js, TypeScript, and Node.js. Passionate about clean architecture and high-performance UI/UX.",
    portfolioUrl: "https://ausiaam.netlify.app",
    githubUrl: "https://github.com/Aiman03-del",
    linkedinUrl: "https://www.linkedin.com/in/aiman-uddin-721011204",
    twitterUrl: "https://x.com/au_siaam"
  },
  experience: [
    {
      id: "avihire-internship",
      company: "Growthly IT (Client: AviHire)",
      companyUrl: "https://avihire.co",
      role: "Full-Stack / Frontend Engineering Intern",
      duration: "2025 - Present",
      location: "Remote",
      description: "Contributed to the development of a specialized U.S.-based aviation recruitment platform connecting FAA-certified professionals with employers.",
      keyResponsibilities: [
        "Architected and implemented responsive user interfaces using Next.js and Tailwind CSS for the core job board and employer ATS dashboard.",
        "Integrated robust data-fetching strategies, enabling real-time applicant tracking, direct messaging, and secure FAA certification verification workflows.",
        "Optimized frontend performance and accessibility to handle high-volume traffic of verified aviation professionals securely."
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]
    }
  ],
  projects: [
    {
      id: "falcon-warriors",
      title: "FALCON WARRIORS",
      category: "Web Application / Esports",
      shortDescription: "High-impact esports and gaming platform featuring real-time team management and match scheduling.",
      fullDescription: "A comprehensive web application designed for competitive gaming communities. FALCON WARRIORS features secure user authentication, robust team management, and real-time leaderboards wrapped in a responsive, esports-inspired modern UI.",
      techStack: ["React/Next.js", "Tailwind CSS", "Node.js", "MongoDB", "TypeScript"],
      githubUrl: "https://github.com/Aiman03-del/FALCON-WARRIORS",
      demoUrl: "https://falcon-warriors.vercel.app"
    },
    {
      id: "wavvy",
      title: "Wavvy",
      category: "Audio Streaming",
      shortDescription: "Audio streaming & collaborative playlist curation platform with real-time waveform inspection.",
      fullDescription: "Wavvy is a cutting-edge platform designed for audiophiles. It supports lossless audio streaming and visualizes tracks in real-time, allowing DJs and curators to perfectly sync their playlists.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Web Audio API"],
      githubUrl: "https://github.com/Aiman03-del/wavvy",
      demoUrl: "https://wavvy.vercel.app"
    },
    {
      id: "parcel-ease",
      title: "Parcel Ease",
      category: "Logistics Dashboard",
      shortDescription: "Modern courier tracking and logistics management dashboard designed for ultra-low latency queries.",
      fullDescription: "A fully custom logistics dashboard tailored for high-volume enterprise sorting centers. Handles thousands of concurrent socket connections for live tracking updates.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/Aiman03-del/parcel-ease",
      demoUrl: "https://parcel-ease.vercel.app"
    },
    {
      id: "pawselite",
      title: "PawsElite",
      category: "SaaS Booking Platform",
      shortDescription: "Boutique pet care booking and veterinary scheduling service with real-time calendar synchronization.",
      fullDescription: "Integrated with robust IAM and PostgreSQL row-level security to ensure absolute privacy for client veterinary records.",
      techStack: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
      githubUrl: "https://github.com/Aiman03-del/pawselite",
      demoUrl: "https://pawselite.vercel.app"
    },
    {
      id: "lahn",
      title: "Lahn",
      category: "Developer Tooling",
      shortDescription: "Minimalist markdown publishing tool and CMS tailored specifically for technical writers and developers.",
      fullDescription: "Built from the ground up prioritizing AST parsing speed over visual fluff. Easily compiles down to static HTML files with zero JavaScript overhead on the client.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Remark AST"],
      githubUrl: "https://github.com/Aiman03-del/lahn",
      demoUrl: "https://lahn.vercel.app"
    }
  ],
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "REST APIs", "GraphQL"],
    database: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
    tools: ["Git", "GitHub", "Vite", "Figma", "Postman"]
  }
};
