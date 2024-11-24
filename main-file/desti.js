document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from the JSON file

    const destinationContainer = document.getElementById("desination-content-dynamic");

    // Extract the destination title from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destinationTitle = urlParams.get("title");


    // var destinationInputTitle = document.querySelector("#destinationInputTitle input").value; // Grab current value
    // destinationInputTitle = destinationTitle;

    const titleElements = document.getElementsByClassName('singleDPageTitle');
    for (let element of titleElements) {
        element.innerText = destinationTitle;
    }

    const destinationInputTitle = document.getElementsByClassName('destinationInputTitle');
    const destinationHiddenInput = document.getElementById('destinationHiddenInput');
    for (let element of destinationInputTitle) {
        element.innerText = destinationTitle;
    }
    destinationHiddenInput.value = destinationTitle; // Hidden input value

    const BACKEND_URL = window.location.hostname === '127.0.0.1' ? 'http://localhost:5000' : 'https://your-production-backend.com';



    if (destinationTitle) {
        // fetch("destination.json")
        // Replace JSON fetch with API call
        fetch(`${BACKEND_URL}/api/destinations?title=${encodeURIComponent(destinationTitle)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(destinationData => {
                // const destinationData = data.find(destination => destination.title === decodeURIComponent(destinationTitle));
                if (destinationData) {
                    destinationContainer.innerHTML = `
                          <div class="single-full-title border-b mb-2 pb-2">
                            <div class="single-title">
                                <h3 class="mb-1">${destinationData.title || "N/A"}</h3>
                                <div class="rating-main d-sm-flex align-items-center">
                                    <p class="mb-0 mr-2"><i class="flaticon-location-pin"></i>${destinationData.location || "N/A"}</p>
                                    <div class="rating mar-right-15">
                                        ${'<span class="fa fa-star checked"></span>'.repeat(destinationData.rating)}${'☆'.repeat(5 - destinationData.rating)} <!-- Rating stars -->
                                    </div>
                                    <span> (${destinationData.reviewCount} Reviews)</span>
                                </div>
                            </div>
                          </div>

                            <div class="carousel-container">
                                        <div class="carousel-slide">
                                        ${destinationData.images
                            .map(
                                (item) => `
                                                    <img src=${item || "https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"} alt="Slides Image">
                                                `
                            ).join('')
                        }
                                        </div>
                                        <div class="carousel-controls">
                                            <button id="prevBtn">&lt;</button>
                                            <button id="nextBtn">&gt;</button>
                                        </div>
                                        <div class="carousel-indicators">
                                        ${destinationData.images
                            .map(
                                (index) => `
                                                <div data-index="${index}" class="${index === 0 ? 'active' : ''}"></div>
                                                 `
                            ).join('')
                        }
                                        </div>  
                            </div>
                          




                          <div class="tour-includes mb-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><i class="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration: ${destinationData?.details?.duration || "N/A"} Days</td>
                                        
                                        <td><i class="fa fa-file-alt pink mr-1" aria-hidden="true"></i> Langauge -
                                            ${destinationData?.details?.languages}</td>
                                    </tr>
                                    <tr>
                                        <td><i class="fa fa-map-signs pink mr-1" aria-hidden="true"></i> Hotel :
                                            ${destinationData?.details?.pickup}</td>
                                        <td><i class="fa fa-group pink mr-1" aria-hidden="true"></i> Package Cost : ${destinationData?.details?.maxPeople}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>

                          <div class="description mb-2">
                            <h4>Description</h4>
                            <p>${destinationData?.descriptions.join(`<br>`) || "No Description Available"}</p>
                          </div>

                          <div class="description mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Departure & Return Location</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.location || "N/A"} </p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Bedroom</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.bedroom || "N/A"} Bedrooms</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Arrival Time</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.arrivalTime || "N/A"}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Departure Time</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.departureTime || "N/A"}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Inclusions</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.includes.map(
                            (item) => `<li><i class="fa fa-check pink mr-1"></i> ${item}</li>`
                        ).join("")}
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Exclusions</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.excludes.map(
                            (item) => `<li><i class="fa fa-close pink mr-1"></i> ${item}</li>`
                        ).join("")}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                          </div>
                          

                                  <div class="accordion-wrapper">
                                    ${destinationData.itinerary
                            .map(
                                (item, index) => `
                                            <div class="accordion-outer">
                                                <div class="accordion-heading">
                                                    <span>${item.day}</span> - ${item.title}
                                                </div>
                                                <div class="accordion-content">
                                                    <div class="accordion-inner">
                                                        <div class="accordion-inner__inner">
                                                            <p>${item?.content?.join(`<br><br>`)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                  </div>
                                        
            
            
                          

                          <div class="single-comments single-box mb-4">
                            <h5 class="border-b pb-2 mb-2">Showing ${destinationData?.reviews.length} verified comments</h5>
                            <div class="accrodion-grp faq-accrodion mb-4" data-grp-name="faq-accrodion">
                            ${destinationData.reviews
                            .map(
                                (review, index) => `
                                <div class="comment-box">
                                    <div class="comment-image">
                                        <img src="${review.src || 'images/reviewer/default.jpg'}" alt="image">
                                    </div>
                                    <div class="comment-content">
                                        <h5 class="mb-1">${review.name}</h5>
                                        <p class="comment-date">${review.date} at 10:46 am</p>
                                        <div class="comment-rate">
                                            <div class="rating mar-right-15">
                                                ${'<span class="fa fa-star checked"></span>'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)} <!-- Rating stars -->
                                            </div>
                                        </div>
                                        <p class="comment">${review.content}</p>
                                    </div>
                                </div>

                                
                            `
                            )
                            .join('')}
                          </div>

                          
      `;


                    const carouselSlide = document.querySelector(".carousel-slide");
                    const carouselIndicators = document.querySelectorAll(".carousel-indicators div");
                    let currentIndex = 0;

                    // Update the carousel to show the current slide
                    function updateCarousel() {
                        const slideWidth = carouselSlide.clientWidth;
                        carouselSlide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

                        // Update active indicator
                        carouselIndicators.forEach((indicator, index) => {
                            indicator.classList.toggle("active", index === currentIndex);
                        });
                    }

                    // Event listeners for controls
                    document.getElementById("prevBtn").addEventListener("click", () => {
                        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselIndicators.length - 1;
                        updateCarousel();
                    });

                    document.getElementById("nextBtn").addEventListener("click", () => {
                        currentIndex = (currentIndex < carouselIndicators.length - 1) ? currentIndex + 1 : 0;
                        updateCarousel();
                    });

                    // Event listeners for indicators
                    carouselIndicators.forEach((indicator, index) => {
                        indicator.addEventListener("click", () => {
                            currentIndex = index;
                            updateCarousel();
                        });
                    });

                    // Adjust carousel on window resize
                    window.addEventListener("resize", updateCarousel);

                    // Initialize the carousel
                    updateCarousel();


                } else {
                    destinationContainer.innerHTML = "<p> Destionation not found.</p>";
                }
            })
            .catch(error => {
                console.error("Error loading blog:", error);
                destinationContainer.innerHTML = "<p>Error loading destinaion information.</p>";
            });
    } else {
        destinationContainer.innerHTML = "<p>No destination title specified in URL.</p>";
    }
});

