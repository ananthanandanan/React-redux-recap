import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded, addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // get all users from the store
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // title, content, userId are all required fields
  // addRequestStatus === 'idle' means that the form is not currently submitting
  // if addRequestStatus === 'pending', the form is currently submitting and
  // we don't want to allow the user to submit the form again until the current submission is complete
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({
            title,
            body: content,
            userId,
          })
        ).unwrap();
        // unwrap() returns the actual value of the fulfilled action payload (the post object)
        // and throws an error if the promise is rejected
        // This is useful for handling asynchronous errors with a try/catch block around the unwrap() call.
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
    console.log("Save Post Clicked");
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
