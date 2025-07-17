// Game character variables
let gameChar_x;
let gameChar_y;
let gameChar_width;
let velocityX;
let velocityY;
let facing;

// Movement state variables
let isLeft;
let isRight;
let isFalling;
let isWalking;
let isPlummeting;
let isCrouching;

// Game world variables
let floorPos_y;
let cameraPosX;
let coinCount;
let gameScore;
let leftBoundary;
let rightBoundary;
let lives;
let currentCheckpoint;
let spawnX;

// Game objects
let clouds;
let trees;
let mountainRange;
let collectables;
let canyons;
let checkpoints;
let flagpole;

// Movement constants
let cloudSpeed;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = 300;
  lives = 3;
  startGame();
}

function startGame() {
  // Reset game character variables
  gameChar_x = 200;
  gameChar_y = 300;
  gameChar_width = 30;
  velocityX = 0;
  velocityY = 0;
  facing = "front";

  // Reset movement state variables
  isLeft = false;
  isRight = false;
  isFalling = false;
  isWalking = false;
  isPlummeting = false;
  isCrouching = false;

  // Reset game world variables
  cameraPosX = 0;
  coinCount = 0;
  gameScore = 0;
  leftBoundary = 0;
  rightBoundary = 20000;
  currentCheckpoint = 0;
  spawnX = 200;

  // Initialize arrays
  clouds = [];
  trees = [];
  mountainRange = [];
  collectables = [];
  canyons = [];
  checkpoints = [];

  // Movement constants
  cloudSpeed = 0.25;

  noStroke();

  // Create clouds at different x positions
  for (let i = 0; i < 50; i++) {
    clouds[i] = { x_pos: i * 200 - 300, y_pos: 80 };
  }

  // Create trees at different x positions
  let treeX = -200;
  while (treeX < 12500) {
    trees.push({ x_pos: treeX + getRandomInt(-50, 50), y_pos: 240 });
    treeX += getRandomInt(120, 180);
  }

  // Create mountains at different x positions
  let mountainX = -300;
  while (mountainX < 12500) {
    mountainRange.push({ x_pos: mountainX + getRandomInt(-100, 100), y_pos: 300 });
    mountainX += getRandomInt(350, 450);
  }

  // Create collectables at different x positions
  let coinX = 300;
  let coinsCreated = 0;
  let maxCoins = 50;
  
  while (coinsCreated < maxCoins && coinX < 11800) {
    let coinY = getRandomInt(145, 255);
    
    // Only add coin if it doesn't overlap with canyon
    if (!overlapsCanyon(coinX, 30)) {
      collectables.push({
        x_pos: coinX,
        y_pos: coinY,
        size: 30,
        isFound: false,
      });
      coinsCreated++;
    }
    coinX += getRandomInt(220, 280);
  }

  // Create canyons at different x positions
  let canyonX = getRandomInt(400, 800);
  while (canyonX < 11500) {
    canyons.push({ x_pos: canyonX, width: getRandomInt(105, 127) });
    canyonX += getRandomInt(600, 1000);
  }

  // Create checkpoints at strategic locations
  checkpoints[0] = { x_pos: 200, y_pos: floorPos_y - 80, isActivated: true };
  for (let i = 1; i < 10; i++) {
    let checkpointX = i * 2000;
    
    // Shift checkpoint if it overlaps with canyon
    while (overlapsCanyon(checkpointX, 50)) {
      checkpointX += 100; // Shift right by 100 pixels
    }
    
    checkpoints[i] = {
      x_pos: checkpointX,
      y_pos: floorPos_y - 80,
      isActivated: false,
    };
  }

  // Initialize flagpole 
  flagpole = { x_pos: 12000, isReached: false };
}

