import React, { useEffect, useState } from "react";
import MessageIcon from "../../img/message.svg";
import "./Navbar.css";
import SettingsIcon from "../../img/settings.svg";
import FetchProducts from "./FetchProducts";
import { io } from "socket.io-client";


const Navbar = () => {
  const [socket, setSocket] = useState(null);
  const [notificationCount,setNotificationCount]=useState(0)
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("productCountUpdate", (count) => {
      console.log(count)
      setNotificationCount(count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  console.log(notificationCount)
  return (
    <div className="navbar2">
      <div className="content">
        <div>
          <span className="logo2">Saregama 🎵</span>
        </div>
        <div>
          <div className="icons2">
            <div className="icon2">
              <img
                src="https://img.icons8.com/dotty/80/FFFFFF/appointment-reminders.png"
                className="iconImg2"
                alt="notificationImage"
              />
              {<div className="counter2">{notificationCount}</div>}
            </div>
            <div className="icon2">
              <img
                src={MessageIcon}
                className="iconImg"
                alt="notificationImage"
              />
            </div>
            <div className="icon2">
              <img
                src={SettingsIcon}
                className="iconImg"
                alt="notificationImage"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="notifications2">
        <button className="nButton2">Mark as read</button>
      </div>
    <FetchProducts socket={socket} />
    </div>
  );
};

export default Navbar;
