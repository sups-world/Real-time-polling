const socket = io();

function vote(option) {
  socket.emit("vote", option);
}

socket.on("updateVotes", (votes) => {
  document.getElementById("voteA").innerText = votes.A;
  document.getElementById("voteB").innerText = votes.B;
  document.getElementById("voteC").innerText = votes.C;
});
