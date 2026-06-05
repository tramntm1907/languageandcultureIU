const TOTAL_MODULES = 4;

const answers = {
  q1: "b",
  q2: "a",
  q3: "b",
  q4: "b",
  q5: "b"
};

function getCompletedModules() {
  return JSON.parse(localStorage.getItem("completedModules") || "[]");
}

function saveName() {
  const nameInput = document.getElementById("studentName");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  localStorage.setItem("studentName", name);
  document.getElementById("savedName").textContent = `Saved name: ${name}`;
}

function markComplete(moduleName) {
  const completed = getCompletedModules();

  if (!completed.includes(moduleName)) {
    completed.push(moduleName);
  }

  localStorage.setItem("completedModules", JSON.stringify(completed));
  updateDashboard();
}

function updateDashboard() {
  const completed = getCompletedModules();
  const score = Number(localStorage.getItem("bestQuizScore") || 0);
  const percentage = Math.round((completed.length / TOTAL_MODULES) * 100);

  document.getElementById("completedCount").textContent = `${completed.length}/${TOTAL_MODULES}`;
  document.getElementById("bestScore").textContent = `${score}%`;
  document.getElementById("progressFill").style.width = `${percentage}%`;

  if (completed.length === 0) {
    document.getElementById("progressText").textContent = "No modules completed yet.";
  } else {
    document.getElementById("progressText").textContent = `Completed: ${completed.join(", ")}.`;
  }
}

function submitQuiz() {
  const form = document.getElementById("quizForm");
  let score = 0;
  const total = Object.keys(answers).length;
  const missing = [];

  Object.keys(answers).forEach((key, index) => {
    const selected = form.querySelector(`input[name="${key}"]:checked`);
    if (!selected) {
      missing.push(index + 1);
    } else if (selected.value === answers[key]) {
      score++;
    }
  });

  const result = document.getElementById("quizResult");
  result.classList.remove("hidden", "pass", "fail");

  if (missing.length > 0) {
    result.textContent = `Please answer all questions. Missing question(s): ${missing.join(", ")}.`;
    result.classList.add("fail");
    return;
  }

  const percentage = Math.round((score / total) * 100);
  const previousBest = Number(localStorage.getItem("bestQuizScore") || 0);

  if (percentage > previousBest) {
    localStorage.setItem("bestQuizScore", percentage);
  }

  localStorage.setItem("lastQuizScore", percentage);

  if (percentage >= 70) {
    result.innerHTML = `Excellent. You scored ${percentage}%. Your certificate is now unlocked.`;
    result.classList.add("pass");
  } else {
    result.innerHTML = `You scored ${percentage}%. Review the modules and try again.`;
    result.classList.add("fail");
  }

  updateDashboard();
}

function resetQuiz() {
  document.getElementById("quizForm").reset();
  const result = document.getElementById("quizResult");
  result.classList.add("hidden");
}

function generateCertificate() {
  const name = localStorage.getItem("studentName");
  const score = Number(localStorage.getItem("bestQuizScore") || 0);

  if (!name) {
    alert("Please enter and save your name first.");
    return;
  }

  if (score < 70) {
    alert("You need at least 70% on the quiz before generating the certificate.");
    return;
  }

  document.getElementById("certName").textContent = name;
  document.getElementById("certScore").textContent = `Best Quiz Score: ${score}%`;
  document.getElementById("certDate").textContent = `Date: ${new Date().toLocaleDateString()}`;
  document.getElementById("certificateBox").classList.remove("hidden");
}

function resetProgress() {
  if (!confirm("Reset progress and quiz scores?")) return;
  localStorage.removeItem("completedModules");
  localStorage.removeItem("bestQuizScore");
  localStorage.removeItem("lastQuizScore");
  updateDashboard();
  resetQuiz();
}

window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("studentName");

  if (savedName) {
    document.getElementById("studentName").value = savedName;
    document.getElementById("savedName").textContent = `Saved name: ${savedName}`;
  }

  updateDashboard();
});
