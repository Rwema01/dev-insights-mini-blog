import React from "react";
import type { PostType } from "../types/Post";
import { formatDate } from "../utils/postUtils";
import styles from "./Post.module.css";

interface PostProps {
  post: PostType;
  isMostRecent: boolean;
  isLongest: boolean;
}

/**
 * Renders a single blog post.
 *
 * Wrapped in React.memo so it only re-renders when its props change.
 * This is our optimization technique: when PostList re-renders (e.g. on
 * a parent state change), posts whose props are unchanged will skip
 * rendering entirely.
 */
function Post({ post, isMostRecent, isLongest }: PostProps) {
  // Conditional class names (styling method 1: CSS Modules)
  const cardClasses = [styles.card];
  if (isMostRecent) cardClasses.push(styles.mostRecent);

  // Conditional inline style (styling method 2: inline styles)
  // Applies a subtle left border only to the longest post.
  const inlineStyle: React.CSSProperties = isLongest
    ? { borderLeft: "4px solid #6c5ce7" }
    : {};

  return (
    <article className={cardClasses.join(" ")} style={inlineStyle}>
      <header className={styles.postHeader}>
        <h2 className={styles.title}>{post.title}</h2>
        {isMostRecent && <span className={styles.badge}>Most Recent</span>}
        {isLongest && <span className={styles.longestBadge}>Longest Read</span>}
      </header>

      <p className={styles.meta}>
        By <strong>{post.author}</strong> · {formatDate(post.datePosted)}
      </p>

      <p className={styles.content}>{post.content}</p>
    </article>
  );
}

// React.memo prevents re-renders when props are shallow-equal.
export default React.memo(Post);