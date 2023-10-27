var w = window.innerWidth;
var h = window.innerHeight;

var waves = [
  {
    amplitude: 75.0,
    frequency: 720,
    color: "white",
    howHigh: 250,
    animationSpeed: 0.05,
  },
  {
    amplitude: 50.0,
    frequency: 441,
    color: "red",
    howHigh: 150,
    animationSpeed: 0.1,
  },
];

var xspacing = 8; // How smooth the curve should be. Small value=more smooth
var period; // how many pixels before the wave repeats, calcualated from frequency
var dx; // Value for incrementing x
var yvalues; // Using an array to store height values for the wave

function setup() {
  createCanvas(w, h);

  //calculations for drawing the sin wave
  w = width + 16;
  yvalues = new Array(floor(w / xspacing));

  for (let i = 0; i < waves.length; i++) {
    waves[i].period = w / waves[i].frequency + 500;
    waves[i].dx = (TWO_PI / waves[i].period) * xspacing;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < waves.length; i++) {
    stroke(waves[i].color);
    noFill();
    strokeWeight(4);

    calcWave(waves[i]); //calculate the points on the wave
    renderWave(waves[i]); //draw the wave
  }
}

//functions to calculate and draw the wave
function calcWave(wave) {
  // Increment theta to animate the wave (try different values for
  // different speeds)
  wave.theta = wave.theta || 0;
  wave.theta += wave.animationSpeed;

  // For every x value, calculate a y value with sine function
  let x = wave.theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * wave.amplitude;
    x += wave.dx;
  }
}

function renderWave(wave) {
  beginShape();
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    vertex(x * xspacing, height - wave.howHigh + yvalues[x]);
  }
  endShape();
}

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
};
