async function fetchUsers() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/users");
    const users = response.data;
    populateUsersTable(users);

    function populateUsersTable(users) {
      const tableBody = document.querySelector("#users-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      users.forEach((user, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser('${
                          user._id
                        }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
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

// ----------------------------------------------------------------------
// -------------------------- detinations -------------------------------
// ----------------------------------------------------------------------

// Fetch and populate destinations
async function fetchDestinations() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/destinations");
    const destinations = response.data;
    populateDestinationsTable(destinations);

    function populateDestinationsTable(destinations) {
      const tableBody = document.querySelector("#destinations-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      destinations.forEach((destination, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${destination.title}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteDestination('${
                          destination._id
                        }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching destinations:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Delete a destination
async function deleteDestination(destinationId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this destination?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/destinations/${destinationId}`
    );
    alert("Destination deleted successfully");
    fetchDestinations(); // Refresh table
  } catch (error) {
    console.error("Error deleting destination:", error.message);
    alert(error.response?.data?.message || "Failed to delete destination.");
  }
}

// Show the Add Destination Modal
document.getElementById("add-destination").addEventListener("click", () => {
  document.getElementById("add-destination-modal").style.display = "block";
});

// Close the Add Destination Modal
function closeAddDestinationModal() {
  document.getElementById("add-destination-modal").style.display = "none";
}

// Add a new destination
document.getElementById("add-destination-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Gather data from form
    const formData = {
      title: document.getElementById("destination-title").value,
      location: document.getElementById("destination-location").value,
      discount: document.getElementById("destination-discount").value || null,
      price: document.getElementById("destination-price").value,
      duration: document.getElementById("destination-duration").value,
      rating: parseFloat(
        document.getElementById("destination-rating").value || 0
      ),
      reviewCount: parseInt(
        document.getElementById("destination-reviewCount").value || 0
      ),
      pricingData: {
        pricePerDayPerPerson: parseFloat(
          document.getElementById("pricePerDayPerPerson").value || 0
        ),
        bookingFee: parseFloat(
          document.getElementById("bookingFee").value || 0
        ),
        discount: parseFloat(
          document.getElementById("pricingDiscount").value || 0
        ),
        otherFees: parseFloat(document.getElementById("otherFees").value || 0),
      },
      images: document
        .getElementById("destination-images")
        .value.split(",")
        .map((img) => img.trim()),
      details: {
        duration: document.getElementById("details-duration").value,
        maxPeople: document.getElementById("details-maxPeople").value,
        pickup: document.getElementById("details-pickup").value,
        languages: document
          .getElementById("details-languages")
          .value.split(",")
          .map((lang) => lang.trim()),
      },
      descriptions: document
        .getElementById("destination-descriptions")
        .value.split(",")
        .map((desc) => desc.trim()),
      additionalInfo: {
        location: document.getElementById("additional-location").value,
        bedroom: document.getElementById("additional-bedroom").value,
        arrivalTime: document.getElementById("additional-arrivalTime").value,
        departureTime: document.getElementById("additional-departureTime")
          .value,
        includes: document
          .getElementById("additional-includes")
          .value.split(",")
          .map((inc) => inc.trim()),
        excludes: document
          .getElementById("additional-excludes")
          .value.split(",")
          .map((exc) => exc.trim()),
      },
      whattoexpect: document
        .getElementById("destination-whattoexpect")
        .value.split(",")
        .map((exp) => exp.trim()),
      // itinerary: JSON.parse(
      //   document.getElementById("destination-itinerary").value || "[]"
      // ),
      reviews: JSON.parse(
        document.getElementById("destination-reviews").value || "[]"
      ),
    };

    // Send data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Destination added successfully!");
        closeAddDestinationModal();
        location.reload(); // Refresh the page
      } else {
        const error = await response.json();
        console.error("Error adding destination:", error.message);
        alert("Failed to add destination.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred.");
    }
  });

// ----------------------------------------------------------------------
// -------------------------- Blogs  ---- -------------------------------
// ----------------------------------------------------------------------
// Fetch and populate blogs
async function fetchBlogs() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/blogs");
    const blogs = response.data;
    populateBlogsTable(blogs);

    function populateBlogsTable(blogs) {
      const tableBody = document.querySelector("#blogs-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      blogs.forEach((blog, index) => {
        const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${blog.title}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteBlog('${
                          blog._id
                        }')">Delete</button>
                    </td>
                </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}
// Delete a blog
async function deleteBlog(blogId) {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
    alert("Blog deleted successfully");
    fetchBlogs(); // Refresh table
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    alert(error.response?.data?.message || "Failed to delete blog.");
  }
}

// Show the Add Blog Modal
document.getElementById("add-blog").addEventListener("click", () => {
  document.getElementById("add-blog-modal").style.display = "block";
});

// Close the Add blog Modal
function closeAddBlogModal() {
  document.getElementById("add-blog-modal").style.display = "none";
}

// Add a new blog
document
  .getElementById("add-blog-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Gather data from form
    const formData = {
      image: document.getElementById("blog-image").value,
      date: document.getElementById("blog-date").value,
      title: document.getElementById("blog-title").value,
      // link: document.getElementById("blog-link").value,
      category: document.getElementById("blog-category").value,
      author: document.getElementById("blog-author").value,
      description: document.getElementById("blog-description").value,
      content: document.getElementById("blog-content").value,
    };

    // Send data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Blog added successfully!");
        closeAddBlogModal();
        location.reload(); // Refresh the page
      } else {
        const error = await response.json();
        console.error("Error adding blog:", error.message);
        alert("Failed to add blog.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred.");
    }
  });

// ----------------------------------------------------------------------
// -------------------------- bookings    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render bookings when the Manage Bookings tab is opened
async function fetchBookings() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/bookings");
    const bookings = response.data;

    populateBookingsTable(bookings);

    // Function to populate the bookings table
    function populateBookingsTable(bookings) {
      const tableBody = document.querySelector("#bookings-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      bookings.forEach((booking, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${booking.name}</td>
              <td>${booking.email}</td>
              <td>${booking.phone}</td>
              <td>${booking.date}</td>
              <td>${booking.noOfPeople}</td>
              <td>${booking.destinationTitle}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteBooking('${
                  booking._id
                }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a booking by ID
async function deleteBooking(bookingId) {
  // if (confirm("Are you sure you want to delete this booking?")) {
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
  //     if (response.status === 200) {
  //       alert("Booking deleted successfully!");
  //       fetchBookings(); // Refresh the bookings list after deletion
  //     }
  //   } catch (error) {
  //     console.error("Error deleting booking:", error.message);
  //     alert("Failed to delete booking.");
  //   }
  // }

  const confirmDelete = confirm(
    "Are you sure you want to delete this booking?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
    alert("Booking deleted successfully");
    fetchBookings(); // Refresh table
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    alert(error.response?.data?.message || "Failed to delete booking.");
  }
}

// ----------------------------------------------------------------------
// -------------------------- subscribers -------------------------------
// ----------------------------------------------------------------------

async function fetchSubscribers() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/subscribers");
    const subscribers = response.data;

    populateSubscribersTable(subscribers);

    // Function to populate the bookings table
    function populateSubscribersTable(subscribers) {
      const tableBody = document.querySelector("#subscribers-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      subscribers.forEach((subscriber, index) => {
        const row = `
              <tr>
                <td>${index + 1}</td>
                <td>${subscriber.email}</td>
                <td>
                <button class="btn btn-danger" onclick="deleteSubscriber('${
                  subscriber._id
                }')">Delete</button>
              </td>
              </tr>
            `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}
// Function to delete a subscriber by ID
async function deleteSubscriber(subscriberId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this subscriber?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/subscribers/${subscriberId}`);
    alert("Subscriber deleted successfully");
    fetchSubscribers(); // Refresh table
  } catch (error) {
    console.error("Error deleting subscriber:", error.message);
    alert(error.response?.data?.message || "Failed to delete subscriber.");
  }
}



