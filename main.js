let button = document.getElementsByClassName("color-button")[0];

let paletteContainer = document.getElementById("palette");

let colorCodeElement = document.getElementById("color-code");

const defaultColor = "#E2B044";

// Function to generate a random color value (0-255)
function colorValue() {
    return Math.floor(Math.random() * 256);
}

// Function to display a default color palette on page load
function displayDefaultPalette() {
    colorCodeElement.innerHTML = `Color Code: ${defaultColor}`;
    generatePalette(defaultColor);
}

// Function to handle color change on button click
function colorChange(event) {
    const randomColor = `rgb(${colorValue()}, ${colorValue()}, ${colorValue()})`;

    event.target.style.backgroundColor = randomColor;

    colorCodeElement.innerHTML = `Color Code: ${rgbToHex(randomColor)}`;

    generatePalette(randomColor);
}

// Function to convert RGB color to HEX format
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    const hex = rgbValues
        .map((val) => {
            const hexValue = parseInt(val).toString(16).padStart(2, "0");
            return hexValue;
        })
        .join("");
    return `#${hex.toUpperCase()}`;
}

// Function to generate a color palette using Chroma.js
function generatePalette(baseColor) {
    paletteContainer.innerHTML = "";

    let color = chroma(baseColor);

    let complementaryColor = color.set(
        "hsl.h",
        (color.get("hsl.h") + 180) % 360
    );
    let analogousColors = chroma
        .scale([
            color.set("hsl.h", color.get("hsl.h") - 30),
            color.set("hsl.h", color.get("hsl.h") + 30),
        ])
        .colors(3);
    let triadicColors = chroma
        .scale([
            color,
            color.set("hsl.h", (color.get("hsl.h") + 120) % 360),
            color.set("hsl.h", (color.get("hsl.h") + 240) % 360),
        ])
        .colors(3);

    let allColors = [complementaryColor, ...analogousColors, ...triadicColors];

    // Create and display color swatches for each generated color
    allColors.forEach((col) => {
        let colorSwatch = document.createElement("div");
        colorSwatch.className = "color-swatch";
        colorSwatch.style.backgroundColor = col;

        paletteContainer.appendChild(colorSwatch);
    });
}

button.addEventListener("click", colorChange);

// Display default palette on window load
window.onload = displayDefaultPalette;
