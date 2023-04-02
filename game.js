// Get the canvas element and context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Game objects
var player = {
    x: canvas.width/2,
    y: canvas.height-50,
    speed: 5,
    size: 50
};
var bullets = [];
var enemies = [];

// Movement functions
function moveLeft() {
    player.x -= player.speed;
}
function moveRight() {
    player.x += player.speed;
}

// Enemy creation function
function createEnemy() {
    var enemy = {
        x: Math.floor(Math.random() * (canvas.width-50)),
        y: 0,
        speed: Math.floor(Math.random() * 5) + 1,
        size: 50,
        letter: getRandomWord()
    };
    enemies.push(enemy);
}

// Collision detection functions
function checkBulletEnemyCollision(bullet, enemy) {
    if (bullet.x < enemy.x + enemy.size && 
        bullet.x + bullet.size > enemy.x && 
        bullet.y < enemy.y + enemy.size && 
        bullet.y + bullet.size > enemy.y) {
        return true;
    }
    return false;
}
function checkEnemyPlayerCollision(enemy) {
    if (enemy.x < player.x + player.size && 
        enemy.x + enemy.size > player.x && 
        enemy.y < player.y + player.size && 
        enemy.y + enemy.size > player.y) {
        return true;
    }
    return false;
}

// Scoring system
var score = 0;
function updateScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 50);
}

// Sound effects
var bulletSound = new Audio("bullet.wav");
var enemySound = new Audio("enemy.wav");

// Word generation
var words = ["APPLE", "BANANA", "CHERRY", "DATES", "EGGPLANT", "FIGS", "GRAPE", "HONEYDEW", "JACKFRUIT", "KIWI", "LEMON", "MANGO", "NECTARINE", "ORANGE", "PINEAPPLE", "QUINCE", "RASPBERRY", "STRAWBERRY", "TOMATO", "WATERMELON"];
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Keyboard input handling
var input = "";
document.addEventListener("keydown", function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        // If a letter key is pressed, add it to the input string
        input += String.fromCharCode(event.keyCode);
    } else if (event.keyCode == 8) {
        // If the backspace key is pressed, remove the last character from the input string
        input = input.slice(0, -1);
    }
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the player
    ctx.fillStyle = "green";
    ctx.fillRect(player
