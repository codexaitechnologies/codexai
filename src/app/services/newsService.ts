import type {
  ApiNewsFeedResponse,
  ApiNewsPost,
  NewsCategory,
  NewsFeedQuery,
  NewsFeedResponse,
  NewsPost,
  UpsertNewsPostInput,
} from "../types/news";

const API_BASE_URL = "https://jbd1szydoc.execute-api.ap-south-1.amazonaws.com";
const DEFAULT_PAGE_SIZE = 6;
const LOCAL_INTERACTIONS_KEY = "codexai.ai.news.interactions";
const LOCAL_POST_CACHE_KEY = "codexai.ai.news.cache";

interface NewsInteraction {
  isLiked: boolean;
  isBookmarked: boolean;
  likesDelta: number;
}

const inMemoryPostCache = new Map<string, NewsPost>();

function normalizeUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const raw = value.trim();
  if (!raw) {
    return undefined;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) {
    return `https://${raw}`;
  }

  return undefined;
}

function looksLikeImageUrl(url: string): boolean {
  return (
    /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(url) ||
    url.includes("images.unsplash.com") ||
    url.includes("cloudinary")
  );
}

function normalizeCategory(category?: string): NewsCategory {
  if (!category) {
    return "Other";
  }

  const normalized = category.trim().toLowerCase();
  const categoryMap: Record<string, NewsCategory> = {
    ai: "AI",
    ml: "ML",
    genai: "GenAI",
    startups: "Startups",
    research: "Research",
    products: "Products",
    other: "Other",
  };

  return categoryMap[normalized] ?? category.charAt(0).toUpperCase() + category.slice(1);
}

