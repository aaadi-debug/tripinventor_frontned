document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.querySelector("input[placeholder='Name']").value,
        email: document.querySelector("input[placeholder='Email']").value,
        phone: document.querySelector("input[placeholder='Phone']").value,
        message: document.querySelector("textarea[placeholder='Enter a message']").value,
    };

    try {
        const response = await fetch("http://localhost:5000/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Contact form submitted successfully!");
            location.reload(); // Refresh the page on success
        } else {
            const error = await response.json();
            alert("Error: " + error.message);
        }
    } catch (err) {
        console.error("Error submitting form:", err);
        alert("An error occurred. Please try again.");
    }
});