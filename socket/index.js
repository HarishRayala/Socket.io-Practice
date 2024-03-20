import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors:{
    origin:"http://localhost:3000",
    // methods: ["GET", "POST"]
  }
});

let onlineUsers=[]
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};


const removeUser=(socketId)=>{
  onlineUsers=onlineUsers.filter(user=>user.socketId !==socketId)
}

const getUser=(username)=>{
  return onlineUsers.find((user)=>user.username===username)
}
// [
//   {
//     username:"john",
//     socketId:"shgdysdysudhsiudi"
//   },
//   {
//     username:"monika",
//     socketId:"hgasgsgydsusidsis"
//   }
// ]

io.on("connection", (socket) => {
  // io.emit("firstEvent", "Hello this is test!")

  // for specific id
  // here inside to it is socketid but to know whose id is this and which connection we have another way
  // io.to("shshuhsuuud").emit("firstEvent", "Hello this is test!")


  socket.on("newUser",(username)=>{
    addNewUser(username,socket.id)
  })
  
  socket.on("sendNotification",({senderName,receiverName,type})=>{
    const receiver=getUser(receiverName)
    io.to(receiver?.socketId).emit("getNotification",{
      senderName,
      type
    })
  })

  socket.on("disconnect", ()=>{
    removeUser(socket.id)
    console.log("someone has disconnected")
  })
});

httpServer.listen(5000);