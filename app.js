/**
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

const styles = `
  <style>
    /****************** ANIMATIONS ******************/

    @-webkit-keyframes fadeInUp {
      0% {
          opacity: 0;
          -webkit-transform: translateY(20px);
      }
      100% {
          opacity: 1;
          -webkit-transform: translateY(0);
      }
    }
    
    @keyframes fadeInUp {
      0% {
          opacity: 0;
          transform: translateY(20px);
      }
      100% {
          opacity: 1;
          transform: translateY(0);
      }
    }
    
    .fadeInUp {
      -webkit-animation-name: fadeInUp;
      animation-name: fadeInUp;
      animation-duration: 1s;
      animation-fill-mode: both;
    }
    .waitOne {
      animation-delay: 0.35s;
    }

    .waitTwo {
      animation-delay: 0.7s;
    }

    .waitThree {
      animation-delay: 1.05s;
    }

    .waitFour {
      animation-delay: 1.40s;
    }

    /******************** STYLES ********************/

    .noHover { pointer-events: none; }
    .MeetOurEmployees { text-align:center; } 
    .MeetOurEmployees > p,h2,h3,h4,label,button,input { text-align:center; font-family: "Luckiest Guy", cursive !important }                  
    .MeetOurEmployees > img { border-radius: 9px; width: 150px } 
    h2 { text-align: center !important; }
    .button-holder > button { display: inline-block; cursor: pointer; margin: 10px; font-weight: 400; color: #212529; border-color: #343a40 !important; text-align: center; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; border: 1px solid transparent; padding: 10px 10px 6px 10px; font-size: 1rem; line-height: 1.5; border-radius: .25rem; transition: color .15s ease-in-out,background-color .15s ease-in-out, border-color .15s ease-in-out,box-shadow .15s ease-in-out; outline: none;} 
    button:hover { color: #fff !important; background-color: #343a40; border-color: #343a40; }
    .correct { background-color: green !important; color: white !important; }
    .false { background-color: red !important; color: white !important; }
  </style>`;
const buttons = `
  <div class="button-holder">
    <button type="button"></button>
    <button type="button"></button>
    <button type="button"></button>
    <button type="button"></button>
  </div>`;
const quizOptions = `
  <div class="form-group">
    <h4 class="fadeInUp waitOne">Please select the department for your quiz:</h4><br>
    <form>
      <p class="fadeInUp waitTwo">
        <label><input type="radio" name="department" value="All" required>&nbsp;&nbsp;All&nbsp;</label>
        <label><input type="radio" name="department" value="Engineering">&nbsp;&nbsp;Engineering&nbsp;</label>
        <label><input type="radio" name="department" value="Human Resources">&nbsp;&nbsp;HR&nbsp;</label>
        <label><input type="radio" name="department" value="Marketing">&nbsp;&nbsp;Marketing&nbsp;</label>
      </p>
      <br>
      <div class="fadeInUp waitThree">
        <label for="formControlRange">Select the length of your quiz:</label>
        <input type="range" class="form-control-range" id="lengthInput" value="5" min="5" max="20" oninput="lengthOutput.value = lengthInput.value">
        <output id="lengthOutput">5</output><br><br>
      </div>
      <div class="button-holder">
        <button type="submit" class="fadeInUp waitFour">Start Quiz</button>
      </div>
    </form>
  </div>`;
const hrEmployees = ['Dwight Morrow', 'Sandy Campbell', 'Diane Hamman', 'Lisa Henshaw', 'John Gay'];
const qaEngineers = ['Keith Hamilton', 'Jeff Weber', 'Jake Sarate', 'Jodi Bethel', 'Justin Clar', 'Jack Tillotson', 
                     'Josh Ludahl', 'Stephen McGuckin', 'Sam Rousculp', 'Kris Sandwick', 'Julie Green', 'Sara Holtz', 
                     'Lauren Posey', 'Scott Brose', 'Tri Pham', 'Darryl Bechtol'];
const devEngineers = ['Denver Bohling', 'Steve Bloedel', 'Vincent Petrone', 'Erhan Ergenekan', 'Tommy Koster', 
                      'Caleb Chenoweth', 'David Sheckler', 'Iryna Grom', 'Tyler Vaslev', 'Michael Morris-Pearce',
                      'Tim Dale', 'Leander Harding'];
const engineeringManagement = ['Jack Beck', 'Mark Bryant', 'Keith Hamilton', 'Schon Brenner', 'Jeremy Sanecki'];
const marketing = ['Pat Pitz', 'Joel Weiler', 'Mark Montague', 'Liz Davalos', 'Matt Sullivan', 'Kim Lysne', 'Andrey Burkovskiy'];
const marketingManagement = ['Karinne Cyphers', 'Sandy Cahill'];
const allMarketing = marketingManagement.concat(marketing);
const engineering = engineeringManagement.concat(devEngineers, qaEngineers);
const allEmployees = [];
const quizEmployees = []; // This var will likely need to be reset for restarting app => change to let and update in initialize quiz
let quizEmployeesCopy; //  Same
let departmentForQuiz; 
let quizLength;
let correctAnswer;
let correctAnswers = 0; // Same
let totalGuesses = 0; // Same

/** *********************** SETUP TASKS ****************************** **/

// Scrape all employees and store them in an array
for (let i=0; i < $('.result').length; i++) {
  allEmployees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
}

// Add Luckiest Guy font
$('title')[0].outerHTML += '<link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">';

const shuffleArray = a => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

shuffleArray(allEmployees);

const initializeQuiz = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = quizOptions;
}

$("form").submit(function(e){
  departmentForQuiz = $("input[name='department']:checked").val();
  quizLength = $("input[type='range']").val();
  storeEmployeesByDepartment();
  setLengthOfQuiz();
  answersGenerator();
  renderScoreAndImg(correctAnswer.img);
  renderButtons();
  e.preventDefault();
});

const storeEmployeesForQuiz = index => quizEmployees.push({name: allEmployees[index].name, img: allEmployees[index].img});

const storeEmployeesByDepartment = _ => {
  for (let i=0; i < allEmployees.length; i++) {
    // Logic to scrape based on department
    if (departmentForQuiz == 'Engineering' && engineering.indexOf(allEmployees[i].name) != -1) {
      storeEmployeesForQuiz(i); 
    } else if (departmentForQuiz == 'Human Resources' && hrEmployees.indexOf(allEmployees[i].name) != -1) {
      storeEmployeesForQuiz(i);
    } else if (departmentForQuiz == 'Marketing' && allMarketing.indexOf(allEmployees[i].name) != -1) {
      storeEmployeesForQuiz(i);
    } else if (departmentForQuiz == 'All') {
      storeEmployeesForQuiz(i);
    }
  }
  quizEmployeesCopy = [...quizEmployees];
}

const setLengthOfQuiz = _ => {
  while (quizEmployees.length > quizLength) {
    quizEmployees.pop();
  }
}

$('#ctl00_divCenter')[0].innerHTML += styles; // Add inline CSS to page
$('.CustomWidget > h2')[0].innerHTML += " Quiz"; // Change title of HTML
$('.CustomWidget > h2')[0].className += "fadeInUp"; // Add animation

/** ********************** HELPER FUNCTIONS *************************** **/

// Remove employees from DOM
const removeEmployees = _ => {
  for (i = $('.result').length - 1; i >= 0; i--) {
    $('.result')[i].remove();
  }
}

const answersGenerator = _ => {
  // Choose an employee, get their data, and remove them from the employees array
  chosenNumber = Math.floor(Math.random() * quizEmployees.length);
  correctAnswer = quizEmployees[chosenNumber];
  quizEmployees.splice(chosenNumber, 1);
  // Copy employees array and generate wrong answers
  employeesTempCopy = [...quizEmployeesCopy];
  wrongAnswers = [];
  for (i=0; i<=2; i++) {
    wrongAnswerEmployeeId = Math.floor(Math.random() * employeesTempCopy.length);
    // Stop correct answer from showing up as a wrong answer
    while (correctAnswer.name == employeesTempCopy[wrongAnswerEmployeeId].name) {
      wrongAnswerEmployeeId = Math.floor(Math.random() * employeesTempCopy.length);
    }
    wrongAnswers[i] = employeesTempCopy[wrongAnswerEmployeeId];
    employeesTempCopy.splice(wrongAnswerEmployeeId, 1);
  }
}

const renderScoreAndImg = imgSrc => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<p>Score: ${correctAnswers}/${totalGuesses + 1}</p>
                                                             <br>
                                                             <img class='fadeInUp waitOne' src="${imgSrc}">`;
}

const renderButtons = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML += buttons;
  wrongAnswers[3] = correctAnswer;
  shuffleArray(wrongAnswers);
  for (let i=0; i<=3; i++) {
    $('.button-holder > button')[i].innerHTML = wrongAnswers[i].name
    $('.button-holder > button')[i].setAttribute("onclick",`guess("${wrongAnswers[i].name}"); `);
  }
  $('.button-holder')[0].className += ' fadeInUp waitTwo';
}

