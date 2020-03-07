class Dynamic {
  
  constructor(angle, radius, mass, colour) {
    this.angle = angle;
    this.velocity = 0;
    this.acceleration = 0;
    this.radius = radius;
    this.mass = mass;
    this.colour = colour;
  }
  
  add_force(force) {
    this.acceleration += force/this.mass;
  }
}
