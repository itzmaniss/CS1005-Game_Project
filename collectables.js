function drawCollectableCoins() {
    for (let i = 0; i < collectables.length; i++) {
        if (
            !collectables[i].isFound &&
            collectables[i].xPos > cameraPosX - CAMERA_BUFFER &&
            collectables[i].xPos < cameraPosX + width + CAMERA_BUFFER
        ) {
            fill(255, 215, 0, 100);
            ellipse(collectables[i].xPos, collectables[i].yPos, 34, 34);
            fill(255, 215, 0);
            ellipse(collectables[i].xPos, collectables[i].yPos, 30, 30);
            fill(255, 235, 0);
            ellipse(collectables[i].xPos, collectables[i].yPos, 24, 24);
            fill(255, 255, 200);
            push();
            translate(collectables[i].xPos - 5, collectables[i].yPos - 5);
            rotate(PI / 4);
            ellipse(0, 0, 5, 12);
            pop();
            textAlign(CENTER, CENTER);
            textSize(16);
            fill(0);
            text("$", collectables[i].xPos, collectables[i].yPos);
        }
    }
}

function checkCoinCollection() {
    for (let i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            let charLeft = gameCharX - CHAR_HALF_WIDTH;
            let charRight = gameCharX + CHAR_HALF_WIDTH;
            let charTop = gameCharY - CHAR_HEIGHT;
            let charBottom = gameCharY;

            let coinLeft = collectables[i].xPos - 15;
            let coinRight = collectables[i].xPos + 15;
            let coinTop = collectables[i].yPos - 15;
            let coinBottom = collectables[i].yPos + 15;

            if (
                charRight > coinLeft &&
                charLeft < coinRight &&
                charBottom > coinTop &&
                charTop < coinBottom
            ) {
                collectables[i].isFound = true;
                coinCount = coinCount + 1;
                gameScore = gameScore + 1;
                createCoinParticles(collectables[i].xPos, collectables[i].yPos);
                collectSound.play();
            }
        }
    }
}

// Particle system for coin collection effects
function createCoinParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: x,
            y: y,
            vx: random(-3, 3),
            vy: random(-5, -2),
            life: 30,
            maxLife: 30,
            size: random(3, 6),
            color: {
                r: random(200, 255),
                g: random(180, 255),
                b: random(0, 50),
            },
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    for (let particle of particles) {
        let alpha = map(particle.life, 0, particle.maxLife, 0, 255);
        fill(particle.color.r, particle.color.g, particle.color.b, alpha);
        noStroke();
        ellipse(particle.x, particle.y, particle.size, particle.size);
    }
}
