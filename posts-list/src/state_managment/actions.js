import axios from "axios";
import dispatcher from "./dispatcher";
const instance = axios.create({
  baseURL: "http://localhost:5500/api"
});

export const loadPosts = async () => {
  const result = await instance.get("/posts");
  dispatcher.dispatch({
    type: "LOAD_POSTS",
    payload: result.data.posts
  });
};

export const addPost = async post => {
  await instance.post("/posts", post);
  dispatcher.dispatch({
    type: "ADD_POST",
    payload: post
  });
};
export const deletePost = async post_id => {
  await instance.delete(`/posts/${post_id}`);
  dispatcher.dispatch({
    type: "DELETE_POST",
    payload: post_id
  });
};
export const editPost = post => {
  dispatcher.dispatch({
    type: "EDIT_POST",
    payload: post
  });
};

export const updatePost = async post => {

  await instance.patch(`/posts`, post);
  dispatcher.dispatch({
    type: "UPDATE_POST",
    payload: post
  });
};
