import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// poll data
let votes = { A: 0, B: 0, C: 0 };

io.on("connection", (socket) => {
  console.log(`A user connected`);

  //send current votes to new user
  socket.emit("updateVotes", votes);

  //when a user votes
  socket.on("vote", (option) => {
    if (votes[option] !== undefined) {
      votes[option]++;
      io.emit("updateVotes", votes); //broadcast to all
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(
    `Server running on port : http://localhost:${PORT}` +
      `\n` +
      `Please visit the url as a client in a browser`
  )
);
