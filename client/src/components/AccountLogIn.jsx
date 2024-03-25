import React, { useEffect, useState } from "react";
import "./AccountLogin.css";
import Navbar from "./navbar/Navbar";
import Card from "./card/Card";
import { posts } from "../data";
import { io } from "socket.io-client";

const AccountLogIn = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  // console.log(user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const socket = io("http://localhost:5000");
    // console.log(socket.on("firstEvent",(msg)=>{
    //   console.log(msg)
    // }));
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => {
            return (
              <Card key={post.id} post={post} socket={socket} user={user} />
            );
          })}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => setUser(userName)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default AccountLogIn;
