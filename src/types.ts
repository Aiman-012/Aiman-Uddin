export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  version?: string;
  status?: string;
  demoUrl?: string;
  githubUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  description: string;
}

export interface CmsData {
  projects: Project[];
  skills: Skill[];
}
