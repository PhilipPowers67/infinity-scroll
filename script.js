const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "xWvsl5OuUYrdsi5cYxuQTBurfcmYLFibKH1Pt3KKHI0";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for links and Photos, Add to Dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event Listener, check when finished loading
    img.addEventListener('load', imageLoaded);
    //  <img> inside <a> inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch Error
  }
}

// Check to see if scrolling near bottome of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
     getPhotos();   
    }
})

//On Load
getPhotos();
