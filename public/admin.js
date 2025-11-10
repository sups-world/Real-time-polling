const socket = io();

function resetPoll() {
  socket.emit("resetPoll");
}

function changePoll() {
  const newPoll = {
    question: document.getElementById("questionInput").value || "Untitled Poll",
    options: {
      A: document.getElementById("optA").value || "Option A",
      B: document.getElementById("optB").value || "Option B",
      C: document.getElementById("optC").value || "Option C",
    },
    votes: { A: 0, B: 0, C: 0 },
  };

  socket.emit("changeQuestion", newPoll);
}