const correctGuess = _ => {
  correctAnswers += 1;
  totalGuesses += 1;
  $('.MeetOurEmployees > p')[0].innerHTML = `Score: ${correctAnswers}/${totalGuesses}`;
  for (let i=0; i<=3; i++) {
    $('.button-holder > button')[i].setAttribute("onclick",``);
    $('.button-holder > button')[i].className += ' noHover';
    if ($('.button-holder > button')[i].innerHTML == correctAnswer.name) {
      $('.button-holder > button')[i].className += ' correct';
    }
  }
}

const falseGuess = guess => {
  totalGuesses += 1;
  $('.MeetOurEmployees > p')[0].innerHTML = `Score: ${correctAnswers}/${totalGuesses}`;
  for (let i=0; i<=3; i++) {
    $('.button-holder > button')[i].setAttribute("onclick",``);
    $('.button-holder > button')[i].className += ' noHover';
    if ($('.button-holder > button')[i].innerHTML == guess) {
      $('.button-holder > button')[i].className += ' false';
    }
  }
}

const guess = name => {
  (name == correctAnswer.name) ? correctGuess() : falseGuess(name);
  var quizDiv = $('.MeetOurEmployees')[0];
  quizDiv.insertAdjacentHTML('beforeend', `
    <div class="button-holder fadeInUp">
      <button id="next" type="button" onclick="runQuiz();">Next</button>
    </div>
  `);
}

