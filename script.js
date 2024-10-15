const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Mark Zuckerberg", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Get DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

// Attach the event listener early on
nextButton.addEventListener('click', () => {
    console.log("Next button clicked");  // Debugging output

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        console.log("Showing question:", currentQuestionIndex);  // Log the current question index
        showQuestion();  // Show the next question
    } else {
        console.log("Quiz completed, showing score.");  // Log when the quiz is finished
        showScore();  // Show the score
    }
});

// Start the quiz
startQuiz();

function startQuiz() {
    console.log("Starting quiz...");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    console.log("Showing question:", currentQuestionIndex);
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Create answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset the question state for the next one
function resetState() {
    console.log("Resetting state for the next question...");
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    // Log the selected answer and if it's correct
    console.log("Answer selected:", selectedButton.innerText, "Correct:", correct);

    // Increase score if correct
    if (correct) {
        score++;
    }

    // Disable buttons and show correct/wrong status
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;  // Disable all buttons after selecting
        setStatusClass(button, button.dataset.correct === 'true');
    });

    console.log("Showing Next button");
    nextButton.classList.remove('hide');  // Show the Next button
}

// Update the button appearance based on correct or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Clear correct/wrong styling
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}



function showScore() {
    console.log("Quiz completed, showing score.");
    
    // Hide the question and answer elements
    questionElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');

    // Show the score container and set the score text
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score}`;
    
    // Hide the next button since the quiz is over
    nextButton.classList.add('hide');
}
