const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:1234",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("joinRoom", (data) => {
        console.log(`User Connected: ${socket.id} to room: ${data}`);
        socket.join(data);
        socket.emit("joinRoom", data);
    });

    socket.on("leaveRoom", (data) => {
        socket.leave(data);
        console.log(`User Disconnected: ${socket.id} from room: ${data}`)
    });

    socket.on("sendUpdate", (data) => {
        socket.to(data).emit("update");
    });

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });

});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
