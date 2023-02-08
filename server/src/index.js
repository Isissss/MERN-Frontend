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

    socket.on("joinroom", (data) => {
        socket.leave(socket.rooms)
        socket.join(data);
        console.log(socket.rooms)
        console.log(`User Joined Room: ${data}`);
    });

    
    socket.on("hello", (data) => {
        // socket.join(room);
        console.log(data);
        socket.to(data).emit("update");
    });

    // socket.on("update", () => {
    //     console.log(socket.room)
    //     socket.broadcast.emit("sendUpdate");
    //     console.log("update");
    // });

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
