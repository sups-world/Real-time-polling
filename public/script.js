const socket = io();

socket.on("updatePoll", (poll) => {
  document.getElementById("question").innerText = poll.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  for (let key in poll.options) {
    const btn = document.createElement("button");
    btn.innerText = poll.options[key];
    btn.onclick = () => socket.emit("vote", key);
    optionsDiv.appendChild(btn);
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = Object.entries(poll.votes)
    .map(([k, v]) => `<p>${poll.options[k]}: ${v}</p>`)
    .join("");
});
