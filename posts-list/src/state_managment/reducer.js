import types from "./actionTypes";

const postsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_POSTS: {
      return { ...state, posts: payload };
    }
    case types.ADD_POST: {
      const posts = [...state.posts];
      const edit = state.edit;
      posts.push(payload);
      return { ...state, posts, edit: { ...edit, title: "", content: "" } };
    }

    case types.UPDATE_POST: {
      let posts = [...state.posts];
      posts = posts.map(post => {
        if (post.id === payload.id) {
          return payload;
        }
        return post;
      });
      const edit = state.edit;
      return {
        ...state,
        posts,
        edit: { ...edit, title: "", content: "", update: false }
      };
    }

    case types.EDIT_POST: {
      const edit = state.edit;
      return { ...state, edit: { ...edit, ...payload, update: true } };
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

    case types.INPUT_CHANGE: {
      const newEdit = { ...state.edit, ...payload };
      console.log({ newEdit });
      return { ...state, edit: newEdit };
    }

    default:
      return state;
  }
};

export default postsReducer;
