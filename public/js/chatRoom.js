const roomSelector = document.getElementById("room");

const getChatRooms = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/chatRooms/")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((room) => {
          const option = document.createElement("option");
          option.value = room._id;
          option.text = room.roomName;
          roomSelector.appendChild(option);
        });
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

getChatRooms();
