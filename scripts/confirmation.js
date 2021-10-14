main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const orderId = document.querySelector("#orderId");
  orderId.innerText = localStorage.getItem("orderId");
  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}
