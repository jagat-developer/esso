/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, Tag } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animated";
import { JsonLd } from "@/components/json-ld";
import { businessProfile } from "@/data/business";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import {
  blogExcerpt,
  formatBlogDate,
  getBlog,
  readingTime,
  stripHtml,
} from "@/lib/upliftai";

export const dynamic = "force-dynamic";

type BlogDetailProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const { blog } = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog",
      description: "Esso Bloomington blog article.",
    };
  }

  const title = blog.meta?.seoTitle || blog.title;
  const description =
    blog.meta?.seoDescription || blogExcerpt(blog, 155) || blog.title;
  const path = `/blog/${blog.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords: blog.meta?.keywords ?? blog.tags,
    openGraph: {
      title: blog.meta?.ogTitle || title,
      description: blog.meta?.ogDescription || description,
      url: absoluteUrl(path),
      siteName: blog.meta?.ogSiteName || businessProfile.name,
      type: "article",
      locale: blog.meta?.ogLocale || "en_CA",
      images: blog.featuredImage
        ? [
            {
              url: blog.featuredImage,
              alt: blog.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const result = await getBlog(slug);

  if (result.missingToken) {
    return <MissingTokenArticle />;
  }

  if (!result.blog) {
    notFound();
  }

  const blog = result.blog;
  const path = `/blog/${blog.slug}`;

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Blog", url: absoluteUrl("/blog") },
          { name: blog.title, url: absoluteUrl(path) },
        ])}
      />
      <JsonLd data={articleSchema(blog, path)} />

      <article>
        <section className="site-shell grid min-h-[62vh] items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-18">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-black text-[#625a50] hover:text-[#17130f]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to blog
            </Link>
            <div className="eyebrow mt-6">
              {blog.categories?.[0] || "Esso Bloomington"}
            </div>
            <h1 className="display-type mt-6 max-w-[13ch] text-5xl font-black leading-[0.98] text-[#17130f] sm:text-[64px] sm:leading-[4.6rem]">
              {blog.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625a50]">
              {blogExcerpt(blog, 210)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-extrabold uppercase tracking-[0.1em] text-[#625a50]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} aria-hidden="true" />
                {formatBlogDate(blog)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} aria-hidden="true" />
                {readingTime(blog)}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            {blog.featuredImage ? (
              <div className="image-frame h-[34rem]">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-[8px] bg-[#17130f] p-8 text-white shadow-2xl shadow-black/20">
                <div className="text-sm font-black uppercase tracking-[0.14em] text-white/50">
                  Article
                </div>
                <h2 className="display-type mt-5 text-5xl font-black leading-tight">
                  {businessProfile.name}
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-white/70">
                  Helpful updates for drivers near Bloomington Road and Highway
                  48.
                </p>
              </div>
            )}
          </FadeIn>
        </section>

        <section className="section-pad bg-[#fffdf8]/64">
          <div className="site-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <FadeIn>
              <BlogBody content={blog.content || blog.excerpt || ""} />
            </FadeIn>
            <FadeIn delay={0.08}>
              <aside className="sticky top-28 rounded-[8px] border border-black/10 bg-white/72 p-5">
                <div className="text-sm font-black uppercase tracking-[0.14em] text-[#625a50]">
                  Article details
                </div>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-black text-[#17130f]">Published</dt>
                    <dd className="mt-1 font-medium text-[#625a50]">
                      {formatBlogDate(blog)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-black text-[#17130f]">Reading time</dt>
                    <dd className="mt-1 font-medium text-[#625a50]">
                      {readingTime(blog)}
                    </dd>
                  </div>
                  {blog.authorName ? (
                    <div>
                      <dt className="font-black text-[#17130f]">Author</dt>
                      <dd className="mt-1 font-medium text-[#625a50]">
                        {blog.authorUrl ? (
                          <a
                            href={blog.authorUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-black/20 underline-offset-4"
                          >
                            {blog.authorName}
                          </a>
                        ) : (
                          blog.authorName
                        )}
                      </dd>
                    </div>
                  ) : null}
                </dl>
                {blog.tags?.length ? (
                  <div className="mt-6 border-t border-black/10 pt-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black text-[#17130f]">
                      <Tag size={16} aria-hidden="true" />
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 8).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f6f3ed] px-3 py-1 text-xs font-bold text-[#625a50]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            </FadeIn>
          </div>
        </section>
      </article>
    </main>
  );
}

function BlogBody({ content }: { content: string }) {
  if (!content.trim()) {
    return (
      <div className="blog-content">
        <p>This article is being prepared. Please check back shortly.</p>
      </div>
    );
  }

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  if (looksLikeHtml) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  }

  return (
    <div className="blog-content">
      {content
        .split(/\n{2,}/)
        .map((paragraph) => stripHtml(paragraph))
        .filter(Boolean)
        .map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
    </div>
  );
}

function MissingTokenArticle() {
  return (
    <main>
      <section className="site-shell min-h-[58vh] py-16">
        <div className="premium-card rounded-[8px] p-8">
          <div className="eyebrow">Blog feed</div>
          <h1 className="display-type mt-5 text-4xl font-black text-[#17130f]">
            Blog detail pages are ready.
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-[#625a50]">
            Set UPLIFTAI_API_TOKEN in the deployment environment to load live
            article content from UpliftAI.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#17130f] px-6 text-sm font-black text-white"
          >
            Back to blog
          </Link>
        </div>
      </section>
    </main>
  );
}

function articleSchema(
  blog: Awaited<ReturnType<typeof getBlog>>["blog"] & {},
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blogExcerpt(blog),
    image: blog.featuredImage ? [blog.featuredImage] : undefined,
    datePublished: blog.publishDate ?? blog.createdAt,
    dateModified: blog.freshness?.lastUpdatedAt ?? blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.authorName || businessProfile.name,
      url: blog.authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: businessProfile.name,
    },
    mainEntityOfPage: absoluteUrl(path),
    articleSection: blog.meta?.articleSection || blog.categories?.[0],
    keywords: blog.meta?.keywords ?? blog.tags,
  };
}
