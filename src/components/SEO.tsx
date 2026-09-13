import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  type?: string;
  name?: string;
}

export default function SEO({ title, description, type = 'website', name = 'Aiman Uddin Siam' }: SEOProps) {
  const metaDescription = description || "Aiman Uddin Siam's developer portfolio showcasing projects, skills, and experience.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title} | {name}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ${name}`} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${name}`} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
}
