// ===================
// SPACE BATTLE 3000
// ===================

// =======================================================================================

// ==========================
// CIRCLE-BACK-TO LIST:
// ==========================
// • Circle back to the if statements within game logic
// • Build-out Retreat() function further
// • Add more methods to each Ship (missles to mine, targeting to mine, repair function to mine, missles/other weapon to alien...)
// • Additional lives?
// • Add in a final boss? Mothership?
// •

// TO FIX
// * REMOVE YOUR RANDOMIZATION VARIABLE. GO HARD-CODE THE RANDOM VALUES INSTEAD.
// IT'S THROWING ISSUES FOR WHATEVER REASON
// * TRANSITION AWAY FROM BEING A CONSOLE-BASED GAME! CAN DYNAMICALLY ADD TEXT/MESSAGES
// TO A DIV OR SOMETHING IN OUR HTML, THAT WAY EVERYTHING WILL PRINT THERE!! :)

// * GAME IS WORKINGGGGG :))) BUT NOW GO BACK AND FIX SOME LOGIC ISSUES (move around some functions and console.logs, maybe add some alerts)

// =======================================================================================

// =======================================================================================
// Knowing what we know from the code review today (11/12),
// let's *gasp* start from scratch and see what we can come up with...

// ====================
// CACHED DOM NODES
// ====================

const fightButton = document.querySelector(".fight");
const healButton = document.querySelector(".heal");
const retreatButton = document.querySelector(".retreat");
const welcomeModal = document.querySelector(".welcome-modal");
const startButton = document.querySelector(".get-started");

// =======================
// GLOBAL VARIABLES
// =======================

// Create a toggle modal function that will house our START GAME button
const toggleModal = () => {
  welcomeModal.classList.add("closed");
};

// **** DEPRECATED ****
// randomization was throwing some funky issues, so coded values inline instead.

//

// // Randomization function. Built to work toward DRY code.
// const randomization = (limit) => {
//   Math.floor(Math.random() * limit);
// };

// Functions to randomly determine attributes of alien ships
let randomAlienHullValue = () => Math.floor(Math.random() * 5) + 3; // Make a random # between 4 & 7
let randomAlienPowerValue = () => Math.floor(Math.random() * 3) + 2; // Make a random # between 2 & 4
let randomAlienAccuracyValue = () => (Math.floor(Math.random() * 3) + 6) / 10; // Make a random # between .6 and .8

// Function to randomly determine outcome of Player Heal
let randomHealValue = () => Math.floor(Math.random() * 3) + 3; // Make a random # between 2 & 5

// Array used to propagate alien ship with a pilot/name
const alienPilotNames = [
  "Voptin Mongogonu",
  "Queeborn Groalagongon",
  "Osacer Zomkidtor",
  "The High Monkrut of Tashva",
  "Zomhuru Queebala",
  "Altissin Gsin",
  "The Great Ustrzut of Sonox",
  "Metahuru Cakrewblob",
  "Jurzon Andzulalite",
  "Judgong Be'oi",
  "B'ato of Patoda",
  "Monhop Vololn",
];

// =============================
// CLASSES & CONSTRUCTORS
// =============================

// General class constructor for alien ships. Will take randomized
// values for Hull, Firepower, Accuracy, and Pilot.
class EnemyShip {
  constructor(pilot) {
    this.hull = randomAlienHullValue();
    this.firepower = randomAlienPowerValue();
    this.accuracy = randomAlienAccuracyValue();
    this.pilot = pilot;
    this.catchPhrases = [
      '– "Did someone say probes??" ',
      '– "The Nova stands No-ta chance!" ',
      '– "Lasers charged to power-level 3000! Prepare to fire!" ',
      '– "You stand no chance against the Galactic Republic!" ',
      `– "You should've retreated when you had the chance.." `,
      `– "The human race doesn't stand a chance against the great Neimoidian army!" `,
      '– "Radio King Jar Jar — victory is but moments away." ',
    ];
  }
  /*
  Set up catchphrases like in the Dougie the Donut example. 
  Add some personality to the game!
  */
  talkIsh() {
    let ish = this.catchPhrases[
      Math.floor(Math.random() * this.catchPhrases.length)
    ];
    console.log(this.pilot + " says " + ish);
  }

  /* 
  Alien attack function. Targets the USS Nova every time. Open interaction by having Alien Pilot talk.
  Series of different console.logs based on how much damage THE USS NOVA has sustained. 
  */
  attack() {
    this.talkIsh();
    if (checkIfHit(this) === true) {
      ussNova.hull -= this.firepower;
      if (ussNova.hull <= 0) {
        ussNova.hull = 0;
        console.log(`The Nova has been destroyed — your watch has ended.`);
      } else if (ussNova.hull > 0 && ussNova.hull < 6) {
        console.log(
          `Direct hit! Shields down by ${this.firepower} points. The Nova's hull is in critical condition – we only have ${ussNova.hull} hit-point(s) remaining!`
        );
      } else if (ussNova.hull > 6 && ussNova.hull < 14) {
        console.log(
          `They got us again! We took ${this.firepower} damage! I don't know how many more hits like that the Nova can take – our hull only has ${ussNova.hull} hit-points remaining!`
        );
      } else if (ussNova.hull > 14) {
        console.log(
          `We've been hit for ${this.firepower} damage! The Nova's hull has ${ussNova.hull} hit-points remaining!`
        );
      }
    } else {
      console.log(`The alien's lasers barely missed us!`);
    }
  }

