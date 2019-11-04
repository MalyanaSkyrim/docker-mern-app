import { EventEmitter } from "events";
import dispatcher from "./dispatcher";
import postReducer from "./reducer";
const CHANGE_EVENT = "change";

class Store extends EventEmitter {
  constructor() {
    super();
    this.state = {
      posts: [],
      isLoading: false,
      listNotif: [],
      edit: {
        title: "",
        content: "",
        update: false,
        post: {}
      }
    };
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return this.state;
  }

  handleActions = action => {
    this.state = postReducer(this.state, action);
    this.emitChange();
  };
}

const store = new Store();

dispatcher.register(store.handleActions);
window.dispatcher = dispatcher;

export default store;
