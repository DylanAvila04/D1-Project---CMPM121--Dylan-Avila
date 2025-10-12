import "./style.css";

// style = "display : block, margin : 0 auto"; font - size: 20px;"

// Create a new button
document.body.innerHTML = `
  <button> 🥐 </button>
  <div id = "Counter"> You have 0 crossiants!🥐</div>
  <div id = "cook"> Click to hire a baker!👩‍🍳 </div>
`;

const button = document.querySelector("button");
const counterElement = document.getElementById("Counter");
const rateElement = document.getElementById("rate");
// const cookElement = document.getElementById("cook");

let counter = 0; // 0 crossiants to start
const cookscrossiants = 1; // 0 crossiants from cook

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
}

// function updateCookDisplay() {
//   if (cookElement) {
//     cookElement.textContent =
//       `Click to hire a baker!👩‍🍳 You have ${cookscrossiants} bakers!👩‍🍳`; // update the cook display
//   }
// };
