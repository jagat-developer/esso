/* eslint-disable @next/next/no-img-element */
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import Link from "next/link";
import {
  blogExcerpt,
  formatBlogDate,
  readingTime,
  type UpliftBlog,
} from "@/lib/upliftai";

export function BlogCard({ blog }: { blog: UpliftBlog }) {
  const categories = blog.categories?.filter(Boolean).slice(0, 2) ?? [];

  return (
    <article className="premium-card group overflow-hidden rounded-[8px] transition-transform duration-300 hover:-translate-y-1">
      {blog.featuredImage ? (
        <div className="relative h-56 overflow-hidden bg-[#17130f]">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {(categories.length ? categories : ["Esso Bloomington"]).map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 bg-[#f6f3ed] px-3 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#7b251a]"
            >
              {item}
            </span>
          ))}
        </div>
        <h2 className="mt-5 text-2xl font-black leading-tight text-[#17130f]">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>
        <p className="mt-3 min-h-20 text-sm font-medium leading-7 text-[#625a50]">
          {blogExcerpt(blog)}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-extrabold uppercase tracking-[0.1em] text-[#625a50]">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} aria-hidden="true" />
            {formatBlogDate(blog)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 size={15} aria-hidden="true" />
            {readingTime(blog)}
          </span>
        </div>
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#17130f]"
        >
          Read article
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
