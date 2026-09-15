//preview: python -m http.server

let ballsArr = [];
let obstacleArr = [];

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  const NUM_OF_BALLS = random(5, 50);
  for(let i = 0; i < NUM_OF_BALLS; i++) {
    ballsArr.push(new Ball(random(width), random(height), random(200), random(255), random(255), random(255), random(1, 10)));
  }
  
  //myBall = new Ball(width / 2, height / 2, 40);
}

function draw() {
  background(30);
  for(let i = 0; i < ballsArr.length; i++) {
    ballsArr[i].update();
    ballsArr[i].checkKeys();
    //ballsArr[i].loopEdges();
    ballsArr[i].dvdEdges();
    ballsArr[i].display();


    for(let j = 0; j < ballsArr.length; j++){

      if(i != j && ballsArr[i].pos.dist(ballsArr[j].pos) < ballsArr[i].rad){
        
	      ballsArr[i].vel.x *= -1;
        ballsArr[i].vel.y *= -1;
        ballsArr[j].vel.x *= -1;
        ballsArr[j].vel.y *= -1;

      }
    }
  }

  if (frameCount % 100 == 0) {
    obstacleArr.push(new Obstacle(random(width), random(height), random(100), random(100)))
  }

  for(let i = 0; i < obstacleArr.length; i++) {
    obstacleArr[i].pos.x += i + 1;
    obstacleArr[i].loopEdges();
    obstacleArr[i].display();
  }

  // myBall.update();   // Calculate physics
  // myBall.checkKeys(); // Check for keyboard input
  // myBall.loopEdges();
  // myBall.display();    // Draw the ball
}

class Ball {
  constructor(x, y, radius, r, g, b, speed) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.speed = speed
    this.r = radius;
    this.topSpeed = 60;
    this.friction = 0.99;
    this.red = r;
    this.green = g;
    this.blue = b;
  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    //let forceMagnitude = 12;
    
    if (keyIsDown(LEFT_ARROW))  this.applyForce(createVector(-this.speed, 0));
    if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(this.speed, 0));
    if (keyIsDown(UP_ARROW))    this.applyForce(createVector(0, -this.speed));
    if (keyIsDown(DOWN_ARROW))  this.applyForce(createVector(0, this.speed));

    this.applyForce(createVector(random(-this.speed, this.speed), random(-this.speed, this.speed)))
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  loopEdges() {
    if(this.pos.x < 0) {
      this.pos.x = width;
    } else if(this.pos.x > width) {
      this.pos.x = 0;
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
    } else if(this.pos.y > height) {
      this.pos.y = 0;
    }


    // if(this.pos.x + (this.radius / 2) < 0) {
    //   this.pos.x = width + (this.radius / 2);
    // } else if(this.pos.x - (this.radius / 2) > width) {
    //   this.pos.x = 0 - (this.radius / 2);
    // }
    // if(this.pos.y + (this.radius / 2) < 0) {
    //   this.pos.y = height + (this.radius / 2);
    // } else if(this.pos.y - (this.radius / 2) > height) {
    //   this.pos.y = 0 - (this.radius / 2);
    // }
  }

  dvdEdges() {
    if(this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if(this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }

  }

  display() {
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

class Obstacle {
  constructor(x, y, obsWidth, obsHeight) {
    this.pos = createVector(x, y);
    this.width = obsWidth;
    this.height = obsHeight;
    console.log("new rectangle just dropped");
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height)
  }

  loopEdges() {
    if(this.pos.x < 0) {
      this.pos.x = width;
    } else if(this.pos.x > width) {
      this.pos.x = 0;
    }
    //console.log(this.pos)
    // if(this.pos.y < 0) {
    //   this.pos.y = height;
    // } else if(this.pos.y > height) {
    //   this.pos.y = 0;
    // }  
  }
}