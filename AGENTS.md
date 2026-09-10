# Adventure - Development Guide

## Tech Stack
- Astro v6 + Starlight (docs framework)
- React 19 + Tailwind CSS v4
- TypeScript
- Storybook 10 for component explorer
- Vitest + Playwright for testing

## Key Commands
```bash
npm run dev          # Start dev server
npm run build         # Production build
npm run preview       # Preview production build
npm run storybook     # Component explorer (port 6006)
npm run build-storybook
```

## Content Structure
- `src/content/docs/cheatsheet/` - Cheatsheet MDX files
- `src/content/docs/{name}-adventure/` - Course modules
- `src/components/` - React & Astro components

## Cheatsheets
When asked to write a "cheatsheet" or "cheatcode", load and follow the `write-cheatsheet` skill (`.opencode/skills/write-cheatsheet/SKILL.md`) — it contains the full template, style rules, and `<ChatMessage>` usage guide.

## Sidebar Configuration
Sidebar is configured in `astro.config.mjs` via `starlightSidebarTopics` plugin. Course directories are auto-discovered.

## Content Language
- Use **Thai** as the primary language for content
- Technical terms that are commonly used can be in English (e.g., Pod, Deployment, kubectl, API, SDK)
- Avoid using Thai for long, complex terms (e.g., "container orchestration" instead of "การจัดการ container orchestration")

## Architecture Notes
- Site builds to `dist/` folder
- Mermaid diagrams supported via `astro-mermaid`
- Starlight custom CSS at `src/styles/starlight-theme.css`