function draw() {
  // Game over condition
  if (lives < 1) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Game over", width / 2, height / 2);
    textSize(24);
    text("Press R to restart", width / 2, height / 2 + 60);
    return;
  }

  // Level complete condition
  if (flagpole.isReached) {
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Level complete", width / 2, height / 2);
    textSize(24);
    text("Press R to restart", width / 2, height / 2 + 60);
    return;
  }

  // Update camera to follow character
  cameraPosX = gameChar_x - width / 2;

  if (cameraPosX < leftBoundary) {
    cameraPosX = leftBoundary;
  }

  drawSkyAndGround();

  push();
  translate(-cameraPosX, 0);

  drawMountains();
  drawClouds();
  animateClouds();
  drawTrees();
  drawCollectableCoins();
  drawCanyons();
  drawCheckpoints();
  drawFlagpole();
  drawCharacter();

  pop();

  drawUI();

  // Game logic
  if (lives >= 1) {
    checkCoinCollection();
    checkCheckpointActivation();
    if (!flagpole.isReached) {
      checkFlagpole();
    }
    checkCanyonCollision();
    handleCanyonFalling();
    checkPlayerDie();
    applyPhysics();
    handleMovement();
  }
}

function drawSkyAndGround() {
  background(135, 206, 235);
  fill(34, 139, 34);
  rect(-width, floorPos_y, width * 3, height - floorPos_y);
}

function drawMountains() {
  for (let i = 0; i < mountainRange.length; i++) {
    if (
      mountainRange[i].x_pos > cameraPosX - 200 &&
      mountainRange[i].x_pos < cameraPosX + width + 200
    ) {
      fill(125, 125, 125);
      noStroke();
      triangle(
        mountainRange[i].x_pos - 60,
        mountainRange[i].y_pos,
        mountainRange[i].x_pos,
        mountainRange[i].y_pos - 240,
        mountainRange[i].x_pos + 60,
        mountainRange[i].y_pos,
      );
      triangle(
        mountainRange[i].x_pos - 120,
        mountainRange[i].y_pos,
        mountainRange[i].x_pos - 60,
        mountainRange[i].y_pos - 180,
        mountainRange[i].x_pos,
        mountainRange[i].y_pos,
      );
      triangle(
        mountainRange[i].x_pos,
        mountainRange[i].y_pos,
        mountainRange[i].x_pos + 60,
        mountainRange[i].y_pos - 150,
        mountainRange[i].x_pos + 120,
        mountainRange[i].y_pos,
      );
    }
  }
}

function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    if (
      clouds[i].x_pos > cameraPosX - 200 &&
      clouds[i].x_pos < cameraPosX + width + 200
    ) {
      fill(255);
      noStroke();
      ellipse(clouds[i].x_pos, clouds[i].y_pos, 60, 40);
      ellipse(clouds[i].x_pos - 20, clouds[i].y_pos + 10, 50, 30);
      ellipse(clouds[i].x_pos + 20, clouds[i].y_pos + 10, 50, 30);
      ellipse(clouds[i].x_pos - 10, clouds[i].y_pos - 10, 40, 20);
      ellipse(clouds[i].x_pos + 10, clouds[i].y_pos - 10, 40, 20);
    }
  }
}

function animateClouds() {
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].x_pos = clouds[i].x_pos - cloudSpeed;

    if (clouds[i].x_pos < -100) {
      clouds[i].x_pos = clouds[i].x_pos + 10000;
    }
  }
}

function drawTrees() {
  for (let i = 0; i < trees.length; i++) {
    if (
      trees[i].x_pos > cameraPosX - 200 &&
      trees[i].x_pos < cameraPosX + width + 200
    ) {
      fill(139, 69, 19);
      rect(trees[i].x_pos, trees[i].y_pos, 20, 60);
      fill(34, 139, 34);
      ellipse(trees[i].x_pos + 10, trees[i].y_pos - 30, 60, 60);
      ellipse(trees[i].x_pos - 20, trees[i].y_pos - 10, 50, 50);
      ellipse(trees[i].x_pos + 40, trees[i].y_pos - 10, 50, 50);
      ellipse(trees[i].x_pos + 10, trees[i].y_pos - 50, 40, 40);
      ellipse(trees[i].x_pos + 10, trees[i].y_pos - 70, 40, 40);
    }
  }
}

