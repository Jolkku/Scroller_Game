let person;
let img2;
let x = 0;
let y = 0;
function preload() {
  img2 = loadImage('Test3.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  background(0);
  imageMode(CENTER);
  person = new Person();
}


function draw() {
  background(0);					//game
  translate(width / 2, height / 2);
  for (var i = 1; i < 12; i++) {
    tint(255, 0 + (i * 25));
    image(img2, x-(-(x*(0.05 * i))), y-(-(y*(0.05 * i))), 300, 300);
  }
  textSize(20);
  fill(255);
  strokeWeight(0.1);
  text(`X pos: ${-(x)+person.pos.x}`, 20 + person.pos.x, 30 + person.pos.y);
  text(`Y pos: ${-(y)+person.pos.y}`, 20 + person.pos.x, 50 + person.pos.y);
  moving();
  person.render();
  person.update();
  stroke(255);
  strokeWeight(5);
  line(-width/2 -(860-x), (318+y), -width/2 -(860-x), -(318-y));
  line(-(-width/2 -(860+x)), (318+y), -(-width/2 -(860+x)), -(318-y));
  line( 310 + x, -(-height/2 - (1050 + y)), -(310-x), -(-height/2 - (1050 + y)));
  line( 310 + x, -height/2 - (1050 - y), -(310-x), -height/2 - (1050 - y));
}
function Person() {
  this.pos = createVector(0, 0);
  this.angle = 0;
  this.alive;
  this.update = function() {
    //this.angle = 0;
    this.angle = Math.atan2(mouseY - ((height/2) + person.pos.y), mouseX - ((width/2) + person.pos.x));
  }
  this.render = function() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rotate(this.angle);
    fill(255);
    rect(0, 0, 25, 25);
    pop();
  }
}


function moving() {
  if (keyIsDown(65)) {				//left
    if ((-(y)+person.pos.y > 308 && -(x)+person.pos.x < -307 || -(y)+person.pos.y < -308 && -(x)+person.pos.x < -307)) {
      person.pos.x = 0;
      return;
    } else {
      if (x < 860 && person.pos.x <= 0) {
        x += 4;
      } else {
        if (person.pos.x < -(width/2)) {
          return;
        } else {
          person.pos.add(-4);
        }
      }
    }
  }
  if (keyIsDown(68)) {				//right
    if ((-(y)+person.pos.y > 308 && -(x)+person.pos.x > 307 || -(y)+person.pos.y < -308 && -(x)+person.pos.x > 307)) {
      person.pos.x = 0;
      return;
    } else {
      if (x > -860 && person.pos.x >= 0) {
        x += -4;
      } else {
        if (person.pos.x > (width/2)) {
          return;
        } else {
          person.pos.add(4);
        }  
      } 
    }
  }
  if (keyIsDown(87)) {				//up
    if ((-(y)+person.pos.y < -307 && -(x)+person.pos.x < -308 || -(y)+person.pos.y < -307 && -(x)+person.pos.x > 308)) {
      person.pos.y = 0;
      return;
    } else {
      if (y < 1050 && person.pos.y <= 0) {
        y += 4;
      } else {
        if (person.pos.y < -(height/2)) {
          return;
        } else {
          person.pos.add(0, -4);
        }
      } 
    }
  }
  if (keyIsDown(83)) {				//down
    if ((-(y)+person.pos.y > 307 && -(x)+person.pos.x > 308 || -(y)+person.pos.y > 307 && -(x)+person.pos.x < -308)) {
      person.pos.y = 0;
      return;
    } else {
      if (y > -1050 && person.pos.y >= 0) {
        y += -4;
      } else {
        if (person.pos.y > (height/2)) {
          return;
        } else {
          person.pos.add(0, 4);
        }
      }  
    }
  }
}

/*
-790 x
790
-591 y
591
-(x)+person.pos.x > -790 && -(x)+person.pos.x < 790 && -(y)+person.pos.y > -591 && -(y)+person.pos.y < 591
*/









