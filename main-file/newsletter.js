document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('subscribeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#subscribeForm input[type="email"]').value;
    const emailInput = email.value;
  
    try {
      const response = await fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      document.getElementById('subsMessage').innerText = data.message;

      // Clear the email input field
      email.value = '';  // This will clear the email input
    window.alert("Subscription successful!");

    } catch (error) {
      console.error('Error subscribing:', error);
    }
  });
});


// document.getElementById('newsi').innerText = "Adi"