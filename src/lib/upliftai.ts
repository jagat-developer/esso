const UPLIFTAI_BASE_URL = "https://api.upliftai.co/api/public/v1";

export type UpliftBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: "PUBLISH" | "DRAFT" | string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: {
    lastUpdatedAt?: string;
    ageDays?: number;
    needsRefresh?: boolean;
    freshnessThresholdDays?: number;
  };
  analytics?: {
    contentQualityScore?: number;
    rankingPotential?: string;
    conversionPotential?: string;
    externalLinksCount?: number;
  };
  meta?: {
    seoTitle?: string;
    seoDescription?: string;
    focusKeyword?: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogUrl?: string;
    ogSiteName?: string;
    ogLocale?: string;
    articleAuthor?: string;
    articleSection?: string;
    articleTags?: string[];
  };
  customFields?: Record<string, unknown>;
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type BlogListResult = {
  blogs: UpliftBlog[];
  pagination: BlogPagination;
  error?: string;
  missingToken?: boolean;
};

type BlogListResponse = {
  success: boolean;
  data?: {
    blogs?: UpliftBlog[];
    pagination?: Partial<BlogPagination>;
  };
  error?: string;
};

type BlogDetailResponse = {
  success: boolean;
  data?: {
    blog?: UpliftBlog;
  };
  error?: string;
};

function getToken() {
  return process.env.UPLIFTAI_API_TOKEN?.trim();
}

function emptyPagination(page = 1, limit = 10): BlogPagination {
  return {
    page,
    limit,
    total: 0,
    totalPages: 0,
  };
}

function normalizePagination(
  pagination: Partial<BlogPagination> | undefined,
  page: number,
  limit: number,
): BlogPagination {
  return {
    page: Number(pagination?.page ?? page),
    limit: Number(pagination?.limit ?? limit),
    total: Number(pagination?.total ?? 0),
    totalPages: Number(pagination?.totalPages ?? 0),
  };
}

async function upliftFetch<T>(path: string, params?: URLSearchParams) {
  const token = getToken();

  if (!token) {
    return { missingToken: true as const };
  }

  const url = new URL(`${UPLIFTAI_BASE_URL}${path}`);
  params?.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    return {
      error: `UpliftAI returned ${response.status}`,
    };
  }

  return {
    data: (await response.json()) as T,
  };
}

export async function listBlogs({
  page = 1,
  limit = 12,
  status = "PUBLISH",
}: {
  page?: number;
  limit?: number;
  status?: "PUBLISH" | "DRAFT" | "ALL";
} = {}): Promise<BlogListResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  const result = await upliftFetch<BlogListResponse>("/blogs", params);

  if ("missingToken" in result) {
    return {
      blogs: [],
      pagination: emptyPagination(page, limit),
      missingToken: true,
    };
  }

  if (result.error || !result.data?.success) {
    return {
      blogs: [],
      pagination: emptyPagination(page, limit),
      error: result.error ?? result.data?.error ?? "Unable to load blogs",
    };
  }

  return {
    blogs: result.data.data?.blogs ?? [],
    pagination: normalizePagination(result.data.data?.pagination, page, limit),
  };
}

export async function getBlog(slug: string) {
  const result = await upliftFetch<BlogDetailResponse>(
    `/blog/${encodeURIComponent(slug)}`,
  );

  if ("missingToken" in result) {
    return {
      blog: null,
      missingToken: true,
    };
  }

  if (result.error || !result.data?.success) {
    return {
      blog: null,
      error: result.error ?? result.data?.error ?? "Unable to load blog",
    };
  }

  return {
    blog: result.data.data?.blog ?? null,
  };
}

export function formatBlogDate(blog: Pick<UpliftBlog, "publishDate" | "updatedAt" | "createdAt">) {
  const rawDate = blog.publishDate ?? blog.updatedAt ?? blog.createdAt;

  if (!rawDate) {
    return "Recent update";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function readingTime(blog: UpliftBlog) {
  const customReadingTime = blog.customFields?.readingTime;

  if (typeof customReadingTime === "string" && customReadingTime.trim()) {
    return customReadingTime;
  }

  const wordCount = stripHtml(blog.content ?? blog.excerpt ?? "")
    .split(/\s+/)
    .filter(Boolean).length;

  if (!wordCount) {
    return "Quick read";
  }

  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function blogExcerpt(blog: UpliftBlog, maxLength = 170) {
  const text = stripHtml(blog.excerpt || blog.meta?.seoDescription || blog.content || "");

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}
