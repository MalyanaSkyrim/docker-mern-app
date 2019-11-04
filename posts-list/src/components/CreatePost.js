import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "uuid/v1";
import { addPost, updatePost } from "../state_managment/actions";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { update, post } = useSelector(state => state.postsReducer.edit);
  const dispatch = useDispatch();
  const addPost_ = post => dispatch(addPost(post));
  const updatePost_ = post => dispatch(updatePost(post));
  const handleSubmit = e => {
    e.preventDefault();
    if (update) {
      console.log("okay update");
      updatePost_({ ...post, title, content });
    } else {
      const id = uuid();
      addPost_({ id, title, content });
    }
    setTitle("");
    setContent("");
  };
  const handleChange = e => {
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "content") setContent(e.target.value);
  };

  useEffect(() => {
    if (update) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [update]);

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

export default CreatePost;
