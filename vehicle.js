// MykolasK 2017.04.02
// Steering text paths
// inspiration Daniel Shiffman

var colorValue = 0;
var colorB = 100;
var colorS = 0;

function Vehicle(x, y) {
  // Setting up object
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 7;
  this.maxForce = 1;
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(0.6);
  flee.mult(5);

  this.applyForce(arrive);
  if (mouseX <= 1000 && mouseX >= 0 && mouseY <= 300 && mouseY >= 0) {
    this.applyForce(flee);
  }
};

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function() {
  strokeWeight(this.r);
  stroke(colorValue, colorS, colorB);
  point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
};

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }
};

Vehicle.prototype.newTarget = function(x, y) {
  this.target = createVector(x, y);
};

function changeColor(newValue) {
  colorValue = newValue;
  colorB = 60;
  colorS = 60;
}
