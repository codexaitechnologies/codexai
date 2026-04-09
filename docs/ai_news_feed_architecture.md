# AI News Feed Architecture

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- State/Data Layer (current implementation): Browser localStorage via `newsService`
- Suggested backend for production: Node.js (Express/Fastify) + PostgreSQL + Redis cache

## Frontend Component Structure

- `src/app/pages/NewsFeed.tsx`
  - Top-level page for feed, filters, and infinite scroll trigger
- `src/app/components/news/NewsFiltersBar.tsx`
  - Search input and category chips
- `src/app/components/news/NewsPostCard.tsx`
  - Post UI card (title, summary, optional image, timestamp, tags, source link, like/save)
- `src/app/services/newsService.ts`
  - Data access methods (`getNewsFeed`, CRUD, like/save toggles)
- `src/app/types/news.ts`
  - Shared interfaces and enums for feed entities

## Backend APIs Required

### Public APIs

- `GET /news`
  - Query: `limit`, `cursor`, `q`, `category`, `tag`
  - Response: `{ posts, nextCursor, hasMore }`
- `GET /news/:id`
  - Response: single post details

### Admin APIs (optional, not enabled in current UI)

- `POST /admin/news`
  - Body: create news post payload
- `PUT /admin/news/:id`
  - Body: partial/full update payload
- `DELETE /admin/news/:id`
  - Removes a post

### Interaction APIs (optional)

- `POST /news/:id/like`
- `DELETE /news/:id/like`
- `POST /news/:id/bookmark`
- `DELETE /news/:id/bookmark`

## Database Schema (PostgreSQL)

### `news_posts`

- `id` UUID PK
- `slug` VARCHAR(180) UNIQUE NOT NULL
- `title` VARCHAR(200) NOT NULL
- `summary` TEXT NOT NULL
- `image_url` TEXT NULL
- `source_url` TEXT NULL
- `source_name` VARCHAR(120) NULL
- `category` VARCHAR(40) NOT NULL
- `tags` TEXT[] DEFAULT '{}'
- `published_at` TIMESTAMP WITH TIME ZONE NOT NULL
- `created_at` TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
- `updated_at` TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
- `status` VARCHAR(20) NOT NULL DEFAULT 'published'
- `like_count` INT NOT NULL DEFAULT 0
- `bookmark_count` INT NOT NULL DEFAULT 0

Indexes:

- `idx_news_posts_published_at` on (`published_at` DESC)
- `idx_news_posts_category_published` on (`category`, `published_at` DESC)
- `idx_news_posts_status_published` on (`status`, `published_at` DESC)
- `idx_news_posts_tags_gin` GIN on (`tags`)
- Full-text index on `(title, summary)` using `to_tsvector`

### `news_interactions` (optional)

- `id` UUID PK
- `user_id` UUID NOT NULL
- `post_id` UUID NOT NULL REFERENCES `news_posts(id)`
- `interaction_type` VARCHAR(20) NOT NULL (`like`, `bookmark`)
- `created_at` TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
- UNIQUE (`user_id`, `post_id`, `interaction_type`)

## Scaling Suggestions

- Use cursor-based pagination (`published_at`, `id`) for stable infinite scroll
- Add Redis caching for the first 2-3 pages per category/search
- Move images to object storage (S3 + CDN) and store optimized URLs
- Push heavy enrichment (tag extraction, moderation, dedupe) to async jobs/queues
- Add analytics events for engagement (`view`, `click`, `like`, `save`) to improve ranking
- Introduce role-based admin auth + audit logs before opening to multiple editors

