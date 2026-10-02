const slugSeparators = new RegExp("[^\\p{L}\\p{N}\\p{M}]+", "gu");
const slugText = new RegExp("[\\p{L}\\p{N}]", "u");

export function buildBlogSlug(title: string): string {
  const slug = title
    .normalize("NFC")
    .toLowerCase()
    .trim()
    .replace(slugSeparators, "-")
    .replace(/^-+|-+$/g, "");
  return slugText.test(slug) ? slug : "post";
}

export function buildBlogPath(locale: string, id: string, title: string): string {
  return `/${encodeURIComponent(locale)}/blog/${encodeURIComponent(id)}/${encodeURIComponent(buildBlogSlug(title))}`;
}