function drawCollectableCoins() {
  for (let i = 0; i < collectables.length; i++) {
    if (
      collectables[i].isFound == false &&
      collectables[i].x_pos > cameraPosX - 200 &&
      collectables[i].x_pos < cameraPosX + width + 200
    ) {
      fill(255, 215, 0, 100);
      ellipse(collectables[i].x_pos, collectables[i].y_pos, 34, 34);
      fill(255, 215, 0);
      ellipse(collectables[i].x_pos, collectables[i].y_pos, 30, 30);
      fill(255, 235, 0);
      ellipse(collectables[i].x_pos, collectables[i].y_pos, 24, 24);
      fill(255, 255, 200);
      push();
      translate(collectables[i].x_pos - 5, collectables[i].y_pos - 5);
      rotate(PI / 4);
      ellipse(0, 0, 5, 12);
      pop();
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(0);
      text("$", collectables[i].x_pos, collectables[i].y_pos);
    }
  }
}

function drawCanyons() {
  for (let i = 0; i < canyons.length; i++) {
    if (
      canyons[i].x_pos > cameraPosX - 200 &&
      canyons[i].x_pos < cameraPosX + width + 200
    ) {
      fill(40, 40, 40);
      rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
      fill(139, 69, 19);
      rect(canyons[i].x_pos - 5, floorPos_y, 5, height - floorPos_y);
      rect(
        canyons[i].x_pos + canyons[i].width,
        floorPos_y,
        5,
        height - floorPos_y,
      );
      for (let j = 0; j < 5; j++) {
        fill(0, 0, 0, 50 - j * 10);
        rect(canyons[i].x_pos, floorPos_y + j * 5, canyons[i].width, 5);
      }
    }
  }
}

function drawCheckpoints() {
  for (let i = 0; i < checkpoints.length; i++) {
    if (
      checkpoints[i].x_pos > cameraPosX - 200 &&
      checkpoints[i].x_pos < cameraPosX + width + 200
    ) {
      fill(139, 69, 19);
      rect(checkpoints[i].x_pos - 3, checkpoints[i].y_pos, 6, 80);

      if (checkpoints[i].isActivated) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }

      triangle(
        checkpoints[i].x_pos + 3,
        checkpoints[i].y_pos,
        checkpoints[i].x_pos + 3,
        checkpoints[i].y_pos + 20,
        checkpoints[i].x_pos + 30,
        checkpoints[i].y_pos + 10,
      );
    }
  }
}

function drawFlagpole() {
  if (
    flagpole.x_pos > cameraPosX - 200 &&
    flagpole.x_pos < cameraPosX + width + 200
  ) {
    fill(139, 69, 19);
    rect(flagpole.x_pos - 5, floorPos_y - 250, 10, 250);

    if (flagpole.isReached) {
      fill(0, 255, 0);
      triangle(
        flagpole.x_pos + 5,
        floorPos_y - 250,
        flagpole.x_pos + 5,
        floorPos_y - 210,
        flagpole.x_pos + 65,
        floorPos_y - 230,
      );
    } else {
      fill(255, 0, 0);
      triangle(
        flagpole.x_pos + 5,
        floorPos_y - 210,
        flagpole.x_pos + 5,
        floorPos_y - 170,
        flagpole.x_pos + 65,
        floorPos_y - 190,
      );
    }
  }
}

function checkFlagpole() {
  if (flagpole.isReached == false) {
    let charLeft = gameChar_x - 15;
    let charRight = gameChar_x + 15;

    let flagpoleLeft = flagpole.x_pos - 20;
    let flagpoleRight = flagpole.x_pos + 20;

    if (charRight > flagpoleLeft && charLeft < flagpoleRight) {
      flagpole.isReached = true;
    }
  }
}

