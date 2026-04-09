import { useMemo, useState, type FormEvent } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import type { NewsCategory, NewsPost, UpsertNewsPostInput } from "../../types/news";

interface NewsAdminPanelProps {
  posts: NewsPost[];
  onSavePost: (input: UpsertNewsPostInput) => Promise<void>;
  onDeletePost: (id: string) => Promise<void>;
}

const defaultForm: UpsertNewsPostInput = {
  title: "",
  summary: "",
  imageUrl: "",
  sourceUrl: "",
  sourceName: "",
  category: "AI",
  tags: [],
};

export function NewsAdminPanel({ posts, onSavePost, onDeletePost }: NewsAdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UpsertNewsPostInput>(defaultForm);

  const recentPosts = useMemo(() => posts.slice(0, 6), [posts]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
  };

  const startEdit = (post: NewsPost) => {
    setEditingId(post.id);
    setForm({
      id: post.id,
      title: post.title,
      summary: post.summary,
      imageUrl: post.imageUrl ?? "",
      sourceUrl: post.sourceUrl ?? "",
      sourceName: post.sourceName ?? "",
      category: post.category,
      tags: post.tags,
      publishedAt: post.publishedAt,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: UpsertNewsPostInput = {
      ...form,
      title: form.title.trim(),
      summary: form.summary.trim(),
      imageUrl: form.imageUrl?.trim() || undefined,
      sourceUrl: form.sourceUrl?.trim() || undefined,
      sourceName: form.sourceName?.trim() || undefined,
      tags: form.tags,
    };

    if (!payload.title || !payload.summary) {
      return;
    }

    setIsSaving(true);
    try {
      await onSavePost(payload);
      resetForm();
    } finally {
      setIsSaving(false);
    }
  };

  const updateTagInput = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    setForm((prev) => ({ ...prev, tags }));
  };

  const handleDelete = async (id: string) => {
    await onDeletePost(id);
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-blue-900/30 bg-white dark:bg-slate-950/50 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-slate-900 dark:text-white">Admin Tools</h3>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isOpen ? "Close" : "New Post"}
        </button>
      </div>

      {isOpen ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Post title"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          />
          <textarea
            value={form.summary}
            onChange={(event) => setForm((prev) => ({ ...prev, summary: event.target.value }))}
            placeholder="Short summary"
            rows={4}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none resize-y"
          />
          <input
            value={form.imageUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
            placeholder="Image URL (optional)"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          />
          <input
            value={form.sourceUrl}
            onChange={(event) => setForm((prev) => ({ ...prev, sourceUrl: event.target.value }))}
            placeholder="Source URL"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          />
          <input
            value={form.sourceName}
            onChange={(event) => setForm((prev) => ({ ...prev, sourceName: event.target.value }))}
            placeholder="Source name"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          />
          <select
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, category: event.target.value as NewsCategory }))
            }
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          >
            <option value="AI">AI</option>
            <option value="ML">ML</option>
            <option value="GenAI">GenAI</option>
            <option value="Startups">Startups</option>
            <option value="Research">Research</option>
            <option value="Products">Products</option>
          </select>
          <input
            value={form.tags.join(", ")}
            onChange={(event) => updateTagInput(event.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 text-white px-3 py-2 text-sm disabled:opacity-60"
            >
              {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isSaving ? "Saving..." : editingId ? "Update Post" : "Add Post"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-3 py-2 text-sm"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>
      ) : null}

      <div className="space-y-2">
        <h4 className="text-sm text-slate-500 dark:text-slate-400">Latest Posts</h4>
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2"
          >
            <div className="min-w-0">
              <p className="text-sm text-slate-900 dark:text-slate-100 truncate">{post.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{post.category}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => startEdit(post)}
                className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label="Edit post"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                className="p-1.5 rounded-md text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40"
                aria-label="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


