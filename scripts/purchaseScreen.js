const chosenCar = document.getElementById("chosen_car");

// funkcja do generowania divow z autami

function generateChosenCar() {
  fetch("./data/cars.json")
    .then((response) => response.json())
    .then((response) => {
      let cars = response.cars;
      let currentCarID = localStorage.getItem("currentCarIDkey");

      cars.forEach((car) => {
        console.log(`${currentCarID} : ${car.id}`);
        if (currentCarID == car.id) {
          const chosenCarDiv = document.createElement("div");
          chosenCarDiv.innerHTML = `<h1>${car.make}</h1>
           <h2>${car.model}</h2>
           <button onclick="goToMainScreen()">Go back</button>
           <button onclick="goToResume()">Buy</button>`;
          chosenCar.appendChild(chosenCarDiv);
        }
      });
    });
}
function goToMainScreen() {
  document.location.href = "./index.html";
}

function goToResume() {
  document.location.href = "./resumeScreen.html";
}

function getShipmentDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  let $shipmentDiv = document.getElementById("shipment_date");
  $shipmentDiv.innerText = `Shipment date: ` + date.toLocaleDateString();
}

generateChosenCar();

getShipmentDate();
