const form = document.querySelector("#grade-form");
const message = document.querySelector("#form-message");
const resultPanel = document.querySelector("#result-panel");

const categories = [
  { score: "quiz-score", max: "quiz-max", weight: "quiz-weight", name: "Quiz" },
  { score: "assignment-score", max: "assignment-max", weight: "assignment-weight", name: "Assignment" },
  { score: "exam-score", max: "exam-max", weight: "exam-weight", name: "Examination" }
];

function readNumber(id) {
  const value = document.querySelector(`#${id}`).value.trim();
  return value === "" ? null : Number(value);
}

function getRemark(grade) {
  if (grade >= 90) return "Outstanding";
  if (grade >= 80) return "Very Satisfactory";
  if (grade >= 75) return "Satisfactory";
  return "Needs Improvement";
}

function clearValidation() {
  form.querySelectorAll("input").forEach((input) => input.removeAttribute("aria-invalid"));
  message.textContent = "";
}

function markInvalid(id) {
  const input = document.querySelector(`#${id}`);
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", "form-message");
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearValidation();
  resultPanel.hidden = true;

  const studentName = document.querySelector("#student-name").value.trim();
  const subject = document.querySelector("#subject").value.trim();
  if (!studentName) {
    message.textContent = "Please enter the student name.";
    markInvalid("student-name");
    return;
  }
  if (!subject) {
    message.textContent = "Please enter the subject.";
    markInvalid("subject");
    return;
  }

  let weightTotal = 0;
  let calculatedGrade = 0;

  for (const category of categories) {
    const score = readNumber(category.score);
    const max = readNumber(category.max);
    const weight = readNumber(category.weight);
    if (score === null) {
      message.textContent = `Please enter the ${category.name.toLowerCase()} score.`;
      markInvalid(category.score);
      return;
    }
    if (max === null || max <= 0) {
      message.textContent = `${category.name} maximum score must be greater than zero.`;
      markInvalid(category.max);
      return;
    }
    if (weight === null || weight < 0 || weight > 100) {
      message.textContent = `${category.name} weight must be between 0 and 100%.`;
      markInvalid(category.weight);
      return;
    }
    if (score < 0 || score > max) {
      message.textContent = `${category.name} score must be between 0 and ${max}.`;
      markInvalid(category.score);
      return;
    }
    weightTotal += weight;
    calculatedGrade += (score / max) * 100 * (weight / 100);
  }

  if (Math.abs(weightTotal - 100) > 0.01) {
    message.textContent = `Assessment weights must total exactly 100%. Current total: ${weightTotal.toFixed(2)}%.`;
    categories.forEach((category) => markInvalid(category.weight));
    return;
  }

  document.querySelector("#final-grade").textContent = `${calculatedGrade.toFixed(2)}%`;
  document.querySelector("#grade-remark").textContent = getRemark(calculatedGrade);
  resultPanel.hidden = false;
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    message.textContent = "";
    resultPanel.hidden = true;
  }, 0);
});
