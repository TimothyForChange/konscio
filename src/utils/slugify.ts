export function slugifyPath(path: string): string {
  if (!path) {
    return '';
  }

  const fileName = path.split(/[/\\]/).pop() ?? '';
  return fileName.replace(/\.[^/.]+$/, '');
}
