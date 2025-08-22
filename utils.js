function overlapsCanyon(xPos, buffer) {
    for (let i = 0; i < canyons.length; i++) {
        if (
            xPos >= canyons[i].xPos - buffer &&
            xPos <= canyons[i].xPos + canyons[i].width + buffer
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
