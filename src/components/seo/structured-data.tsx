import React from 'react';

interface StructuredDataProps {
  data?: Record<string, any>;
  type?: 'WebSite' | 'Organization' | 'Article' | 'Person' | 'Product';
}

const StructuredData: React.FC<StructuredDataProps> = ({ data, type = 'WebSite' }) => {
  if (!data) {
    return null;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;
