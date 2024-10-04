// this variable stores the "Pick a Color" button
let button = document.getElementById('color-button');

// this variable stores the "Mystery Color" button
let mysteryButton = document.getElementById('next-button');

// this random number function will create color codes for randomColor variable:

function colorValue() {
  return Math.floor(Math.random() * 256);
}
 
// colorChange() function will be used as event handler function to randomly change colors of the buttons when specific events are fired on them:

function colorChange(event){
  let randomColor = 'rgb(' + colorValue() + ',' + colorValue() + ',' + colorValue() + ')';
  event.target.style.backgroundColor = randomColor; // changes bg color of event target
}

// create event handler property on button element that fires when clicked - use colorChange as event handler function:

button.addEventListener('click', colorChange)

// create event handler property on mysteryButton element that fires when you rotate the mouse wheel or slide down on the mousepad - assign same colorChange event handler function:

mysteryButton.addEventListener('wheel', colorChange)