let images = document.querySelectorAll(".image-card > img");
let bigImg = document.getElementById("big-img");
let lightbox = document.getElementById("lightbox");
let index = 0;

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    index = i;
    showImage();
  });
});

function showImage() {
  bigImg.src = images[index].src;
  lightbox.style.display = "block";
}

document.getElementById("nextBtn").addEventListener("click", (event) => {
    event.stopPropagation();
  index = (index + 1) % images.length;
  showImage();
});

document.getElementById("prevBtn").addEventListener("click", (event) => {
    event.stopPropagation();
  index = (index - 1 + images.length) % images.length;
  showImage();
});

document.getElementById("closeBtn").addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

bigImg.addEventListener('click', (event) => {
  event.stopPropagation();
});

