export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

export function tagHref(tag: string): string {
  return `/workarounds/tags/${encodeURIComponent(tagSlug(tag))}/`;
}