function checkCoinCollection() {
  for (let i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      let charLeft = gameChar_x - 15;
      let charRight = gameChar_x + 15;
      let charTop = gameChar_y - 60;
      let charBottom = gameChar_y;

      let coinLeft = collectables[i].x_pos - 15;
      let coinRight = collectables[i].x_pos + 15;
      let coinTop = collectables[i].y_pos - 15;
      let coinBottom = collectables[i].y_pos + 15;

      if (
        charRight > coinLeft &&
        charLeft < coinRight &&
        charBottom > coinTop &&
        charTop < coinBottom
      ) {
        collectables[i].isFound = true;
        coinCount = coinCount + 1;
        gameScore = gameScore + 1;
      }
    }
  }
}

function checkCheckpointActivation() {
  for (let i = 0; i < checkpoints.length; i++) {
    if (checkpoints[i].isActivated == false) {
      let charLeft = gameChar_x - 15;
      let charRight = gameChar_x + 15;
      let charTop = gameChar_y - 60;
      let charBottom = gameChar_y;

      let checkpointLeft = checkpoints[i].x_pos - 25;
      let checkpointRight = checkpoints[i].x_pos + 25;
      let checkpointTop = checkpoints[i].y_pos - 5;
      let checkpointBottom = checkpoints[i].y_pos + 45;

      if (
        charRight > checkpointLeft &&
        charLeft < checkpointRight &&
        charBottom > checkpointTop &&
        charTop < checkpointBottom
      ) {
        checkpoints[i].isActivated = true;
        currentCheckpoint = i;
        spawnX = checkpoints[i].x_pos;
      }
    }
  }
}

function checkCanyonCollision() {
  for (let i = 0; i < canyons.length; i++) {
    if (
      gameChar_x > canyons[i].x_pos &&
      gameChar_x < canyons[i].x_pos + canyons[i].width &&
      gameChar_y >= floorPos_y &&
      isPlummeting == false
    ) {
      isPlummeting = true;
    }
  }
}

function handleCanyonFalling() {
  if (isPlummeting == true) {
    gameChar_y = gameChar_y + 5;
    velocityX = 0;
    velocityY = 0;

    if (gameChar_y > height + 100 && lives > 0) {
      handleDeath();
    }

    for (let i = 0; i < canyons.length; i++) {
      if (
        gameChar_x > canyons[i].x_pos &&
        gameChar_x < canyons[i].x_pos + canyons[i].width
      ) {
        if (gameChar_x < canyons[i].x_pos) {
          gameChar_x = canyons[i].x_pos;
        }
        if (gameChar_x > canyons[i].x_pos + canyons[i].width) {
          gameChar_x = canyons[i].x_pos + canyons[i].width;
        }
      }
    }
  }
}

function handleDeath() {
  if (lives > 1) {
    lives--;
    gameChar_x = spawnX;
    gameChar_y = floorPos_y;
    velocityX = 0;
    velocityY = 0;
    isPlummeting = false;
    isFalling = false;
    isLeft = false;
    isRight = false;
    isWalking = false;
    isCrouching = false;
    facing = "front";
  } else {
    lives = 0;
  }
}

function checkPlayerDie() {
  if (gameChar_y > height) {
    handleDeath();
  }
}

function applyPhysics() {
  if (isPlummeting == false) {
    velocityY = velocityY + 0.8;
    gameChar_x = gameChar_x + velocityX;
    gameChar_y = gameChar_y + velocityY;

    if (gameChar_x < leftBoundary) {
      gameChar_x = leftBoundary;
      velocityX = 0;
    }

    if (gameChar_x > rightBoundary) {
      gameChar_x = rightBoundary;
      velocityX = 0;
    }

    if (gameChar_y >= floorPos_y) {
      gameChar_y = floorPos_y;
      velocityY = 0;
      velocityX = 0;
      isFalling = false;
    }
  }
}

function drawCharacterFallingRight() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(0, -35, 35, 35);
  ellipse(3, -60, 30, 30);
  fill("#FFFFFF");
  ellipse(11, -62, 10, 10);
  fill("#00BFFF");
  ellipse(12, -62, 7, 7);
  fill("#000000");
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

