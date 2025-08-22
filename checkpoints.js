function drawCheckpoints() {
    for (let i = 0; i < checkpoints.length; i++) {
        if (
            checkpoints[i].xPos > cameraPosX - CAMERA_BUFFER &&
            checkpoints[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(139, 69, 19);
            rect(checkpoints[i].xPos - 3, checkpoints[i].yPos, 6, 80);

            if (checkpoints[i].isActivated) {
                fill(0, 255, 0);
            } else {
                fill(255, 0, 0);
            }

            triangle(
                checkpoints[i].xPos + 3,
                checkpoints[i].yPos,
                checkpoints[i].xPos + 3,
                checkpoints[i].yPos + 20,
                checkpoints[i].xPos + 30,
                checkpoints[i].yPos + 10,
            );
        }
    }
}

function drawFlagpole() {
    if (
        flagpole.xPos > cameraPosX - CAMERA_BUFFER &&
        flagpole.xPos < cameraPosX + width + CAMERA_BUFFER
    ) {
        fill(139, 69, 19);
        rect(flagpole.xPos - 5, floorPosY - 250, 10, 250);

        if (flagpole.isReached) {
            fill(0, 255, 0);
            triangle(
                flagpole.xPos + 5,
                floorPosY - 250,
                flagpole.xPos + 5,
                floorPosY - 210,
                flagpole.xPos + 65,
                floorPosY - 230,
            );
        } else {
            fill(255, 0, 0);
            triangle(
                flagpole.xPos + 5,
                floorPosY - 210,
                flagpole.xPos + 5,
                floorPosY - 170,
                flagpole.xPos + 65,
                floorPosY - 190,
            );
        }
    }
}

function checkFlagpole() {
    if (!flagpole.isReached) {
        let charLeft = gameCharX - CHAR_HALF_WIDTH;
        let charRight = gameCharX + CHAR_HALF_WIDTH;

        let flagpoleLeft = flagpole.xPos - 20;
        let flagpoleRight = flagpole.xPos + 20;

        if (charRight > flagpoleLeft && charLeft < flagpoleRight) {
            flagpole.isReached = true;
        }
    }
}

function checkCheckpointActivation() {
    for (let i = 0; i < checkpoints.length; i++) {
        if (!checkpoints[i].isActivated) {
            let charLeft = gameCharX - CHAR_HALF_WIDTH;
            let charRight = gameCharX + CHAR_HALF_WIDTH;
            let charTop = gameCharY - CHAR_HEIGHT;
            let charBottom = gameCharY;

            let checkpointLeft = checkpoints[i].xPos - 25;
            let checkpointRight = checkpoints[i].xPos + 25;
            let checkpointTop = checkpoints[i].yPos - 5;
            let checkpointBottom = checkpoints[i].yPos + 45;

            if (
                charRight > checkpointLeft &&
                charLeft < checkpointRight &&
                charBottom > checkpointTop &&
                charTop < checkpointBottom
            ) {
                checkpoints[i].isActivated = true;
                currentCheckpoint = i;
                spawnX = checkpoints[i].xPos;
            }
        }
    }
}

function checkCanyonCollision() {
    for (let i = 0; i < canyons.length; i++) {
        if (
            gameCharX + CANYON_COLLISION_BUFFER > canyons[i].xPos &&
            gameCharX - CANYON_COLLISION_BUFFER <
                canyons[i].xPos + canyons[i].width &&
            gameCharY >= floorPosY &&
            !isPlummeting
        ) {
            isPlummeting = true;
        }
    }
}

function handleCanyonFalling() {
    if (isPlummeting) {
        gameCharY = gameCharY + CANYON_FALL_SPEED;
        velocityX = 0;
        velocityY = 0;
        fallingSound.play();

        if (gameCharY > height + 100 && lives > 0) {
            handleDeath();
        }

        for (let i = 0; i < canyons.length; i++) {
            if (
                gameCharX > canyons[i].xPos &&
                gameCharX < canyons[i].xPos + canyons[i].width
            ) {
                if (gameCharX < canyons[i].xPos) {
                    gameCharX = canyons[i].xPos;
                }
                if (gameCharX > canyons[i].xPos + canyons[i].width) {
                    gameCharX = canyons[i].xPos + canyons[i].width;
                }
            }
        }
    }
}
