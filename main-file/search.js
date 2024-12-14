// to show and hide search - toggle
document.addEventListener("DOMContentLoaded", () => {
  const searchTrigger = document.getElementById("searchTrigger");
  const searchPanel = document.getElementById("searchPanel");
  const overlay = document.getElementById("overlay");

  // Show the search panel and overlay
  searchTrigger.addEventListener("click", () => {
    searchPanel.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  // Hide the search panel and overlay when clicking outside
  overlay.addEventListener("click", () => {
    searchPanel.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

  const searchTitle = document.getElementById("searchTitle");
  const searchResults = document.getElementById("searchResults");

  // Backend URL
  const BACKEND_URL =
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://your-production-backend.com";

  // Function to fetch search results dynamically
  const fetchSearchResults = async () => {
    const query = searchTitle.value.trim(); // Get search input
    console.log(query);

    if (!query) {
      searchResults.innerHTML = "<p>Please enter a search term.</p>"; // Clear results for empty input
      return;
    }

    // Build the query parameters
    const queryParams = new URLSearchParams({
      title: query, // Assuming the input can match title, location, or price
      // location: query,
      // price: query,
    });

    try {
      // Fetch filtered destinations from the backend
      const response = await fetch(
        `${BACKEND_URL}/api/destinations?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const destinations = await response.json();
      displayResults(destinations);
    } catch (error) {
      console.error("Error fetching search results:", error);
      searchResults.innerHTML =
        "<p>Failed to fetch search results. Please try again later.</p>";
    }
  };

  // Function to dynamically display search results
  const displayResults = (destinations) => {
    searchResults.innerHTML = ""; // Clear previous results

    if (destinations.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Loop through the destinations and create cards
    destinations.forEach((destination) => {
      const cardHTML = `
    <div class="col-lg-3 col-md-4 col-sm-12 mb-4">
        <a href="destinations.html?title=${encodeURIComponent(destination.title)}" class="searchCard">
            <img src="${destination.images[0]}" class="card-img-top" alt="${destination.title}">
            <div class="card-body">
                <h5 class="card-title">${destination.title}</h5>
                <p class="card-text">
                    <strong>Location:</strong> ${destination.additionalInfo.location}<br>
                    <strong>Price:</strong> $${destination.price}<br>
                    <strong>Rating:</strong> ${destination.rating} ★
                </p>
            </div>
        </a>
    </div>`;
      searchResults.innerHTML += cardHTML; // Append each card to the results
    });
  };

  // Add event listener to the search input for real-time results
  searchTitle.addEventListener("input", fetchSearchResults);
});
