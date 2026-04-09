import type { NewsCategory } from "../../types/news";

interface NewsFiltersBarProps {
  search: string;
  selectedCategory: NewsCategory | "All";
  categories: Array<NewsCategory | "All">;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: NewsCategory | "All") => void;
}

export function NewsFiltersBar({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: NewsFiltersBarProps) {
  return (
    <section className="sticky top-20 z-20 bg-white/95 dark:bg-black/90 backdrop-blur-lg border border-slate-200 dark:border-blue-900/20 rounded-2xl p-4 space-y-3">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search AI updates..."
        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}

