let isKeyADown = false;
let isKeyDDown = false;
let posX = 200;
let posY = 300;
let velocityX = 0;
let velocityY = 0;
let isJumping = false;
let facing = "front";
let isWalking = false;
let clouds = [
  {x: 100, y: 100},
  {x: 300, y: 80},
  {x: 500, y: 120},
  {x: 700, y: 90},
  {x: 900, y: 110}
];
let cloudSpeed = 0.25;
let trees = [
  {x: 100, y: 240},
  {x: 300, y: 240},
  {x: 500, y: 240},
  {x: 700, y: 240},
  {x: 900, y: 240}
];
let mountainRange = [
  {x: 512, y: 300},
  {x: 812, y: 300},
];
let coins = [{x: 800, y: 175, collected: false}];
let coinCount = 0;
let inCanyon = false;
let fallY = 0;

function setup() {
  createCanvas(1024, 576);
  noStroke();
}

function draw() {
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(0, 300, width, height - 300);
  
  for (let mountain of mountainRange) {
    drawMountainRange(mountain.x, mountain.y);
  }
  for (let cloud of clouds) {
    drawCloud(cloud.x, cloud.y);
    cloud.x -= cloudSpeed; 
    
    if (cloud.x < -50) {
      cloud.x = width + 50;
    }
  }
  for (let tree of trees) {
    drawTree(tree.x, tree.y);
  } 

  for (let coin of coins) {
    if (!coin.collected) {
      drawCollectableCoin(coin.x, coin.y);
    }
  }
  drawCanyon(400, 300);
  
  // Check coin collection
  for (let coin of coins) {
    if (!coin.collected && 
        posX > coin.x - 20 && posX < coin.x + 20 && 
        posY > coin.y - 20 && posY < coin.y + 20) {
      coin.collected = true;
      coinCount++;
    }
  }
  
  // Check canyon collision
  if (posX > 400 && posX < 450 && posY >= 300 && !inCanyon) {
    inCanyon = true;
    fallY = posY;
  }

  if (inCanyon) {
    // Duck is falling in canyon, lock movement
    posY += 5; // Fall speed
    velocityX = 0;
    velocityY = 0;
    // Keep duck in canyon bounds
    if (posX < 400) posX = 400;
    if (posX > 450) posX = 450;
  } else {
    velocityY += 0.8;
    posX += velocityX;
    posY += velocityY;

    if (posY >= 300) {
      posY = 300;
      velocityY = 0;
      velocityX = 0;
      isJumping = false;
    }
  }

  if (isJumping) {
    if (facing === "right") {
      drawDuckRightJumping(posX, posY);
    } else if (facing === "left") {
      drawDuckLeftJumping(posX, posY);
    } else {
      drawDuckFrontJumping(posX, posY);
    }
  } else if (facing === "left") {
    drawDuckLeftWalking(posX, posY);
  } else if (facing === "right") {
    drawDuckRightWalking(posX, posY);
  } else {
    drawDuckFrontStanding(posX, posY);
  }
  // Display coin counter
  fill(255, 215, 0);
  textAlign(LEFT, TOP);
  textSize(24);
  text('Coins: ' + coinCount, 20, 20);
  
  if (!inCanyon) {
    if (isKeyADown) {
      velocityX = -5;
    } else if (isKeyDDown) {
      velocityX = 5;
    }
  }
}

function keyPressed() {
    if (!inCanyon) {
        if (key === 'A' || key === 'a') {
            if (!isKeyDDown) {
                isKeyADown = true;
                facing = "left";
                isWalking = true;
            }
        } else if (key === 'D' || key === 'd') {
            if (!isKeyADown) {
                isKeyDDown = true;
                facing = "right";
                isWalking = true;
            }
        } else if (key === ' ') {
            if (!isJumping) {
                velocityY = -12;
                isJumping = true;
                isWalking = false;
            }
        }
    }
}
function keyReleased() {
    if (!inCanyon) {
        if (key === 'A' || key === 'a') {
            isKeyADown = false;
            if (isKeyDDown) {
                facing = "right";
                isWalking = true;
            } else {
                velocityX = 0;
                isWalking = false;
                facing = "front"; 
            }
        } else if (key === 'D' || key === 'd') {
            isKeyDDown = false;
            if (isKeyADown) {
                isKeyADown = true;
                facing = "left";
                isWalking = true;
            } else {
                velocityX = 0;
                isWalking = false;
                facing = "front"; 
            }
        }
    }
}

