const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

socket.on("message", (message) => {
  console.log(message);
  addMessageToChat(message);

  //scroll down to the latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Event listener to catch the message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get message text
  const message = e.target.elements.msg.value;

  //Emitting a message to the server
  socket.emit("chatMessage", message);

  //Clear input
  e.target.elements.msg.value = "";
  //focus on the input
  e.target.elements.msg.focus();
});

const addMessageToChat = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");

  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`;

  document.querySelector(".chat-messages").appendChild(div);
};
