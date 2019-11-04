import React from "react";
import CreatePost from "./components/CreatePost";
import ListPosts from "./components/ListPosts";
import Notifications from "./components/Notifications";
import Loader from "./components/Loader";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <CreatePost></CreatePost>
      <ListPosts></ListPosts>
      <Notifications></Notifications>
      <Loader></Loader>
    </div>
  );
}

export default App;
