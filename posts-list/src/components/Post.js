import React, { Component } from "react";
import dispatcher from "../state_managment/dispatcher";
import { deletePost } from "../state_managment/actions";
import types from "../state_managment/actionTypes";
import Subscrip from "../state_managment/Subscrip";

const Post = post => {
  const { title, content } = post;
  const editPost = () =>
    dispatcher.dispatch({
      type: types.EDIT_POST,
      payload: {
        update: true,
        ...post
      }
    });

  return (
    <div className="post">
      <div className="post__container">
        <h2 className="post__title">{title}</h2>
        <p className="post__content">{content}</p>
      </div>
      <div className="form__group form__group--btn form__group--post">
        <button onClick={editPost} className="btn btn--update">
          Update
        </button>
        <button onClick={() => deletePost(post)} className="btn btn--delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
