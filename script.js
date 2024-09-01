// set the questions
const Questions = [
    {
        Questions: "Which company developed the Windows operating system?",
        answers: [
            { text: "Apple", correct: false },
            { text: "Microsoft", correct: true },
            { text: "Google", correct: false },
            { text: "IBM", correct: false },
        ]
    },
    {
        Questions: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyperlinking Text Mark Language", correct: false },
        ]
    },
    {
        Questions: "Which language is primarily used for Android app development?",
        answers: [
            { text: "Swift", correct: false },
            { text: "Kotlin", correct: true },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: false },
        ]
    },
    {
        Questions: "What is the main function of a DNS server?",
        answers: [
            { text: "Store website files", correct: false },
            { text: "Translate domain names to IP addresses", correct: true },
            { text: "Manage email services", correct: false },
            { text: "Host websites", correct: false },
        ]
    },
    {
        Questions: "Which company created the Java programming language?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Apple", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Google", correct: false },
        ]
    }
];
const QuestionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("nextbutton");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    // display the question 
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    QuestionElement.innerHTML = questionNo + ".  " + currentQuestion.Questions;
    // display the answer 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });

}
// before the display the question reset the privice question and answer
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct")
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    // automatic check the all button which is the right answer and whtch is the wrong
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScroe() {
    resetState();
    QuestionElement.innerHTML = `your Scored ${score} out of ${Questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";

}
function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        // display the final score
        showScroe();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < Questions.length) {
        handelNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();