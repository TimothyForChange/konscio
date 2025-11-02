export function slugifyPath(path: string): string {
  const fileName = path.split(/[/\\]/).pop() ?? "";
  return fileName.replace(/\.[^/.]+$/, "");
}
