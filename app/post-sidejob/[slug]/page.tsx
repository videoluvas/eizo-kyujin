import { notFound } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import type { Metadata } from "next";
import Layout from "@/components/Layout/Layout";
import SidejobPostHeader from "@/components/post-sidejob/SidejobPostHeader";
import SidejobTableOfContents from "@/components/post-sidejob/SidejobTableOfContents";
import SidejobSection1, {
  SidejobSection2Income,
  SidejobSection3Company,
  SidejobSection4Points,
  SidejobSection5Interview,
  SidejobSection6Fit,
} from "@/components/post-sidejob/SidejobSections";
import SidejobSection7CTA from "@/components/post-sidejob/SidejobSection7CTA";
import SidejobJobsSection from "@/components/post-sidejob/SidejobJobsSection";
import CTABanner from "@/components/post/CTABanner";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.postSidejob.findUnique({ where: { slug } });
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

export default async function SidejobPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.postSidejob.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  const [categories, sidejobJobsRaw] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "desc" } }),
    prisma.job.findMany({
      where: { category: { has: "副業OK" } },
      orderBy: { updatedAt: "desc" },
      take: 20,
    }),
  ]);

  const sidejobJobs = sidejobJobsRaw
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
        <div className="row">
          {/* メインコンテンツ */}
          <div className="col-lg-8 col-12">
            <SidejobPostHeader post={post} />
            <SidejobTableOfContents post={post} />
            <SidejobSection1 post={post} />
            <CTABanner />
            <SidejobJobsSection jobs={sidejobJobs} category={post.category} />
            <SidejobSection2Income post={post} />
            <SidejobSection3Company post={post} />
            <SidejobSection4Points post={post} />
            <SidejobSection5Interview post={post} />
            <SidejobSection6Fit post={post} />
            <CTABanner />
            <SidejobSection7CTA post={post} categories={categories} />
          </div>

          {/* サイドバー */}
          <div className="col-lg-4 col-12 d-none d-lg-block">
            <div style={{ position: "sticky", top: "150px" }}>
              <SidejobTableOfContents post={post} isSidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
