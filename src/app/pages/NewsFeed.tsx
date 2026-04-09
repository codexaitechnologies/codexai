import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Newspaper, LoaderCircle } from "lucide-react";
import { NewsFiltersBar } from "../components/news/NewsFiltersBar";
import { NewsPostCard } from "../components/news/NewsPostCard";
import {
  getNewsCategories,
  getNewsFeed,
  togglePostBookmark,
  togglePostLike,
} from "../services/newsService";
import type { NewsCategory, NewsPost } from "../types/news";

export default function NewsFeed() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | "All">("All");
  const [error, setError] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const categories = useMemo(() => getNewsCategories(), []);

  const loadFeed = useCallback(
    async (nextCursor?: string, reset = false) => {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const response = await getNewsFeed({
          limit: 5,
          cursor: nextCursor,
          search,
          category: selectedCategory,
        });

        setPosts((current) => (reset ? response.posts : [...current, ...response.posts]));
        setCursor(response.nextCursor);
        setHasMore(response.hasMore);
        setError(null);
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : "Failed to load feed";
        setError(message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search, selectedCategory]
  );

  useEffect(() => {
    setCursor(null);
    setHasMore(true);
    setPosts([]);
    void loadFeed(undefined, true);
  }, [search, selectedCategory, loadFeed]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading && !loadingMore) {
          void loadFeed(cursor ?? undefined, false);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [cursor, hasMore, loading, loadingMore, loadFeed]);

  const handleLike = async (id: string) => {
    await togglePostLike(id);
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== id) {
          return post;
        }

        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
        };
      })
    );
  };

  const handleBookmark = async (id: string) => {
    await togglePostBookmark(id);
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-950">
      <section className="container mx-auto px-4 pt-10 pb-6">
        <div className="rounded-2xl border border-blue-200/70 dark:border-blue-900/30 bg-white dark:bg-slate-950/60 p-6 md:p-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 text-sm">
            <Newspaper className="w-4 h-4" />
            Daily AI Updates
          </div>
          <h1 className="text-3xl md:text-5xl text-slate-900 dark:text-white">AI News Feed</h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
            Scroll through real-time style AI updates with tags, categories, and quick source links,
            designed like a modern social feed.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-5">
          <NewsFiltersBar
            search={search}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setSelectedCategory}
          />

          {loading ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-500 dark:text-slate-300">
              Loading latest AI posts...
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 p-4">{error}</div>
          ) : null}

          {!loading && posts.length === 0 ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-500 dark:text-slate-300">
              No posts found for this filter. Try another category or search keyword.
            </div>
          ) : null}

          <div className="space-y-5">
            {posts.map((post) => (
              <NewsPostCard key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} />
            ))}
          </div>

          <div ref={loaderRef} className="h-12 flex items-center justify-center">
            {loadingMore ? (
              <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Loading more posts...
              </span>
            ) : !hasMore && posts.length > 0 ? (
              <span className="text-sm text-slate-400">You have reached the end of the feed.</span>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}


