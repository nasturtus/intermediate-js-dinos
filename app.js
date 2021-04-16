const getDinoData = async () => {
  console.log("in getDinoData");
  const dinoData = await fetch("./dino.json")
    .then((response) => response.json())
    .then((data) => data.Dinos);
  return dinoData;
};

// Create Dino Constructor
class Dino {
  constructor(species, height, weight, diet, fact) {
    this.species = species;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    this.fact = fact;
  }
}

// Create Dino Objects
let dinoObjects = [];

// Create Human Object
class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

const createHumanObject = () => {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;

  return new Human(name, feet, inches, weight, diet);
};

// Event handlers

const handleReset = () => {
  location.reload();
};

const handleClick = (e, dinoObjects) => {
  e.preventDefault();
  console.log("in handleClick");
  const humanObject = createHumanObject();
  generateGrid(dinoObjects, humanObject);
  const dinoCompareElem = document.getElementById("dino-compare");
  dinoCompareElem.reset();
  dinoCompareElem.style.display = "none";

  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("id", "btn");
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", handleReset);
  document.getElementById("grid").appendChild(resetBtn);
};

const generateGrid = (dinoObjects, humanObject) => {
  const gridSize = 9;
  const humanObjectPosition = parseInt((gridSize / 2).toString());
  console.log(humanObjectPosition);

  dinoObjects.splice(humanObjectPosition, 0, humanObject);
  console.log(dinoObjects);

  dinoObjects.map((dino) => {
    let divElem = document.createElement("div");
    divElem.className = "grid-item";

    let pElem = document.createElement("p");
    let imgElem = document.createElement("img");

    if (dino.species) {
      const species = dino.species;
      pElem.innerText = species;
      imgElem.src = `./images/${species}.png`;
    } else {
      pElem.innerText = dino.name;
      imgElem.src = `./images/human.png`;
    }

    divElem.appendChild(pElem);
    divElem.appendChild(imgElem);
    document.getElementById("grid").append(divElem);
  });
};

const start = async () => {
  const dinoData = await getDinoData();
  const dinoObjects = [];

  dinoData.forEach((dino) => {
    dinoObjects.push(
      new Dino(
        dino.species.toLowerCase(),
        dino.height,
        dino.weight,
        dino.diet,
        dino.fact
      )
    );
  });

  console.log(dinoObjects.map((dinoObject) => dinoObject));
  document
    .getElementById("btn")
    .addEventListener("click", (e) => handleClick(e, dinoObjects));
};

start();
