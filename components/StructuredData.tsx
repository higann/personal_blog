interface StructuredDataProps {
  type: 'Person' | 'Article' | 'VideoObject'
  data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema) }}
    />
  )
}