var removeNextButton = _ => {
  var element = $('#next')[0];
  element.parentNode.removeChild(element);
}

const nextQuestion = _ => {
  removeNextButton();
  answersGenerator();
  renderScoreAndImg(correctAnswer.img);
  renderButtons();
}

const endQuiz = _ => {
  removeNextButton();
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<h3>You finished the quiz!</h3><br>
                                                             <p>Score: ${correctAnswers}/${totalGuesses}</p><br>                                                        
                                                             <h3>${correctAnswers/totalGuesses * 100}% Correct</h3>`;
}

const runQuiz = _ => (quizEmployees.length > 0) ? nextQuestion() : endQuiz();

/** ************************ RUN QUIZ ********************************* **/

initializeQuiz();

// NEXT STEPS:
// Look for opportunites to remove duplication (like the meet our employees html)
// show percentage correct (custom messages depending on how well you scored)
// look into scraping employee data via automation and store it to feed app
// Add logic to regect if quizLength is greater than length requested
// Having low number of quiz questions is breaking the program (might set a minimum to 5 questions)
// Update the way choices are rendered?
  // Wrong choices should come from all employees?
// Add progress bar
// Update quiz to not include the signed in user
  // Also don't want signed in user to be an answer choice
// Add restart button at end
// Add correct/false animations