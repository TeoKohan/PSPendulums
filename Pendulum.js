
class Pendulum extends Dynamic {
  
  constructor(pivot, cord, angle, radius, mass, colour) {
    super(angle, radius, mass, colour);
    this. pivot = pivot;
    this.cord = cord;
    this.active = true;
  }
  
  update() {
    if (this.active == false) { return; }
    this.add_force(this.gravity());
    this.velocity += this.acceleration;
    this.angle += this.velocity;
    this.velocity *= 0.99;
    this.acceleration = 0;
  }
  
  gravity() {
    return (9.8/framerate) * this.mass * cos(this.angle) / this.cord;
  }
  
  add_force(force) {
    super.add_force(force);
  }
  
  location() {
    return createVector(cos(this.angle), sin(this.angle)).mult(this.cord).add(this.pivot);
  }
  
  draw() {
    var start = this.pivot;
    var end = this.location();
    
    stroke(this.colour);
    fill(this.colour);
    strokeWeight(alpha(this.colour)/64);
    
    line(start.x, start.y, end.x, end.y);
    noStroke();
    ellipse(end.x, end.y, this.radius*2);
    fill(255);
    ellipse(end.x, end.y, this.radius/5);
  }
}
