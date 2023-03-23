var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var stars = [];

// Generate stars
for (var i = 0; i < 100; i++) {
  var star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
  };
  stars.push(star);
}

// Move the stars
function moveStars(dx, dy) {
  for (var i = 0; i < stars.length; i++) {
    stars[i].x += dx;
    stars[i].y += dy;

    // Wrap around the screen
    if (stars[i].x < 0) {
      stars[i].x = canvas.width;
    } else if (stars[i].x > canvas.width) {
      stars[i].x = 0;
    }
    if (stars[i].y < 0) {
      stars[i].y = canvas.height;
    } else if (stars[i].y > canvas.height) {
      stars[i].y = 0;
    }
  }
}

// Draw the stars
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the stars
  ctx.fillStyle = "white";
  for (var i = 0; i < stars.length; i++) {
    ctx.beginPath();
    ctx.arc(stars[i].x, stars[i].y, stars[i].size, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Move the stars when a key is pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "a") {
    moveStars(-5, 0);
  } else if (event.key === "d") {
    moveStars(5, 0);
  } else if (event.key === "w") {
    moveStars(0, -5);
  } else if (event.key === "s") {
    moveStars(0, 5);
  }
});

// Start the game loop
setInterval(function () {
  draw();
}, 30);
