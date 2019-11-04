import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import types from "../state_managment/actionTypes";

const Notifications = () => {
  const listNotif = useSelector(state => state.postsReducer.listNotif);

  return (
    <div className="notif-container">
      {listNotif.map(notif => (
        <Notification key={notif.id} {...notif}></Notification>
      ))}
    </div>
  );
};

const Notification = ({ id, type, msg }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: types.ClOSE_NOTIF, payload: id });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className={`notif notif--${type}`}>
      <i
        className={`notif__icon fas ${
          type === "error" ? "fa-exclamation-triangle" : "fa-check"
        }`}
      ></i>
      <p className="notif__msg">{msg}</p>
      <i
        onClick={() => dispatch({ type: types.ClOSE_NOTIF, payload: id })}
        className="notif__icon--close fas fa-times"
      ></i>
    </div>
  );
};

export default Notifications;
