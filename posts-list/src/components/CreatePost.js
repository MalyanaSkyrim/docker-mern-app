import React, { Component } from "react";
import store from "../state_managment/store";
import { addPost, updatePost } from "../state_managment/actions";
import uuid from "uuid/v1";

const initState = {
  title: "",
  content: "",
  update:false,
  post:{}
}

const mapState = ()=>({
  ...store.getEditing(),
  ...store.getEditing().post
})


class CreatePost extends Component {
  state = {
   ...initState
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { post, update, title, content } = this.state;
    if (update) {
      await updatePost({ ...post, title, content });
    } else {
      const id = uuid();
      await addPost({ id, title, content });
      // store.addPost({
      //   id,
      //   title,
      //   content
      // });
    }
    
    this.setState({
      title:"",
      content:"",
      update:false
    });
    console.log(this.state);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    store.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    store.removeChangeListener(this._onChange);
  }
  
  _onChange = () => {
    console.log(this.state);
    this.setState({
      ...mapState()
    });
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

export default CreatePost;
