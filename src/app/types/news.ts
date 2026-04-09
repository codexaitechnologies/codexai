export type NewsCategory = string;

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  category: NewsCategory;
  tags: string[];
  author?: string;
  status?: string;
  views?: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface NewsFeedQuery {
  limit?: number;
  cursor?: string;
  search?: string;
  category?: NewsCategory | "All";
}

export interface NewsFeedResponse {
  posts: NewsPost[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface UpsertNewsPostInput {
  id?: string;
  title: string;
  summary: string;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  category: NewsCategory;
  tags: string[];
  publishedAt?: string;
}

export interface ApiNewsPost {
  postId: string;
  title: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  category?: string;
  tags?: string[];
  author?: string;
  status?: string;
  views?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiNewsFeedResponse {
  message: string;
  count: number;
  total: number;
  posts: ApiNewsPost[];
}

