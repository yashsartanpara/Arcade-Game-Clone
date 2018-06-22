// Enemies our player must avoid
let Enemy = function (x, y, s) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.s = s;

};

// Update the enemy's position, required method for game
Enemy.prototype.update = function (dt) {

    this.x += this.s * dt;

    // repeat enemy movements
    if (this.x > 606) {
        this.x = 83;
        this.s = 100 + Math.floor(Math.random() * 500);
    }

    // collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        resetData()
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initialize player
let Player = function (x, y, speed, score) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = score;
    this.sprite = 'images/char-boy.png';

};

// Update player position
Player.prototype.update = function () {

    // Stop player from going outside the canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 505) {
        this.x = 505;
    }

    if (this.x < 101) {
        this.x = 101;
    }

    // Check for player reaching river to win game
    if (this.y < 0) {
        window.alert('Congratulations, You won');
        resetData();
    }
};

function resetData() {
    player.x = 303;
    player.y = 380;
    stone = new Stone(101 * Math.floor(Math.random() * 5 + 1), 60);
    player.score = 0;
    updateScore(player.score)
    star = new Star(101 * Math.floor(Math.random() * 5 + 1), 155);
}

function starCollision() {
    if (player.x < star.x + 60 &&
        player.x + 37 > star.x &&
        player.y < star.y + 25 &&
        30 + player.y > star.y) {
        player.score += 500;
        updateScore(player.score);
        hideStar();
    }
}

// Draw player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Manage key press to move player
Player.prototype.handleInput = function (keyPress) {
    starCollision();
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Initializing enemies
let allEnemies = [];
let enemyPosition = [60, 140, 220];
let player = new Player(303, 380, 50, 0);
let enemy;

enemyPosition.forEach(function (posY) {
    enemy = new Enemy(83, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// Initialize obstacle - Rock
let Stone = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Rock.png';
};

// Draw rock
Stone.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for rock and player Collision
Stone.prototype.update = function () {
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 303;
        player.y = 380;
        stone.x = 101 * Math.floor(Math.random() * 5 + 1);
        stone.y = 60;
    }
};

let stone = new Stone(101 * Math.floor(Math.random() * 5 + 1), 60);

let Star = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';

};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let star = new Star(101 * Math.floor(Math.random() * 5 + 1), 155);

document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let score = document.getElementById('score');

function updateScore(c) {
    score.innerHTML = 'Score : ' + c;
}

updateScore(player.score);

function hideStar() {
    star.x = 1000;
    star.y = 1000;
}