// Fetch Data from Backend
const apiBaseUrl = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats();
  loadUsers();
  loadDestinations();
  loadBookings();
  loadReviews();
});

async function loadDashboardStats() {
  try {
    const response = await axios.get(`${apiBaseUrl}/stats`);
    const stats = response.data;
    document.getElementById("stats").innerHTML = `
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h5>Total Users</h5>
            <p>${stats.users}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h5>Total Bookings</h5>
            <p>${stats.bookings}</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading dashboard stats", error);
  }
}

// Repeat similar functions for loadUsers, loadDestinations, etc.
