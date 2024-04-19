const $chosenCar = document.getElementById("chosen_car");
const $finalPrice = document.getElementById("final_price");
const $accessoriesTable = document.getElementById("accessories");

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
          chosenCarDiv.innerHTML = `
          <img src=${car.image}>
          <h1>${car.make}</h1>
           <h2>${car.model}</h2>
           <h3>${car.price} PLN <h3>
           <button onclick="goToMainScreen()">Go back</button>
           <button onclick="finalPurchase()">Buy</button>`;
          $chosenCar.appendChild(chosenCarDiv);
          if (!localStorage.getItem("price")) {
            localStorage.setItem("price", car.price);
          }

          localStorage.setItem("carImage", car.image);
          localStorage.setItem("carMake", car.make);
          localStorage.setItem("carModel", car.model);
          $finalPrice.innerHTML = `Final price: ${localStorage.getItem(
            "price"
          )} PLN`;
          getAccessories(car.accessories);
        }
      });
    });
}

// pętla do wyciągania dedykowanych akcesoriów
function getAccessories(accessoriesIDs) {
  fetch("./data/accessories.json")
    .then((response) => response.json())
    .then((response) => {
      let accessories = response.accessories;
      accessories.forEach((accessory) => {
        if (accessoriesIDs.includes(accessory.id)) {
          let accessoryTableRow = document.createElement("tr");
          accessoryTableRow.innerHTML = `
          <th></th>
          <th>${accessory.name}</th>
          <th>${accessory.price} PLN</th>`;
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          if (localStorage.getItem(`acc_${accessory.id}`) == "true") {
            checkbox.checked = true;
          }
          checkbox.addEventListener("change", function () {
            let newPrice = Number(localStorage.getItem("price"));
            if (this.checked) {
              newPrice = Number(newPrice) + Number(accessory.price);
              localStorage.setItem(`acc_${accessory.id}`, "true");
            } else if (!this.checked) {
              newPrice = Number(newPrice) - Number(accessory.price);
              localStorage.setItem(`acc_${accessory.id}`, "false");
            }
            $finalPrice.innerHTML = `Final price: ${newPrice} PLN`;
            localStorage.setItem("price", newPrice);
          });
          let newTh = document.createElement("th");
          newTh.appendChild(checkbox);
          accessoryTableRow.appendChild(newTh);
          $accessoriesTable.appendChild(accessoryTableRow);
        }
      });
    });
}

function goToMainScreen() {
  document.location.href = "./index.html";
}

function goToResume(carID) {
  localStorage.setItem("chosenConfig", "myChosenConfig");
  document.location.href = "./resumeScreen.html";
}

function getShipmentDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  let $shipmentDiv = document.getElementById("shipment_date");
  $shipmentDiv.innerText = `Shipment date: ` + date.toLocaleDateString();
}

//funkcja do sprawdzania danych z pola input "First name and last name"

function validateName(declaredName) {
  let splittedName = declaredName.split(" ");
  if (splittedName.length === 2) {
    return true;
  } else {
    return false;
  }
}

// Funkcja do zakupu auta

function finalPurchase() {
  let financing = document.querySelector(
    'input[name="financing"]:checked'
  ).value;
  localStorage.setItem("financing", financing);
  let nameInput = document.getElementById("name");
  if (validateName(nameInput.value)) {
    goToResume();
  } else {
    document.getElementById("incorrect_data").removeAttribute("hidden");
  }
}

generateChosenCar();

getShipmentDate();

const accCheckboxes = document.querySelectorAll(".acc");

console.log(accCheckboxes);

accCheckboxes.forEach((checkbox) => {});
