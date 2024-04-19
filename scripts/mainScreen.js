// element cars_list z index.html
const $carsList = document.getElementById("cars_list");
const $searchInput = document.getElementById("search");

// funkcja do generowania divow z autami
function generateCarsList(make) {
  localStorage.clear();
  fetch("./data/cars.json")
    .then((response) => response.json())
    .then((response) => {
      let cars = response.cars;
      if (make != null) {
        cars.forEach((car) => {
          if (car.make.toUpperCase().includes(make.toUpperCase())) {
            const carDiv = document.createElement("div");
            carDiv.innerHTML = `<h1>${car.make}<h1>
                <h2>${car.model}<h2>
                <h3>${car.price} PLN <h3>
                <button onclick="goToPurchase(${car.id})">Buy</button>`;
            $carsList.appendChild(carDiv);
          }
        });
      } else {
        cars.forEach((car) => {
          const carDiv = document.createElement("div");
          carDiv.innerHTML = `<h1>${car.make}<h1>
            <h2>${car.model}<h2>
            <h3>${car.price} PLN <h3>
            <button onclick="goToPurchase(${car.id})">Buy</button>`;
          $carsList.appendChild(carDiv);
        });
      }
    });
}

// function searchMake() {
//   let searchInput = document.getElementById("search").value;
//   $carsList.innerHTML = "";
//   generateCarsList(searchInput);
// }

function goToPurchase(carID) {
  localStorage.setItem("currentCarIDkey", carID);
  document.location.href = "./purchaseScreen.html";
}

generateCarsList(null);

$searchInput.addEventListener("input", function () {
  $carsList.innerHTML = "";
  generateCarsList(this.value);
});
