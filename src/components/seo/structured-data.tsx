interface StructuredDataProps {
  data?: Record<string, any>;
  type?: 'WebSite' | 'Organization' | 'Article' | 'Person' | 'Product';
}

export default function StructuredData({
  data,
  type = 'WebSite',
}: StructuredDataProps) {
  if (!data) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
