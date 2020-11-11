// =================
// SPACE BATTLE
// =================

// =======================================================================================

// ============================
// PSEUDOCODE + PLANNING
// ============================

// WHILE (you still have HP)

// 6 Alien ships to beat

// SAMPLE BATTLE
//// PLAYER attacks.
//// IF Enemy HP ≠ 0
////// --> THEN Enemy attacks
//// IF Player HP ≠ 0
////// --> THEN we attack again
//// (continue until someone runs out of HP)
//

// 6 Reps of the Above until you WIN
// After each battle, you can either Attack again OR Retreat.
//
// END (YOU WIN ... OR ... You run out of HP)

//
//
// ==========================
// CIRCLE-BACK-TO LIST:
// ==========================
// • Circle back to the if statements within
// • Build-out Retreat() function further
// • Add more methods to each Ship (missles to mine, targeting to mine, repair function to mine, ...)
// • New Game function (aka, a reset parameters function)
// •
// •
// •

// =======================================================================================

// ===============
// GAME SETUP
// ===============

// Randomization Helper Function
const randomize = (limit) => {
  return Math.floor(Math.random() * limit);
};

// Blueprint for EnemyShips
class EnemyShip {
  constructor(hull, firepower, accuracy, id) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.id = id;
  }
  attack(ussNova) {
    if (Math.random() <= this.accuracy) {
      ussNova.hull -= this.firepower;
      if (ussNova.hull <= 0) {
        ussNova.hull = 0;
        console.log("The USS Nova has been destroyed — your watch has ended.");
      } else if (ussNova.hull > 0 && ussNova.hull < 6) {
        console.log(
          `Direct hit! The Nova's hull is in critical condition – we only have ${ussNova.hull} hit-point(s) remaining!`
        );
      } else if (ussNova.hull > 6 && ussNova.hull < 14) {
        console.log(
          `They got us again! I don't know how many more hits like that the Nova can take – our hull only has ${ussNova.hull} hit-points remaining!`
        );
      } else if (ussNova.hull > 14) {
        console.log(
          `We've been hit! The Nova's hull has ${ussNova.hull} hit-point(s) remaining!`
        );
      }
    } else {
      console.log(`The alien's lasers barely missed us!`);
    }
  }
  reportHealth() {
    console.log(`${this.id}'s hull has ${this.hull} hit-point(s) remaining!`);
  }
}

// Array that we will fill with our individual Alien Ship Objects created via Class Constructor.
const alienShips = [];

// We will use the 3 arrays below to randomly assign our Alien Ship properties.
const alienHullValues = [3, 4, 5, 6];
const alienFirepowerValues = [2, 3, 4];
const alienAccuracyValues = [0.6, 0.65, 0.7, 0.75, 0.8];

// Use this loop to randomly create alien ships with randomized values for hull, firepower, and accuracy.
for (let i = 0; i < 6; i++) {
  // Randomly select an alien *hull value*
  const hullValue = alienHullValues[randomize(alienHullValues.length)];
  // Randomly select an alien *firepower value*
  const firepowerValue =
    alienFirepowerValues[randomize(alienFirepowerValues.length)];
  // Randomly select an alien *accuracy value*
  const accuracyValue =
    alienAccuracyValues[randomize(alienAccuracyValues.length)];
  //Create a unique ID for each alienShip. Will help with keeping them straight.
  const idValue = `Neimoidian-Destroyer-0${i + 1}`;
  // Create 6 ships and unshift them into our alienShips array. Using unshift so that our IDs are in order.
  alienShips.push(
    new EnemyShip(hullValue, firepowerValue, accuracyValue, idValue)
  );
}

// Initialize the USS Nova object. AKA --> Our Ship.
const ussNova = {
  name: "USS Nova",
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
  // **An eye to the future: if we want to give ourselves mutliple weapons, missles could live
  // ~here as an array with "6 missles" in it, and we could pop one out every time we use one.
  // Just a thought in case I want to add more functionality/go for the bonus objectives.
  attack(alienShip) {
    if (Math.random() <= ussNova.accuracy) {
      alienShip.hull -= ussNova.firepower;
      if (alienShip.hull <= 0) {
        alienShip.hull = 0;
        console.log(
          `Direct hit on ${alienShip.id}! Their hull has ${alienShip.hull} hit-points remaining and has been destroyed!`
        );
      } else if (alienShip.hull > 0) {
        console.log(
          `Direct hit on ${alienShip.id}! Their hull has ${alienShip.hull} hit-points remaining!`
        );
      }
    } else {
      console.log(`Our lasers barely missed!`);
    }
  },
  retreat() {
    action = "stop";
    document.location.href = "";
  },
  reportHealth() {
    console.log(`The Nova's hull has ${ussNova.hull} hit-point(s) remaining!`);
  },
};

// =======================================================================================

// =============================
// Game Logic
// =============================

// Global Variables
let shipIndex = 0;
let currentTarget = alienShips[shipIndex];
let action = null;

// Gameplay Function
while (action !== "stop") {
  action = prompt(
    "Enter 'attack' to fire your lasers at the enemy ship, 'retreat' to run and live to fight another day, 'health' to check the hit-points of the USS Nova and your current enemy, or 'stop' to end the game.",
    "What would you like to do?"
  );
  if (action === "attack") {
    while (ussNova.hull > 0 && currentTarget.hull > 0) {
      ussNova.attack(currentTarget);
      if (currentTarget.hull <= 0) {
        break;
      }
      currentTarget.attack(ussNova);
    }
    if (currentTarget.hull <= 0) {
      console.log("Victory! You defeated the Neimoidian destroyer!");
      shipIndex++;
      if (alienShips[shipIndex]) {
        currentTarget = alienShips[shipIndex];
        console.log("Another alien ship has been spotted in the sector!");
      } else {
        console.log(
          "That was the last ship in the sector! You have brought glory to our people."
        );
        break;
      }
    }
    if (ussNova.hull <= 0) {
      console.log(
        "The USS Nova has been destroyed! All hope for humanity has been lost..."
      );
      break;
    }
  } else if (action === "retreat") {
    ussNova.retreat();
  } else if (action === "health") {
    currentTarget.reportHealth();
    ussNova.reportHealth();
  } else if (
    action !== "attack" &&
    action !== "retreat" &&
    action !== "health" &&
    action !== "stop"
  ) {
    console.log("Command not recognized. Please use a valid command.");
  }
}
