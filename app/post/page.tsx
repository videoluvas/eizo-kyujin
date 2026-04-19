import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { prisma } from "@/app/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "映像業界の転職コラム一覧｜映像求人PRO",
  description: "映像業界・動画制作の転職に役立つコラム・記事を一覧で掲載。動画編集、撮影、ディレクターなど職種別の転職情報をお届けします。",
};

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { tag } = await searchParams;

  const [posts, sidejobPosts, allPosts, allSidejobPosts] = await Promise.all([
    // 既存の転職記事
    prisma.post.findMany({
      where: {
        published: true,
        ...(tag ? { tags: { has: tag } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        metaDescription: true,
        thumbnail: true,
        category: true,
        tags: true,
        author: true,
        publishedAt: true,
        readingTime: true,
      },
    }),
    // 副業OK記事
    prisma.postSidejob.findMany({
      where: {
        published: true,
        ...(tag ? { tags: { has: tag } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        metaDescription: true,
        thumbnail: true,
        category: true,
        tags: true,
        author: true,
        publishedAt: true,
        readingTime: true,
      },
    }),
    // タグ収集用（既存）
    prisma.post.findMany({
      where: { published: true },
      select: { tags: true },
    }),
    // タグ収集用（副業OK）
    prisma.postSidejob.findMany({
      where: { published: true },
      select: { tags: true },
    }),
  ]);

  // 両方のテーブルから記事をマージして日付順にソート
  const allArticles = [
    ...posts.map((p) => ({ ...p, type: "post" as const })),
    ...sidejobPosts.map((p) => ({ ...p, type: "sidejob" as const })),
  ].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // タグ一覧をマージ
  const uniqueTags = [
    ...new Set(
      [...allPosts, ...allSidejobPosts]
        .flatMap((p) => p.tags)
        .filter(Boolean)
    ),
  ];

  return (
    <Layout>
      {/* ヘッダー */}
      <section className="section-box">
        <div className="breacrumb-cover">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="mb-10">転職コラム</h2>
                <p className="font-lg color-text-paragraph-2">
                  映像業界・動画制作の転職に役立つ情報をお届けします
                </p>
              </div>
              <div className="col-lg-6 text-end">
                <ul className="breadcrumbs mt-40">
                  <li>
                    <Link href="/">
                      <span className="home-icon">Home</span>
                    </Link>
                  </li>
                  <li>転職コラム</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* タグフィルター */}
      <section className="section-box mt-30">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Link href="/post">
              <span
                className={`btn ${!tag ? "btn-default" : "btn-grey-small"}`}
                style={{ fontSize: "13px" }}
              >
                すべて
              </span>
            </Link>
            {uniqueTags.map((t) => (
              <Link key={t} href={`/post?tag=${encodeURIComponent(t)}`}>
                <span
                  className={`btn ${tag === t ? "btn-default" : "btn-grey-small"}`}
                  style={{ fontSize: "13px" }}
                >
                  {t}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 記事グリッド */}
      <section className="section-box mt-30 mb-50">
        <div className="container">
          {allArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
              記事がありません
            </div>
          ) : (
            <div className="row mt-30">
              {allArticles.map((post) => (
                <div key={`${post.type}-${post.id}`} className="col-lg-4 col-md-6 col-sm-12 col-12 mb-30">
                  <div className="card-grid-3 hover-up">
                    {/* サムネイル */}
                    <div className="text-center card-grid-3-image">
                      <Link href={post.type === "sidejob" ? `/post-sidejob/${post.slug}` : `/post/${post.slug}`}>
                        <figure style={{ margin: 0, overflow: "hidden", borderRadius: "8px 8px 0 0", position: "relative" }}>
                          <img
                            alt={post.title}
                            src={post.thumbnail || "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizojob_post.png"}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              filter: "brightness(0.93) saturate(1.1)",
                            }}
                          />
                          {/* 副業OKバッジ */}
                          {post.type === "sidejob" && (
                            <span
                              style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                background: "#2da562",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: "700",
                                padding: "3px 10px",
                                borderRadius: "20px",
                              }}
                            >
                              副業OK特集
                            </span>
                          )}
                        </figure>
                      </Link>
                    </div>

                    {/* コンテンツ */}
                    <div className="card-block-info">
                      {/* カテゴリバッジ */}
                      {post.category && (
                        <div className="tags mb-15">
                          <Link href={`/post?category=${encodeURIComponent(post.category)}`}>
                            <span className="btn btn-tag">{post.category}</span>
                          </Link>
                        </div>
                      )}

                      {/* タイトル */}
                      <h5>
                        <Link href={post.type === "sidejob" ? `/post-sidejob/${post.slug}` : `/post/${post.slug}`}>
                          <span style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}>
                            {post.title}
                          </span>
                        </Link>
                      </h5>

                      {/* 説明文 */}
                      {post.metaDescription && (
                        <p className="mt-10 color-text-paragraph font-sm" style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {post.metaDescription}
                        </p>
                      )}

                      {/* フッター */}
                      <div className="card-2-bottom mt-20">
                        <div className="row">
                          <div className="col-lg-7 col-7">
                            <div className="d-flex align-items-center">
                              <div className="info-right-img">
                                <span className="font-sm font-bold color-brand-1 op-70">
                                  {post.author || "映像求人PRO編集部"}
                                </span>
                                <br />
                                <span className="font-xs color-text-paragraph-2">
                                  {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString("ja-JP")
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-5 text-end col-5 pt-15">
                            {post.readingTime > 0 && (
                              <span className="color-text-paragraph-2 font-xs">
                                約{post.readingTime}分
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
