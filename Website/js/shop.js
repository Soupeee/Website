// Function to generate a random code
function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
}
  
// DOM Element
const codeDisplay = document.getElementById('random-code');
    
// Initialize empty cart
let cart = [];

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    alert(`${itemName} has been added to your cart.`);
    saveCart(); // Save cart to local storage
    loadCart(); // Update cart display
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from local storage or previous page
window.onload = function() {
    const randomCode = generateRandomCode();
    codeDisplay.textContent = randomCode;
    loadCart();
}

// Function to display cart items and total price
function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");
    
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    // Load cart from local storage
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
        cart = savedCart; // Load saved cart
    }

    cart.forEach((item) => {
        const itemElem = document.createElement("p");
        itemElem.textContent = `${item.name} - £${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemElem);
        total += item.price;
    });

    totalPriceElem.textContent = total.toFixed(2);
}

// Simulate a checkout function
function checkout() {
    alert("Thank you for your purchase!");
    cart = []; // Clear cart after purchase
    localStorage.removeItem("cart"); // Clear saved cart
    loadCart(); // Update cart display
}