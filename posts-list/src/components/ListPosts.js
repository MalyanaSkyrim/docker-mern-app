import store from "../state_managment/store";
import { loadPosts } from "../state_managment/actions";
import Post from "./Post";
import React, { Component } from "react";

const mapState = ()=> ({
  posts:store.getAllPosts()
} ) 

class ListPosts extends Component {
  state = {
    ...mapState()
  };

  componentDidMount() {
    store.addChangeListener(this._onChange);
    loadPosts();
  }

  componentWillUnmount(){
    store.removeChangeListener(this._onChange);
  }

  _onChange =() => {
    this.setState({
      ...mapState()
    });
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

export default ListPosts;
