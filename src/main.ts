import "./style.css";

// style = "display : block, margin : 0 auto"; font - size: 20px;"

// Create a new button
document.body.innerHTML = `
  <button> 🥐 </button>
  <div id = "Counter"> You have 0 crossiants!🥐</div>
`;
const button = document.querySelector("button");
const counterElement = document.getElementById("Counter");
let counter = 0; // 0 crossiants to start

// Add an event listener to the button
button?.addEventListener("click", () => {
  counter++; // increase counter by 1
  if (counterElement) {
    counterElement.textContent = `You have ${counter} crossiants!🥐`; // update the counter display
  }
});