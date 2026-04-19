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

    const fields = {
      title:           title ?? "",
      metaTitle:       metaTitle ?? "",
      metaDescription: metaDescription ?? "",
      thumbnail:       thumbnail ?? "",
      ogImage:         ogImage ?? "",
      category:        category ?? "",
      relatedCategory: relatedCategory ?? "",
      author:          author ?? "映像求人PRO編集部",
      tags:            tags ?? [],
      published:       published ?? false,
      publishedAt:     publishedAt ? new Date(publishedAt) : null,
      h1_suffix:       content?.h1_suffix  ?? "",
      lead:            content?.lead       ?? "",
      h2_1_title:      content?.h2_1_title ?? "",
      h3_1_1:          content?.h3_1_1     ?? "",
      p_1_1:           content?.p_1_1      ?? "",
      h3_1_2:          content?.h3_1_2     ?? "",
      p_1_2:           content?.p_1_2      ?? "",
      h3_1_3:          content?.h3_1_3     ?? "",
      p_1_3:           content?.p_1_3      ?? "",
      h2_2_title:      content?.h2_2_title ?? "",
      h3_2_1:          content?.h3_2_1     ?? "",
      p_2_1:           content?.p_2_1      ?? "",
      h3_2_2:          content?.h3_2_2     ?? "",
      p_2_2:           content?.p_2_2      ?? "",
      h3_2_3:          content?.h3_2_3     ?? "",
      p_2_3:           content?.p_2_3      ?? "",
      h2_3_title:      content?.h2_3_title ?? "",
      h3_3_1:          content?.h3_3_1     ?? "",
      p_3_1:           content?.p_3_1      ?? "",
      h3_3_2:          content?.h3_3_2     ?? "",
      p_3_2:           content?.p_3_2      ?? "",
      h3_3_3:          content?.h3_3_3     ?? "",
      p_3_3:           content?.p_3_3      ?? "",
      h2_4_title:      content?.h2_4_title ?? "",
      h3_4_1:          content?.h3_4_1     ?? "",
      p_4_1:           content?.p_4_1      ?? "",
      h3_4_2:          content?.h3_4_2     ?? "",
      p_4_2:           content?.p_4_2      ?? "",
      h3_4_3:          content?.h3_4_3     ?? "",
      p_4_3:           content?.p_4_3      ?? "",
      h2_5_title:      content?.h2_5_title ?? "",
      h3_5_1:          content?.h3_5_1     ?? "",
      p_5_1:           content?.p_5_1      ?? "",
      h2_6_title:      content?.h2_6_title ?? "",
      h3_6_1:          content?.h3_6_1     ?? "",
      p_6_1:           content?.p_6_1      ?? "",
      h3_6_2:          content?.h3_6_2     ?? "",
      p_6_2:           content?.p_6_2      ?? "",
      h3_6_3:          content?.h3_6_3     ?? "",
      p_6_3:           content?.p_6_3      ?? "",
      h2_7_title:      content?.h2_7_title ?? "",
      p_7_1:           content?.p_7_1      ?? "",
    };

    const post = await prisma.postSidejob.upsert({
      where:  { slug },
      update: fields,
      create: { slug, ...fields },
    });

    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    console.error("PostSidejob API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await prisma.postSidejob.findUnique({ where: { slug } });
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(post);
    }

    const posts = await prisma.postSidejob.findMany({
      where:   { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id:             true,
        slug:           true,
        title:          true,
        metaTitle:      true,
        metaDescription:true,
        thumbnail:      true,
        category:       true,
        publishedAt:    true,
        readingTime:    true,
        tags:           true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("PostSidejob GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
