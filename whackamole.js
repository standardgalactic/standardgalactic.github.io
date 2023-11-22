var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var holes = [];
var moles = [];
var score = 0;

// Create holes
for (var i = 0; i < 9; i++) {
    holes.push({x: i * 50 + 25, y: 200});
}

// Create moles
function createMole() {
    var hole = holes[Math.floor(Math.random() * holes.length)];
    var mole = {x: hole.x, y: hole.y - 30, alive: true};
    moles.push(mole);
}

// Draw holes and moles
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw holes
    for (var i = 0; i < holes.length; i++) {
        ctx.fillStyle = "#a0522d";
        ctx.fillRect(holes[i].x - 20, holes[i].y - 20, 40, 40);
    }
    
    // Draw moles
    for (var i = 0; i < moles.length; i++) {
        if (moles[i].alive) {
            ctx.fillStyle = "#808000";
            ctx.beginPath();
            ctx.arc(moles[i].x, moles[i].y, 20, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    // Draw score
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 30);
}

// Handle click events
canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    // Check if clicked on a mole
    for (var i = 0; i < moles.length; i++) {
        if (moles[i].alive && Math.sqrt(Math.pow(x - moles[i].x, 2) + Math.pow(y - moles[i].y, 2)) <= 20) {
            moles[i].alive = false;
            score++;
        }
    }
});

// Game loop
function gameLoop() {
    // Create moles at random intervals
    if (Math.random() < 0.2) {
        createMole();
    }
    
    // Remove dead moles
    moles = moles.filter(function(mole) {
        return mole.alive;
    });
    
    // Draw everything
    draw();
}

// Start game
setInterval(gameLoop, 50);
