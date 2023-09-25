var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "What is the standard distance between the target and archer in Olympics?",
      o: ["50 meters", "70 meters", "100 meters", "120 meters"],
      a: 1, // arrays start with 0, so answer is 70 meters
    },
    {
      q: "Which is the highest number on a standard roulette wheel?",
      o: ["22", "24", "32", "36"],
      a: 3,
    },
    {
      q: "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
      o: ["400 pounds", "550 pounds", "700 pounds", "750 pounds"],
      a: 2,
    },
    {
      q: "Which is the seventh planet from the sun?",
      o: ["Uranus", "Earth", "Pluto", "Mars"],
      a: 0,
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
  ],
  // (A2) HTML ELEMENTS
hWrap: null, // HTML quiz container
hQn: null, // HTML question wrapper
hAns: null, // HTML answers wrapper

// (A3) GAME FLAGS
now: 0, // current question
score: 0, // current score

// (B) INIT QUIZ HTML
init: () => {
  // (B1) WRAPPER
  quiz.hWrap = document.getElementById("quizWrap");

  // (B2) QUESTIONS SECTION
  quiz.hQn = document.createElement("div");
  quiz.hQn.id = "quizQn";
  quiz.hWrap.appendChild(quiz.hQn);

  // (B3) ANSWERS SECTION
  quiz.hAns = document.createElement("div");
  quiz.hAns.id = "quizAns";
  quiz.hWrap.appendChild(quiz.hAns);

  // (B4) GO!
  quiz.draw();
},
select: (option) => {
  // (D1) DETACH ALL ONCLICK
  let all = quiz.hAns.getElementsByTagName("label");
  for (let label of all) {
    label.removeEventListener("click", quiz.select);
  }

  // (D2) CHECK IF CORRECT
  let correct = option.dataset.idx == quiz.data[quiz.now].a;
  if (correct) {
    quiz.score++;
    option.classList.add("correct");
  } else {
    option.classList.add("wrong");
  }

  // (D3) NEXT QUESTION OR END GAME
  quiz.now++;
  setTimeout(() => {
    if (quiz.now < quiz.data.length) {
      quiz.draw();
    } else {
      quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
      quiz.hAns.innerHTML = "";
    }
  }, 1000);
},

// (E) RESTART QUIZ
reset: () => {
  quiz.now = 0;
  quiz.score = 0;
  quiz.draw();
},
};
window.addEventListener("load", quiz.init);