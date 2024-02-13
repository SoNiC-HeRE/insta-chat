import express from 'express';
import http from 'http'; 
import morgan from 'morgan';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';

const app = express();

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
});

app.use(cors());
app.use(morgan('dev'));

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${data} joined the chat!`);
    });

    socket.on("send_message", (data)=>{
        socket.emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
  console.log(`Server running at PORT:3000`);
});