// Game state variables
let gameState;
let selectedDifficulty;

// Game character variables
let gameCharX;
let gameCharY;
let gameCharWidth;
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
let floorPosY;
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

// Game enemy variables
let eagles;

// Particle system variables
let particles;

// Sound variables
let soundCounter;
let collectSound;
let dieSound;
let jumpSound;
let fallingSound;

// Image variables
let menuBackground;

// Movement constants
const cloudSpeed = -0.25;

// Game constants
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;
const FLOOR_Y_POSITION = 350;
const DEFAULT_LIVES = 3;
const INITIAL_GAME_CHAR_X = 200;
const GAME_CHAR_WIDTH = 30;
const WORLD_RIGHT_BOUNDARY = 20000;
const INITIAL_SPAWN_X = 200;
const EXPECTED_SOUND_COUNT = 4;
const SOUND_VOLUME = 0.2;

// Physics constants
const GRAVITY = 0.8;
const HORIZONTAL_SPEED = 5;
const JUMP_VELOCITY = -12;
const FAST_FALL_VELOCITY = 8;
const CANYON_FALL_SPEED = 8;

// Rendering constants
const CAMERA_BUFFER = 200;
const CLOUD_COUNT = 50;
const CLOUD_SPACING = 200;
const CLOUD_Y_POSITION = 80;
const CLOUD_RESET_POSITION = -100;
const CLOUD_LOOP_DISTANCE = 10000;

// Character and collision constants
const CHAR_HALF_WIDTH = 15;
const CHAR_HEIGHT = 60;
const PLATFORM_COLLISION_BUFFER = 10;
const CANYON_COLLISION_BUFFER = 5;

// Difficulty configurations
const difficultySettings = {
    easy: {
        lives: 3,
        alwaysSpawnPlatforms: true,
        eagleSpeed: 2,
        eagleSpacing: { min: 600, max: 1000 },
        canyonWidth: { min: 105, max: 117 },
        flyingEagleHeight: 120,
    },
    medium: {
        lives: 3,
        alwaysSpawnPlatforms: false,
        eagleSpeed: 3,
        eagleSpacing: { min: 500, max: 800 },
        canyonWidth: { min: 115, max: 120 },
        flyingEagleHeight: 175,
    },
    hard: {
        lives: 2,
        alwaysSpawnPlatforms: false,
        eagleSpeed: 3.5,
        eagleSpacing: { min: 500, max: 800 },
        canyonWidth: { min: 115, max: 120 },
        flyingEagleHeight: 175,
        flyingSineWave: true,
    },
};

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    floorPosY = FLOOR_Y_POSITION;
    lives = DEFAULT_LIVES;
    gameState = "menu";
    selectedDifficulty = null;
}

function preload() {
    soundCounter = 0;
    soundFormats("mp3");

    collectSound = loadSound("assets/collect.mp3", soundFileLoaded);
    dieSound = loadSound("assets/die.mp3", soundFileLoaded);
    jumpSound = loadSound("assets/jump.mp3", soundFileLoaded);
    fallingSound = loadSound("assets/falling.mp3", soundFileLoaded);

    menuBackground = loadImage("assets/image.png");
}

function soundFileLoaded() {
    soundCounter++;
}

