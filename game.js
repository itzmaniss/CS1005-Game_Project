let posX = 200;
let posY = 300;
let velocityX = 0;
let velocityY = 0;
let isJumping = false;
let facing = "right";
let clouds = [
  {x: 100, y: 100},
  {x: 300, y: 80},
  {x: 500, y: 120},
  {x: 700, y: 90},
  {x: 900, y: 110}
];
let cloudSpeed = 0.5;
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

function setup() {
  createCanvas(1024, 576);
  noStroke();
}

function draw() {
  background(135, 206, 235); // Sky blue
  fill(34, 139, 34); // Grass green
  rect(0, 300, width, height - 300); // Ground
  
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

  drawCollectableCoin(800, 250); 
  drawCanyon(400, 300); // Draw canyon at a fixed position


  // Apply gravity
  velocityY += 0.8;

  // Update position
  posX += velocityX;
  posY += velocityY;

  // Floor collision
  if (posY >= 300) {
    posY = 300;
    velocityY = 0;
    velocityX = 0;
    isJumping = false;
  }

  // Draw duck
  if (facing === "right") {
    drawDuckRight(posX, posY);
  } else {
    drawDuckLeft(posX, posY);
  }
}

function keyPressed() {
  if (!isJumping) {
    if (key === 'A' || key === 'a') {
      velocityX = -25;
    //   velocityY = -10;
      facing = "left";
    //   isJumping = true;
    } else if (key === 'D' || key === 'd') {
      velocityX = 25;
    //   velocityY = -10;
      facing = "right";
    //   isJumping = true;
    } else if (key === ' ') {
      velocityY = -12;
      isJumping = true;
    }
  }
}

function drawDuckRight(x, y) {
  push();
  translate(x, y);

  // Body
  fill('#FFFF00'); // Bright yellow
  ellipse(-7, 25, 85, 85); // Bottom circle

  // Head
  ellipse(0, -20, 70, 70); // Top circle

  // Eye (white → blue → black)
  fill('#FFFFFF');
  ellipse(15, -30, 25, 25); // white

  fill('#00BFFF'); // blue
  ellipse(20, -30, 17, 20); // iris

  fill('#000000'); // black
  ellipse(23, -30, 9, 13); // pupil

  // Beak (cleaned-up angle, more centered)
  fill("#BA8E23"); // muted yellow-brown
  triangle(33, -32, 50, -25, 35, -18);

  // Leg (kept as-is for stylistic effect)
  stroke(0);
  strokeWeight(6);
  line(-15, 67, -15, 80);    // vertical
  line(-15, 80, 10, 80);     // foot

  pop();
}

function drawDuckLeft(x, y) {
  push();
  translate(x, y);
  scale(-1, 1); // Flip horizontally

  // Body
  fill('#FFFF00'); // Bright yellow
  ellipse(-7, 25, 85, 85); // Bottom circle

  // Head
  ellipse(0, -20, 70, 70); // Top circle

  // Eye (white → blue → black)
  fill('#FFFFFF');
  ellipse(15, -30, 25, 25); // white

  fill('#00BFFF'); // blue
  ellipse(20, -30, 17, 20); // iris

  fill('#000000'); // black
  ellipse(23, -30, 9, 13); // pupil

  // Beak (cleaned-up angle, more centered)
  fill("#BA8E23"); // muted yellow-brown
  triangle(33, -32, 50, -25, 35, -18);

  // Leg (kept as-is for stylistic effect)
  stroke(0);
  strokeWeight(6);
  line(-15, 67, -15, 80);    // vertical
  line(-15, 80, 10, 80);     // foot

  pop();
}

function drawCloud(x, y) {
  fill(255); // White color for the cloud
  noStroke();
  ellipse(x, y, 60, 40); // Main body of the cloud
  ellipse(x - 20, y + 10, 50, 30); // Left puff
  ellipse(x + 20, y + 10, 50, 30); // Right puff
  ellipse(x - 10, y - 10, 40, 20); // Top puff
  ellipse(x + 10, y - 10, 40, 20); // Top puff right  
}

function drawTree(x, y) {
  // Draw the trunk
  fill(139, 69, 19); // Brown color for the trunk
  rect(x, y, 20, 60); // Trunk dimensions 
  // Draw the leaves
  fill(34, 139, 34); // Green color for the leaves
  ellipse(x + 10, y - 30, 60, 60); // Main body of the leaves
  ellipse(x - 20, y - 10, 50, 50); // Left puff
  ellipse(x + 40, y - 10, 50, 50); // Right puff
  ellipse(x + 10, y - 50, 40, 40); // Top puff
  ellipse(x + 10, y - 70, 40, 40); // Top puff right
}

function drawMountainRange(x, y) {
  fill(125,125,125); 
  noStroke();
  triangle(x - 60, y, x, y - 240, x + 60, y);
  triangle(x - 120, y, x - 60, y - 180, x, y);
  triangle(x, y, x + 60, y - 150, x + 120, y);
}

function drawCollectableCoin(x, y) {
  // Outer glow
  fill(255, 215, 0, 100); // Semi-transparent gold
  ellipse(x, y, 34, 34);
  
  // Main coin body
  fill(255, 215, 0); // Bright gold
  ellipse(x, y, 30, 30);
  
  // Inner coin
  fill(255, 235, 0); // Lighter gold for inner part
  ellipse(x, y, 24, 24);
  
  // Shine effect
  fill(255, 255, 200); // Very light yellow
  push();
  translate(x - 5, y - 5);
  rotate(PI / 4);
  ellipse(0, 0, 5, 12); // Small shine diagonal line
  pop();

  textAlign(CENTER, CENTER);
  textSize(16);
  fill(0); // Black for the coin details
  text('$', x, y); // Dollar sign inside the coin
}
function drawCanyon(x, y) {
  // Dark void effect
  fill(40, 40, 40); // Very dark gray for bottomless effect
  rect(x, y, 50, height - y); // Extend to bottom of canvas
  
  // Canyon walls
  fill(139, 69, 19); // Brown color for the walls
  rect(x - 5, y, 5, height - y); // Left wall
  rect(x + 50, y, 5, height - y); // Right wall
  
  // Add shadow gradient at top
  for(let i = 0; i < 5; i++) {
    fill(0, 0, 0, 50 - i * 10); // Fading shadow
    rect(x, y + i * 5, 50, 5);
  }
}