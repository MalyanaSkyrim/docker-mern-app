import uuid from "uuid/v1";
import types from "./actionTypes";
import db from "../db";

const handleError = (err, dispatch) => {
  console.log(err);
  dispatch({ type: types.STOP_LOADER });
  // dispatch({
  //   type: types.NOTIFY,
  //   payload: { id: uuid(), type: "error", msg }
  // });
};

export const loadPosts = () => async dispatch => {
  try {
    dispatch({ type: types.START_LOADER });
    const data = await db.getAllPosts();
    dispatch({
      type: types.LOAD_POSTS,
      payload: data
    });
    dispatch({ type: types.STOP_LOADER });
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const addPost = post => async dispatch => {
  try {
    dispatch({ type: types.START_LOADER });
    const msg = await db.createPost(post);

    dispatch({ type: types.ADD_POST, payload: post });
    dispatch({ type: types.STOP_LOADER });
    dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    return handleError(err, dispatch);
  }
};

export const deletePost = post => async dispatch => {
  try {
    dispatch({ type: types.START_LOADER });
    const msg = await db.deletePost(post);

    dispatch({ type: types.DELETE_POST, payload: post.id });
    dispatch({ type: types.STOP_LOADER });
    dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    handleError(err, dispatch);
  }
};

export const updatePost = post => async dispatch => {
  try {
    dispatch({ type: types.START_LOADER });
    const msg = await db.updatePost(post);

    dispatch({ type: types.UPDATE_POST, payload: post });
    dispatch({ type: types.STOP_LOADER });
    dispatch({
      type: types.NOTIFY,
      payload: { id: uuid(), type: "success", msg }
    });
  } catch (err) {
    handleError(err, dispatch);
  }
};
