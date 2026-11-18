const questions = [
  { question: "What does CPU stand for?", answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"], correct: 0 },
  { question: "Which language is primarily used to structure web pages?", answers: ["CSS", "HTML", "Python", "SQL"], correct: 1 },
  { question: "Which HTML element is used for the largest heading?", answers: ["heading", "<h6>", "<h1>", "<header>"], correct: 2 },
  { question: "What does CSS control in a website?", answers: ["Appearance and layout", "Database records", "Server hardware", "Network cables"], correct: 0 },
  { question: "Which of these is a JavaScript data type?", answers: ["Boolean", "Palette", "Margin", "Pixel"], correct: 0 },
  { question: "What is the main purpose of a variable?", answers: ["Store and reuse data", "Design a heading", "Connect a printer", "Create a table border"], correct: 0 },
  { question: "Which device is commonly used to store permanent files?", answers: ["RAM", "CPU", "Hard disk or SSD", "Monitor"], correct: 2 },
  { question: "What does URL stand for?", answers: ["Uniform Resource Locator", "Universal Remote Link", "User Registered List", "Unique Record Language"], correct: 0 },
  { question: "Which protocol is commonly used to transfer web pages?", answers: ["HTTP", "JPEG", "USB", "RGB"], correct: 0 },
  { question: "What is an algorithm?", answers: ["A step-by-step solution", "A computer monitor", "A website image", "A keyboard shortcut"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionCount = document.querySelector("#question-count");
const scoreCount = document.querySelector("#score-count");
const progressBar = document.querySelector("#progress-bar");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const nextButton = document.querySelector("#next-button");
const quizMessage = document.querySelector("#quiz-message");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");

function showQuestion() {
  selectedAnswer = null;
  quizMessage.textContent = "";
  nextButton.disabled = true;
  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreCount.textContent = `Score: ${score}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = item.question;
  answersContainer.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.className = "answer-button";
    label.innerHTML = `<input type="radio" name="quiz-answer" value="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer}</span>`;
    label.querySelector("input").addEventListener("change", () => selectAnswer(index, label));
    answersContainer.appendChild(label);
  });
  nextButton.textContent = currentQuestion === questions.length - 1 ? "View Results" : "Next Question";
  questionText.focus();
}

function selectAnswer(index, button) {
  selectedAnswer = index;
  quizMessage.textContent = "";
  answersContainer.querySelectorAll(".answer-button").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");
  nextButton.disabled = false;
  quizMessage.textContent = index === questions[currentQuestion].correct
    ? "Correct answer selected."
    : `The selected answer is not correct. The correct answer is ${questions[currentQuestion].answers[questions[currentQuestion].correct]}.`;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === null) {
    quizMessage.textContent = "Please select an answer before continuing.";
    return;
  }
  if (selectedAnswer === questions[currentQuestion].correct) score += 1;
  currentQuestion += 1;
  if (currentQuestion < questions.length) showQuestion();
  else showResults();
});

function showResults() {
  quizView.hidden = true;
  resultView.hidden = false;
  const percentage = (score / questions.length) * 100;
  const title = percentage >= 80 ? "Excellent result!" : percentage >= 60 ? "Good work!" : "Keep practicing!";
  const mark = percentage >= 80 ? "A+" : percentage >= 60 ? "B" : "C";
  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-mark").textContent = mark;
  document.querySelector("#final-score").textContent = `${score} / ${questions.length} (${percentage.toFixed(0)}%)`;
  document.querySelector("#result-message").textContent = percentage >= 80
    ? "You demonstrate a strong understanding of introductory IT concepts."
    : "Review the topics you missed and try again to improve your result.";
}

document.querySelector("#restart-button").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizView.hidden = false;
  resultView.hidden = true;
  showQuestion();
});

showQuestion();
