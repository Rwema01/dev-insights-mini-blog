import type { PostType } from "../types/Post";

/**
 * Returns the id of the most recent post (by datePosted).
 * Falls back to null if the list is empty.
 */
export function getMostRecentPostId(posts: PostType[]): number | null {
  if (posts.length === 0) return null;

  return posts.reduce((latestId, post, _, arr) => {
    const latest = arr.find((p) => p.id === latestId)!;
    return new Date(post.datePosted) > new Date(latest.datePosted)
      ? post.id
      : latestId;
  }, posts[0].id);
}

/**
 * Returns the id of the post with the longest content.
 * Used for conditional styling (a "Longest read" label).
 */
export function getLongestPostId(posts: PostType[]): number | null {
  if (posts.length === 0) return null;

  return posts.reduce((longestId, post, _, arr) => {
    const longest = arr.find((p) => p.id === longestId)!;
    return post.content.length > longest.content.length
      ? post.id
      : longestId;
  }, posts[0].id);
}

/**
 * Formats an ISO date string into a friendlier display format.
 * "2026-09-23" -> "Sep 23, 2026"
 */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}