import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./Post";
import { loadPosts } from "../state_managment/actions";
import db from "../db";

const ListPosts = () => {
  const dispatch = useDispatch();
  const loadPostList = () => dispatch(loadPosts());
  const posts = useSelector(state => state.postsReducer.posts);
  useEffect(() => {
    loadPostList();
    db.changeCB = change => loadPostList();
  }, []);
  return (
    <div className="list-posts">
      {posts.map(post => (
        <Post key={post.id} {...post}></Post>
      ))}
    </div>
  );
};

export default ListPosts;
