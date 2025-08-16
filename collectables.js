
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