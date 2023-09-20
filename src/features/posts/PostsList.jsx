import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";

import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  // Sort posts in reverse chronological order by datetime string
  // localeCompare() compares two strings and returns -1 if the first string
  // comes before the second string in sort order, 1 if it comes after the second
  // string in sort order, and 0 if they are equivalent.
  // slice() returns a copy of the array (posts) so that we don't mutate the original

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
