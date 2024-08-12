const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const room = document.getElementById("room").value;

  // Prepare the data to send
  const data = {
    username: username, // Assuming username is the email
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();
    console.log("Login successful:", result);

    // Save the token in localStorage
    localStorage.setItem("token", result.token);

    const chatURL = await fetch("http://localhost:3000/api/chat", {
      headers: {
        Authorization: `Bearer ${result.token}`,
      },
    });

    // Redirect to chat page
    window.location.href = `/chat.html?username=${username}&room=${room}`;
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed. Please check your credentials.");
  }
});
