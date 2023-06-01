// Java Scrippt code for Challenge 4 UO Bootcamp: Code Quiz Challenge


// Below are the questions for the quiz, each question has only one answer
const quizData = [
    {
      question: "Which tag is used to define a hyperlink in HTML?",
      options: ["&lt;a&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;link&gt;"],
      answer: "&lt;a&gt;"
    },
    {
      question: "Which property is used to change the text color in CSS?",
      options: ["background-color", "color", "font-size", "border"],
      answer: "color"
    },
    {
      question: "What is the correct syntax to select an HTML element using its ID in JavaScript?",
      options: ["document.getElementByName('elementId')", "document.getElementById('elementId')", "document.getElement('elementId')", "document.querySelector('#elementId')"],
      answer: "document.getElementById('elementId')"
    },
    {
        question: " What does HTML stand for?",
        options: ["Hyper Text Markup Language", "How to Make Lasagna", "Hot Mail", "Hit My Line"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: " In HTML: < br  / > What type of tag is this?",
        options: ["Bread tag", "Break tag", "Broken tag", "comment tag"],
        answer: "Break tag"
    },
    {
        question: "In  HTML: < / body > Is this an opening tag or a closing tag??",
        options: ["Opening tag", "Break tag", "Closing tag", "None of the above"],
        answer: "Closing tag"
    },
    {
        question: "In CSS which of the following properties is used to set the background image of an element?",
        options: ["background-color", "Background-repeat", "background-position", "background-image"],
        answer: "background-image"
    },
    {
        question: "In CSS which of the following property allows you to control the shape or appearance of the marker of a list?",
        options: ["list-style-type", "type-list-style", "list-style", "list-list-style"],
        answer: "list-style-type"
    },
    {
        question: "In CSS which of the following property changes the style of left border?",
        options: ["border-left", "border-style-left", "border-left-style", "left-style-border"],
        answer: "border-left-style"
    },
    {
        question: "Which of the following is the correct syntax to redirect a url using JavaScript?",
        options: ["document.location='http://www.newlocation.com'", "browser.location='http://www.newlocation.com'", "navigator.location='http://www.newlocation.com'", "window.location='http://www.newlocation.com'"],
        answer: "window.location='http://www.newlocation.com'"
    },
    // Add more questions here...
    // No limit to addable questtions
  ];
  
// Creating all elements, containers and buttons needed for the quiz
  const startContainer = document.getElementById("start-container");
  const startButton = document.getElementById("start-btn");
  const quizContainer = document.getElementById("quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.getElementById("score");
  const initialsInput = document.getElementById("initials-input");
  const saveButton = document.getElementById("save-btn");
  const highScoreContainer = document.getElementById("high-score-container");
  const highScoresList = document.getElementById("high-scores");
  const timerContainer = document.getElementById("timer-container");
  const timerElement = document.getElementById("timer");
  

//   Setting initial values to be applied at the beginging of each quiz
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 120;
  let timerInterval;
  let highScores = [];
  
//   initiates quiz
  function startQuiz() {
    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    timerContainer.style.display = "block";
    // calls start timer(120s)
    startTimer();
    loadQuestion();
  }
  
// Fuction for quiz timer
  function startTimer() {
    timerInterval = setInterval(function() {
        // time goes down in seconds
      timeLeft--;
      timerElement.textContent = `Time: ${timeLeft}s`;
        // if the user runs out of time the quiz will end
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

//   responsible for loading and displaying the current question from the quizData array.
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
  
    // Display the current question
    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = "";
  
    // Create and display answer options as buttons
    currentQuizData.options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.classList.add("option"); // Add the "option" class for styling
      optionsElement.appendChild(optionElement);
    });
  }

//   fuction for user answer selection
  function selectAnswer(e) {
    const selectedOption = e.target.textContent;
    const currentQuizData = quizData[currentQuestion];

//   if the user selects the correct question their score will increase
    if (selectedOption === currentQuizData.answer) {
      score++;

    //   if  the user answers  incorrecrly, they will loose 10 seconds 
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
//   goes to next question in qiestion 'array'
    currentQuestion++;

    // when the user completes the last quesstion in the quiz, the quiz will end
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
//   fuction ends the quiz, is called after the last question and when 
function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreElement.textContent = `Your score: ${score}/${quizData.length} Time left: ${timeLeft} `;
}
  

function saveScore() {
    const initials = initialsInput.value.trim();
  
    if (initials !== "") {
      highScores.push({ initials, score });
      highScores.sort((a, b) => b.score - a.score);
      highScores = highScores.slice(0, 10); // Keeps only the top 10 scores
  
      updateHighScores();
  
      resetQuiz();
    }
  }
 //   This fuction is made to update the users score to the score list
  function updateHighScores() {
    highScoresList.innerHTML = "";
  
    highScores.forEach((highScore) => {
      const highScoreItem = document.createElement("li");
      highScoreItem.textContent = `Player: ${highScore.initials} Score: ${highScore.score}/${quizData.length} Time left: ${timeLeft}`;
      highScoresList.appendChild(highScoreItem);
    });
}
  
//   This fuction resets the quiz to the begining for a neew quiz taker
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
    initialsInput.value = "";
    startContainer.style.display = "block";
    resultContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    quizContainer.style.display = "none";
    timerContainer.style.display = "none";
    timerElement.textContent = "";
  }
//   Evenet listender added to listen for start quiz button click  
  startButton.addEventListener("click", startQuiz);
//   Evenet listender added to listen for answer selection button click
  optionsElement.addEventListener("click", selectAnswer);
//   Evenet listender added to listen for end quiz button click,answer will be recoreded internally
  submitButton.addEventListener("click", endQuiz);
//   Evenet listender added to listen for save score button click, score posted to high-score list
  saveButton.addEventListener("click", saveScore);

//   Jacob Cole Robertson