document.querySelector(".bookingForm form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.querySelector("input[placeholder='Your Name']").value,
        email: document.querySelector("input[placeholder='Your Email']").value,
        phone: document.querySelector("input[placeholder='Your Phone']").value,
        date: document.querySelector("input[type='date']").value,
        noOfPeople: parseInt(document.querySelector("select.niceSelect").value),
        destinationTitle: document.querySelector("#destinationHiddenInput").value, // Include the hidden input value
    };

    try {
        const response = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Booking saved successfully!");
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

// Handle form submission
document.querySelector('.single-add-review form').addEventListener('submit', async (event) => {
    // event.preventDefault();

    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    // Collect form data
    const formData = {
        name: document.getElementById('reviewerName').value,
        email: document.getElementById('reviewerEmail').value,
        comment: document.getElementById('reviewContent').value,
        rating: parseInt(document.getElementById('reviewRating').value),
        // date: parseInt(document.getElementById('reviewRating').value),
        date: date, 
    };
    // Validate the data (e.g., ensure rating is between 1 and 5)
    if (rating < 1 || rating > 5) {
        alert('Please provide a rating between 1 and 5.');
        return;
    }

    try {
        // Send the data to the backend API
        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // if (!response.ok) {
        //     throw new Error('Failed to submit the review');
        // }
        if (response.ok) {
            alert("Review saved successfully!");
            console.log(formData);
            location.reload(); // Refresh the page on success
        } else {
            const error = await response.json();
            alert("Error: " + error.message);
        }

        // Add the new review to the DOM dynamically
        // const updatedReviews = await response.json(); // Assuming backend sends the updated reviews list
        // renderReviews(updatedReviews); // Function to re-render reviews dynamically

        // Clear the form
        event.target.reset();
        // alert('Review submitted successfully!');
    } catch (error) {
        console.error("Error submitting form:", error);
        alert('Error submitting the review. Please try again.');
    }
});

// // Function to render reviews
// function renderReviews(reviews) {
//     const reviewsContainer = document.querySelector('.single-comments .accrodion-grp');
//     reviewsContainer.innerHTML = reviews
//         .map(
//             (review) => `
//                 <div class="comment-box">
//                     <div class="comment-image">
//                         <img src="${review.src || 'images/reviewer/default.jpg'}" alt="image">
//                     </div>
//                     <div class="comment-content">
//                         <h5 class="mb-1">${review.name}</h5>
//                         <p class="comment-date">${review.date} at 10:46 am</p>
//                         <div class="comment-rate">
//                             <div class="rating mar-right-15">
//                                 ${'<span class="fa fa-star checked"></span>'.repeat(review.rating)}${'☆'.repeat(
//                 5 - review.rating
//             )}
//                             </div>
//                         </div>
//                         <p class="comment">${review.content}</p>
//                     </div>
//                 </div>
//             `
//         )
//         .join('');
// }
