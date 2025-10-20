import "./style.css";

// style = "display : block, margin : 0 auto"; font - size: 20px;"

// Create a new button
document.body.innerHTML = `
  <button> 🥐 </button>
  <div id = "Counter"> You have 0 crossiants!🥐</div>
  <div id = "rate"> Passive income: 0.0 corssiants/sec 👩‍🍳</div>

  <div id ="shop">
    <button id = "assistantBaker"> Assistant - cost: 10 (Owned: 0)</button>
    <button id = "baker"> Baker - cost:100 (Owned: 0) </button>
    <button id = "stoneOven"> Stone Oven - cost 1000 (Owned: 0)</button>
  </div>
`;

const button = document.querySelector("button");
const counterElement = document.getElementById("Counter");
const rateElement = document.getElementById("rate");
const bakerButton = document.getElementById("baker");
const assistantButton = document.getElementById("assistantBaker");
const stoneOvenButton = document.getElementById("stoneOven");
// const cookElement = document.getElementById("cook");

let counter = 0; // 0 crossiants to start

const assistantCost = 10;
const bakerCost = 100; // cost of 1 cook
const stoneOvenCost = 1000;

const rateAssistant = 0.1;
const rateBaker = 2.0;
const rateStoneOven = 50.0;

let ownedAssistants = 0;
let bakers = 0; // 0 cooks to start
let ownedStoneOven = 0;

function totalRate(): number {
  return (
    ownedAssistants * rateAssistant +
    bakers * rateBaker +
    ownedStoneOven * rateStoneOven
  );
}

// Add an event listener to the button
button?.addEventListener("click", () => {
  counter++; // increase counter by 1
  updateDisplay();
});

assistantButton?.addEventListener("click", () => {
  if (counter >= assistantCost) {
    ownedAssistants += 1; // increase number of cooks by 1
    counter -= assistantCost; // decrease counter by cost of cook
    updateDisplay();
  }
});

bakerButton?.addEventListener("click", () => {
  if (counter >= bakerCost) {
    bakers += 1; // increase number of cooks by 1
    counter -= bakerCost; // decrease counter by cost of cook
    updateDisplay();
  }
});

stoneOvenButton?.addEventListener("click", () => {
  if (counter >= stoneOvenCost) {
    ownedStoneOven += 1; // increase number of cooks by 1
    counter -= stoneOvenCost; // decrease counter by cost of cook
    updateDisplay();
  }
});

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

function updateDisplay() {
  const visible = Math.floor(counter);
  const rate = totalRate();

  if (counterElement) {
    counterElement.textContent = `You have ${visible} crossiants!🥐`;
  }
  if (rateElement) {
    rateElement.textContent = `You are making ${
      rate.toFixed(2)
    } crossiants per second!🥐`;
  }
  if (bakerButton) {
    (bakerButton as HTMLButtonElement).textContent =
      `100 crossiants = 1 Baker👩‍🍳 (Owned: ${bakers})`;
    (bakerButton as HTMLButtonElement).disabled = counter < bakerCost;
  }
  if (assistantButton) {
    (assistantButton as HTMLButtonElement).textContent =
      `10 crossiants = 1 Assistant Baker 🧑‍🍳 (Owned: ${ownedAssistants})`;
    (assistantButton as HTMLButtonElement).disabled = counter < assistantCost;
  }
  if (stoneOvenButton) {
    (stoneOvenButton as HTMLButtonElement).textContent =
      `1000 crossiants = 1 Stone Oven (Owned: ${ownedStoneOven})`;
    (stoneOvenButton as HTMLButtonElement).disabled = counter < stoneOvenCost;
  }
}
