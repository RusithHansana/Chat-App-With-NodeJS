const chatForm = document.getElementById("chat-form");

const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

//Event listener to catch the message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const message = e.target.elements.msg.value;

  //Emitting a message to the server
  socket.emit("chatMessage", message);
});
