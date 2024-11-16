// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Populate title and location
    document.querySelector(".single-title h3").innerText = destinationData.title;
    document.querySelector(".rating-main p").innerText = destinationData.location;

    // Populate rating stars and reviews
    const ratingElement = document.querySelector(".rating");
    ratingElement.innerHTML = "★".repeat(destinationData.rating) + "☆".repeat(5 - destinationData.rating);
    document.querySelector(".rating-main span").innerText = `(${destinationData.reviewCount} Reviews)`;


    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselIndicators = document.querySelector(".carousel-indicators");
    let currentIndex = 0;

    // Populate images dynamically from destinationData
    destinationData.images.forEach((imgSrc, index) => {
        // Create image element
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Slide ${index + 1}`;
        carouselSlide.appendChild(img);

        // Create indicator
        const indicator = document.createElement("div");
        indicator.dataset.index = index;
        indicator.addEventListener("click", () => goToSlide(index));
        carouselIndicators.appendChild(indicator);
    });

    // Set initial slide and active indicator
    updateCarousel();

    // Button event listeners
    document.getElementById("prevBtn").addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : destinationData.images.length - 1;
        updateCarousel();
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
        currentIndex = (currentIndex < destinationData.images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        // Calculate slide width
        const slideWidth = carouselSlide.clientWidth;
        carouselSlide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Update active indicator
        const indicators = document.querySelectorAll(".carousel-indicators div");
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    // Adjust carousel when window resizes
    window.addEventListener("resize", updateCarousel);


    // Populate tour details
    document.querySelector(".tour-includes tbody").innerHTML = `
        <tr>
            <td><i class="fa fa-clock-o pink mr-1"></i> ${destinationData.details.duration}</td>
            <td><i class="fa fa-group pink mr-1"></i> Max People : ${destinationData.details.maxPeople}</td>
        </tr>
        <tr>
            <td><i class="fa fa-map-signs pink mr-1"></i> Pickup : ${destinationData.details.pickup}</td>
            <td><i class="fa fa-file-alt pink mr-1"></i> Language - ${destinationData.details.languages.join(", ")}</td>
        </tr>`;



    // Clear any existing content in the .mainDesc container
    document.querySelector(".mainDesc").innerHTML = "";
    // Loop through each paragraph in the description array and add it to .mainDesc
    destinationData.description.forEach((paragraph) => {
        const p = document.createElement("p");
        p.innerText = paragraph;
        document.querySelector(".mainDesc").appendChild(p);
    });

    // Populate additional info
    const addInfo = destinationData.additionalInfo;
    document.querySelector(".departure-location p").innerText = addInfo.departureLocation;
    document.querySelector(".bedroom p").innerText = addInfo.bedroom;
    document.querySelector(".arrival-time p").innerText = addInfo.arrivalTime;
    document.querySelector(".departure-time p").innerText = addInfo.departureTime;

    const includesList = document.querySelector(".price-includes ul");
    includesList.innerHTML = addInfo.includes
        .map(item => `<li><i class="fa fa-check pink mr-1"></i> ${item}</li>`)
        .join("");

    const excludesList = document.querySelector(".price-excludes ul");
    excludesList.innerHTML = addInfo.excludes
        .map(item => `<li><i class="fa fa-close pink mr-1"></i> ${item}</li>`)
        .join("");


    // Clear any existing content in the .mainDesc container
    document.querySelector(".whattoexpectDesc").innerHTML = "";
    // Loop through each paragraph in the description array and add it to .whattoexpectDesc
    destinationData.whattoexpect.forEach((paragraph) => {
        const p = document.createElement("p");
        p.innerText = paragraph;
        document.querySelector(".whattoexpectDesc").appendChild(p);
    });


    // Check if the accordion container is found
    const accordionContainer = document.querySelector(".accrodion-grp");
    if (accordionContainer) {
        // Populate the accordion content dynamically
        accordionContainer.innerHTML = destinationData.itinerary.map((day, index) => `
        <div class="accrodion ${index === 0 ? 'active' : ''}">
            <div class="accrodion-title">
                <h5 class="mb-0"><span>${day.day}</span> - ${day.title}</h5>
            </div>
            <div class="accrodion-content" style="display: ${index === 0 ? 'block' : 'none'};">
                <div class="inner">
                    <p>${day.content}</p>
                </div>
            </div>
        </div>
    `).join("");

        // Add click event listeners for toggling accordion sections
        document.querySelectorAll(".accrodion-title").forEach((title, index) => {
            title.addEventListener("click", function () {
                const acc = this.parentElement;
                const content = acc.querySelector(".accrodion-content");

                // Toggle active state for accordion
                if (acc.classList.contains("active")) {
                    acc.classList.remove("active");
                    content.style.display = "none";
                } else {
                    // Hide all other accordion contents
                    document.querySelectorAll(".accrodion").forEach(item => {
                        item.classList.remove("active");
                        item.querySelector(".accrodion-content").style.display = "none";
                    });

                    // Show the clicked accordion content
                    acc.classList.add("active");
                    content.style.display = "block";
                }
            });
        });
    } else {
        console.error("Accordion container not found");
    }


    const reviewContainer = document.querySelector(".review-list");
    reviewContainer.innerHTML = destinationData.reviews.map(review => `
            <div class="single-comments single-box mb-4">
                <div class="comment-box">
                    <div class="comment-image">
                        <img src=${review.src} alt="image">
                    </div>
                    <div class="comment-content">
                        <h5 class="mb-1">${review.name}</h5>
                        <p class="comment-date">${review.date}</p>
                        <div class="comment-rate">
                            <div class="rating mar-right-15">
                                ${Array(review.rating).fill('<span class="fa fa-star checked"></span>').join('')}
                            </div>
                            <span class="comment-title">${review.title}</span>
                        </div>
                        <p class="comment">${review.content}</p>
                    </div>
                </div>
            </div>
    `).join("");



    //form
    // Get modal and elements
    const modal = document.getElementById("booking_modal");
    const openModalBtn = document.getElementById("openBookModalBtn");
    const closeBtn = document.querySelector(".close_btn");

    // Open modal when button is clicked
    openModalBtn.onclick = function () {
        modal.style.display = "flex";
    }

    // Close modal when close button is clicked
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    // Close modal when clicking outside of the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

});