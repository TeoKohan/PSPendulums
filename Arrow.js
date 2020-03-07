function draw_arrow(from, to, c) {
  stroke(c);
  var dir = createVector(to.x-from.x, to.y-from.y);
  var cross = createVector(-dir.y, dir.x).setMag(10);
  var midpoint = from.copy().add(dir.copy().setMag(dir.mag()-10));
  var arrow_left = midpoint.copy().add(cross);
  var arrow_right = midpoint.copy().sub(cross);
  line(from.x, from.y, to.x, to.y);
  line(to.x, to.y, arrow_left.x, arrow_left.y);
  line(to.x, to.y, arrow_right.x, arrow_right.y);
}
