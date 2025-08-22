// enemies.js
function Eagle(x, y, type, difficulty) {
    this.position = createVector(x, y);
    this.size = 40;
    this.type = type; // "walking" or "flying"
    this.width = 50;
    this.height = 30;
    this.isActive = true;
    this.difficulty = difficulty;

    // Get difficulty settings
    const settings = difficultySettings[difficulty];
    const speed = settings ? settings.eagleSpeed : 0.2;

    if (this.type === "walking") {
        this.Lbarrier = this.position.x - 200; // Barrier for walking eagles
        this.Rbarrier = this.position.x + 200; // Barrier for walking eagles
        this.velocity = createVector(-speed, 0);
        this.lookRight = false; // Default direction for walking eagles
    }
    // Flying eagle specific properties
    else if (this.type === "flying") {
        this.amplitude = 15;
        this.frequency = 0.05;
        this.baseY = y;
        this.time = 0;
        this.velocity = createVector(-speed, 0);
        this.useSineWave = settings && settings.flyingSineWave;
    }

    this.update = function () {
        if (!this.isActive) return;

        //move the eagles
        this.position.add(this.velocity);

        //walking eagles move back and forth
        if (this.type === "walking") {
            //change direction if at barriers
            if (
                this.position.x <= this.Lbarrier ||
                this.position.x >= this.Rbarrier
            ) {
                this.velocity.x *= -1; // Reverse direction
                this.lookRight = !this.lookRight; // Toggle direction
            }
        }

        // Flying eagles have vertical movement as well as moving Left
        if (this.type === "flying") {
            this.time += this.frequency;
            if (this.useSineWave) {
                // Hard mode: sine wave movement
                this.position.y = this.baseY + sin(this.time) * this.amplitude;
            } else {
                // Easy/Medium mode: straight flight
                this.position.y = this.baseY;
            }
        }

        // Remove if off screen
        if (this.position.x < -100) {
            this.isActive = false;
        }
    };

    this.draw = function () {
        if (!this.isActive) return;

        push();
        translate(this.position.x, this.position.y);

        if (this.type === "walking") {
            this.drawWalkingEagle(this.lookRight);
        } else {
            this.drawFlyingEagle();
        }

        pop();
    };

    this.drawWalkingEagle = function (lookRight) {
        if (lookRight) {
            fill(101, 67, 33);
            ellipse(0, -15, 35, 25);
            // Eagle head (white)
            fill(245, 245, 245);
            ellipse(12, -25, 20, 20);
            // Eagle beak (yellow)
            fill(255, 204, 0);
            triangle(20, -25, 28, -23, 20, -21);
            // Eagle eye
            fill(0);
            ellipse(15, -27, 3, 3);
            // Eagle tail feathers
            fill(101, 67, 33);
            triangle(-15, -15, -25, -10, -25, -20);
            triangle(-15, -15, -25, -5, -25, -15);
            // Eagle legs (walking)
            stroke(255, 204, 0);
            strokeWeight(2);
            line(-5, 0, -5, 8);
            line(5, 0, 5, 8);
            // Eagle feet
            line(-8, 8, -2, 8);
            line(2, 8, 8, 8);
            noStroke();
        } else {
            // Eagle body (brown)
            fill(101, 67, 33);
            ellipse(0, -15, 35, 25);

            // Eagle head (white)
            fill(245, 245, 245);
            ellipse(-12, -25, 20, 20);

            // Eagle beak (yellow)
            fill(255, 204, 0);
            triangle(-20, -25, -28, -23, -20, -21);

            // Eagle eye
            fill(0);
            ellipse(-15, -27, 3, 3);

            // Eagle tail feathers
            fill(101, 67, 33);
            triangle(15, -15, 25, -10, 25, -20);
            triangle(15, -15, 25, -5, 25, -15);

            // Eagle legs (walking)
            stroke(255, 204, 0);
            strokeWeight(2);
            line(-5, 0, -5, 8);
            line(5, 0, 5, 8);

            // Eagle feet
            line(-8, 8, -2, 8);
            line(2, 8, 8, 8);
            noStroke();
        }
    };

    this.drawFlyingEagle = function () {
        // Eagle body (brown)
        fill(101, 67, 33);
        ellipse(0, 0, 40, 20);

        // Eagle head (white)
        fill(245, 245, 245);
        ellipse(-15, -5, 18, 18);

        // Eagle beak (yellow)
        fill(255, 204, 0);
        triangle(-22, -5, -28, -3, -22, -1);

        // Eagle eye
        fill(0);
        ellipse(-18, -7, 3, 3);

        // Eagle wings (spread for flying)
        fill(101, 67, 33);
        // Wing flapping animation
        let wingOffset = sin(this.time * 8) * 5;
        ellipse(-5, -10 + wingOffset, 35, 15);
        ellipse(5, -10 - wingOffset, 35, 15);

        // Wing tips (darker)
        fill(80, 50, 25);
        ellipse(-20, -10 + wingOffset, 15, 8);
        ellipse(20, -10 - wingOffset, 15, 8);

        // Eagle tail feathers
        fill(101, 67, 33);
        triangle(15, 0, 25, -5, 25, 5);
    };

    this.checkCollision = function (charX, charY, charWidth, charHeight) {
        if (!this.isActive) return false;

        let charLeft = charX - charWidth / 2;
        let charRight = charX + charWidth / 2;
        let charTop = charY - charHeight;
        let charBottom = charY;

        let eagleLeft = this.position.x - this.width / 2;
        let eagleRight = this.position.x + this.width / 2;
        let eagleTop = this.position.y - this.height / 2;
        let eagleBottom = this.position.y + this.height / 2;

        return (
            charRight > eagleLeft &&
            charLeft < eagleRight &&
            charBottom > eagleTop &&
            charTop < eagleBottom
        );
    };
}

// Functions to manage eagles array
function updateEagles() {
    for (let i = eagles.length - 1; i >= 0; i--) {
        eagles[i].update();
        if (!eagles[i].isActive) {
            eagles.splice(i, 1);
        }
    }
}

function drawEagles() {
    for (let eagle of eagles) {
        eagle.draw();
    }
}

function checkEagleCollisions() {
    for (let eagle of eagles) {
        const collision = eagle.checkCollision(gameCharX, gameCharY, GAME_CHAR_WIDTH, CHAR_HEIGHT);
        if (collision) {
            if (lives > 0) {
                handleDeath();
            }
            break;
        }
    }
}
