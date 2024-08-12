const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//Join chatroom
socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
  writeRoomName(room);
  writeUsers(users);
});

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

//write roomname to DOM
const writeRoomName = (room) => {
  roomName.innerText = room;
};

//write users to DOM
const writeUsers = (users) => {
  userList.innerHTML = `
        ${users.map((user) => `<li>${user.username}</li>`).join("")}
    `;
};
