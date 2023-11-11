document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('textContainer');
    const text = "Your text here. It will fall like snowflakes in a snowglobe."; // Replace with your text

    // Split the text into words
    const words = text.split(' ');

    let verticalPosition = container.offsetHeight - 20; // Start at the bottom of the container

    words.forEach((word, index) => {
        let span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.position = 'absolute';
        span.style.top = '-20px';

        // Random horizontal position
        let horizontalPosition = Math.random() * (container.offsetWidth - span.offsetWidth);
        span.style.left = horizontalPosition + 'px';

        container.appendChild(span);

        // Animate the word
        setTimeout(() => {
            span.style.top = verticalPosition + 'px';
            span.style.transition = 'top 3s'; // Adjust the speed as needed

            // Adjust vertical position for the next word
            verticalPosition -= 20; // Adjust based on font size or desired spacing
        }, index * 500); // Adjust timing as needed
    });
});