  /*
  Reports current hit points of active alien ship.
  */
  reportHealth() {
    console.log(
      `${this.pilot}'s hull has ${this.hull} hit-point(s) remaining!`
    );
  }
}

// Array that we will fill with our individual Alien Ship Objects created via Class Constructor.
// Moved here closer to the top as I was running into scoping issues...
let alienShips = [];

/*
Initializer for our 6 Alien Space Ships
*/
for (let i = 0; i < 6; i++) {
  let pilotName =
    alienPilotNames[Math.floor(Math.random() * alienPilotNames.length)]; // Randomly select an alien pilot name from alienPilotNames array
  alienShips.push(new EnemyShip(pilotName)); // Create 6 ships and push them into our alienShips array
}

// Together, shipIndex + currentTarget form our alien targeting system.
// shipIndex will iterate every time we destroy an alien ship, until we outgrow our array.
let shipIndex = 0;
let currentTarget = alienShips[shipIndex];

// ================================================================================================================================

// Object literal for Hero ship.
// Was having issues getting the game to work with a class constructor for just
// the single Hero Ship...
// Default hull value of 20, default accuracy value of 70%, default firepower of 5.
const ussNova = {
  name: "USS Nova",
  hull: 20,
  accuracy: 0.7,
  firepower: 5,

  /*
  Attack function for the USS Nova
  */
  attack() {
    if (checkIfHit(this) === true) {
      currentTarget.hull -= ussNova.firepower;
      if (currentTarget.hull <= 0) {
        currentTarget.hull = 0;
        console.log(
          `Direct hit on ${currentTarget.pilot}! Their hull has ${currentTarget.hull} hit-points remaining and has been destroyed!`
        );
      } else if (currentTarget.hull > 0) {
        console.log(
          `Direct hit on ${currentTarget.pilot}! Their hull has ${currentTarget.hull} hit-points remaining!`
        );
      }
    } else {
      console.log(`Our lasers barely missed!`);
    }
  },

  /*
  Add the option to heal (and thus give the aliens a chance to attack — in previous versions, most aliens would
  just immediately be killed. Should add a layer of dynamism to the game?)

  ~80% chance that you are successfully able to heal between 2 - 5 HP 
  */
  repairShields() {
    if (Math.floor(Math.floor(Math.random() * 9)) / 10 <= this.accuracy) {
      let healAmount = randomHealValue();
      this.hull += healAmount;
      console.log(
        `Eureka! Our shields have been successfully repaired by ${healAmount}`
      );
    } else {
      console.log(
        "Did you hear that? I think one of our repair droid's just got clipped by a passing asteroid. No healing this round."
      );
    }
  },

  /*
  Retreat function.
  What variables would need reset in order to restart the game???
  */
  // retreat() {
  // },

  /*
  Reports current hit points of Hero Ship / We / Us. It's our ship.
  */
  reportHealth() {
    console.log(`The Nova's hull has ${this.hull} hit-point(s) remaining!`);
  },
};

// ================================================================================================================

// =============================
//  GAME LOGIC
// =============================

// Overall run-game function.
const startGame = () => {
  toggleModal();
  console.log(
    `So it begins! You can choose to fight, flee, or attempt to heal.`
  );
  //   // Below two functions are deprecated for now. May return to try attempt
  //   // reconfiguring. If I can get the below functions to cooperate, I can
  //   // also easily include a retreat/reset game function.

  //   // createHeroShip();
  //   // createAlienFleet();
};

const attackEnemy = () => {
  if (currentTarget.hull > 0) {
    ussNova.attack();
    battleLossCheck();
  } else if (currentTarget.hull <= 0) {
    console.log("Victory! You defeated the Neimoidian destroyer!");
    shipIndex++;
    if (alienShips[shipIndex]) {
      currentTarget = alienShips[shipIndex];
      console.log("Another alien ship has been spotted in the sector!");
    } else {
      console.log(
        "That was the last ship in the sector! You have brought glory to our people."
      );
    }
  }
};

const healSelf = () => {
  ussNova.repairShields();
  battleLossCheck();
};

// Check to make sure we haven't lost before it is our turn again!
const battleLossCheck = () => {
  if (currentTarget.hull > 0) {
    alienShips[0].attack(ussNova);
    if (ussNova.hull <= 0) {
      alert(`The ${ussNova.name} has been lost. Your watch has ended.`);
    }
  } else {
    console.log("It's our turn again, Captain. What shall we do?");
  }
};

// // Helper function that will allow us to start on-click + reset the game with a new Hero.
// const createHeroShip = (heroShip) => {
//   let heroShip = new HeroShip("USS Nova");
// };

// // Helper function that will allow us to start on-click + reset the game with new Aliens.
// const createAlienFleet = () => {
//   // Use this loop to randomly create alien ships with randomized Pilot Names
//   for (let i = 0; i < 6; i++) {
//     const pilotName =
//       alienPilotNames[Math.floor(Math.random * alienPilotNames.length)]; // Randomly select an alien pilot name from alienPilotNames array
//     alienShips.push(new EnemyShip(pilotName)); // Create 6 ships and push them into our alienShips array
//   }
// };

// Function to determine if shot hits the enemy
const checkIfHit = (ship) => {
  if (Math.random() < ship.accuracy) {
    return true;
  } else {
    return false;
  }
};

// ================================================================================================================

// =============================
//  EVENT LISTENERS
// =============================
fightButton.addEventListener("click", attackEnemy);
healButton.addEventListener("click", healSelf);
startButton.addEventListener("click", startGame);
