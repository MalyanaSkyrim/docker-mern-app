import React, { Component } from "react";
import Post from "./Post";
import { loadPosts } from "../state_managment/actions";
import Subscrip from "../state_managment/Subscrip";

const mapState = (store, props) => ({ posts: store.getState().posts });

class ListPosts extends Component {
  state = this.props.state;

  componentDidMount = () => {
    loadPosts();
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(state) != props.state) return props.state;
    return state;
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="list-posts">
        {posts.map(post => (
          <Post key={post.id} {...post}></Post>
        ))}
      </div>
    );
  }
}

export default Subscrip(ListPosts, mapState);
