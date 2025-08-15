const API_KEY = "vVxaNuGFae7Cz0T39LfWdeSRZHYS-_9EXGjM56hRBFg";
const categories = { all: "", abstract: "abstract", nature: "nature", portrait: "portrait" };
const imageContainer = document.querySelector(".image-card");
const bigImg = document.getElementById("big-img");
const lightbox = document.getElementById("lightbox");
let imagesArray = [];
let index = 0;

async function fetchImages(category = "") {
  const url = `https://api.unsplash.com/photos/random?count=12&query=${category}&client_id=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  imagesArray = data.map(item => item.urls.regular);
  displayImages();
}

function displayImages() {
  imageContainer.innerHTML = "";
  imagesArray.forEach((imgUrl, i) => {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.classList.add("card-images");
    imageContainer.appendChild(img);

    img.addEventListener("click", () => {
      index = i;
      showImage();
    });
  });
}

function showImage() {
  bigImg.src = imagesArray[index]; // same image URL
  lightbox.style.display = "block";
}

document.getElementById("nextBtn").addEventListener("click", e => {
  e.stopPropagation();
  index = (index + 1) % imagesArray.length;
  showImage();
});

document.getElementById("prevBtn").addEventListener("click", e => {
  e.stopPropagation();
  index = (index - 1 + imagesArray.length) % imagesArray.length;
  showImage();
});

document.getElementById("closeBtn").addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", () => { lightbox.style.display = "none"; });
bigImg.addEventListener("click", e => e.stopPropagation());

const categoryButtons = document.querySelectorAll(".categories-button");
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    let catKey = "all";
    if (btn.classList.contains("abstract-button")) catKey = "abstract";
    if (btn.classList.contains("nature-button")) catKey = "nature";
    if (btn.classList.contains("portrait-button")) catKey = "portrait";

    fetchImages(categories[catKey]);
  });
});

fetchImages();
