import { combineReducers } from "redux";
import types from "./actionTypes";

const initialState = {
  posts: [],
  isLoading: false,
  listNotif: [],
  edit: {
    update: false,
    post: {}
  }
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_POSTS: {
      return { ...state, posts: payload };
    }
    case types.ADD_POST: {
      const posts = [...state.posts];
      posts.push(payload);
      return { ...state, posts };
    }

    case types.UPDATE_POST: {
      let posts = [...state.posts];
      posts = posts.map(post => {
        if (post.id === payload.id) {
          return payload;
        }
        return post;
      });
      return { ...state, posts, edit: { update: false, post: {} } };
    }

    case types.EDIT_POST: {
      return { ...state, edit: payload };
    }

    case types.DELETE_POST: {
      const posts = [...state.posts].filter(post => post.id != payload);
      return { ...state, posts };
    }

    case types.START_LOADER: {
      return { ...state, isLoading: true };
    }

    case types.STOP_LOADER: {
      return { ...state, isLoading: false };
    }

    case types.NOTIFY: {
      const listNotif = [...state.listNotif];
      listNotif.push(payload);
      return { ...state, listNotif };
    }

    case types.ClOSE_NOTIF: {
      const listNotif = [...state.listNotif].filter(
        notif => notif.id != payload
      );
      return { ...state, listNotif };
    }

    default:
      return state;
  }
};

export default combineReducers({
  postsReducer
});
