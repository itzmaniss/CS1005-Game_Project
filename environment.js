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
