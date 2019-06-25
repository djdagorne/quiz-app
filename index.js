//VARIABLES
var qNum = 0; //keeps track of which question/answer object to render
var userScore = 0; //keeps track of how many questions were correct overall

function startQuiz(event){
  $('main').html(`<p class="start-quiz-blerb">Test your Nintendo knowledge with this 10 question Quiz! Hit the button below to start!</p>
    <button class="start-quiz-button">Start Quiz</button>
    <div class='question-area'></div>`);
    
  $('.startArea').on('click', '.start-quiz-button', function () {    
    $('.start-quiz-blerb').remove();
    $('.start-quiz-button').remove();
    renderQuestion();
  });
}

function renderQuestion () {
  $('.post-question-box').remove();
  $('.question-area').html(generateQuestion(STORE));
  submitAnswer();
}

function submitAnswer(){
  $('form').on('submit', function () {
    event.preventDefault();
    userScoreTracker();
  });
}

function userScoreTracker(){
  var userAnswer = 'input[name=user-choice]:checked';
  if($(userAnswer).val() === STORE[qNum].correctAnswer){
    correctAnswerScreen();
  }else{
    wrongAnswerScreen();
  }
}

function correctAnswerScreen(){
  ++userScore;
  $('main').html(`
  <div class="post-question-box correct-answer">
    <div class="stats">
      <span class="question-${qNum+1}">Question: ${qNum+1}/10</span>
      <span class="userScore">Score: ${userScore}/10</span>
    </div>
    <h2>Correct!</h2>
    <img alt=${STORE[qNum].alt} class="answer-img" src="${STORE[qNum].pic}"></img>
    <p class="display-answer">${STORE[qNum].blurb}</p>
    <button class="next-question-button">${qNum+1 == STORE.length ? 'Results' : 'Next Question' }</button>
  </div>
  <div class='question-area'></div>`);
  $('.post-question-box').on('click', '.next-question-button', function(){      
    if(qNum+1 < STORE.length){
      qNum++;
      renderQuestion();
    }else{
      finalScreen();
    }
  });
}

function wrongAnswerScreen(){
  $('main').html(`
    <div class="post-question-box wrong-answer">
    <div class="stats">
      <span class="question-${qNum+1}">Question: ${qNum+1}/10</span>
      <span class="userScore">Score: ${userScore}/10</span>
    </div>
    <h2>Incorrect!</h2>
    <img alt=${STORE[qNum].alt} class="answer-img" src="${STORE[qNum].pic}"></img>
    <p class="display-answer">The correct answer was: ${STORE[qNum].correctAnswer}... ${STORE[qNum].blurb}</p>
    <button class="next-question-button">Next Question</button>
    </div>
    <div class='question-area'></div>`);  
  $('.post-question-box').on('click', '.next-question-button', function(){
    qNum++; 
    renderQuestion();
  });
}

function generateQuestion(qList){
  return `
  <div class="stats">
    <span class="question-${qNum+1}">Question: ${qNum+1}/10</span>
    <span class="userScore">Score: ${userScore}/10</span>
  </div>
  
  <div class="question-answer-area">
    <h2 class="question-area">${qList[qNum].question}</h2>
    <form class="answer-area">
    <fieldset class="fieldset-answers">
      <label class="container">${qList[qNum].answers[0]}<input type="radio" name="user-choice" value="${qList[qNum].answers[0]}" required><span class="checkmark"></span></label>
      <label class="container">${qList[qNum].answers[1]}<input type="radio" name="user-choice" value="${qList[qNum].answers[1]}" required><span class="checkmark"></span></label>
      <label class="container">${qList[qNum].answers[2]}<input type="radio" name="user-choice" value="${qList[qNum].answers[2]}" required><span class="checkmark"></span></label>
      <label class="container">${qList[qNum].answers[3]}<input type="radio" name="user-choice" value="${qList[qNum].answers[3]}" required><span class="checkmark"></span></label>  
      <button type='submit' class="submit-answer-button">Submit Answer</button>
    </fieldset>
    </form>
  </div>`;
}

function finalScreen(){
  let message;  
  if (userScore>8){
    message = `Congratulations You got ${userScore} points! You clearly know your Nintendo!`;
  }
  else if(userScore<=8 && userScore>=5){
    message = `Congratulations You got ${userScore} points! But you can do better next time!`;
  }
  else{
    message = `Tough break! You got ${userScore}/10, you can do better next time!`;
  }

  renderFeedback(message);
  handleClickRestart();
}

function handleClickRestart() {
  $('.quiz-end-area').on('click', '.restart-quiz-button', function () {
    restartQuiz(); 
  });
}

function renderFeedback(message) {
    $('main').html(generateHTMLFeedback(message));
}

function generateHTMLFeedback(message) {
  return `<H2 class="quiz-end-area">
    <p>${message}</p>
    <button class='restart-quiz-button'>Restart Quiz</button> 
    </H2>`;
}


function restartQuiz(){
  qNum = 0;
  userScore = 0;
  startQuiz();
};

$(startQuiz);