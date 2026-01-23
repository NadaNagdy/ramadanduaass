interface StructuredDataProps {
  type: 'WebPage' | 'Article' | 'FAQPage';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
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
