var framerate = 60;
var pendulum_number = 50;
var pendulums;

var mouse_positions;
var mouse_positions_number = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(framerate);
  pendulums = [];
  for ( i = 0; i < pendulum_number; i++) {
    var t = (i/pendulum_number);
    var pivot = createVector(width*7/8-width*6/8*t, -(1-t)*height*0.75);
    var radius = pow(1-t, 2) * 25 + 5;
    var mass = PI*sq(radius) * random(0.9, 1);
    var colour = color(255, 255, 255, (1-t)*255);
    var cord = random(height/20) + height * 0.8;
    var pendulum = new Pendulum(pivot, cord, PI*(t+1/4), radius, mass, colour);
    pendulums.push(pendulum);
  }
  mouse_positions = [];
  for ( i = 0; i < mouse_positions_number; i++) { mouse_positions.push(createVector(0, 0)); }
}

var store_mouse;
var draw_line = false;
var drag_pendulum = null;

function mousePressed() {
  store_mouse = createVector(mouseX, mouseY);
  for (i = 0; i < pendulums.length; i++) {
    var P = pendulums[i];
    var location = P.location();
    var vector = location.copy().sub(store_mouse);
    var distance = vector.mag();
    if (distance <= P.radius) {
      store_mouse = location.sub(store_mouse); 
      drag_pendulum = P; 
      P.active = false; 
      P.colour.setBlue(0);
      P.colour.setGreen(0);
      return; 
    }
  }
  draw_line = true;
}

function record() {
  for ( i = mouse_positions_number-1; i > 0; i--) {
    mouse_positions[i] = mouse_positions[i-1];
  }
  var mouse = createVector(mouseX, mouseY);
  mouse_positions[0] = mouse;
}

function sum_deltas() {
  var sum = createVector(0, 0);
  for ( i = mouse_positions_number-1; i > 0; i--) { 
    sum.add(mouse_positions[i-1].copy().sub(mouse_positions[i])); 
  }
  return sum;
}

function mouseDragged() {
  if (drag_pendulum != null) {
    var mouse = createVector(mouseX, mouseY);
    mouse.sub(drag_pendulum.pivot);
    mouse.add(store_mouse);
    var hip = mouse.mag();
    var angle = asin(mouse.x / hip) - PI / 2;
    drag_pendulum.angle = -angle;
  }
}

function mouseReleased() {
  var mouse = createVector(mouseX, mouseY);
  if (drag_pendulum != null) {
    drag_pendulum.active = true;
    drag_pendulum.colour.setBlue(255);
    drag_pendulum.colour.setGreen(255);
    var t = (mouse.x/width);
    var deltas = sum_deltas();
    drag_pendulum.velocity = (cos(abs(t*PI-PI/2)) * -deltas.x + sin(t*PI-PI/2) * deltas.y) / 10000;
    drag_pendulum = null;
    return;
  }
  var force = -mouse.sub(store_mouse).x / 100;
  for (i = 0; i < pendulums.length; i++) { pendulums[i].add_force(force); }
  draw_line = false;
  return; 
}

function draw() {
  background(0);
  record();
  for (i = pendulums.length-1; i >= 0; i--) {
    var p = pendulums[i];
    p.update();
    p.draw();
  }
  if (draw_line == true) {
    var mouse = createVector(mouseX, mouseY);
    draw_arrow(store_mouse, createVector(mouse.x, store_mouse.y), color(255));
  }
}
