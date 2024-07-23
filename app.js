const express = require("express");
const app = express();
const { Server } = require("socket.io");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const cors = require('cors');

app.use(cors());
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connect",(socket)=>{
    console.log("user connected");
    socket.on("send-location",(data)=>{
        io.emit("recieve-location", {id: socket.id, ...data});
    })

    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    });
})

app.get("/",(req,res)=>{
    res.render("index");
})

server.listen(5000);
