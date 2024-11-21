async function fetchUsers() {
  const loader = document.getElementById('loading');
  loader.style.display = 'block'; // Show loader

  try {
    const response = await axios.get('http://localhost:5000/api/users');
    const users = response.data;
    populateUsersTable(users);

    function populateUsersTable(users) {
      const tableBody = document.querySelector('#users-table tbody');
      tableBody.innerHTML = ''; // Clear previous data

      users.forEach((user, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
}


async function deleteUser(userId) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh table
  } catch (error) {
      console.error("Error deleting user:", error.message);
      alert(error.response?.data?.message || "Failed to delete user.");
  }
}

// Fetch and populate destinations
async function fetchDestinations() {
  const loader = document.getElementById('loading');
  loader.style.display = 'block'; // Show loader

  try {
    const response = await axios.get('http://localhost:5000/api/destinations');
    const destinations = response.data;
    populateDestinationsTable(destinations);

    function populateDestinationsTable(destinations) {
      const tableBody = document.querySelector('#destinations-table tbody');
      tableBody.innerHTML = ''; // Clear previous data

      destinations.forEach((destination, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${destination.title}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteDestination('${destination._id}')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
}

// Delete a destination
async function deleteDestination(destinationId) {
  const confirmDelete = confirm("Are you sure you want to delete this destination?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/destinations/${destinationId}`);
    alert("Destination deleted successfully");
    fetchDestinations(); // Refresh table
  } catch (error) {
    console.error("Error deleting destination:", error.message);
    alert(error.response?.data?.message || "Failed to delete destination.");
  }
}

// Show the Add Destination Modal
document.getElementById('add-destination').addEventListener('click', () => {
  document.getElementById('add-destination-modal').style.display = 'block';
});

// Close the Add Destination Modal
function closeAddDestinationModal() {
  document.getElementById('add-destination-modal').style.display = 'none';
}

// Add a new destination
document.getElementById('add-destination-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('destination-title').value;
  const location = document.getElementById('destination-location').value;
  const price = document.getElementById('destination-price').value;
  const duration = document.getElementById('destination-duration').value;

  try {
    await axios.post('http://localhost:5000/api/destinations', {
      title,
      location,
      price,
      duration
    });
    alert('Destination added successfully');
    closeAddDestinationModal();
    fetchDestinations(); // Refresh the table
  } catch (error) {
    console.error('Error adding destination:', error.message);
    alert(error.response?.data?.message || 'Failed to add destination.');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
  fetchDestinations();
});