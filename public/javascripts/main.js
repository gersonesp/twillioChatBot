let slideIndex = 1;
displaySlide(slideIndex);

// Next/previous controls
function plusSlides(n) {
  displaySlide((slideIndex += n));
}

//Thumbnail image controls
function currentSlide(n) {
  displaySlide((slideIndex = n));
}

function displaySlide(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dots");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const ul = document.getElementById("icecreams");
const url = "https://project.wnyc.org/ice-cream/data/places.json";

fetch(url)
  .then(resp => resp.json())
  .then(data => console.log(data))
  .catch(error => "Could not get ice cream, with error " + error);
