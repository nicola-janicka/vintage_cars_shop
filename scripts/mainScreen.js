// element cars_list z index.html
const $carsList = document.getElementById("cars_list");
const $searchInput = document.getElementById("search");

//nowa funkcja usprawniajaca generujaca html dla karty samochodu

function generateHTMLForCarCard(car) {
  return `
  <div class="card mb-3" style="max-width: 96vw;">
  <div class="row g-0">
    <div class="col-md-4" >
      <img src="${car.image}" class="img-fluid"  alt="...">
    </div>
    <div class="col-md-4">
      <div class="card-body">
        <h5 class="card-title fahkwang-medium">${car.make}</h5>
        <p class="card-text fahkwang-medium">${car.model}</p>
        <p class="card-text fahkwang-medium">
          <small class="text-body-secondary">
            Production year: ${car.year}<br>
            Mileage: ${car.mileage}<br>
            HP: ${car.hp}
          </small>
        </p>
        
        
      </div>
    </div>
   
    <div class="col-md-4 align-self-end pe-2 pb-2">
    <div class="float-end fahkwang-medium">
    <bold>${car.price}</bold> PLN
      <button class="btn btn-outline-success " onclick="goToPurchase(${car.id})">Buy</button>
    </div>
    </div>

      </div>
    </div>
  </div>
</div>`;
}

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
            carDiv.innerHTML = generateHTMLForCarCard(car);

            $carsList.appendChild(carDiv);
          }
        });
      } else {
        cars.forEach((car) => {
          const carDiv = document.createElement("div");
          carDiv.innerHTML = generateHTMLForCarCard(car);
          $carsList.appendChild(carDiv);
        });
      }
    });
}

function goToPurchase(carID) {
  localStorage.setItem("currentCarIDkey", carID);
  document.location.href = "./purchaseScreen.html";
}

generateCarsList(null);

$searchInput.addEventListener("input", function () {
  $carsList.innerHTML = "";
  generateCarsList(this.value);
});
