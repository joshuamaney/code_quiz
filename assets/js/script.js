var question = document.getElementById("question");
// selecting choices by passing in array
var choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
// selects timer
var timerEl = document.querySelector("#time");
// current question object
var currentQuestion = {};
// adds delay after selecting answers, false so answers not permitted until everything is loaded
var acceptingAnswers = false;
var score = 0;
// tracks number of question
var questionCounter = 0;
// empty array that will pull questions from questions set
var availableQuestions = [];
var secondsLeft = 60;
var penalty = 10;
// question and answer array
var questions = [
    // each question is an object
    {
        question: "Which of the following is correct about features of JavaScript?",
        choice1: "JavaScript is complementary to and integrated with HTML",
        choice2: "JavaScript is open and cross-platform",
        choice3: "Both of the above",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choice1: "last()",
        choice2: "get()",
        choice3: "pop()",
        choice4: "None of the above",
        answer: 3
    },
    {
        question: "Which of the following functions splits objects into an array of strings",
        choice1: "slice()",
        choice2: "split()",
        choice3: "replace()",
        choice4: "search()",
        answer: 2
    },
    {
        question: "Which function returns the string value as upper case?",
        choice1: "toLocaleUpperCase()",
        choice2: "toUpperCase()",
        choice3: "toString()",
        choice4: "subString()",
        answer: 2
    },
    {
        question: "____ tag is an extension of HTML that can enclose any number of JavaScript statements",
        choice1: "<script>",
        choice2: "<body>",
        choice3: "<head>",
        choice4: "<title>",
        answer: 1
    },
]

function startQuiz() {
    // reset
    questionCounter = 0;
    // copies all the questions from the questions array using a spread operator
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        // the timer counts down
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        // if time is 0 or no more questions
        if (secondsLeft === 0 || availableQuestions.length === 0) {
        // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Saves the value of secondsLeft as "score" in local storage
            function finalScore() {
                return secondsLeft;
            }
            localStorage.setItem("Score", secondsLeft);
        }
    
    }, 1000);
}

function getNewQuestion() {
    // check if out of questions, then go to highscore page
    if(availableQuestions.length === 0) {
        return window.location.assign("./high_score.html");
    }
    // increments the question
    questionCounter++;
    // get random question
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // populates question in question id
    question.innerText = currentQuestion.question;

    choices.forEach(function(userChoice) {
    // accesses appropriate choice dataset attribute by number and populates choice-text class
    var number = userChoice.dataset["number"];
    userChoice.innerText = currentQuestion["choice" + number];
    });
    // "splices out" the question that was just displayed
    availableQuestions.splice(questionIndex, 1);
    // setting acceptingAnswers to true to allow user to answer
    acceptingAnswers = true;
}

// grabs each choice, adds event listener to listen for each choice that is clicked
choices.forEach(function(userChoice) {
    userChoice.addEventListener("click", function(event) {
        console.log(event.target);
        // user can't click until loading is finished
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        // what the user chooses
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        console.log("selectedAnswer");

        if(selectedAnswer != currentQuestion.answer) {
            secondsLeft = secondsLeft - penalty;
        }
        getNewQuestion();
    });
});

startQuiz();
startTimer();
