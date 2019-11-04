import React from "react";
import { deletePost, editPost } from "../state_managment/actions";

const Post = ({ id, title, content }) => {
  return (
    <div className="post">
      <div className="post__container">
        <h2 className="post__title">{title}</h2>
        <p className="post__content">{content}</p>
      </div>
      <div className="form__group form__group--btn form__group--post">
        <button
          onClick={() => editPost({ id, title, content })}
          className="btn btn--update"
        >
          Update
        </button>
        <button onClick={() => deletePost(id)} className="btn btn--delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
