import { getCollection } from 'astro:content';
import { tagSlug } from './workaround-tags';
import { isWorkaroundSource } from './workaround-source';

export interface Workaround {
  id: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
}

export async function getWorkarounds(): Promise<Workaround[]> {
  const docs = await getCollection('docs', ({ filePath }) => isWorkaroundSource(filePath));
  return docs.map(({ id, data }) => ({
    id: (id.endsWith('/index') ? id.slice(0, -6) : id).normalize(),
    title: data.title,
    description: data.description!,
    tags: data.tags!,
    publishedAt: data.publishedAt as string,
  })).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

export function getWorkaroundTags(workarounds: Workaround[]) {
  const tags = new Map<string, string>();
  for (const { tags: names } of workarounds) {
    for (const name of names) {
      const slug = tagSlug(name);
      if (!slug) throw new Error(`Workaround tag "${name}" cannot produce a URL`);
      const existing = tags.get(slug);
      if (existing !== undefined && existing !== name) {
        throw new Error(`Workaround tags "${existing}" and "${name}" produce the same URL: ${slug}`);
      }
      tags.set(slug, name);
    }
  }
  return tags;
}
