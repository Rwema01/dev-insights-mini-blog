import { samplePosts } from "../data/posts";
import { getMostRecentPostId, getLongestPostId } from "../utils/postUtils";
import Post from "./Post";
import styles from "./PostList.module.css";

function PostList() {
  const mostRecentId = getMostRecentPostId(samplePosts);
  const longestId = getLongestPostId(samplePosts);

  return (
    <section className={styles.list}>
      <h2 className={styles.heading}>Latest Posts</h2>

      {samplePosts.map((post) => (
        // The `key` prop is critical for React's reconciliation algorithm.
        // Using a stable, unique id (not array index) prevents bugs when
        // the list order changes.
        <Post
          key={post.id}
          post={post}
          isMostRecent={post.id === mostRecentId}
          isLongest={post.id === longestId}
        />
      ))}
    </section>
  );
}

export default PostList;