import { MetadataRoute } from 'next'
import { prisma } from '@/app/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const postUrls = posts.map((post) => ({
    url: `https://eizo-job.com/post/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://eizo-job.com',
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://eizo-job.com/jobs-list',
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://eizo-job.com/post',
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...postUrls,
  ]
}