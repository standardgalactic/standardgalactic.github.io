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
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Move the player based on keyboard input
    if (input.length > 0) {
        var inputLetter = input.charAt(0);
        if (inputLetter === 'A') {
            moveLeft();
        } else if (inputLetter === 'D') {
            moveRight();
        }
    }
    
// Create enemies at random intervals
if (Math.random() < 0.02) {
    createEnemy();
}

// Move and draw the enemies
for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    enemy.y += enemy.speed;
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    
    // Check for collision with player
    if (checkEnemyPlayerCollision(enemy)) {
        // End the game
        clearInterval(gameInterval);
        alert("Game Over! Final Score: " + score);
        return;
    }
    
    // Check for collision with bullets
    for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        if (checkBulletEnemyCollision(bullet, enemy)) {
            // Play sound effect
            enemySound.play();
            
            // Remove the bullet and enemy from the game
            bullets.splice(j, 1);
            enemies.splice(i, 1);
            
            // Increment the score
            score++;
            updateScore();
        }
    }
}

// Move and draw the bullets
for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    bullet.y -= bullet.speed;
    ctx.fillStyle = "blue";
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
    
    // Remove bullets that have gone off-screen
    if (bullet.y < 0) {
        bullets.splice(i, 1);
        i--;
    }
}

// Display the input string
ctx.font = "30px Arial";
ctx.fillStyle = "white";
ctx.fillText(input, player.x, player.y-10);

// Remove the first letter of the input string if it matches the first letter of any enemy word
for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if (input.charAt(0) === enemy.letter) {
        input = input.slice(1);
    }
}

// Schedule the next frame
requestAnimationFrame(gameLoop);
