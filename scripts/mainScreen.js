// element cars_list z index.html
const $carsList = document.getElementById("cars_list");

// funkcja do generowania divow z autami
function generateCarsList() {
  fetch("./data/cars.json")
    .then((response) => response.json())
    .then((response) => {
      let cars = response.cars;
      cars.forEach((car) => {
        const carDiv = document.createElement("div");
        carDiv.innerHTML = `<h1>${car.make}<h1>
        <h2>${car.model}<h2>
        <button onclick="goToPurchase(${car.id})">Buy</button>`;
        $carsList.appendChild(carDiv);
      });
    });
}

function goToPurchase(carID) {
  localStorage.setItem("currentCarIDkey", carID);
  document.location.href = "./purchaseScreen.html";
}

generateCarsList();
