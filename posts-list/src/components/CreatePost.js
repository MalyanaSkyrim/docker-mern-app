import React, { Component } from "react";
import uuid from "uuid/v1";
import { addPost, updatePost } from "../state_managment/actions";
import Subscrip from "../state_managment/Subscrip";

const mapState = (store, props) => store.getState().edit;

class CreatePost extends Component {
  state = this.props.state;
  handleSubmit = e => {
    e.preventDefault();
    const { update, post, title, content } = this.state;
    if (update) {
      updatePost({ ...post, title, content });
    } else {
      const id = uuid();
      addPost({ id, title, content });
    }
    this.setState({ title: "", content: "" });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(state) != props.state) return props.state;

    return state;
  }
  render() {
    const { title, content } = this.state;
    return (
      <div className="create-post">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form__group">
            <label className="form__label">Title :</label>
            <input
              name="title"
              value={title}
              onChange={this.handleChange}
              className="form__input"
            ></input>
          </div>
          <div className="form__group">
            <label className="form__label">Content :</label>
            <textarea
              name="content"
              value={content}
              onChange={this.handleChange}
              className="form__text"
            ></textarea>
          </div>
          <div className="form__group form__group--btn">
            <button className="btn btn--add">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Subscrip(CreatePost, mapState);
