const express = require("express");
const socket = require("socket.io");
//require("dotenv").config();

const app = express();

const server = app.listen(process.env.PORT || 3000);

app.use(express.static(`${__dirname}/public`));
//app.use(express.static("/public"));

app.get("/", (req, res) => {
  console.log("request made");
  res.sendFile("/index.html");
});

app.use( (req, res) => {
  res.redirect("/");
})

const io = socket(server);

io.on("connection", socket => {
  console.log("socket connection made:", socket.id);
  
  socket.on("password", () => {
    io.sockets.emit("password", {"passwordMiko": "2182Haruhi", "passwordMochi": "Mashiro2607"});
  });

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  /*socket.on("appearance", person => {
    console.log(person + " has logged in");
    if(person == "miko") {
      socket.broadcast.emit("appearanceMiko");
    }
    else if(person == "mochi") {
      socket.broadcast.emit("appearanceMochi");
    }
    else {
      socket.broadcast.emit("appearanceMiko");
    }
  });*/

  socket.on("mikoIsOnline", () => {
      socket.broadcast.emit("mikoIsOnline");
  });

  socket.on("mochiIsOnline", () => {
      socket.broadcast.emit("mochiIsOnline");
  });

  socket.on("here", person => {
    socket.broadcast.emit("here", person);
  })

  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });

  socket.on("away", status => {
    socket.broadcast.emit("away", status);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " logged out");
    socket.broadcast.emit("logout");
  });

});
