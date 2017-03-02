var font;
var vehicles = [];
var gravity;
var words = ["Hello", "World", "Whollop", "Bang", "Bounce", "Chef", "Welcome", "Wobble", "Whoosh", "Crib", "Smack", "Crash", "Patrick", "Neil", "Memes"];
var points;

var cbVortex, cbForce;
// var slider;

function preload(){
  font = loadFont('Asimov.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // slider = createSlider(0, 10, 1);
  // slider.position(20, 350);

  cbVortex = createCheckbox("Vortex", false);
  cbVortex.position(60, 350);
  cbForce = createCheckbox("Force", false);
  cbForce.position(140, 350);

  points  = font.textToPoints(random(words), 50, 300, 300);
  gravity = createVector(0, 2);

  for(var i = 0; i < points.length; i++){
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

}

// function mousePressed() {
//   vehicles.length = 0;
//   setup();
// }

function draw() {
  background(255, 30);
  for(var i = 0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.show();
  }
}