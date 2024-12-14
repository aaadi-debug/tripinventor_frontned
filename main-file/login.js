document.getElementById("login-btn").addEventListener("click", async () => {
  const emailOrUsername = document.getElementById("login-username-email").value;
  const password = document.getElementById("login-password").value;

  // Validate input
  if (!emailOrUsername || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    // Send login request to the backend
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailOrUsername, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // Store user details or token in local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to the dashboard or another page
      window.location.href = "./index.html";
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred while logging in.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("user-info");
  const loginLink = document.getElementById("login-link");

  // Check if user data exists in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Extract only the first name from the full name or username
    const firstName = user.username.split(" ")[0];

    // If logged in, display the user's first name
    userInfo.innerHTML = `
        <i class="fa-regular fa-user"></i>
        <span>Welcome, ${firstName}</span>
      `;

    // Add logout functionality
    document.getElementById("logout-link").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload(); // Refresh the page
    });
  } else {
    // If not logged in, show the login link
    loginLink.style.display = "block";
  }

  // Prevent logged-in users from accessing login or signup pages
  const currentPage = window.location.pathname;
  if (
    user &&
    (currentPage.includes("login.html") || currentPage.includes("signup.html"))
  ) {
    window.location.href = "./index.html"; // Redirect to the home page
  }
});
