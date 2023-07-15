/////////////////////// VARS FOR START QUIZ BTN \\\\\\\\\\\\\\\\\\\\\
var startButton = document.querySelector('.startButton');
var questionContainerEl = document.querySelector('.quizBox');
var blurHome = document.querySelector('.homeContent');

/////////////////////// VARS FOR Q's SHUFFLE \\\\\\\\\\\\\\\\\\\\\
// shuffle questions and knowing the number of the question youre on in the array
var shuffledQs, currentQ
var questionEl = document.getElementById('question')
answerButtonsEl = document.getElementById('answer-buttons')

/////////////////////// VARS FOR NEXT BUTTON \\\\\\\\\\\\\\\\\\\\\
var nextButton = document.querySelector('.next-btn');


// declaring that when the startButton is clicked, startQuiz function is called
startButton.addEventListener('click', startQuiz);
function startQuiz() {
  startButton.classList.add('hide');  //HIDE Start Button
  questionContainerEl.classList.remove('hide');
  
  blurHome.classList.add('active');


  shuffledQs = questions.sort(() => Math.random() - 0.5)
  currentQ = 0








  
  // Once Start Quiz is clicked, timer starts
  startTimer()
  var timeEl = document.querySelector(".time");
  function startTimer () {
    secondsLeft = 61;

    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left till Quiz is submited.";
      if(secondsLeft === 1) {
        timeEl.textContent = secondsLeft + " second left till Quiz is submited"
      }
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Clears text
        clearMessage();
      }      
    }, 1000);
  }
  function clearMessage() {
    timeEl.textContent = " ";
  }
  // End of timer \\
   
  seeNextQuestion()
}
// declares that when next button is clicked, we see the next question
nextButton.addEventListener('click', () => {
  currentQ++
  seeNextQuestion()
})


function seeNextQuestion() {
  resetState()
  showQ(shuffledQs[currentQ])
}
function showQ(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if(answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  });
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQs.length > currentQ + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


var questions = [
  {
    question: 'What is the creator of this websites name?',
    answers: [
      {text: 'Joe', correct: false},
      {text: 'Josh', correct: true},
      {text: 'Joshua', correct: true},
      {text: 'Josiah', correct: false},

    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      {text: 'Hyper Type Multi Language', correct: false},
      {text: 'Hyper Text Multiple Language', correct: false},
      {text: 'Hyper Text Markup Language', correct: true},
      {text: 'Home Text Multi Language', correct: false},

    ]
  },
  {
    question: 'True or False: Java and JavaScript are basically the same.',
    answers: [
      {text: 'True', correct: false},
      {text: 'False', correct: true}
    ]
  }
]