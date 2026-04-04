import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      slug,
      title,
      metaTitle,
      metaDescription,
      thumbnail,
      ogImage,
      category,
      relatedCategory,
      author,
      tags,
      published,
      publishedAt,
      content,
    } = body;

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const post = await prisma.post.upsert({
      where: { slug },
      update: {
        title: title ?? "",
        metaTitle: metaTitle ?? "",
        metaDescription: metaDescription ?? "",
        thumbnail: thumbnail ?? "",
        ogImage: ogImage ?? "",
        category: category ?? "",
        relatedCategory: relatedCategory ?? "",
        author: author ?? "映像求人PRO編集部",
        tags: tags ?? [],
        published: published ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        lead: content?.lead ?? "",
        h2_1_title: content?.h2_1_title ?? "",
        h3_1_1: content?.h3_1_1 ?? "",
        p_1_1: content?.p_1_1 ?? "",
        h3_1_2: content?.h3_1_2 ?? "",
        p_1_2: content?.p_1_2 ?? "",
        h3_1_3: content?.h3_1_3 ?? "",
        p_1_3: content?.p_1_3 ?? "",
        h2_3_title: content?.h2_3_title ?? "",
        h3_3_1: content?.h3_3_1 ?? "",
        p_3_1: content?.p_3_1 ?? "",
        h3_3_2: content?.h3_3_2 ?? "",
        p_3_2: content?.p_3_2 ?? "",
        h3_3_3: content?.h3_3_3 ?? "",
        p_3_3: content?.p_3_3 ?? "",
        h2_4_title: content?.h2_4_title ?? "",
        p_4_1: content?.p_4_1 ?? "",
        p_4_2: content?.p_4_2 ?? "",
        h2_5_title: content?.h2_5_title ?? "",
        h3_5_1: content?.h3_5_1 ?? "",
        p_5_1: content?.p_5_1 ?? "",
        h3_5_2: content?.h3_5_2 ?? "",
        p_5_2: content?.p_5_2 ?? "",
        h3_5_3: content?.h3_5_3 ?? "",
        p_5_3: content?.p_5_3 ?? "",
      },
      create: {
        slug,
        title: title ?? "",
        metaTitle: metaTitle ?? "",
        metaDescription: metaDescription ?? "",
        thumbnail: thumbnail ?? "",
        ogImage: ogImage ?? "",
        category: category ?? "",
        relatedCategory: relatedCategory ?? "",
        author: author ?? "映像求人PRO編集部",
        tags: tags ?? [],
        published: published ?? false,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        lead: content?.lead ?? "",
        h2_1_title: content?.h2_1_title ?? "",
        h3_1_1: content?.h3_1_1 ?? "",
        p_1_1: content?.p_1_1 ?? "",
        h3_1_2: content?.h3_1_2 ?? "",
        p_1_2: content?.p_1_2 ?? "",
        h3_1_3: content?.h3_1_3 ?? "",
        p_1_3: content?.p_1_3 ?? "",
        h2_3_title: content?.h2_3_title ?? "",
        h3_3_1: content?.h3_3_1 ?? "",
        p_3_1: content?.p_3_1 ?? "",
        h3_3_2: content?.h3_3_2 ?? "",
        p_3_2: content?.p_3_2 ?? "",
        h3_3_3: content?.h3_3_3 ?? "",
        p_3_3: content?.p_3_3 ?? "",
        h2_4_title: content?.h2_4_title ?? "",
        p_4_1: content?.p_4_1 ?? "",
        p_4_2: content?.p_4_2 ?? "",
        h2_5_title: content?.h2_5_title ?? "",
        h3_5_1: content?.h3_5_1 ?? "",
        p_5_1: content?.p_5_1 ?? "",
        h3_5_2: content?.h3_5_2 ?? "",
        p_5_2: content?.p_5_2 ?? "",
        h3_5_3: content?.h3_5_3 ?? "",
        p_5_3: content?.p_5_3 ?? "",
      },
    });

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    console.error("Post API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await prisma.post.findUnique({ where: { slug } });
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(post);
    }

    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        metaTitle: true,
        metaDescription: true,
        thumbnail: true,
        category: true,
        publishedAt: true,
        readingTime: true,
        tags: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Post GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}