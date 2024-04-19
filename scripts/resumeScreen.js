const $resumeDiv = document.getElementById("resume_div");
const $thankYou = document.getElementById("thank_you");
const $details = document.getElementById("details");
const $carImage = document.getElementById("car_image");
const $carMake = document.getElementById("car_make");
const $carModel = document.getElementById("car_model");
const $carPrice = document.getElementById("car_price");
const $financing = document.getElementById("financing");

function generateResume() {
  $carImage.src = localStorage.getItem("carImage");
  $carMake.innerText = localStorage.getItem("carMake");
  $carModel.innerText = localStorage.getItem("carModel");
  $carPrice.innerText = localStorage.getItem("price");
  $financing.innerText = localStorage.getItem("financing").toLocaleUpperCase();
}

generateResume();
