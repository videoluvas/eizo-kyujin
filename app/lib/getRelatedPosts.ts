import { prisma } from "@/app/lib/prisma";

export type RelatedPost = {
  slug: string;
  title: string;
  thumbnail: string;
  category: string;
  publishedAt: Date | null;
  type: "post" | "sidejob";
};

const POST_SELECT = {
  slug: true,
  title: true,
  thumbnail: true,
  category: true,
  publishedAt: true,
};

export async function getRelatedPosts(
  post: { slug: string; category: string },
  count = 3
): Promise<RelatedPost[]> {
  const excludeSlugs = [post.slug];
  const result: RelatedPost[] = [];

  const currentCategory = await prisma.category.findFirst({
    where: { name: post.category },
    select: { relatedGroup: true },
  });

  // ① 同カテゴリのpostSidejob
  const tier1 = await prisma.postSidejob.findMany({
    where: { published: true, category: post.category, NOT: { slug: { in: excludeSlugs } } },
    orderBy: { createdAt: "desc" },
    take: count,
    select: POST_SELECT,
  });
  result.push(...tier1.map((p) => ({ ...p, type: "sidejob" as const })));
  excludeSlugs.push(...tier1.map((p) => p.slug));
  if (result.length >= count) return result.slice(0, count);

  // ② 同カテゴリのpost
  const tier2 = await prisma.post.findMany({
    where: { published: true, category: post.category, NOT: { slug: { in: excludeSlugs } } },
    orderBy: { createdAt: "desc" },
    take: count - result.length,
    select: POST_SELECT,
  });
  result.push(...tier2.map((p) => ({ ...p, type: "post" as const })));
  excludeSlugs.push(...tier2.map((p) => p.slug));
  if (result.length >= count) return result.slice(0, count);

  // ③ relatedGroupのpostSidejob + post
  if (currentCategory?.relatedGroup) {
    const relatedCategories = await prisma.category.findMany({
      where: {
        relatedGroup: currentCategory.relatedGroup,
        NOT: { name: post.category },
      },
      select: { name: true },
    });
    const relatedNames = relatedCategories.map((c) => c.name);

        if (relatedNames.length > 0) {
      const need = count - result.length;
      const [tier3sidejob, tier3post] = await Promise.all([
        prisma.postSidejob.findMany({
          where: { published: true, category: { in: relatedNames }, NOT: { slug: { in: excludeSlugs } } },
          orderBy: { createdAt: "desc" },
          take: need * 2, // 多めに取ってシャッフル
          select: POST_SELECT,
        }),
        prisma.post.findMany({
          where: { published: true, category: { in: relatedNames }, NOT: { slug: { in: excludeSlugs } } },
          orderBy: { createdAt: "desc" },
          take: need * 2, // 多めに取ってシャッフル
          select: POST_SELECT,
        }),
      ]);
      const tier3 = [
        ...tier3sidejob.map((p) => ({ ...p, type: "sidejob" as const })),
        ...tier3post.map((p) => ({ ...p, type: "post" as const })),
      ]
        .sort(() => Math.random() - 0.5) // ← ここをランダムに
        .slice(0, need);
      result.push(...tier3);
      excludeSlugs.push(...tier3.map((p) => p.slug));
    }
  }
  if (result.length >= count) return result.slice(0, count);

  // ④ ランダムフォールバック
  const need = count - result.length;
  const [poolSidejob, poolPost] = await Promise.all([
    prisma.postSidejob.findMany({
      where: { published: true, NOT: { slug: { in: excludeSlugs } } },
      take: 20,
      select: POST_SELECT,
    }),
    prisma.post.findMany({
      where: { published: true, NOT: { slug: { in: excludeSlugs } } },
      take: 20,
      select: POST_SELECT,
    }),
  ]);
  const pool = [
    ...poolSidejob.map((p) => ({ ...p, type: "sidejob" as const })),
    ...poolPost.map((p) => ({ ...p, type: "post" as const })),
  ].sort(() => Math.random() - 0.5).slice(0, need);
  result.push(...pool);

  return result.slice(0, count);
}

export const getRelatedSidejobPosts = getRelatedPosts;