import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../state_managment/actions";
import types from "../state_managment/actionTypes";

const Post = post => {
  const { id, title, content } = post;
  const dispatch = useDispatch();
  const editPost_ = () =>
    dispatch({
      type: types.EDIT_POST,
      payload: {
        update: true,
        post
      }
    });
  const deletePost_ = () => dispatch(deletePost(post));

  return (
    <div className="post">
      <div className="post__container">
        <h2 className="post__title">{title}</h2>
        <p className="post__content">{content}</p>
      </div>
      <div className="form__group form__group--btn form__group--post">
        <button onClick={editPost_} className="btn btn--update">
          Update
        </button>
        <button onClick={deletePost_} className="btn btn--delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
