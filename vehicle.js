function Vehicle(x, y){
  this.pos = createVector();
  this.target = createVector(x, y);
  this.vel = createVector();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 20;
  this.maxforce = 1;
  this.col = color(random(255), random(255), random(255));
}

Vehicle.prototype.behaviours = function(){
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f){
  this.acc.add(f);
}

Vehicle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function(){
  var d = p5.Vector.dist(this.target, this.pos);
  var x = map(d, 2, 600, 9, 80);
  stroke(this.col);
  strokeWeight(x);
  point(this.pos.x, this.pos.y);
}

Vehicle.prototype.arrive = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if(d < 100){
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if(d < 50){
    desired.setMag(this.maxspeed);
    if(cbVortex.checked()){
      desired.mult(1);
    }else{
      desired.mult(-1);
    }
    var steer = p5.Vector.sub(desired, this.vel);
    if(cbForce.checked()){
      steer.limit(this.maxforce * PI);
    }else{
      steer.limit(this.maxforce);
    }
    return steer;
  }else{
    return createVector(0, 0);
  }
}