// app.js

// Select DOM elements
const gallery = document.querySelector(".gallery");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");
const largerImage = document.querySelector(".larger-image");

let images = [];
let currentImageIndex = 0;

// Fetch images from API and populate gallery
async function getImages() {
  try {
    const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=10", {
      headers: {
        Authorization: "Bearer EexQqYg6U7r3tdqyZSZnH7DDO6XctBiUned62QlQe2DMqYwLWUxTwNOG",
      },
    });
    const data = await response.json();
    images = data.photos.map((item) => ({
      id: item.id,
      alt: item.alt_description,
      smallSrc: item.src.medium,
      largeSrc: item.src.large,
    }));
    populateGallery();
  } catch (error) {
    console.log(error);
  }
}

// Populate gallery with images
function populateGallery() {
  let galleryHTML = "";
  images.forEach((image) => {
    galleryHTML += `
      <div class="gallery-item">
        <img src="${image.smallSrc}" alt="${image.alt}" data-index="${images.indexOf(image)}">
      </div>
    `;
  });
  gallery.innerHTML = galleryHTML;
  addImageClickListener();
}

// Add click event listener to each image
function addImageClickListener() {
  const galleryImages = gallery.querySelectorAll("img");
  galleryImages.forEach((image) => {
    image.addEventListener("click", (event) => {
      currentImageIndex = parseInt(event.target.getAttribute("data-index"));
      showOverlay();
      updateOverlayContent();
    });
  });
}

// Show overlay
function showOverlay() {
  overlay.classList.add("visible");
  document.body.style.overflow = "hidden";
}

// Hide overlay
function hideOverlay() {
  overlay.classList.remove("visible");
  document.body.style.overflow = "";
}

// Update overlay content
function updateOverlayContent() {
  const image = images[currentImageIndex];
  largerImage.src = image.largeSrc;
  largerImage.alt = image.alt;
}

// Add click event listener to close button
closeButton.addEventListener("click", hideOverlay);

// Add click event listener to prev button
prevButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex === 0) ? (images.length - 1) : (currentImageIndex - 1);
  updateOverlayContent();
});

// Add click event listener to next button
nextButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : (currentImageIndex + 1);
  updateOverlayContent();
});

// Fetch images on page load
getImages();
