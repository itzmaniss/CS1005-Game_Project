
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
