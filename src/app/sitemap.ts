import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mmiboost.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/formules`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]
}
