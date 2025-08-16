
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