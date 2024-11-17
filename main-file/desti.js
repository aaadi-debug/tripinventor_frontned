document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from the JSON file

    const destinationContainer = document.getElementById("desination-content-dynamic");

    // Extract the destination title from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destinationTitle = urlParams.get("title");

    const titleElements = document.getElementsByClassName('singleDPageTitle');
    for (let element of titleElements) {
        element.innerText = destinationTitle;
    }


    if (destinationTitle) {
        fetch("destination.json")
            .then(response => response.json())
            .then(data => {
                const destinationData = data.find(destination => destination.title === decodeURIComponent(destinationTitle));

                if (destinationData) {
                    destinationContainer.innerHTML = `
                          <div class="single-full-title border-b mb-2 pb-2">
                            <div class="single-title">
                                <h3 class="mb-1">${destinationData.title}</h3>
                                <div class="rating-main d-sm-flex align-items-center">
                                    <p class="mb-0 mr-2"><i class="flaticon-location-pin"></i>${destinationData.location}</p>
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
                                                    <img src=${item} alt="Slides Image">
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
                                        <td><i class="fa fa-clock-o pink mr-1" aria-hidden="true"></i> Duration: ${destinationData?.details?.duration} Days</td>
                                        <td><i class="fa fa-group pink mr-1" aria-hidden="true"></i> Max People : ${destinationData?.details?.maxPeople}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><i class="fa fa-map-signs pink mr-1" aria-hidden="true"></i> Pickup :
                                            ${destinationData?.details?.pickup}</td>
                                        <td><i class="fa fa-file-alt pink mr-1" aria-hidden="true"></i> Langauge -
                                            ${destinationData?.details?.languages}</td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>

                          <div class="description mb-2">
                            <h4>Description</h4>
                            <p>${destinationData?.descriptions.join(`<br>`)}</p>
                          </div>

                          <div class="description mb-2">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Departure & Return Location</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.location}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Bedroom</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.bedroom} Bedrooms</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Arrival Time</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.arrivalTime}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Departure Time</h5>
                                        <p class="mb-0">${destinationData?.additionalInfo?.departureTime}</p>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pr-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Price Includes</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.includes.map(
                        (item) => `<li><i class="fa fa-check pink mr-1"></i> ${item}</li>`
                    ).join("")}
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-2 pl-2">
                                    <div class="desc-box">
                                        <h5 class="mb-1">Price Excludes</h5>
                                        <ul>
                                            ${destinationData?.additionalInfo?.excludes.map(
                        (item) => `<li><i class="fa fa-check pink mr-1"></i> ${item}</li>`
                    ).join("")}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div class="description mb-4">
                            <h4>What to Expect</h4>
                            <p>${destinationData?.whattoexpect.join(`<br>`)}</p>
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
                                                            <p>${item.content}</p>
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


{/* <script> */ }



{/* </script> */ }