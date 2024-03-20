import React, { useEffect, useState } from "react";
import "./navbar.css";
import MessageIcon from "../../img/message.svg";
import SettingsIcon from "../../img/settings.svg";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "Commented";
    } else {
      action = "Shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  const handleRead=()=>{
    setNotifications([])
    setOpen(false)
  }
  return (
    <div className="navbar">
      <span className="logo">Hum App 🎵</span>
      <div className="icons">
        <div className="icon" onClick={()=>setOpen(!open)}>
          <img
            src="https://img.icons8.com/dotty/80/FFFFFF/appointment-reminders.png"
            className="iconImg"
            alt="notificationImage"
          />
          {notifications.length>0 &&<div className="counter">{notifications.length}</div>}
        </div>
        <div className="icon" >
          <img src={MessageIcon} className="iconImg" alt="notificationImage" />
        </div>
        <div className="icon" >
          <img src={SettingsIcon} className="iconImg" alt="notificationImage" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>{notifications.length>0?"Mark as read":"No New Notification"}</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
