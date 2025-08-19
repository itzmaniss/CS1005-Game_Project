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
let platforms;

//Game enemy variables
let eagles;

// Particle system variables
let particles;

// Sound variables
let soundCounter;
let collectSound;
let dieSound;
let jumpSound;
let fallingSound;

// Movement constants
const cloudSpeed = -0.25;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = 350;
  lives = 3;
  startGame();
}

function preload() {
  soundCounter = 0;
  soundFormats("mp3");


  collectSound = loadSound('assets/collect.mp3', soundFileLoaded);
  dieSound = loadSound('assets/die.mp3', soundFileLoaded); 
  jumpSound = loadSound('assets/jump.mp3', soundFileLoaded); 
  fallingSound = loadSound('assets/falling.mp3', soundFileLoaded);
}

function soundFileLoaded() {
  soundCounter++;
}


function startGame() {
  while (soundCounter!=4){
      console.log("Sounds not loaded yet");
      return;
    }
    if (soundCounter == 4) {
      console.log("Sounds loaded successfully");
      collectSound.setVolume(0.2); 
      dieSound.setVolume(0.2);
      jumpSound.setVolume(0.2);
      fallingSound.setVolume(0.2);
      console.log("Sound volumes set");
    }
  // Reset game character variables
  gameChar_x = 200;
  gameChar_y = 350;
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
  platforms = [];
  eagles = [];
  particles = [];

  noStroke();

  // Create clouds at different x positions
  for (let i = 0; i < 50; i++) {
    clouds[i] = { x_pos: i * 200 - 300, y_pos: 80 };
  }

  // Create trees at different x positions
  let treeX = -200;
  while (treeX < 12500) {
    trees.push({ x_pos: treeX + getRandomInt(-50, 50), y_pos: 290 });
    treeX += getRandomInt(120, 180);
  }

  // Create mountains at different x positions
  let mountainX = -300;
  while (mountainX < 12500) {
    mountainRange.push({
      x_pos: mountainX + getRandomInt(-100, 100),
      y_pos: 350,
    });
    mountainX += getRandomInt(350, 450);
  }

  // Create collectables at different x positions
  let maxCoins = 20;
  let levelLength = 11500;
  let baseSpacing = levelLength / maxCoins;

  for (let i = 0; i < maxCoins; i++) {
    let coinX = 300 + i * baseSpacing + getRandomInt(-100, 100);
    let coinY = getRandomInt(195, 305);

    // Shift coin if it overlaps with canyon
    while (overlapsCanyon(coinX, 30) && coinX < 11800) {
      coinX += 50;
    }

    // Only add coin if it's still within bounds
    if (coinX < 11800) {
      collectables.push({
        x_pos: coinX,
        y_pos: coinY,
        size: 30,
        isFound: false,
      });
    }
  }

  // Create canyons at different x positions
  let canyonX = getRandomInt(400, 800);
  while (canyonX < 11500) {
    canyons.push({ x_pos: canyonX, width: getRandomInt(105, 117) });
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

  //Create eagles at different x positions and platforms for walking eagles
  let eagleX = 500;
  while (eagleX < 11500) {
    let eagleType = getRandomInt(0, 2) === 0 ? "walking" : "flying";
    let eagleY = getRandomInt(175, 200);

    //ensure walking eagles dont walk over canyons
    if (eagleType === "walking") {
      eagleY = floorPos_y; //update Eagle Y position to floor level
      while (overlapsCanyon(eagleX, 200)) {
        eagleX += 50; // Shift right by 50 pixels
      }
      
      // Create platform near walking eagle (50% chance for tactical placement)
      let platformX = eagleX - getRandomInt(100, 200); // Platform before eagle
      let platformWidth = getRandomInt(60, 80);
      let platformHeight = getRandomInt(10, 15);
      let platformY = getRandomInt(260, 280); // High in the sky to avoid walking eagles
        
        // Only add if platform doesn't overlap canyon and is within bounds
        platforms.push({
          x_pos: platformX,
          y_pos: platformY,
          width: platformWidth,
          height: platformHeight
        });
      } 
    eagles.push(new Eagle(eagleX, eagleY, eagleType));
    eagleX += getRandomInt(600, 1000);
  }
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
  drawPlatforms();
  drawCheckpoints();
  drawFlagpole();
  drawCharacter();
  drawEagles();
  updateEagles();
  checkEagleCollisions();
  updateParticles();
  drawParticles();

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

function handleDeath() {
  if (lives > 1) {
    lives--;
    dieSound.play();
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

    // Check platform collisions first
    let onPlatform = false;
    for (let i = 0; i < platforms.length; i++) {
      let platform = platforms[i];
      
      // Check if character is above platform and falling onto it
      if (gameChar_x + 15 > platform.x_pos && 
          gameChar_x - 15 < platform.x_pos + platform.width &&
          gameChar_y >= platform.y_pos && 
          gameChar_y <= platform.y_pos + platform.height + 10 &&
          velocityY >= 0) {
        gameChar_y = platform.y_pos;
        velocityY = 0;
        velocityX = 0;
        isFalling = false;
        onPlatform = true;
        break;
      }
    }
    
    // Check floor collision if not on platform
    if (!onPlatform && gameChar_y >= floorPos_y) {
      gameChar_y = floorPos_y;
      velocityY = 0;
      velocityX = 0;
      isFalling = false;
    }
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
    triangle(
      heartX - 10,
      heartY - 1,
      heartX + 10,
      heartY - 1,
      heartX,
      heartY + 12,
    );
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
  console.log(keyCode);
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
    } else if (key === " " || keyCode == 38 || keyCode == 87) {
      if (isFalling == false) {
        jumpSound.play();
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