function startGame() {
    if (soundCounter !== EXPECTED_SOUND_COUNT) {
        console.log("Sounds not loaded yet");
    }

    console.log("Sounds loaded successfully");
    collectSound.setVolume(SOUND_VOLUME);
    dieSound.setVolume(SOUND_VOLUME);
    jumpSound.setVolume(SOUND_VOLUME);
    fallingSound.setVolume(SOUND_VOLUME);
    console.log("Sound volumes set");


    // Get current difficulty settings
    const currentDifficulty = difficultySettings[selectedDifficulty];
    lives = currentDifficulty.lives;

    // Reset game character variables
    gameCharX = INITIAL_GAME_CHAR_X;
    gameCharY = FLOOR_Y_POSITION;
    gameCharWidth = GAME_CHAR_WIDTH;
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
    rightBoundary = WORLD_RIGHT_BOUNDARY;
    currentCheckpoint = 0;
    spawnX = INITIAL_SPAWN_X;

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
    for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds[i] = { xPos: i * CLOUD_SPACING - 300, yPos: CLOUD_Y_POSITION };
    }

    // Create trees at different x positions
    let treeX = -200;
    while (treeX < 12500) {
        trees.push({ xPos: treeX + getRandomInt(-50, 50), yPos: 290 });
        treeX += getRandomInt(120, 180);
    }

    // Create mountains at different x positions
    let mountainX = -300;
    while (mountainX < 12500) {
        mountainRange.push({
            xPos: mountainX + getRandomInt(-100, 100),
            yPos: 350,
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
                xPos: coinX,
                yPos: coinY,
                size: 30,
                isFound: false,
            });
        }
    }

    // Create canyons at different x positions
    let canyonX = getRandomInt(400, 800);
    while (canyonX < 11500) {
        canyons.push({
            xPos: canyonX,
            width: getRandomInt(
                currentDifficulty.canyonWidth.min,
                currentDifficulty.canyonWidth.max,
            ),
        });
        canyonX += getRandomInt(600, 1000);
    }

    // Create checkpoints at strategic locations
    checkpoints[0] = { xPos: 200, yPos: floorPosY - 80, isActivated: true };
    for (let i = 1; i < 10; i++) {
        let checkpointX = i * 2000;

        // Shift checkpoint if it overlaps with canyon
        while (overlapsCanyon(checkpointX, 50)) {
            checkpointX += 100; // Shift right by 100 pixels
        }

        checkpoints[i] = {
            xPos: checkpointX,
            yPos: floorPosY - 80,
            isActivated: false,
        };
    }

    // Initialize flagpole
    flagpole = { xPos: 12000, isReached: false };

    //Create eagles at different x positions and platforms for walking eagles
    let eagleX = 500;
    while (eagleX < 11500) {
        let eagleType = getRandomInt(0, 2) === 0 ? "walking" : "flying";
        let eagleY =
            eagleType === "flying"
                ? currentDifficulty.flyingEagleHeight
                : getRandomInt(175, 200);

        //ensure walking eagles dont walk over canyons
        if (eagleType === "walking") {
            eagleY = floorPosY; //update Eagle Y position to floor level
            while (overlapsCanyon(eagleX, 200)) {
                eagleX += 50; // Shift right by 50 pixels
            }

            // Create platform near walking eagle based on difficulty
            if (
                currentDifficulty.alwaysSpawnPlatforms ||
                getRandomInt(0, 2) === 0
            ) {
                let platformX = eagleX - getRandomInt(100, 200); // Platform before eagle
                let platformWidth = getRandomInt(60, 80);
                let platformHeight = getRandomInt(10, 15);
                let platformY = getRandomInt(260, 280); // High in the sky to avoid walking eagles

                // Only add if platform doesn't overlap canyon and is within bounds
                platforms.push({
                    xPos: platformX,
                    yPos: platformY,
                    width: platformWidth,
                    height: platformHeight,
                });
            }
        }
        eagles.push(new Eagle(eagleX, eagleY, eagleType, selectedDifficulty));
        eagleX += getRandomInt(
            currentDifficulty.eagleSpacing.min,
            currentDifficulty.eagleSpacing.max,
        );
    }
}

