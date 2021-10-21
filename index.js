const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected at : ${socket.id}`);

  socket.on("join_room", (data, name) => {
    socket.join(data, name);
    console.log(
      `User with id : ${socket.id}, joined room : ${data} he name is : ${name}`
    );
  });
  socket.on("send_message", (data) => {
    console.log(data)
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
