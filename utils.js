
function overlapsCanyon(xPos, buffer) {
  for (let i = 0; i < canyons.length; i++) {
    if (
      xPos >= canyons[i].x_pos - buffer &&
      xPos <= canyons[i].x_pos + canyons[i].width + buffer
    ) {
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
