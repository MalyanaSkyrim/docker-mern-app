import uuid from "uuid/v1";
import types from "./actionTypes";
import dispatcher from "../state_managment/dispatcher";
import db from "../db";

const handleError = err => {
  console.log(err);
  dispatcher.dispatch({ type: types.STOP_LOADER });
  // dispatcher.dispatch({
  //   type: types.NOTIFY,
  //   payload: { id: uuid(), type: "error", msg }
  // });
};

export const loadPosts = async () => {
  try {
    dispatcher.dispatch({ type: types.START_LOADER });
    const data = await db.getAllPosts();
    console.log(data);
    dispatcher.dispatch({
      type: types.LOAD_POSTS,
      payload: data
    });
    dispatcher.dispatch({ type: types.STOP_LOADER });
  } catch (err) {
    handleError(err);
  }
};

export const addPost = async post => {
  try {
    dispatcher.dispatch({ type: types.START_LOADER });
    const msg = await db.createPost(post);
    dispatcher.dispatch({ type: types.ADD_POST, payload: post });
    dispatcher.dispatch({ type: types.STOP_LOADER });
    dispatcher.dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    return handleError(err);
  }
};

export const deletePost = async post => {
  try {
    dispatcher.dispatch({ type: types.START_LOADER });
    const msg = await db.deletePost(post);

    dispatcher.dispatch({ type: types.DELETE_POST, payload: post.id });
    dispatcher.dispatch({ type: types.STOP_LOADER });
    dispatcher.dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    handleError(err);
  }
};

export const updatePost = async post => {
  try {
    dispatcher.dispatch({ type: types.START_LOADER });
    const msg = await db.updatePost(post);

    dispatcher.dispatch({ type: types.UPDATE_POST, payload: post });
    dispatcher.dispatch({ type: types.STOP_LOADER });
    dispatcher.dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    handleError(err);
  }
};

db.changeCB = () => loadPosts();
