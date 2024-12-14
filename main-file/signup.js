document.getElementById("signup-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Send signup request to backend
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful!");
      window.location.href = "./login.html"; // Redirect to login page
    } else {
      alert(data.message || "Signup failed!");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred while signing up.");
  }
});

