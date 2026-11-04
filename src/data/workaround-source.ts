export function isWorkaroundSource(filePath: string | undefined): boolean {
  return filePath !== undefined && /(?:^|\/)src\/content\/docs\/workaround\//.test(filePath.replaceAll('\\', '/'));
}
