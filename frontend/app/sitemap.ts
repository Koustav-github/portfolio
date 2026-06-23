import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://koustav-manna.dev'
  const lastModified = new Date()

  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/webdev', priority: 0.8 },
    { path: '/blockchain', priority: 0.8 },
    { path: '/agentic-ai', priority: 0.8 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }))
}
