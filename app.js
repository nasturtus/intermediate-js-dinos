// Get dino data
const getDinoData = async () => {
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

// Create Human Constructor
class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet;
  }
}

// Create human object based on data from form
const createHumanObject = () => {
  const name = document.getElementById("name").value;
  const feet = document.getElementById("feet").value;
  const inches = document.getElementById("inches").value;
  const weight = document.getElementById("weight").value;
  const diet = document.getElementById("diet").value;

  return new Human(name, feet, inches, weight, diet);
};

// Event handlers

// This event handler reloads on clicking 'Reset'.
const handleReset = () => {
  location.reload();
};

// This event handler creates human object based on inputs and generates grid.
const handleClick = (e, dinoObjects) => {
  e.preventDefault();

  const humanObject = createHumanObject();
  generateGrid(dinoObjects, humanObject, methods);
  const dinoCompareElem = document.getElementById("dino-compare");
  dinoCompareElem.reset();
  dinoCompareElem.style.display = "none";

  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("id", "btn");
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", handleReset);
  document.getElementById("grid").appendChild(resetBtn);
};

// Various compare methods that return a comparison statement between dino and human.

const compareHeight = (dinoObject, humanObject) => {
  let str = "";
  if (dinoObject.height > humanObject.feet) {
    str = `You are approx. ${
      dinoObject.height - humanObject.feet
    } feet shorter than a ${dinoObject.species}.`;
  } else if (dinoObject.height < humanObject.feet) {
    str = `Incredible! You are approx. ${
      humanObject.feet - dinoObject.height
    } feet taller than a ${dinoObject.species}.`;
  } else if (dinoObject.height === humanObject.feet) {
    str = `Wow! You are as tall as a ${dinoObject.species}.`;
  }
  return str;
};

const compareWeight = (dinoObject, humanObject) => {
  let str = "";
  if (dinoObject.weight > humanObject.weight) {
    str = `You are approx. ${
      dinoObject.weight - humanObject.weight
    } lbs lighter than a ${dinoObject.species}.`;
  } else if (dinoObject.weight < humanObject.weight) {
    str = `Incredible! You are approx. ${
      humanObject.weight - dinoObject.weight
    } lbs heavier than a ${dinoObject.species}.`;
  } else if (dinoObject.weight === humanObject.weight) {
    str = `Wow! You are as heavy as a ${dinoObject.species}.`;
  }
  return str;
};

const compareDiet = (dinoObject, humanObject) => {
  let str = "";
  if (dinoObject.diet === humanObject.diet.toLowerCase()) {
    str = `Nice. You are both ${dinoObject.diet}s. Now you can both share a meal :)`;
  } else {
    str = `This one's a ${dinoObject.diet}. Your diet preferences simply don't match!`;
  }
  return str;
};

// The plain fact method returns dinosaur-specific plain fact.

const getPlainFact = (dinoObject) => {
  return dinoObject.fact;
};

// Global variables

const methods = [[compareHeight, compareWeight, compareDiet], getPlainFact]; // An array of compare methods and getPlainFact method to facilitate randomised selection
let gridItemCount = 0;

// The getChoice method randomly returns a binary value i.e. 0 or 1.
// The returned value will determine what option to choose: a comparison method or plain fact method
// credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

const getChoice = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Important helper method that randomly calls a compare method or the getPlainFact method
// and returns a comparison or factual string

const generateSubtext = (dinoObject, humanObject) => {
  if (!dinoObject.species) {
    // ...it's a human. So return empty string.
    return "";
  } else if (dinoObject.species === "pigeon") {
    // ...it's a pigeon. So return standard fact.
    return dinoObject.fact;
  } else {
    // ... it's a dino, so randomly select comparison method or plain fact
    const choice = getChoice(0, 1);
    if (
      (choice === 0 && methods[0].length !== 0) ||
      (gridItemCount === 2 && methods[0].length === 3) ||
      (gridItemCount === 5 && methods[0].length === 2) ||
      (gridItemCount === 7 && methods[0].length === 1)
    ) {
      const str = methods[0][0](dinoObject, humanObject);
      methods[0].shift();
      return str;
    }
    return getPlainFact(dinoObject);
  }
};

// The method generates a 3 x 3 grid with populated content
// and adds it to the DOM.
const generateGrid = (dinoObjects, humanObject) => {
  const gridSize = 9;
  const humanObjectPosition = parseInt((gridSize / 2).toString());

  dinoObjects.splice(humanObjectPosition, 0, humanObject);

  dinoObjects.map((dino) => {
    let divElem = document.createElement("div");
    divElem.className = "grid-item";

    let pElem = document.createElement("p");
    let imgElem = document.createElement("img");

    const subText = generateSubtext(dino, humanObject, methods);

    if (dino.species) {
      const species = dino.species;
      pElem.innerText = species.toUpperCase() + "\n" + subText;
      imgElem.src = `./images/${species}.png`;
    } else {
      pElem.innerText = dino.name.toUpperCase();
      imgElem.src = `./images/human.png`;
    }

    divElem.appendChild(pElem);
    divElem.appendChild(imgElem);
    document.getElementById("grid").append(divElem);
    gridItemCount += 1;
  });
};

// The first method called that loads all dino JSON data,
// creates dino objects, and adds an event handler to 'Compare Me' button.
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

  document
    .getElementById("btn")
    .addEventListener("click", (e) => handleClick(e, dinoObjects));
};

start();
