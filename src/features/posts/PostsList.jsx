import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

function PostsList() {
  const posts = useSelector(selectAllPosts);

  // Sort posts in reverse chronological order by datetime string
  // localeCompare() compares two strings and returns -1 if the first string
  // comes before the second string in sort order, 1 if it comes after the second
  // string in sort order, and 0 if they are equivalent.
  // slice() returns a copy of the array (posts) so that we don't mutate the original
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