function drawDuckFrontStanding(x, y) {
  push();
  translate(x, y);
  fill('#FFFF00');
  ellipse(0, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill('#FFFFFF');
  ellipse(-6, -52, 8, 8);
  fill('#00BFFF');
  ellipse(-6, -52, 6, 6);
  fill('#000000');
  ellipse(-6, -52, 3, 3);
  fill('#FFFFFF');
  ellipse(6, -52, 8, 8);
  fill('#00BFFF');
  ellipse(6, -52, 6, 6);
  fill('#000000');
  ellipse(6, -52, 3, 3);
  fill("#BA8E23");
  triangle(0, -45, -4, -40, 4, -40);
  stroke(0);
  strokeWeight(3);
  noFill();
  line(-8, -8, -15, -2);
  line(-15, -2, -18, -2);
  line(8, -8, 15, -2);
  line(15, -2, 18, -2);
  noStroke();
  pop();
}

function drawDuckFrontJumping(x, y) {
  push();
	translate(x, y);
	fill('#FFFF00');
	ellipse(0, -35, 35, 35);
	ellipse(0, -60, 30, 30);
	fill('#FFFFFF');
	ellipse(-6, -62, 8, 8);
	fill('#00BFFF');
	ellipse(-6, -62, 6, 6);
	fill('#000000');
	ellipse(-6, -62, 3, 3);
	fill('#FFFFFF');
	ellipse(6, -62, 8, 8);
	fill('#00BFFF');
	ellipse(6, -62, 6, 6);
	fill('#000000');
	ellipse(6, -62, 3, 3);
	fill("#BA8E23");
	triangle(0, -55, -4, -50, 4, -50);
	stroke(0);
	strokeWeight(3);
	noFill();
	line(-8, -18, -12, -10);
	line(-12, -10, -15, -10);
	line(8, -18, 12, -10);
	line(12, -10, 15, -10);
	pop();
}

function drawDuckRightWalking(x, y) {
  push();
  translate(x, y);
  fill('#FFFF00');
  ellipse(-3, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill('#FFFFFF');
  ellipse(8, -52, 10, 10);
  fill('#00BFFF');
  ellipse(9, -52, 7, 7);
  fill('#000000');
  ellipse(10, -52, 4, 4);
  fill("#BA8E23");
  triangle(13, -52, 20, -48, 13, -44);
  stroke(0);
  strokeWeight(3);
  line(-8, -8, -8, -2);
  line(-8, -2, -3, -2);
  noStroke();
  pop();
}

function drawDuckLeftWalking(x, y) {
  push();
  translate(x, y);
  scale(-1, 1);
  fill('#FFFF00');
  ellipse(-3, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill('#FFFFFF');
  ellipse(8, -52, 10, 10);
  fill('#00BFFF');
  ellipse(9, -52, 7, 7);
  fill('#000000');
  ellipse(10, -52, 4, 4);
  fill("#BA8E23");
  triangle(13, -52, 20, -48, 13, -44);
  stroke(0);
  strokeWeight(3);
  line(-8, -8, -8, -2);
  line(-8, -2, -3, -2);
  noStroke();
  pop();
}

function drawDuckRightJumping(x, y) {
  push();
  translate(x, y);
  fill('#FFFF00');
  ellipse(0, -35, 35, 35);
  ellipse(3, -60, 30, 30);
  fill('#FFFFFF');
  ellipse(11, -62, 10, 10);
  fill('#00BFFF');
  ellipse(12, -62, 7, 7);
  fill('#000000');
  ellipse(13, -62, 4, 4);
  fill("#BA8E23");
  triangle(16, -62, 23, -58, 16, -54);
  stroke(0);
  strokeWeight(3);
  line(-5, -18, -3, -10);
  line(-3, -10, 2, -10);
  noStroke();
  pop();
}

function drawDuckLeftJumping(x, y) {
  push();
  translate(x, y);
  scale(-1, 1);
  fill('#FFFF00');
  ellipse(0, -35, 35, 35);
  ellipse(3, -60, 30, 30);
  fill('#FFFFFF');
  ellipse(11, -62, 10, 10);
  fill('#00BFFF');
  ellipse(12, -62, 7, 7);
  fill('#000000');
  ellipse(13, -62, 4, 4);
  fill("#BA8E23");
  triangle(16, -62, 23, -58, 16, -54);
  stroke(0);
  strokeWeight(3);
  line(-5, -18, -3, -10);
  line(-3, -10, 2, -10);
  noStroke();
  pop();
}

function drawDuckRight(x, y) {
  push();
  translate(x, y);
  fill('#FFFF00');
  ellipse(-7, 25, 85, 85);
  ellipse(0, -20, 70, 70);
  fill('#FFFFFF');
  ellipse(15, -30, 25, 25);
  fill('#00BFFF');
  ellipse(20, -30, 17, 20);
  fill('#000000');
  ellipse(23, -30, 9, 13);
  fill("#BA8E23");
  triangle(33, -32, 50, -25, 35, -18);
  stroke(0);
  strokeWeight(6);
  line(-15, 67, -15, 80);
  line(-15, 80, 10, 80);
  pop();
}

function drawDuckLeft(x, y) {
  push();
  translate(x, y);
  scale(-1, 1);
  fill('#FFFF00');
  ellipse(-7, 25, 85, 85);
  ellipse(0, -20, 70, 70);
  fill('#FFFFFF');
  ellipse(15, -30, 25, 25);
  fill('#00BFFF');
  ellipse(20, -30, 17, 20);
  fill('#000000');
  ellipse(23, -30, 9, 13);
  fill("#BA8E23");
  triangle(33, -32, 50, -25, 35, -18);
  stroke(0);
  strokeWeight(6);
  line(-15, 67, -15, 80);
  line(-15, 80, 10, 80);
  pop();
}

function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 60, 40);
  ellipse(x - 20, y + 10, 50, 30);
  ellipse(x + 20, y + 10, 50, 30);
  ellipse(x - 10, y - 10, 40, 20);
  ellipse(x + 10, y - 10, 40, 20);
}

function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x, y, 20, 60);
  fill(34, 139, 34);
  ellipse(x + 10, y - 30, 60, 60);
  ellipse(x - 20, y - 10, 50, 50);
  ellipse(x + 40, y - 10, 50, 50);
  ellipse(x + 10, y - 50, 40, 40);
  ellipse(x + 10, y - 70, 40, 40);
}

function drawMountainRange(x, y) {
  fill(125,125,125);
  noStroke();
  triangle(x - 60, y, x, y - 240, x + 60, y);
  triangle(x - 120, y, x - 60, y - 180, x, y);
  triangle(x, y, x + 60, y - 150, x + 120, y);
}

function drawCollectableCoin(x, y) {
  fill(255, 215, 0, 100);
  ellipse(x, y, 34, 34);
  fill(255, 215, 0);
  ellipse(x, y, 30, 30);
  fill(255, 235, 0);
  ellipse(x, y, 24, 24);
  fill(255, 255, 200);
  push();
  translate(x - 5, y - 5);
  rotate(PI / 4);
  ellipse(0, 0, 5, 12);
  pop();
  textAlign(CENTER, CENTER);
  textSize(16);
  fill(0);
  text('$', x, y);
}
å
function drawCanyon(x, y) {
  fill(40, 40, 40);
  rect(x, y, 50, height - y);
  fill(139, 69, 19);
  rect(x - 5, y, 5, height - y);
  rect(x + 50, y, 5, height - y);
  for(let i = 0; i < 5; i++) {
    fill(0, 0, 0, 50 - i * 10);
    rect(x, y + i * 5, 50, 5);
  }
}