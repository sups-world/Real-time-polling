import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let poll = {
  question: "What's your favorite programming language?",
  votes: { A: 0, B: 0, C: 0 },
  options: { A: "JavaScript", B: "Python", C: "Go" },
};

io.on("connection", (socket) => {
  console.log("a user connected");

  // send current poll data to new client
  socket.emit("updatePoll", poll);

  // when a user votes
  socket.on("vote", (option) => {
    if (poll.votes[option] !== undefined) {
      poll.votes[option]++;
      io.emit("updatePoll", poll);
    }
  });

  // when admin resets votes
  socket.on("resetPoll", () => {
    for (let key in poll.votes) poll.votes[key] = 0;
    io.emit("updatePoll", poll);
  });

  // when admin changes question
  socket.on("changeQuestion", (newPoll) => {
    poll = newPoll;
    io.emit("updatePoll", poll);
  });
});

server.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
