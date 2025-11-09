const socket = io();

function vote(option) {
  socket.emit("vote", option);
}

socket.on("updateVotes", (votes) => {
  document.getElementById("voteA").innerText = votes.A;
  document.getElementById("voteB").innerText = votes.B;
  document.getElementById("voteC").innerText = votes.C;
});

let userId = localStorage.getItem("pollUserId");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("pollUserId", userId);
}

socket.emit("register", userId);
