const button = document.querySelector(".color-button"); // Use querySelector for better readability
const paletteContainer = document.getElementById("palette");
const colorCodeElement = document.getElementById("color-code");

const defaultColor = "#E2B044";

// Function to generate a random color value (0-255)
function colorValue() {
    return Math.floor(Math.random() * 256);
}

// Function to display the default color palette on page load
function displayDefaultPalette() {
    colorCodeElement.textContent = `Color Code: ${defaultColor}`; // Use textContent for security
    generatePalette(defaultColor);
}

// Function to handle color change on button click
function colorChange(event) {
    const randomColor = `rgb(${colorValue()}, ${colorValue()}, ${colorValue()})`;
    event.target.style.backgroundColor = randomColor; // Change button color
    colorCodeElement.textContent = `Color Code: ${rgbToHex(randomColor)}`; // Update displayed color code
    generatePalette(randomColor);
}

// Function to convert RGB color to HEX format
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    const hex = rgbValues
        .map((val) => parseInt(val).toString(16).padStart(2, "0"))
        .join("");
    return `#${hex.toUpperCase()}`;
}

// Function to generate a color palette using Chroma.js
function generatePalette(baseColor) {
    paletteContainer.innerHTML = "";

    const color = chroma(baseColor);

    const complementaryColor = color.set(
        "hsl.h",
        (color.get("hsl.h") + 180) % 360
    );

    const analogousColors = chroma
        .scale([
            color.set("hsl.h", color.get("hsl.h") - 30),
            color.set("hsl.h", color.get("hsl.h") + 30),
        ])
        .colors(3);

    const triadicColors = chroma
        .scale([
            color,
            color.set("hsl.h", (color.get("hsl.h") + 120) % 360),
            color.set("hsl.h", (color.get("hsl.h") + 240) % 360),
        ])
        .colors(3);

    const allColors = [
        complementaryColor,
        ...analogousColors,
        ...triadicColors,
    ];

    // Create and display color swatches for each generated color
    allColors.forEach((col) => {
        const colorSwatch = document.createElement("div");
        colorSwatch.className = "color-swatch";
        colorSwatch.style.backgroundColor = col;

        colorSwatch.addEventListener("click", () => {
            colorCodeElement.textContent = `Color Code: ${rgbToHex(col)}`;
        });

        paletteContainer.appendChild(colorSwatch);
    });
}

button.addEventListener("click", colorChange);

window.onload = displayDefaultPalette;
