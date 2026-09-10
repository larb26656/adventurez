---
name: write-cheatsheet
description: Write cheatsheet pages for tools in the Adventurez docs site (Astro/Starlight). Use when the user says "cheatsheet", "cheatcode", "เขียน cheatsheet", asks to create or extend a tool cheatsheet, or wants to document a tool's commands, config, env vars, or docker-compose setup.
---

# Write Cheatsheet

Create cheatsheet pages under `src/content/docs/cheatsheet/` in the Adventurez (Astro v6 + Starlight) site.

## File Conventions

- Path: `src/content/docs/cheatsheet/<tool-name>.mdx`
- Naming: lowercase, kebab-case for multi-word tools (e.g. `oauth2-proxy.mdx`, `cloudflare-tunnel.mdx`)
- Always `.mdx`, never `.md` — the page uses `<ChatMessage>` which requires an MDX import
- One tool per file; the sidebar auto-discovers files in this directory (no config change needed)

## Page Template

````mdx
---
title: Tool Name
description: A cheatsheet of <tool> - <short value statement>
---

import ChatMessage from '../../../components/ChatMessage.astro';

[Tool](https://official-site) คือ <1-2 ประโยคภาษาไทยอธิบายว่า tool นี้คืออะไร> รองรับ <feature หลักๆ>

## จุดเด่นของ <Tool>
- **Feature 1** — คำอธิบายสั้น
- **Feature 2** — คำอธิบายสั้น

## <Main Section>

### <Subsection>

```bash
# คอมเมนต์ไทยอธิบายคำสั่ง
the-command
```

<ChatMessage message="tip ภาษาไทยจาก blackCat" avatarKey="blackCat" />

## Useful Links

- [Official Documentation](https://...)
- [GitHub](https://...)
````

Sections are optional and reordered freely per tool — see reference files below for real shapes.

## Style Rules

- **Language**: Thai is primary. Keep commonly-used technical terms in English (Pod, Deployment, kubectl, API, SDK, bucket, policy). Avoid translating long complex terms (use "container orchestration", not "การจัดการ container orchestration").
- **Headings**: `##` for main sections, `###` for subsections. Thai or English both fine — match what existing files do for the same concept.
- **Code blocks**: always declare a language. ```bash for commands, ```yaml for docker-compose, ```json for policies/config. Every command gets a `# คอมเมนต์ไทย` line above or beside it.
- **Env vars**: render as a table `| Variable | Description | Example |` with the variable name in backticks.
- **Emphasis**: **bold** for important terms, `code` for command/flag names.
- **Blockquote**: `>` for simple analogies or one-line notes (e.g. `> เปรียบเหมือน โฟลเดอร์ใหญ่ ที่เก็บไฟล์หลาย ๆ ตัว`).
- **Lists**: numbered lists for multi-item concepts (e.g. permission types), bullets for feature lists.
- **Ending**: close the page with `## Useful Links` pointing to official docs.

## ChatMessage Usage

The `<ChatMessage>` component renders a chat bubble with an avatar. Available avatars: `me`, `blackCat`, `whiteCat` (only `me` and `blackCat` are used so far).

Three patterns:

1. **blackCat tip** — explanatory note from the cat assistant:
   ```mdx
   <ChatMessage message="ถ้าใช้ GRIST_SINGLE_ORG จะไม่ต้องเลือก org ตอนเข้าใช้" avatarKey="blackCat" />
   ```
2. **me asks** — question from the author:
   ```mdx
   <ChatMessage message="ก่อนจะเริ่มใช้งาน Minio client จะต้องสร้าง alias ก่อน" avatarKey="me" isFromMe="true" />
   ```
3. **Dialogue** — consecutive bubbles, me asks then blackCat answers (one per line):
   ```mdx
   <ChatMessage message="ถ้าอยากให้ User ใน Group มีสิทธิ์เพิ่ม → แค่เพิ่ม Policy ให้ Group ใช่ไหม?" avatarKey="me" isFromMe="true" />
   <ChatMessage message="ใช่แล้ว~" avatarKey="blackCat" />
   ```

If the message contains backticks, use the JSX expression form: `message={'ข้อความที่มี `code` ข้างใน'}`.

## Reference Files

Read these before writing if you need a concrete shape:

- `src/content/docs/cheatsheet/grist.mdx` — env var tables, docker-compose variants, OAuth2 proxy setup
- `src/content/docs/cheatsheet/minio.mdx` — concept sections, dialogue pattern
- `src/content/docs/cheatsheet/fail2ban.mdx` — multi-line ChatMessage props
- Do NOT copy `docker.md` / `k8s.md` — legacy `.md` files with a missing/broken ChatMessage import

## Checklist Before Finishing

1. File is `.mdx` in `src/content/docs/cheatsheet/` with kebab-case name
2. Frontmatter has `title` (capitalized tool name) and `description`
3. ChatMessage import present: `import ChatMessage from '../../../components/ChatMessage.astro';`
4. Every `<ChatMessage>` has `avatarKey`; `isFromMe="true"` only with `avatarKey="me"`
5. Every code block declares a language and commands have Thai comments
6. Page ends with `## Useful Links`
7. Run `npm run build` — it must pass
