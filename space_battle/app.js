// =================
// SPACE BATTLE
// =================

//
// SAMPLE GAME ROUND LOGIC - PSEUDO

// PLAYER ATTACKS

// IF ENEMY HIT POINTS are = 0
//// == THEN we have option to RETREAT or ATTACK THE NEXT SHIP
// ELSE ENEMY HP is > 0
//// == THEN ENEMY ATTACKS our ship
//// ==  == IF we survive, we ATTACK again.

// SEE --> Landscaper game for reference to alerts + propmts + passing user input

//
// CLASS CONSTRUCTOR LOGIC

// Two Classes
// == Our Ship
// == Enemy Ship(s)
////  ==  Extend this class if we want to get crazy creative
////  ==  Enemy has ranged properties... We can use individual arrays for each
////  ==  property ( I think ) in order to randomly select those properties. SEE --> Barbie Mini Game

//===============================================================================

// Let's start with our class constructors...

// No clear reason to use a class constructor for my own ship at the moment...
// There is only one instance, so mind as well use an object literal..

// class PlayerShip {
//   constructor(name) {
//     this.name = name;
//     this.hull = 20;
//     this.firepower = 5;
//     this.accuracy = 0.7;
//   }
// }

// const ussNova = new PlayerShip('USS Nova');

// Randomization Helper Function
const randomize = (limit) => {
  return Math.floor(Math.random() * limit);
};

// Blueprint for EnemyShips
class EnemyShip {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

// Array that we will fill with our individual Alien Ship Objects created via Class Constructor.
const alienShips = [];

// We will use the 3 arrays below to randomly assign our Alien Ship properties.
const alienHullValues = [3, 4, 5, 6];
const alienFirepowerValues = [2, 3, 4];
const alienAccuracyValues = [0.6, 0.65, 0.7, 0.75, 0.8];

// Use this loop to randomly create alien ships with randomized values for hull, firepower, and accuracy.
for (let i = 6; i > 0; i--) {
  // Randomly select an alien *hull value*
  const hullValue = alienHullValues[randomize(alienHullValues.length)];
  // Randomly select an alien *firepower value*
  const firepowerValue =
    alienFirepowerValues[randomize(alienFirepowerValues.length)];
  // Randomly select an alien *accuracy value*
  const accuracyValue =
    alienAccuracyValues[randomize(alienAccuracyValues.length)];
  // Create 6 ships and push them into our alienShips array.
  alienShips.push(new EnemyShip(hullValue, firepowerValue, accuracyValue));
}

// Initialize the USS Nova object. AKA --> Our Ship.
const ussNova = {
  name: "USS Nova",
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
};
