import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import type { Metadata } from "next";
import Layout from "@/components/Layout/Layout";
import PostHeader from "@/components/post/PostHeader";
import PostTableOfContents from "@/components/post/PostTableOfContents";
import PostSection1 from "@/components/post/PostSection1";
import PostSection2Jobs from "@/components/post/PostSection2Jobs";
import PostSection3Skills from "@/components/post/PostSection3Skills";
import PostSection4Salary from "@/components/post/PostSection4Salary";
import PostSection5Points from "@/components/post/PostSection5Points";
import PostSection6Categories from "@/components/post/PostSection6Categories";
import CTABanner from "@/components/post/CTABanner";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: post.ogImage ? [post.ogImage] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const [categories, relatedJobs] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "desc" } }),
    prisma.job.findMany({
      where: { category: { has: post.category } },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
        <div className="row">
          {/* メインコンテンツ */}
          <div className="col-lg-8 col-12">
            <PostHeader post={post} />
            <PostTableOfContents post={post} />
            <PostSection1 post={post} />
            <CTABanner />
            <PostSection2Jobs jobs={relatedJobs} category={post.category} />
            <PostSection3Skills post={post} />
            <PostSection4Salary post={post} />
            <PostSection5Points post={post} />
            <CTABanner />
            <PostSection6Categories categories={categories} currentCategory={post.category} />
          </div>

          {/* サイドバー */}
          <div className="col-lg-4 col-12 d-none d-lg-block">
            <div style={{ position: "sticky", top: "150px" }}>
              <PostTableOfContents post={post} isSidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
