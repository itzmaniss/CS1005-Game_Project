function drawSkyAndGround() {
    background(135, 206, 235);
    fill(34, 139, 34);
    rect(-width, floorPosY, width * 3, height - floorPosY);
}

function drawMountains() {
    for (let i = 0; i < mountainRange.length; i++) {
        if (
            mountainRange[i].xPos > cameraPosX - CAMERA_BUFFER &&
            mountainRange[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(125, 125, 125);
            noStroke();
            triangle(
                mountainRange[i].xPos - 60,
                mountainRange[i].yPos,
                mountainRange[i].xPos,
                mountainRange[i].yPos - 240,
                mountainRange[i].xPos + 60,
                mountainRange[i].yPos,
            );
            triangle(
                mountainRange[i].xPos - 120,
                mountainRange[i].yPos,
                mountainRange[i].xPos - 60,
                mountainRange[i].yPos - 180,
                mountainRange[i].xPos,
                mountainRange[i].yPos,
            );
            triangle(
                mountainRange[i].xPos,
                mountainRange[i].yPos,
                mountainRange[i].xPos + 60,
                mountainRange[i].yPos - 150,
                mountainRange[i].xPos + 120,
                mountainRange[i].yPos,
            );
        }
    }
}

function drawClouds() {
    for (let i = 0; i < clouds.length; i++) {
        if (
            clouds[i].xPos > cameraPosX - CAMERA_BUFFER &&
            clouds[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(255);
            noStroke();
            ellipse(clouds[i].xPos, clouds[i].yPos, 60, 40);
            ellipse(clouds[i].xPos - 20, clouds[i].yPos + 10, 50, 30);
            ellipse(clouds[i].xPos + 20, clouds[i].yPos + 10, 50, 30);
            ellipse(clouds[i].xPos - 10, clouds[i].yPos - 10, 40, 20);
            ellipse(clouds[i].xPos + 10, clouds[i].yPos - 10, 40, 20);
        }
    }
}

function animateClouds() {
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].xPos = clouds[i].xPos - cloudSpeed;

        if (clouds[i].xPos < CLOUD_RESET_POSITION) {
            clouds[i].xPos = clouds[i].xPos + CLOUD_LOOP_DISTANCE;
        }
    }
}

function drawTrees() {
    for (let i = 0; i < trees.length; i++) {
        if (
            trees[i].xPos > cameraPosX - CAMERA_BUFFER &&
            trees[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(139, 69, 19);
            rect(trees[i].xPos, trees[i].yPos, 20, 60);
            fill(34, 139, 34);
            ellipse(trees[i].xPos + 10, trees[i].yPos - 30, 60, 60);
            ellipse(trees[i].xPos - 20, trees[i].yPos - 10, 50, 50);
            ellipse(trees[i].xPos + 40, trees[i].yPos - 10, 50, 50);
            ellipse(trees[i].xPos + 10, trees[i].yPos - 50, 40, 40);
            ellipse(trees[i].xPos + 10, trees[i].yPos - 70, 40, 40);
        }
    }
}

function drawCanyons() {
    for (let i = 0; i < canyons.length; i++) {
        if (
            canyons[i].xPos > cameraPosX - CAMERA_BUFFER &&
            canyons[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(40, 40, 40);
            rect(
                canyons[i].xPos,
                floorPosY,
                canyons[i].width,
                height - floorPosY,
            );
            fill(139, 69, 19);
            rect(canyons[i].xPos - 5, floorPosY, 5, height - floorPosY);
            rect(
                canyons[i].xPos + canyons[i].width,
                floorPosY,
                5,
                height - floorPosY,
            );
            for (let j = 0; j < 5; j++) {
                fill(0, 0, 0, 50 - j * 10);
                rect(canyons[i].xPos, floorPosY + j * 5, canyons[i].width, 5);
            }
        }
    }
}

function drawPlatforms() {
    for (let i = 0; i < platforms.length; i++) {
        if (
            platforms[i].xPos > cameraPosX - CAMERA_BUFFER &&
            platforms[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(101, 67, 33);
            noStroke();
            rect(
                platforms[i].xPos,
                platforms[i].yPos,
                platforms[i].width,
                platforms[i].height,
            );

            // Add some texture/detail
            fill(139, 69, 19);
            rect(platforms[i].xPos, platforms[i].yPos, platforms[i].width, 2);
            fill(160, 82, 45);
            rect(
                platforms[i].xPos + 2,
                platforms[i].yPos + 2,
                platforms[i].width - 4,
                platforms[i].height - 4,
            );
        }
    }
}
