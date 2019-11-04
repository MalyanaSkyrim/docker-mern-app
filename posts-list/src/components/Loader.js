import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoading = useSelector(state => state.postsReducer.isLoading);
  return isLoading ? (
    <div className="loader">
      <img className="loader__img" src="/loader.jpg"></img>
    </div>
  ) : (
    true
  );
};

export default Loader;