function draw() {
    if (gameState === "menu") {
        drawMenu();
        return;
    }

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
    if (flagpole && flagpole.isReached) {
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(48);
        text("Level complete", width / 2, height / 2);
        textSize(24);
        text("Press R to restart", width / 2, height / 2 + 60);
        return;
    }

    // Update camera to follow character
    cameraPosX = gameCharX - width / 2;

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
        if (flagpole && !flagpole.isReached) {
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
        gameCharX = spawnX;
        gameCharY = floorPosY;
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
    if (gameCharY > height) {
        handleDeath();
    }
}

function applyPhysics() {
    if (!isPlummeting) {
        velocityY = velocityY + GRAVITY;
        gameCharX = gameCharX + velocityX;
        gameCharY = gameCharY + velocityY;

        if (gameCharX < leftBoundary) {
            gameCharX = leftBoundary;
            velocityX = 0;
        }

        if (gameCharX > rightBoundary) {
            gameCharX = rightBoundary;
            velocityX = 0;
        }

        // Check platform collisions first
        let onPlatform = false;
        for (let i = 0; i < platforms.length; i++) {
            let platform = platforms[i];

            // Check if character is above platform and falling onto it
            if (
                gameCharX + CHAR_HALF_WIDTH > platform.xPos &&
                gameCharX - CHAR_HALF_WIDTH < platform.xPos + platform.width &&
                gameCharY >= platform.yPos &&
                gameCharY <= platform.yPos + platform.height + PLATFORM_COLLISION_BUFFER &&
                velocityY >= 0
            ) {
                gameCharY = platform.yPos;
                velocityY = 0;
                velocityX = 0;
                isFalling = false;
                onPlatform = true;
                break;
            }
        }

        // Check floor collision if not on platform
        if (!onPlatform && gameCharY >= floorPosY) {
            gameCharY = floorPosY;
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
    if (!isPlummeting) {
        if (isLeft) {
            velocityX = -HORIZONTAL_SPEED;
        } else if (isRight) {
            velocityX = HORIZONTAL_SPEED;
        }
    }
}

function drawMenu() {
    background(menuBackground);

    // Game title
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text("CANYON DASH", width / 2, height / 4);

    // Difficulty selection title
    textSize(32);
    text("SELECT DIFFICULTY", width / 2, height / 2 + 10);

    // Difficulty buttons
    let buttonWidth = 150;
    let buttonHeight = 50;
    let buttonX = width / 2 - buttonWidth / 2;
    let startY = height / 2 + 50;
    let buttonPadding = 5;

    // Easy button
    let easyY = startY;
    if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > easyY &&
        mouseY < easyY + buttonHeight
    ) {
        fill(100, 255, 100);
    } else {
        fill(150, 255, 150);
    }
    rect(buttonX, easyY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text("EASY", buttonX + buttonWidth / 2, easyY + buttonHeight / 2);

    // Medium button
    let mediumY = easyY + buttonHeight + buttonPadding;
    fill(255);
    if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > mediumY &&
        mouseY < mediumY + buttonHeight
    ) {
        fill(255, 255, 100);
    } else {
        fill(255, 255, 150);
    }
    rect(buttonX, mediumY, buttonWidth, buttonHeight);
    fill(0);
    text("MEDIUM", buttonX + buttonWidth / 2, mediumY + buttonHeight / 2);

    // Hard button
    let hardY = mediumY + buttonHeight + buttonPadding;
    fill(255);
    if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > hardY &&
        mouseY < hardY + buttonHeight
    ) {
        fill(255, 100, 100);
    } else {
        fill(255, 150, 150);
    }
    rect(buttonX, hardY, buttonWidth, buttonHeight);
    fill(0);
    text("HARD", buttonX + buttonWidth / 2, hardY + buttonHeight / 2);

    // Instructions
    fill(255);
    textSize(16);
    text(
        "Click on a difficulty to start the game",
        width / 2,
        (height * 9) / 10,
    );
}

function mousePressed() {
    if (gameState === "menu") {
        let buttonWidth = 150;
        let buttonHeight = 50;
        let buttonX = width / 2 - buttonWidth / 2;
        let startY = height / 2 + 50;
        let buttonPadding = 5;

        // Check easy button
        let easyY = startY;
        if (
            mouseX > buttonX &&
            mouseX < buttonX + buttonWidth &&
            mouseY > easyY &&
            mouseY < easyY + buttonHeight
        ) {
            selectedDifficulty = "easy";
            gameState = "playing";
            startGame();
        }

        // Check medium button
        let mediumY = easyY + buttonHeight + buttonPadding;
        if (
            mouseX > buttonX &&
            mouseX < buttonX + buttonWidth &&
            mouseY > mediumY &&
            mouseY < mediumY + buttonHeight
        ) {
            selectedDifficulty = "medium";
            gameState = "playing";
            startGame();
        }

        // Check hard button
        let hardY = mediumY + buttonHeight + buttonPadding;
        if (
            mouseX > buttonX &&
            mouseX < buttonX + buttonWidth &&
            mouseY > hardY &&
            mouseY < hardY + buttonHeight
        ) {
            selectedDifficulty = "hard";
            gameState = "playing";
            startGame();
        }
    }
}

function keyPressed() {
    console.log(keyCode);

    if (gameState === "menu") {
        return;
    }

    if (lives < 1 || flagpole.isReached) {
        if (key === "R" || key === "r") {
            lives = 3;
            gameState = "menu";
            selectedDifficulty = null;
        }
        return;
    }

    if (!isPlummeting) {
        if (key === "A" || key === "a" || keyCode === 37) {
            if (!isRight) {
                isLeft = true;
                facing = "left";
                isWalking = true;
            }
        } else if (key === "D" || key === "d" || keyCode === 39) {
            if (!isLeft) {
                isRight = true;
                facing = "right";
                isWalking = true;
            }
        } else if (key === " " || keyCode === 38 || keyCode === 87) {
            if (!isFalling) {
                jumpSound.play();
                velocityY = JUMP_VELOCITY;
                isFalling = true;
                isWalking = false;
            }
        } else if (key === "S" || key === "s" || keyCode === 40) {
            if (isFalling) {
                velocityY = FAST_FALL_VELOCITY;
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

    if (!isPlummeting) {
        if (key === "A" || key === "a" || keyCode === 37) {
            isLeft = false;
            if (isRight) {
                facing = "right";
                isWalking = true;
            } else {
                velocityX = 0;
                isWalking = false;
                facing = "front";
            }
        } else if (key === "D" || key === "d" || keyCode === 39) {
            isRight = false;
            if (isLeft) {
                facing = "left";
                isWalking = true;
            } else {
                velocityX = 0;
                isWalking = false;
                facing = "front";
            }
        } else if (key === "S" || key === "s" || keyCode === 40) {
            isCrouching = false;
        }
    }
}