function normalizeTags(tags?: string[]): string[] {
  if (!tags || tags.length === 0) {
    return [];
  }

  return tags
    .map((tag) => tag.trim().replace(/^#+/, ""))
    .filter(Boolean);
}

function readInteractions(): Record<string, NewsInteraction> {
  const value = localStorage.getItem(LOCAL_INTERACTIONS_KEY);
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value) as Record<string, NewsInteraction>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function writeInteractions(interactions: Record<string, NewsInteraction>) {
  localStorage.setItem(LOCAL_INTERACTIONS_KEY, JSON.stringify(interactions));
}

function readCachedPosts(): NewsPost[] {
  const value = localStorage.getItem(LOCAL_POST_CACHE_KEY);
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as NewsPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCachedPosts(posts: NewsPost[]) {
  localStorage.setItem(LOCAL_POST_CACHE_KEY, JSON.stringify(posts));
}

function upsertCache(posts: NewsPost[]) {
  const cached = readCachedPosts();
  const cacheById = new Map(cached.map((post) => [post.id, post]));

  posts.forEach((post) => {
    inMemoryPostCache.set(post.id, post);
    cacheById.set(post.id, post);
  });

  writeCachedPosts(Array.from(cacheById.values()));
}

function applyInteractions(post: NewsPost): NewsPost {
  const interactions = readInteractions();
  const current = interactions[post.id];
  const baseLikes = post.views ?? post.likes;

  if (!current) {
    return { ...post, likes: baseLikes };
  }

  return {
    ...post,
    likes: Math.max(0, baseLikes + current.likesDelta),
    isLiked: current.isLiked,
    isBookmarked: current.isBookmarked,
  };
}

function mapApiPostToNewsPost(apiPost: ApiNewsPost): NewsPost {
  const publishedAt = apiPost.publishedAt ?? apiPost.createdAt ?? new Date().toISOString();
  const normalizedImage = normalizeUrl(apiPost.imageUrl);
  const imageUrl = normalizedImage && looksLikeImageUrl(normalizedImage) ? normalizedImage : undefined;
  const fallbackSource = normalizedImage && !imageUrl ? normalizedImage : undefined;

  const mapped: NewsPost = {
    id: apiPost.postId,
    title: apiPost.title,
    summary: (apiPost.description ?? apiPost.content ?? "No description available").trim(),
    content: (apiPost.content ?? apiPost.description ?? "No additional content available").trim(),
    imageUrl,
    sourceUrl: normalizeUrl(apiPost.sourceUrl) ?? fallbackSource,
    sourceName: apiPost.sourceName ?? apiPost.author,
    category: normalizeCategory(apiPost.category),
    tags: normalizeTags(apiPost.tags),
    author: apiPost.author,
    status: apiPost.status,
    views: apiPost.views ?? 0,
    publishedAt,
    createdAt: apiPost.createdAt ?? publishedAt,
    updatedAt: apiPost.updatedAt ?? publishedAt,
    likes: apiPost.views ?? 0,
    isLiked: false,
    isBookmarked: false,
  };

  return applyInteractions(mapped);
}

function createCursor(offset: number) {
  return offset.toString();
}

function parseCursor(cursor?: string) {
  if (!cursor) {
    return 0;
  }
  const parsed = Number.parseInt(cursor, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function getNewsFeed(query?: NewsFeedQuery): Promise<NewsFeedResponse> {
  const limit = query?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = parseCursor(query?.cursor);
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  if (query?.search?.trim()) {
    params.append("q", query.search.trim());
  }

  if (query?.category && query.category !== "All") {
    params.append("category", query.category);
  }

  const response = await fetch(`${API_BASE_URL}/news?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch news feed: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as ApiNewsFeedResponse;
  const mappedPosts = (payload.posts ?? []).map(mapApiPostToNewsPost);
  upsertCache(mappedPosts);
  const nextOffset = offset + mappedPosts.length;

  return {
    posts: mappedPosts,
    nextCursor: nextOffset < payload.total ? createCursor(nextOffset) : null,
    hasMore: nextOffset < payload.total,
  };
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  const response = await getNewsFeed({ limit: 50, cursor: "0" });
  return response.posts;
}

export async function getNewsPostById(postId: string): Promise<NewsPost | null> {
  const cachedInMemory = inMemoryPostCache.get(postId);
  if (cachedInMemory) {
    return applyInteractions(cachedInMemory);
  }

  const cachedLocal = readCachedPosts().find((post) => post.id === postId);
  if (cachedLocal) {
    inMemoryPostCache.set(cachedLocal.id, cachedLocal);
    return applyInteractions(cachedLocal);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/news/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const payload = (await response.json()) as ApiNewsPost;
      const mappedPost = mapApiPostToNewsPost(payload);
      upsertCache([mappedPost]);
      return mappedPost;
    }
  } catch {
    // Continue to list fallback.
  }

  try {
    const fallback = await getNewsFeed({ limit: 100, cursor: "0" });
    return fallback.posts.find((post) => post.id === postId) ?? null;
  } catch {
    return null;
  }
}

export async function upsertNewsPost(input: UpsertNewsPostInput): Promise<NewsPost> {
  const existing = input.id ? await getNewsPostById(input.id) : null;
  const now = new Date().toISOString();
  const updated: NewsPost = {
    id: input.id ?? `local-${crypto.randomUUID()}`,
    title: input.title,
    summary: input.summary,
    content: input.summary,
    imageUrl: input.imageUrl,
    sourceUrl: input.sourceUrl,
    sourceName: input.sourceName,
    category: input.category,
    tags: input.tags,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    publishedAt: input.publishedAt ?? existing?.publishedAt ?? now,
    likes: existing?.likes ?? 0,
    views: existing?.views ?? 0,
    isLiked: existing?.isLiked ?? false,
    isBookmarked: existing?.isBookmarked ?? false,
  };
  upsertCache([updated]);
  return updated;
}

export async function deleteNewsPost(id: string): Promise<void> {
  inMemoryPostCache.delete(id);
  const filtered = readCachedPosts().filter((post) => post.id !== id);
  writeCachedPosts(filtered);
}

export async function togglePostLike(id: string): Promise<NewsPost> {
  const interactions = readInteractions();
  const current = interactions[id] ?? { isLiked: false, isBookmarked: false, likesDelta: 0 };
  const isLiked = !current.isLiked;
  const next: NewsInteraction = {
    ...current,
    isLiked,
    likesDelta: current.likesDelta + (isLiked ? 1 : -1),
  };
  interactions[id] = next;
  writeInteractions(interactions);

  const existingPost = await getNewsPostById(id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  const updated = applyInteractions(existingPost);
  upsertCache([updated]);
  return updated;
}

export async function togglePostBookmark(id: string): Promise<NewsPost> {
  const interactions = readInteractions();
  const current = interactions[id] ?? { isLiked: false, isBookmarked: false, likesDelta: 0 };
  interactions[id] = {
    ...current,
    isBookmarked: !current.isBookmarked,
  };
  writeInteractions(interactions);

  const existingPost = await getNewsPostById(id);
  if (!existingPost) {
    throw new Error("Post not found");
  }

  const updated = applyInteractions(existingPost);
  upsertCache([updated]);
  return updated;
}

export function getNewsCategories(): Array<NewsCategory | "All"> {
  return ["All", "AI", "ML", "GenAI", "Startups", "Research", "Products", "Other"];
}

export function getNewsApiBlueprint() {
  return {
    publicList: `${API_BASE_URL}/news?limit=20&offset=0`,
    adminCreate: `${API_BASE_URL}/admin/news`,
  };
}

