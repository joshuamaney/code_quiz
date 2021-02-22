var questions = [
    {
        question: "Which of the following is correct about features of JavaScript?",
        choice1: "JavaScript is complementary to and integrated with HTML",
        choice2: "JavaScript is open and cross-platform",
        choice3: "Both of the above",
        choice4: "None of the above",
        answer: "Both of the above"
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choice1: "last()",
        choice2: "get()",
        choice3: "pop()",
        choice4: "None of the above",
        answer: "pop()"
    },
    {
        question: "Which of the following functions splits objects into an array of strings",
        choice1: "slice()",
        choice2: "split()",
        choice3: "replace()",
        choice4: "search()",
        answer: "split()"
    },
    {
        question: "Which functions returns the string value as upper case?",
        choice1: "toLocaleUpperCase()",
        choice2: "toUpperCase()",
        choice3: "toString()",
        choice4: "subString()",
        answer: "toUpperCase()"
    },
    {
        question: "____ tag is an extension of HTML that can enclose any number of JavaScript statements",
        choice1: "<script>",
        choice2: "<body>",
        choice3: "<head>",
        choice4: "<title>",
        answer: "<script>"
    },
]

var timerEl = document.querySelector("#time");
var penalty = 10;

var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var scoreText = document.querySelector("#time");

var currentQuestion = {}
var acceptingAnswers = true;
var questionCounter = 0;
var availableQuestions = [];

var maxQuestions = 5;

var secondsLeft = 60;

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
        }

    }, 1000);
}

function startGame() {
    questionCounter = 0;
    time = 0
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem(secondsLeft, timerEl)

        return window.location.assign("high_score.html")
    }

    //randomizes questions

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(function (choice) {
        var number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}


choices.forEach(function (choice) {
    return choice.addEventListener("click", function (event) {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
            'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function () {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 100);
    });
})

startTimer();

startGame();