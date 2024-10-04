// Get the "Pick a Color" and "Mystery Color" buttons
let button = document.getElementById('color-button');

// Get the color code display element
let colorCodeDisplay = document.getElementById('color-code');

// Function to generate a random color value
function colorValue() {
  return Math.floor(Math.random() * 256);
}

// Function to convert RGB values to Hex code
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Function to change the color of buttons and display the color code
function colorChange(event) {
  let r = colorValue();
  let g = colorValue();
  let b = colorValue();
  let randomColor = `rgb(${r}, ${g}, ${b})`;
  
  // Change the background color of the target button
  event.target.style.backgroundColor = randomColor;
  
  // Display the color code in both RGB and Hex format
  let hexColor = rgbToHex(r, g, b);
  colorCodeDisplay.textContent = `Color Code: ${hexColor} (RGB: ${r}, ${g}, ${b})`;
}

// Event listeners for buttons
button.addEventListener('click', colorChange);
button.addEventListener('wheel', colorChange);