function drawCharacterFallingLeft() {
  push();
  translate(gameChar_x, gameChar_y);
  scale(-1, 1);
  fill("#FFFF00");
  ellipse(0, -35, 35, 35);
  ellipse(3, -60, 30, 30);
  fill("#FFFFFF");
  ellipse(11, -62, 10, 10);
  fill("#00BFFF");
  ellipse(12, -62, 7, 7);
  fill("#000000");
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

function drawCharacterFallingFront() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(0, -35, 35, 35);
  ellipse(0, -60, 30, 30);
  fill("#FFFFFF");
  ellipse(-6, -62, 8, 8);
  fill("#00BFFF");
  ellipse(-6, -62, 6, 6);
  fill("#000000");
  ellipse(-6, -62, 3, 3);
  fill("#FFFFFF");
  ellipse(6, -62, 8, 8);
  fill("#00BFFF");
  ellipse(6, -62, 6, 6);
  fill("#000000");
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

function drawCharacterWalkingLeft() {
  push();
  translate(gameChar_x, gameChar_y);
  scale(-1, 1);
  fill("#FFFF00");
  ellipse(-3, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill("#FFFFFF");
  ellipse(8, -52, 10, 10);
  fill("#00BFFF");
  ellipse(9, -52, 7, 7);
  fill("#000000");
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

function drawCharacterWalkingRight() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(-3, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill("#FFFFFF");
  ellipse(8, -52, 10, 10);
  fill("#00BFFF");
  ellipse(9, -52, 7, 7);
  fill("#000000");
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

function drawCharacterStanding() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(0, -25, 35, 35);
  ellipse(0, -50, 30, 30);
  fill("#FFFFFF");
  ellipse(-6, -52, 8, 8);
  fill("#00BFFF");
  ellipse(-6, -52, 6, 6);
  fill("#000000");
  ellipse(-6, -52, 3, 3);
  fill("#FFFFFF");
  ellipse(6, -52, 8, 8);
  fill("#00BFFF");
  ellipse(6, -52, 6, 6);
  fill("#000000");
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

function drawCharacterCrouchingFront() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(0, -15, 35, 25);
  ellipse(0, -35, 30, 25);
  fill("#FFFFFF");
  ellipse(-6, -37, 8, 8);
  fill("#00BFFF");
  ellipse(-6, -37, 6, 6);
  fill("#000000");
  ellipse(-6, -37, 3, 3);
  fill("#FFFFFF");
  ellipse(6, -37, 8, 8);
  fill("#00BFFF");
  ellipse(6, -37, 6, 6);
  fill("#000000");
  ellipse(6, -37, 3, 3);
  fill("#BA8E23");
  triangle(0, -30, -4, -25, 4, -25);
  stroke(0);
  strokeWeight(3);
  noFill();
  line(-8, -5, -15, -2);
  line(-15, -2, -18, -2);
  line(8, -5, 15, -2);
  line(15, -2, 18, -2);
  noStroke();
  pop();
}

function drawCharacterCrouchingLeft() {
  push();
  translate(gameChar_x, gameChar_y);
  scale(-1, 1);
  fill("#FFFF00");
  ellipse(-3, -15, 35, 25);
  ellipse(0, -35, 30, 25);
  fill("#FFFFFF");
  ellipse(8, -37, 10, 10);
  fill("#00BFFF");
  ellipse(9, -37, 7, 7);
  fill("#000000");
  ellipse(10, -37, 4, 4);
  fill("#BA8E23");
  triangle(13, -37, 20, -33, 13, -29);
  stroke(0);
  strokeWeight(3);
  line(-8, -5, -8, -2);
  line(-8, -2, -3, -2);
  noStroke();
  pop();
}

function drawCharacterCrouchingRight() {
  push();
  translate(gameChar_x, gameChar_y);
  fill("#FFFF00");
  ellipse(-3, -15, 35, 25);
  ellipse(0, -35, 30, 25);
  fill("#FFFFFF");
  ellipse(8, -37, 10, 10);
  fill("#00BFFF");
  ellipse(9, -37, 7, 7);
  fill("#000000");
  ellipse(10, -37, 4, 4);
  fill("#BA8E23");
  triangle(13, -37, 20, -33, 13, -29);
  stroke(0);
  strokeWeight(3);
  line(-8, -5, -8, -2);
  line(-8, -2, -3, -2);
  noStroke();
  pop();
}

function drawCharacter() {
  if (isFalling == true) {
    if (facing === "right") {
      drawCharacterFallingRight();
    } else if (facing === "left") {
      drawCharacterFallingLeft();
    } else {
      drawCharacterFallingFront();
    }
  } else if (isCrouching == true) {
    if (facing === "left") {
      drawCharacterCrouchingLeft();
    } else if (facing === "right") {
      drawCharacterCrouchingRight();
    } else {
      drawCharacterCrouchingFront();
    }
  } else if (facing === "left") {
    drawCharacterWalkingLeft();
  } else if (facing === "right") {
    drawCharacterWalkingRight();
  } else {
    drawCharacterStanding();
  }
}

function drawUI() {
  fill(255, 215, 0);
  textAlign(LEFT, TOP);
  textSize(24);
  text("Score: " + gameScore, 20, 20);

  fill(255, 0, 0);
  textSize(24);
  text("Lives: ", 20, 50);

  for (let i = 0; i < lives; i++) {
    fill(255, 0, 0);
    noStroke();
    let heartX = 100 + i * 30;
    let heartY = 62;
    
    // Draw heart shape using two circles and a triangle
    ellipse(heartX - 4, heartY - 3, 12, 12);
    ellipse(heartX + 4, heartY - 3, 12, 12);
    triangle(heartX - 10, heartY -1, heartX + 10, heartY -1, heartX, heartY + 12);
  }

  fill(0, 255, 0);
  textSize(18);
  text("Checkpoint: " + currentCheckpoint, 20, 80);
}

function handleMovement() {
  if (isPlummeting == false) {
    if (isLeft == true) {
      velocityX = -5;
    } else if (isRight == true) {
      velocityX = 5;
    }
  }
}

function keyPressed() {
  if (lives < 1 || flagpole.isReached) {
    if (key === "R" || key === "r") {
      lives = 3;
      startGame();
    }
    return;
  }

  if (isPlummeting == false) {
    if (key === "A" || key === "a" || keyCode == 37) {
      if (isRight == false) {
        isLeft = true;
        facing = "left";
        isWalking = true;
      }
    } else if (key === "D" || key === "d" || keyCode == 39) {
      if (isLeft == false) {
        isRight = true;
        facing = "right";
        isWalking = true;
      }
    } else if (key === " " || keyCode == 38) {
      if (isFalling == false) {
        velocityY = -12;
        isFalling = true;
        isWalking = false;
      }
    } else if (key === "S" || key === "s" || keyCode == 40) {
      if (isFalling == true) {
        velocityY = 8;
      } else {
        isCrouching = true;
      }
    }
  }
}

function keyReleased() {
  if (lives < 1 || flagpole.isReached) {
    return;
  }

  if (isPlummeting == false) {
    if (key === "A" || key === "a" || keyCode == 37) {
      isLeft = false;
      if (isRight == true) {
        facing = "right";
        isWalking = true;
      } else {
        velocityX = 0;
        isWalking = false;
        facing = "front";
      }
    } else if (key === "D" || key === "d" || keyCode == 39) {
      isRight = false;
      if (isLeft == true) {
        facing = "left";
        isWalking = true;
      } else {
        velocityX = 0;
        isWalking = false;
        facing = "front";
      }
    } else if (key === "S" || key === "s" || keyCode == 40) {
      isCrouching = false;
    }
  }
}

function overlapsCanyon(xPos, buffer) {
  for (let i = 0; i < canyons.length; i++) {
    if (xPos >= canyons[i].x_pos - buffer && 
        xPos <= canyons[i].x_pos + canyons[i].width + buffer) {
      return true;
    }
  }
  return false;
}

//returns a random integer between min and max (exclusive)
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}
