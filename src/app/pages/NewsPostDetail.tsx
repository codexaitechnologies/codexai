import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink, Clock3, Tag } from "lucide-react";
import { getNewsPostById } from "../services/newsService";
import type { NewsPost } from "../types/news";

function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NewsPostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setIsLoading(false);
        return;
      }

      const newsPost = await getNewsPostById(postId);
      setPost(newsPost);
      setIsLoading(false);
    };

    void loadPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-slate-600 dark:text-slate-300">
          Loading post details...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <h1 className="text-2xl text-slate-900 dark:text-white">Post not found</h1>
          <p className="text-slate-600 dark:text-slate-300">
            This news item is unavailable or may have been removed.
          </p>
          <Link
            to="/ai-news"
            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AI News Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="max-w-4xl mx-auto rounded-2xl border border-slate-200 dark:border-blue-900/30 bg-white dark:bg-slate-950/60 overflow-hidden">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
        ) : null}

        <div className="p-6 md:p-8 space-y-5">
          <Link
            to="/ai-news"
            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AI News Feed
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock3 className="w-4 h-4" />
              {formatDateTime(post.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white leading-tight">{post.title}</h1>

          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">{post.summary}</p>

          {post.content && post.content !== post.summary ? (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          ) : null}

          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.id}-${tag}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
              <p>Source: {post.sourceName ?? "External publisher"}</p>
              {post.author ? <p>Author: {post.author}</p> : null}
            </div>
            {post.sourceUrl ? (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Read Full News
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