// ----------------------------------------------------------------------
// -------------------------- newsletters -------------------------------
// ----------------------------------------------------------------------
document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const pdfFile = document.getElementById("pdfFile").files[0];

    if (!subject || !pdfFile) {
      alert("Please provide a subject and a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-newsletter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        document.getElementById("newsletterMessage").innerText =
          response.data.message;
      }
    } catch (error) {
      console.error("Error sending newsletter:", error.message);
      document.getElementById("newsletterMessage").innerText =
        "Failed to send newsletter.";
    }
  });




// ----------------------------------------------------------------------
// -------------------------- contacts    -------------------------------
// ----------------------------------------------------------------------
// Fetch and render bookings when the Manage Bookings tab is opened
async function fetchContacts() {
  const loader = document.getElementById("loading");
  loader.style.display = "block"; // Show loader

  try {
    const response = await axios.get("http://localhost:5000/api/contacts");
    const contacts = response.data;

    populateContactsTable(contacts);

    // Function to populate the bookings table
    function populateContactsTable(contacts) {
      const tableBody = document.querySelector("#contact-table tbody");
      tableBody.innerHTML = ""; // Clear previous data

      contacts.forEach((contact, index) => {
        const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${contact.name}</td>
              <td>${contact.email}</td>
              <td>${contact.phone}</td>
              <td>${contact.message}</td>
              <td>
                <button class="btn btn-danger" onclick="deleteContact('${
                  contact._id
                }')">Delete</button>
              </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    }
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
  } finally {
    loader.style.display = "none"; // Hide loader
  }
}

// Function to delete a booking by ID
async function deleteContact(contactId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this contact?"
  );
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/contacts/${contactId}`);
    alert("Contact deleted successfully");
    fetchContacts(); // Refresh table
  } catch (error) {
    console.error("Error deleting contact:", error.message);
    alert(error.response?.data?.message || "Failed to delete contact.");
  }
}



document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  fetchDestinations();
  fetchBlogs();
  fetchBookings();
  fetchSubscribers();
  fetchContacts();
});