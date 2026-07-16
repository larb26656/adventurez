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

## Cheatsheet Format
When asked to write "cheatcode" or "cheatsheet", create the file in `src/content/docs/cheatsheet/`

New cheatsheets go in `src/content/docs/cheatsheet/` with frontmatter:
```mdx
---
title: Tool Name
description: A brief description
---
```
Use `<ChatMessage>` component for conversational notes.

## Cheatsheet Style Guidelines
Follow this pattern for cheatsheets:
- **Frontmatter**: `title` and `description`
- **Intro**: Brief explanation of the tool at the top (1-2 sentences + feature list)
- **Structure**: `##` for main sections, `###` for subsections
- **Code blocks**: Use ```bash for commands, ```json for JSON examples
- **Emphasis**: Use **bold** for important terms, `code` for command names
- **Lists**: Use numbered lists for multi-item concepts (e.g., permission types)
- **Blockquotes**: Use `>` for simple analogies or notes
- **ChatMessage**: Use `<ChatMessage>` for conversational Q&A between "me" (isFromMe="true") and "blackCat" (avatarKey="blackCat")

Example structure:
```mdx
---
title: Tool Name
description: A brief description
---

import ChatMessage from '../../../components/ChatMessage.astro';

Brief intro explaining what the tool is...

## Main Section

### Subsection

```bash
# comment describing command
command
```

<ChatMessage message="explanatory note" avatarKey="blackCat" />
```

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