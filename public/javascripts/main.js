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
