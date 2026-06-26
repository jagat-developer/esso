import type { Metadata } from "next";
import { AlertCircle, ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { FadeIn } from "@/components/animated";
import { JsonLd } from "@/components/json-ld";
import { businessProfile } from "@/data/business";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { listBlogs } from "@/lib/upliftai";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Esso Bloomington updates, travel-stop tips, fuel and retail diesel notes, LCBO convenience information, Country Style news, and Bloomington Road service guides.",
  alternates: {
    canonical: "/blog",
  },
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? 1) || 1);
  const result = await listBlogs({
    page: currentPage,
    limit: 12,
    status: "PUBLISH",
  });
  const hasBlogs = result.blogs.length > 0;

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Blog", url: absoluteUrl("/blog") },
        ])}
      />
      <section className="site-shell grid min-h-[58vh] items-center gap-10 py-12 lg:grid-cols-[0.86fr_1.14fr] lg:py-18">
        <FadeIn>
          <div className="eyebrow">Esso Bloomington Blog</div>
          <h1 className="display-type mt-6 max-w-[12ch] text-5xl font-black leading-[0.98] text-[#17130f] sm:text-[64px] sm:leading-[4.6rem]">
            Local fuel, food, and route-stop updates.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#625a50]">
            Helpful reads from {businessProfile.name}: fuel and retail diesel
            guidance, Bloomington Road convenience updates, LCBO and Beer Store
            notes, Country Style food stops, and practical tips for local
            drivers.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="rounded-[8px] bg-[#17130f] p-6 text-white shadow-2xl shadow-black/20 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#e1251b]">
              <BookOpen size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-8 text-3xl font-black leading-tight">
              Programmatic SEO, kept useful.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-white/70">
              Each post can carry SEO metadata, tags, freshness signals,
              featured imagery, and article schema while staying visually
              consistent with the main site.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Fuel", "Convenience", "Country Style", "Bloomington Rd"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-[8px] border border-white/10 bg-white/8 p-3 text-sm font-black"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-pad bg-[#fffdf8]/64">
        <div className="site-shell">
          {result.missingToken ? <BlogNotice type="missing-token" /> : null}
          {result.error ? <BlogNotice type="error" message={result.error} /> : null}

          {hasBlogs ? (
            <>
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Latest posts</div>
                  <h2 className="display-type mt-5 text-4xl font-black leading-tight">
                    Fresh from the stop.
                  </h2>
                </div>
                <p className="max-w-md text-sm font-semibold leading-7 text-[#625a50]">
                  Showing page {result.pagination.page} of{" "}
                  {Math.max(1, result.pagination.totalPages)}.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {result.blogs.map((blog) => (
                  <BlogCard key={blog.id || blog.slug} blog={blog} />
                ))}
              </div>
              <Pagination
                currentPage={result.pagination.page}
                totalPages={result.pagination.totalPages}
              />
            </>
          ) : !result.missingToken && !result.error ? (
            <EmptyBlogState />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function BlogNotice({
  type,
  message,
}: {
  type: "missing-token" | "error";
  message?: string;
}) {
  return (
    <div className="premium-card mb-8 rounded-[8px] p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#17130f] text-white">
          <AlertCircle size={20} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#17130f]">
            {type === "missing-token"
              ? "Blog feed is ready to connect"
              : "Blog feed could not load"}
          </h2>
          <p className="mt-2 text-sm font-medium leading-7 text-[#625a50]">
            {type === "missing-token"
              ? "Set UPLIFTAI_API_TOKEN in the deployment environment to show live UpliftAI posts here."
              : message ?? "Please try again shortly."}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyBlogState() {
  return (
    <div className="premium-card rounded-[8px] p-8 text-center">
      <Sparkles size={32} className="mx-auto text-[#e1251b]" aria-hidden="true" />
      <h2 className="mt-5 text-2xl font-black text-[#17130f]">
        No published posts yet.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-[#625a50]">
        Once UpliftAI has published posts for this site, they will appear here
        automatically with matching Esso Bloomington styling.
      </p>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-12 flex items-center justify-between gap-4"
      aria-label="Blog pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white/74 px-4 text-sm font-black text-[#17130f]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Newer
        </Link>
      ) : (
        <span />
      )}
      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#17130f] px-4 text-sm font-black text-white"
        >
          Older
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  );
}
