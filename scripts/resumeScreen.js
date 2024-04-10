const resume = document.getElementById("resume_div");

function showResume() {
  fetch("./data/cars.json")
    .then((response) => response.json())
    .then((response) => {
      let cars = response.cars;
      let currentCarID = localStorage.getItem("currentCarIDkey");
    });
}
