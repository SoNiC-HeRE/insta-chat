import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import path from "path";

const __dirname = path.resolve();
const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname, "frontend" ,"dist", "index.html"));
})

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} joined the chatroom: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log(`Server running at PORT:3000`);
});
