import { EventEmitter } from "events";
import dispatcher from "./dispatcher";
const CHANGE_EVENT ='change';

class Store extends EventEmitter {
  constructor() {
    super();
    this.posts = [];

    this.editingPost = {
      update: false,
      post: {}
    };
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback){
   
    this.on(CHANGE_EVENT,callback);
  }

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT,callback);
  }


  loadPosts(posts) {
  
    this.posts = posts;
    
  }

  deletePost(post_id) {
    const posts = this.posts.filter(post => post.id != post_id);
    this.posts = posts;
    if(this.editingPost.post.id == post_id){
      this.editingPost = {
        post:{},
        update:false
      }

    } 
    
  }

  addPost(post) {
    this.posts.push(post);
    
  }

  editPost(post) {
    this.editingPost = {
      post,
      update: true
    };
    
  }

  updatePost(newPost) {
    this.posts = this.posts.map(post => {
      if (post.id == newPost.id) return newPost;
      else return post;
    });
    
  }

  getEditing() {
    return this.editingPost;
  }

  getAllPosts() {
    return this.posts;
  }

  handleActions = action => {
    console.log("store recieved action :", action);
    const { type, payload } = action;
    switch (type) {
      case "LOAD_POSTS":
         this.loadPosts(payload);
         break;
      case "ADD_POST":
        this.addPost(payload);
        break;
      case "DELETE_POST":
         this.deletePost(payload);
         break;
      case "EDIT_POST":
         this.editPost(payload);
         break;
      case "UPDATE_POST":
        this.updatePost(payload);
        break;
    }
    this.emitChange();
  };
}

const store = new Store();

dispatcher.register(store.handleActions);
//window.dispatcher = dispatcher;

export default store;
