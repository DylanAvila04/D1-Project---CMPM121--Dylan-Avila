//Crossiant Clicker Game
//Main theme of the game is a bakery that makes Crossiants similar to cookie clicker
//The only difference is that it is a different type of patrie and the upgrades are different
//as well. The upgrades consist of a assisant baker, baker, and stone oven
//I wanted the assisant baker to be something you can hire cheap with 10 crossaints,
//the next is a baker that is a bit more expensive with 100 bakers, lastly with the
//best upgrade of a stone oven. I also changed the background to a more light brown
//color for a cafe feeling.

// Key systems:
//  *  - Manual clicking increases counter
//  *  - Shop buttons remove cost and increase automation rate
//  *  - Prices scale up over time using a multiplier
//  *  - requestAnimationFrame ensures smooth timed updates

// 1) Imports
import "./style.css";

// 2) Type definitions
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// 3) Game data (availableItems, Price_Multiply)

const availableItems: Item[] = [
  {
    name: "assistantBaker",
    cost: 10,
    rate: 0.1,
    description: " Likes to help the baker with the small prep ",
  },

  {
    name: "baker",
    cost: 100,
    rate: 2,
    description: " handles the whole kitchen alongside the assistant",
  },

  {
    name: "stoneOven",
    cost: 1000,
    rate: 50,
    description: " Speeds up the time for pastries and cuts the line",
  },

  {
    name: "mixer",
    cost: 2000,
    rate: 100,
    description: "Helps speed up the process instead of handmade",
  },

  {
    name: "salesPerson",
    cost: 5000,
    rate: 250,
    description: "Helps sell the corssiants and makes revenue ",
  },
];

const Price_Multiply = 1.15;

// 4) DOM setup
document.body.innerHTML = `
  <button id = "mainButton"> 🥐 </button>
  <div id = "Counter"> You have 0 crossiants!🥐</div>
  <div id = "rate"> Passive income: 0.0 corssiants/sec 👩‍🍳</div>
  <div id ="shop"></div>
`;

const mainButton = document.getElementById("mainButton") as HTMLButtonElement;
const counterElement = document.getElementById("Counter") as HTMLDivElement;
const rateElement = document.getElementById("rate") as HTMLDivElement;
const shopElement = document.getElementById("shop") as HTMLDivElement;

// 5) State variables
let counter = 0; // 0 crossiants to start
const owned: Record<string, number> = {};
const costs: Record<string, number> = {};

for (const item of availableItems) {
  owned[item.name] = 0;
  costs[item.name] = item.cost;
}

// 6) Utility functions
function shop() {
  shopElement.innerHTML = availableItems.map((i) => {
    return `<button data-name="${i.name}">
      ${i.name} — cost: ${costs[i.name].toFixed(2)} (Owned: ${owned[i.name]})
    </button>`;
  }).join("");
}
shop();

function totalRate(): number {
  return availableItems.reduce((sum, i) => {
    return sum + owned[i.name] * i.rate;
  }, 0);
}

function updateDisplay() {
  const visible = Math.floor(counter);
  const rate = totalRate();

  counterElement.textContent = `You have ${visible} crossiants!🥐`;
  rateElement.textContent = `You are making ${
    rate.toFixed(2)
  } crossiants per second!🥐`;

  const buttons = shopElement.querySelectorAll<HTMLButtonElement>(
    "button[data-name]",
  );
  buttons.forEach((btn) => {
    const name = btn.dataset.name!; // narrowed to string
    btn.textContent = `${name} — cost: ${costs[name].toFixed(2)} (Owned: ${
      owned[name]
    })`;
    btn.disabled = counter < costs[name]; // compare against exact float
  });
}

// 7) Event listeners
mainButton.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

shopElement.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!(target instanceof HTMLButtonElement)) return;
  const name = target.dataset.name;
  if (!name) return;

  if (counter >= costs[name]) {
    counter -= costs[name];
    owned[name] += 1;
    costs[name] *= Price_Multiply;
    updateDisplay();
  }
});

// 8) Game loop

//This game loop runs every animation frame.
// Each frame basically:
//  1. Calculates elapsed time
//  2. Adds passive croissants based on totalRate()
//  3. Updates UI to show latest values
//  4. Requests the next frame
let pasttime: number | null = null;
function loop(timestamp: number) {
  if (!pasttime) pasttime = timestamp;
  const diff = (timestamp - pasttime) / 1000;
  counter += diff * totalRate();
  pasttime = timestamp;
  updateDisplay();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
