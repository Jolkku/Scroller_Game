let time = 0;
let person;
let img;
let x = 0;
let y = 0;
let bullets = [];
let zombies = [];
let dead;
let counter = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
let counter5 = 0;
let counter6 = 0;
let counter7 = 0;
let stage = 0;
let ammo = 0;
let capacity = 16;
let gun = "Glock";
let rof = 40;
let Ammo;
let id;
let stime;
let rtime = 4000;
let bvel = 20;
let test;
function preload() {
  img = loadImage('test2.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  background(0);
  imageMode(CENTER);
  person = new Person();
  setInterval(function() {
      if (stage != 1) {
        time++;
      } else {
        return;
      }
  }, 1000);
  zombies.push(new Zombie);
}
function spawning() {
  stime = 500 - (time * 2.5)
  if (counter == 0) {
    counter = 1;
    setTimeout(function() {
      if (stage != 1) {
        zombies.push(new Zombie);
        counter = 0;
      } else {
        return;
      }
    }, stime);
  } else {
    return;
  }
}
function draw() {
  switch(stage) {
    case 0:					//game
      translate(width / 2, height / 2);
      image(img, x, y, 3000, 3000);
      textSize(20);
      fill(255);
      strokeWeight(0.1);
      text(`Time survived: ${time} sec`, -600, -400);
      Ammo = Math.abs(ammo - capacity);
      if (counter7 == 1) {
        text("Ammo: Reloading", -600, -380);
      } else {
        text(`Ammo: ${Math.abs(Ammo)}`, -600, -380);
      }
      text(`Weapon: ${gun}`, -600, -360);
      text(`X pos: ${-(x)+person.pos.x}`, 20 + person.pos.x, 30 + person.pos.y);
      text(`Y pos: ${-(y)+person.pos.y}`, 20 + person.pos.x, 50 + person.pos.y);
      //text(`Angle: ${zombies[0].angle}`, 20 + person.pos.x, 70 + person.pos.y);
      //text(`${test}`, 20 + person.pos.x, 90 + person.pos.y);
      moving();
      spawning();
      person.render();
      person.update();
      fullauto();
      for (j = 0; j < zombies.length; j++) {
        zombies[j].update();
        zombies[j].render();
        zombies[j].test();
      }
      for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].render();
        bullets[i].collision();
        if (bullets[i].pos.x < -1500 || bullets[i].pos.x > 1500 || bullets[i].pos.y < -1500 || bullets[i].pos.y > 1500 || bullets[i].dead == true || -(x)+(bullets[i].pos.x) < -308 &&  -(y) + (bullets[i].pos.y) < -308 || -(x) + (bullets[i].pos.x) > 308 && -(y) + (bullets[i].pos.y) < -308 || -(x) + (bullets[i].pos.x) > 308 && -(y) + (bullets[i].pos.y) > 308 || -(x) + (bullets[i].pos.x) < -308 && -(y) + (bullets[i].pos.y) > 308) {
          bullets.splice(i, 1);
        }
      }
      stroke(255);
      strokeWeight(5);
      line(-width/2 -(860-x), (318+y), -width/2 -(860-x), -(318-y));
      line(-(-width/2 -(860+x)), (318+y), -(-width/2 -(860+x)), -(318-y));
      line( 310 + x, -(-height/2 - (1050 + y)), -(310-x), -(-height/2 - (1050 + y)));
      line( 310 + x, -height/2 - (1050 - y), -(310-x), -height/2 - (1050 - y));
    break;
    case 1:					//game ended
      translate(width / 2, height / 2);
      image(img, x, y, 3000, 3000);
      textSize(width / 25);
      fill(255);
      strokeWeight(0.1);
      text(`Time survived: ${time} sec`, -210, -300);
      person.render();
      for (j = 0; j < zombies.length; j++) {
        zombies[j].render();
      }
    break;
  }
}
function Person() {
  this.pos = createVector(0, 0);
  this.angle = 0;
  this.alive;
  this.update = function() {
    //this.angle = 0;
    this.angle = Math.atan2(mouseY - ((height/2) + person.pos.y), mouseX - ((width/2) + person.pos.x));
    if (time > 40 && time < 100) {
      gun = "Mac-11";
      rof = 40;
      rtime = 5000;
      bvel = 25;
      if (counter5 == 0) {
        clearTimeout(id);
        capacity = 30;
        ammo = 0;
        counter5 = 1;
        counter2 = 0;
        counter7 = 0;
      }
    } else if (time > 100) {
      gun = "M4";
      rtime = 6000;
      rof = 100;
      bvel = 30;
     if (counter6 == 0) {
        clearTimeout(id);
        capacity = 30;
        ammo = 0;
        counter6 = 1;
        counter2 = 0;
        counter7 = 0;
      }
    }
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
function keyPressed() {
  if (keyCode == 13) {
    stage = 0;
    person.pos = createVector(0, 0);
    x = 0;
    y = 0;
    person.angle = 0;
    time = 0;
    zombies = [];
    bullets = [];
    ammo = 0;
    counter3 = 0;
    counter4 = 0;
    counter2 = 0;
    counter5 = 0;
    counter6 = 0;
    counter = 0;
    clearTimeout(id);
    gun = "Glock";
    stime = 500;
    capacity = 16;
    rof = 40;
    bvel = 20;
    rtime = 4000;
    counter7 = 0;
  } else if (keyCode == 82) {
    if (counter2 == 0 && ammo <= capacity && ammo != 0) {
      counter7 = 1;
      reload();
      counter2 = 1;
    }
  }
}
function Bullet(x, y, angle) {
  this.pen = 2;
  this.dead = false;
  this.angle = angle;
  this.pos = createVector(x, y);
  this.vel = createVector(Math.cos(this.angle) * bvel, Math.sin(this.angle) * bvel);
  this.update = function() {
    this.pos.add(this.vel);
  }
  this.render = function() {
    strokeWeight(5);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
  this.collision = function() {
    for (var i = 0; i < zombies.length; i++) {
      if (dist(zombies[i].pos.x, zombies[i].pos.y, this.pos.x, this.pos.y) < ((13) * 2)) {
        if (gun == "Glock" || gun == "Mac-11") {
          zombies.splice(i, 1);
          this.dead = true;
        } else if (gun == "M4") {
          if (this.pen > 0) {
            zombies.splice(i, 1);
            this.pen--;
          } else {
            zombies.splice(i, 1);
            this.dead = true;
          }
        }
      }
    }
  }
}
function reload() {
  counter7 = 1;
  id = setTimeout(function() {
    ammo = 0;
    counter2 = 0;
    counter7 = 0;
  }, rtime);
}
function rpm () {
  setTimeout(function() {
    counter3 = 0;
    counter4 = 0;
  }, rof);
}
function mouseClicked() {
  switch(gun) {
    case "Glock":
      capacity = 16;								//glock
      if (ammo < capacity && counter7 == 0) {
	bullets.push(new Bullet(person.pos.x, person.pos.y, person.angle + random(-0.00872664626, 0.00872664626)));
        ammo++;
        if (counter2 == 0 && ammo >= capacity) {
	  reload();
          counter2++;
        }
      } else {
	  return;
      }
    break;
    case "Spas12":
      capacity = 8;								//Spas 12
      if (ammo < capacity && counter7 == 0) {
	bullets.push(new Bullet(person.pos.x, person.pos.y, person.angle));
        //ammo++;
      } else {
        return;
      }
    break;
    default:
      return;
  }
}
function fullauto() {
  if (mouseIsPressed) {
    switch(gun) {
      case "Mac-11":
        capacity = 30;								//mac 11
        if (ammo < capacity && counter3 == 0 && counter7 == 0) {
	  bullets.push(new Bullet(person.pos.x, person.pos.y, person.angle + random(-0.0872664626, 0.0872664626)));
          ammo++;
          counter3 = 1;
        } else if (counter3 == 1 && counter4 == 0) {
          rpm();
          counter4 = 1;
        } else {
          if (counter2 == 0 && ammo >= capacity) {
	    reload();
            counter2 = 1;
          } else {
	    return;
          }
        }
      break;
      case "M4":
        capacity = 30;							//M4
        if (ammo < capacity && counter3 == 0 && counter7 == 0) {
	  bullets.push(new Bullet(person.pos.x, person.pos.y, person.angle + random(-0.0174532925, 0.0174532925)));
          ammo++;
          counter3++;
        } else if (counter3 == 1 && counter4 == 0) {
          rpm();
          counter4++;
        } else {
          if (counter2 == 0 && ammo >= capacity) {
	    reload();
            counter2++;
          } else {
	    return;
          }
        }
      break;
    }
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
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].pos.add(4);
        }
        for (let j= 0; j < zombies.length; j++) {
          zombies[j].pos.add(4);
        }
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
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].pos.add(-4);
        }
        for (let j = 0; j < zombies.length; j++) {
          zombies[j].pos.add(-4);
        }
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
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].pos.add(0, 4);
        }
        for (let j = 0; j < zombies.length; j++) {
          zombies[j].pos.add(0, 4);
        }
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
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].pos.add(0, -4);
        }
        for (let j = 0; j < zombies.length; j++) {
          zombies[j].pos.add(0, -4);
        }
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
function Zombie() {
  //this.spawn = 1;
  this.spawn = Math.floor(random(0, 4));
  switch(this.spawn) {
    case 0:
      this.pos = createVector(-width/2 -(860-x), random((310 + y), -(310-y)));               //left
    break;
    case 1:
      this.pos = createVector(-(-width/2 -(860+x)), random((310 + y), -(310-y)));           //right
    break;
    case 2:
      this.pos = createVector(random((310 + x), -(310-x)), -height/2 - (1050-y));                  //top
    break;
    case 3:
      this.pos = createVector(random((310 + x), -(310-x)), -(-height/2 - (1050 + y)));             //bottom
    break;
  }
  this.d;
  this.update = function() {
    this.d = dist(this.pos.x, this.pos.y, person.pos.x, person.pos.y);
    this.angle = Math.atan2(person.pos.y - this.pos.y, person.pos.x - this.pos.x);
    this.vel = createVector(Math.cos(this.angle) * 3, Math.sin(this.angle) * 3);
    if (-(x)+(this.pos.x) < -307 && -(y) + (this.pos.y) < -307 && this.angle > -(Math.PI/2) && this.angle < 0) {                        //top left down
      this.angle = 0;
      this.pos.add(3, 0);

    } else if (-(x)+(this.pos.x) < -307 && -(y) + (this.pos.y) < -307 && this.angle < Math.PI && this.angle > (Math.PI/2)) {		//top left right
      this.angle = 0;
      this.pos.add(0, 3);

    } else if (-(x)+(this.pos.x) > 307 && -(y) + (this.pos.y) < -307 && this.angle < -(Math.PI/2) && this.angle > -Math.PI) {		//top right down
      this.angle =  0;
      this.pos.add(-3, 0);

    } else if (-(x)+(this.pos.x) > 307 && -(y) + (this.pos.y) < -307 && this.angle < (Math.PI/2) && this.angle > 0) {			//top right left
      this.angle = 0;
      this.pos.add(0, 3);

    } else if (-(x)+(this.pos.x) < -307 && -(y) + (this.pos.y) > 307 && this.angle < (Math.PI/2) && this.angle > 0) {			//down left top
      this.angle = 0;
      this.pos.add(3, 0);

    } else if (-(x)+(this.pos.x) < -307 && -(y) + (this.pos.y) > 307 && this.angle < -(Math.PI/2) && this.angle > -Math.PI) {		//down left right
      this.angle = 0;
      this.pos.add(0, -3);

    } else if (-(x)+(this.pos.x) > 307 && -(y) + (this.pos.y) > 307 && this.angle > -(Math.PI/2) && this.angle < 0) {			//down right top
      this.angle = 0;
      this.pos.add(0, -3);

    } else if (-(x)+(this.pos.x) > 307 && -(y) + (this.pos.y) > 307 && this.angle < (Math.PI) && this.angle > (Math.PI/2)) {		// down right left
      this.angle = 0;
      this.pos.add(-3, 0);

    } else if (this.d < 5.5 * 5.5) {
      stage = 1;
    } else {
      this.pos.add(this.vel);
    }
  }
  this.test = function() {
    /*if () {
    test = true;
    } else {
    test = false;
    }*/
  }
  this.render = function() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rotate(this.angle);
    fill(34,139,34);
    rect(0, 0, 25, 25);
    pop();
  }
}
