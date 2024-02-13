import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

const server = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server,{
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});