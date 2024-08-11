// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Array of flashcards (questions and answers)
const flashcards = [
    {
        question: "What is the Latin word for 'water'?",
        choices: ["Aqua", "Ignis", "Terra", "Caelum"],
        correct: "Aqua"
    },
    {
        question: "What is the Latin word for 'fire'?",
        choices: ["Ignis", "Aqua", "Caelum", "Terra"],
        correct: "Ignis"
    },
    {
        question: "What is the Latin word for 'earth'?",
        choices: ["Caelum", "Aqua", "Ignis", "Terra"],
        correct: "Terra"
    },
    {
        question: "What is the Latin word for 'sky'?",
        choices: ["Caelum", "Terra", "Ignis", "Aqua"],
        correct: "Caelum"
    },
    {
        question: "What is the Latin word for 'enemy'?",
        choices: ["Inimicus", "Amicus", "Imperator", "Gladius"],
        correct: "Inimicus"
    },
    {
        question: "What is the Latin word for 'friend'?",
        choices: ["Amicus", "Inimicus", "Caelum", "Terra"],
        correct: "Amicus"
    },
    {
        question: "What is the Latin word for 'leader'?",
        choices: ["Imperator", "Milites", "Gladius", "Inimicus"],
        correct: "Imperator"
    },
    {
        question: "What is the Latin word for 'soldiers'?",
        choices: ["Milites", "Imperator", "Gladius", "Amicus"],
        correct: "Milites"
    },
    {
        question: "What is the Latin word for 'sword'?",
        choices: ["Gladius", "Sagitta", "Milites", "Ignis"],
        correct: "Gladius"
    },
    {
        question: "What is the Latin word for 'arrow'?",
        choices: ["Sagitta", "Gladius", "Caelum", "Terra"],
        correct: "Sagitta"
    },
    {
        question: "What is the Latin word for 'battle'?",
        choices: ["Proelium", "Pax", "Milites", "Imperator"],
        correct: "Proelium"
    },
    {
        question: "What is the Latin word for 'peace'?",
        choices: ["Pax", "Proelium", "Caelum", "Sagitta"],
        correct: "Pax"
    },
    {
        question: "What is the Latin word for 'strategy'?",
        choices: ["Strategia", "Proelium", "Pax", "Milites"],
        correct: "Strategia"
    },
    {
        question: "What is the Latin word for 'tactics'?",
        choices: ["Tactica", "Strategia", "Gladius", "Imperator"],
        correct: "Tactica"
    },
    {
        question: "What is the Latin word for 'victory'?",
        choices: ["Victoria", "Pax", "Proelium", "Ignis"],
        correct: "Victoria"
    },
    {
        question: "What is the Latin word for 'enemy forces'?",
        choices: ["Hostes", "Amici", "Milites", "Imperator"],
        correct: "Hostes"
    }
];

// Shuffle flashcards and their choices
shuffleArray(flashcards);
flashcards.forEach(card => {
    shuffleArray(card.choices);
});

let currentCardIndex = 0;
let score = 0; // Initialize score

function loadFlashcard() {
    const card = flashcards[currentCardIndex];
    document.getElementById("question").textContent = card.question;
    const choices = document.querySelectorAll(".choice");
    choices.forEach((choice, index) => {
        choice.textContent = card.choices[index];
        choice.style.backgroundColor = "#f8f9fa"; // Reset background color
    });
}

function checkAnswer(selectedChoice) {
    const card = flashcards[currentCardIndex];
    if (selectedChoice.textContent === card.correct) {
        selectedChoice.style.backgroundColor = "#28a745"; // Green for correct
        score++; // Increment score for correct answer
    } else {
        selectedChoice.style.backgroundColor = "#dc3545"; // Red for incorrect
    }

    setTimeout(() => {
        currentCardIndex++;
        if (currentCardIndex < flashcards.length) {
            loadFlashcard();
        } else {
            displayResults(); // Show results when quiz is done
            resetQuiz(); // Reset the quiz
        }
    }, 1000);
}

function displayResults() {
    const grade = (score / flashcards.length) * 100;
    let gradeMessage = "Grade: " + grade.toFixed(2) + "%\n";

    if (grade === 100) {
        gradeMessage += "Excellent! Perfect score!";
    } else if (grade >= 80) {
        gradeMessage += "Great job!";
    } else if (grade >= 60) {
        gradeMessage += "Good effort!";
    } else {
        gradeMessage += "Keep practicing!";
    }

    alert(gradeMessage + "\nYour score: " + score + " out of " + flashcards.length);
}

function resetQuiz() {
    currentCardIndex = 0;
    score = 0; // Reset score
    shuffleArray(flashcards); // Shuffle flashcards again
    flashcards.forEach(card => {
        shuffleArray(card.choices); // Shuffle choices again
    });
    loadFlashcard(); // Load the first flashcard again
}

// Load the first flashcard when the page loads
window.onload = loadFlashcard;
