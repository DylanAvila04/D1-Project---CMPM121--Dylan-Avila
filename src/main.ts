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
// const cookElement = document.getElementById("cook");
// const cookElement = document.getElementById("cook");

let counter = 0; // 0 crossiants to start
const cookscrossiants = 1; // 0 crossiants from cook

setInterval(() => {
  counter += cookscrossiants; // increase counter by number of cooks
  updateDisplay();
  // updateCookDisplay();
}, 1000); // every second

// Add an event listener to the button
button?.addEventListener("click", () => {
  counter++; // increase counter by 1
  updateDisplay();
});

function updateDisplay() {
  if (counterElement) {
    counterElement.textContent = `You have ${counter} crossiants!🥐`; // update the counter display
  }
}
