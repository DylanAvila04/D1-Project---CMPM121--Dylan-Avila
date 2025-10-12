import "./style.css";

// style = "display : block, margin : 0 auto"; font - size: 20px;"

// Create a new button
document.body.innerHTML = `
  <button> 🥐 </button>
  <div id = "Counter"> You have 0 crossiants!🥐</div>
  <div id = "rate"> Passive income: 0.0 corssiants/sec 👩‍🍳</div>
  <button id = "baker"> 10 crossiants = 1 Baker👩‍🍳 (Owned: 0) </button>
`;

const button = document.querySelector("button");
const counterElement = document.getElementById("Counter");
const rateElement = document.getElementById("rate");
const bakerButton = document.getElementById("baker");
// const cookElement = document.getElementById("cook");

let counter = 0; // 0 crossiants to start
let cookscrossiants = 1; // 0 crossiants from cook
let bakers = 0; // 0 cooks to start
const bakerCost = 10; // cost of 1 cook

// setInterval(() => {
//   counter += cookscrossiants; // increase counter by number of cooks
//   updateDisplay();
//   // updateCookDisplay();
// }, 1000); // every second

// Add an event listener to the button
button?.addEventListener("click", () => {
  counter++; // increase counter by 1
  updateDisplay();
});

bakerButton?.addEventListener("click", () => {
  if (counter >= bakerCost) {
    bakers++; // increase number of cooks by 1
    counter -= bakerCost; // decrease counter by cost of cook
    cookscrossiants = bakers; // each cook makes 1 crossiant per second
    updateDisplay();
    // updateCookDisplay();
  }
});

let pasttime: number | null = null;

function loop(timestamp: number) {
  if (!pasttime) pasttime = timestamp;
  const diff = (timestamp - pasttime) / 1000;

  counter += diff * cookscrossiants;
  pasttime = timestamp;

  updateDisplay();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function updateDisplay() {
  if (counterElement) {
    counterElement.textContent = `You have ${counter} crossiants!🥐`; // update the counter display
  }
  if (counterElement) {
    const visible = Math.floor(counter);
    counterElement.textContent = `You have ${visible} crossiants!🥐`; // update the counter display
  }
  if (rateElement) {
    rateElement.textContent =
      `You are making ${cookscrossiants} crossiants per second!🥐`; // update the rate display
  }
  if (bakerButton) {
    bakerButton.textContent = `10 crossiants = 1 Baker👩‍🍳 (Owned: ${bakers})`; // update the baker button display
  }
}
