import React from "react";
import uuid from "uuid/v1";
import { addPost, updatePost } from "../state_managment/actions";
import Subscrip from "../state_managment/Subscrip";
import dispatcher from "../state_managment/dispatcher";
import types from "../state_managment/actionTypes";

const mapState = (store, props) => ({
  ...store.getState().edit
});

const CreatePost = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const { update, ...post } = props.state;
    if (update) {
      updatePost(post);
    } else {
      const id = uuid();
      addPost({ id, title, content });
    }
  };
  const handleChange = e => {
    dispatcher.dispatch({
      type: types.INPUT_CHANGE,
      payload: { [e.target.name]: e.target.value }
    });
  };
  const { title, content } = props.state;
  return (
    <div className="create-post">
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group">
          <label className="form__label">Title :</label>
          <input
            name="title"
            value={title}
            onChange={handleChange}
            className="form__input"
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Content :</label>
          <textarea
            name="content"
            value={content}
            onChange={handleChange}
            className="form__text"
          ></textarea>
        </div>
        <div className="form__group form__group--btn">
          <button className="btn btn--add">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Subscrip(CreatePost, mapState);
