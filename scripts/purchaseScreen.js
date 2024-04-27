const $chosenCar = document.getElementById("chosen_car");
const $finalPrice = document.getElementById("final_price");
const $accessoriesTable = document.getElementById("accessories");
const $carImg = document.getElementById("car_img");
const $alert = document.getElementById("incorrect_data");
const $alert_radio = document.getElementById("choose_option");

// Get data for chosen car and create HTML for it
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
          <h1 >${car.make}</h1>
           <h4 >${car.model}</h4>
           <h6 >Year: ${car.year}</h6>
           <h6 >Mileage: ${car.mileage} km</h6>
           <h6 >HP: ${car.hp}</h6>
           <h4 >${car.price} PLN <h3> 
           `;
          $chosenCar.appendChild(chosenCarDiv);
          $carImg.innerHTML = `<img class="img-fluid" style="max-height: 200px" src=${car.image}></img>`;
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

// Get accesories and create HTML elements with them
function getAccessories(accessoriesIDs) {
  fetch("./data/accessories.json")
    .then((response) => response.json())
    .then((response) => {
      let accessories = response.accessories;
      accessories.forEach((accessory) => {
        if (accessoriesIDs.includes(accessory.id)) {
          let accessoryTableRow = document.createElement("div");
          accessoryTableRow.className = "row mb-2 p-1 border";
          accessoryTableRow.innerHTML = `
          <div class="d-flex justify-content-start align-items-start col-2 col-sm-3">
              <img  class="img-fluid mx-auto d-none d-sm-block" style="width: 50px; height: 50px; object-fit: fill;" src=${accessory.image}>    
          </div>
          <div class="d-flex justify-content-center align-items-center col-6 col-sm-5" style="font-size: 14px;">${accessory.name}</div>
          <div class="d-flex justify-content-center align-items-center pe-1 col-2 " style="font-size: 12px;">${accessory.price} PLN</div>
          `;
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
          let checkboxDiv = document.createElement("div");
          checkboxDiv.className = "col-1 justify-content-center d-flex";
          checkboxDiv.appendChild(checkbox);
          accessoryTableRow.appendChild(checkboxDiv);
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
  $shipmentDiv.innerHTML =
    `<i class="fa-regular fa-calendar"></i> Shipment date: ` +
    date.toLocaleDateString();
  localStorage.setItem("shipmentDate", date.toLocaleDateString());
}

function validateName(declaredName) {
  let splittedName = declaredName.split(" ");
  return splittedName.length === 2;
}

function finalPurchase() {
  let validated = true;
  let nameInput = document.getElementById("name");
  let financing = document.querySelector('input[name="financing"]:checked');
  console.log(financing);

  if (!validateName(nameInput.value)) {
    validated = false;
    $alert.removeAttribute("hidden");
  }

  if (!financing) {
    validated = false;
    $alert_radio.removeAttribute("hidden");
  }

  if (validated) {
    localStorage.setItem("financing", financing.value);
    goToResume();
  }
}

generateChosenCar();

getShipmentDate();
