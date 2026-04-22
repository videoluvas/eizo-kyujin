import { prisma } from "@/app/lib/prisma";

const SELECT_FIELDS = {
  slug: true,
  title: true,
  thumbnail: true,
  category: true,
  publishedAt: true,
};

export type RelatedPost = {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  publishedAt: Date | null;
};

async function fetchTiered(
  post: { slug: string; category: string },
  finder: {
    findMany: (args: {
      where: object;
      orderBy: object;
      take: number;
      select: typeof SELECT_FIELDS;
    }) => Promise<RelatedPost[]>;
  },
  count: number
): Promise<RelatedPost[]> {
  const excludeSlugs = [post.slug];

  const currentCategory = await prisma.category.findFirst({
    where: { name: post.category },
    select: { relatedGroup: true },
  });

  // ① 同カテゴリ
  const tier1 = await finder.findMany({
    where: { published: true, category: post.category, NOT: { slug: { in: excludeSlugs } } },
    orderBy: { createdAt: "desc" },
    take: count,
    select: SELECT_FIELDS,
  });

  if (tier1.length >= count) return tier1.slice(0, count);
  excludeSlugs.push(...tier1.map((p) => p.slug));

  // ② 同じrelatedGroup
  let tier2: RelatedPost[] = [];
  if (currentCategory?.relatedGroup) {
    const relatedCategories = await prisma.category.findMany({
      where: { relatedGroup: currentCategory.relatedGroup, NOT: { name: post.category } },
      select: { name: true },
    });
    const relatedNames = relatedCategories.map((c) => c.name);

    if (relatedNames.length > 0) {
      tier2 = await finder.findMany({
        where: { published: true, category: { in: relatedNames }, NOT: { slug: { in: excludeSlugs } } },
        orderBy: { createdAt: "desc" },
        take: count - tier1.length,
        select: SELECT_FIELDS,
      });
    }
  }

  if (tier1.length + tier2.length >= count) return [...tier1, ...tier2];
  excludeSlugs.push(...tier2.map((p) => p.slug));

  // ③ ランダムフォールバック
  const tier3pool = await finder.findMany({
    where: { published: true, NOT: { slug: { in: excludeSlugs } } },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: SELECT_FIELDS,
  });
  const tier3 = tier3pool
    .sort(() => Math.random() - 0.5)
    .slice(0, count - tier1.length - tier2.length);

  return [...tier1, ...tier2, ...tier3];
}

export async function getRelatedPosts(
  post: { slug: string; category: string },
  count = 3
): Promise<RelatedPost[]> {
  return fetchTiered(post, prisma.post, count);
}

export async function getRelatedSidejobPosts(
  post: { slug: string; category: string },
  count = 3
): Promise<RelatedPost[]> {
  return fetchTiered(post, prisma.postSidejob, count);
}