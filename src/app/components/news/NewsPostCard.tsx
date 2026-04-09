import { ExternalLink, Heart, Bookmark } from "lucide-react";
import type { NewsPost } from "../../types/news";

interface NewsPostCardProps {
  post: NewsPost;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
}

function formatRelativeTime(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));

  if (minutes < 1) {
    return "just now";
  }
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString();
}

export function NewsPostCard({ post, onLike, onBookmark }: NewsPostCardProps) {
  const openPostDetails = () => {
    window.open(`/ai-news/${post.id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      className="rounded-2xl border border-slate-200 dark:border-blue-900/30 bg-white dark:bg-slate-950/60 shadow-sm overflow-hidden cursor-pointer hover:border-blue-400/60 transition-colors"
      role="button"
      tabIndex={0}
      onClick={openPostDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPostDetails();
        }
      }}
      aria-label={`Open full details for ${post.title}`}
    >
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
      ) : null}

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {post.category}
          </span>
          <span>{formatRelativeTime(post.publishedAt)}</span>
        </div>

        <h3 className="text-xl text-slate-900 dark:text-white leading-snug">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{post.summary}</p>

        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={`${post.id}-${tag}`}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onLike(post.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                post.isLiked
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              <Heart className="w-4 h-4" />
              {post.likes}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onBookmark(post.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                post.isBookmarked
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {post.sourceName ?? "Read More"}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

