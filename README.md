# Adventure

A personal learning platform for documenting courses and cheatsheets on various technology topics.

## Project Overview

Adventure is a documentation and learning platform that provides interactive courses and quick reference cheatsheets. It features a clean, modern interface designed for easy navigation through learning materials.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v6 with static site generation
- **UI Framework**: [React](https://react.dev/) 19 for interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Documentation**: [Starlight](https://starlight.astro.build/) (Astro's documentation framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Component Explorer**: [Storybook](https://storybook.js.org/) 10

## Project Structure

```
src/
├── components/          # React & Astro components
│   ├── ui/              # Reusable UI components
│   ├── quiz/            # Quiz components
│   └── DebugCanvas/     # Interactive debugging tools
├── content/
│   └── docs/            # Documentation content (MDX)
│       ├── cheatsheet/  # Cheatsheet articles
│       └── *-adventure/ # Course modules
├── data/                # Data layer (courses, cheatsheets)
├── pages/               # Astro pages
└── styles/              # Global styles
```

## Courses

Self-paced learning modules covering various technology topics:

- **Docker Adventure** - Container fundamentals and orchestration
- **GitHub Actions Adventure** - CI/CD pipeline development
- **n8n Adventure** - Workflow automation

Each course includes hands-on exercises and practical examples.

## Cheatsheets

Quick reference guides for common tools and technologies:

- Docker, PostgreSQL, Linux, Traefik, SSL
- SDKman, Shadcn, MinIO, Cloudflare Tunnel, OpenFeign

## How to Contribute

### Adding a New Course

1. Create a new folder in `src/content/docs/` following the `{course-name}-adventure` naming convention
2. Add a frontmatter configuration with metadata:

```mdx
---
title: Your Course Title
description: Course description
thumbnail: /path/to/thumbnail.png
tags: [Tag1, Tag2]
categories: [Technology]
level: Beginner|Intermediate|Advanced
color: "#hexcode"
---
```

3. Add lesson files numbered sequentially (e.g., `01-getting-started.mdx`, `02-advanced.mdx`)
4. The course will automatically appear on the homepage

### Adding a New Cheatsheet

1. Create a new file in `src/content/docs/cheatsheet/` with the tool name as the filename (e.g., `docker.md`)
2. Add frontmatter with metadata:

```mdx
---
title: Tool Name
description: A brief description
tags: [Tag1, Tag2]
categories: [Category]
---
```

3. Write your cheatsheet content in MDX format
4. The cheatsheet will automatically appear in the cheatsheet gallery

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Storybook component explorer
npm run storybook

# Build Storybook static site
npm run build-storybook
```

## License

MIT