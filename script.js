const images = [
  "trendy-male-fashion-model-in-sand-zip-up-jacket-casual-lifestyle-shot-comfortable-males-fashion-with-a-stylish-and-relaxed-look-free-photo.jpg",
  "04_-_MODEL_COMFORTABLE.jpg",
  "1000_F_132271008_if4aA6NP6bICM4OUFVWFGVIizc1lX6p6.jpg",
  "stylish-man-shopping-in-a-clothes-store-AHSF01642.jpg",
  "toys-4519063_1280.jpg"
];

let currentIndex = 0;
const carouselImage = document.getElementById("carousel-image");

function switchImage() {
  currentIndex = (currentIndex + 1) % images.length; // Loop back to first image
  carouselImage.src = images[currentIndex];
}

// Change image every 3 seconds
setInterval(switchImage, 3000);
