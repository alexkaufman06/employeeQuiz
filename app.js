/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. You'll need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

let employees = [];
let qaEngineers = ['Keith Hamilton', 'Jeff Weber', 'Jake Sarate', 'Jodi Bethel', 'Justin Clar', 'Jack Tillotson', 'Josh Ludahl', 'Stephen McGuckin', 'Sam Rousculp', 'Kris Sandwick', 'Julie Green', 'Sara Holtz', 'Lauren Posey', 'Scott Brose'];
let devEngineers = ['Denver Bohling', 'Steve Bloedel', 'Vincent Petrone', 'Erhan Ergenekan', 'Tommy Koster'];
let engineeringManagement = ['Jack Beck', 'Mark Bryant', 'Keith Hamilton'];
let engineering = engineeringManagement.concat(devEngineers).concat(qaEngineers);
let employeesCopy;
let correctAnswer;
let correctAnswers = 0;
let totalGuesses = 0;
let styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px} h2 {text-align:center !important;}.button-holder > button {display: inline-block;cursor: pointer;margin: 10px;font-weight: 400;color: #212529;border-color: #343a40 !important;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;} button:hover {color: #fff !important;background-color: #343a40;border-color: #343a40;}</style>';
let buttons = '<div class="button-holder"><button type="button"></button><button type="button"></button><button type="button"></button><button type="button"></button></div>';

/** *********************** SETUP TASKS ****************************** **/

// Scrape employees, store them in employees array, and copy that array
for (i=0; i < $('.result').length; i++) {
  // QA Employee only logic commented out for now
  // if (engineering.indexOf($('.result > span')[i].innerHTML) != -1) {
    employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src}); 
  // }
}
employeesCopy = [...employees];

// Add inline CSS to page
$('#ctl00_divCenter')[0].innerHTML += styles;

// Change title
$('.CustomWidget > h2')[0].innerHTML += " Quiz";

/** ********************** HELPER FUNCTIONS *************************** **/

// Remove employees from DOM (Converted to ES6 syntax)
let removeEmployees = _ => {
  for (i = $('.result').length - 1; i >= 0; i--) {
    $('.result')[i].remove();
  }
}

let answersGenerator = _ => {
  // Choose an employee, get their data, and remove them from the employees array
  chosenNumber = Math.floor(Math.random() * employees.length);
  correctAnswer = employees[chosenNumber];
  employees.splice(chosenNumber, 1);
  // Copy employees array and generate wrong answers
  employeesTempCopy = [...employeesCopy];
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

let renderScoreAndImg = imgSrc => $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<p>Score: ${correctAnswers}/${totalGuesses}</p><br><img src="${imgSrc}">`;

// Shuffle answer choices so they appear in random order
let shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let renderButtons = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML += buttons;
  wrongAnswers[3] = correctAnswer;
  shuffle(wrongAnswers);
  for (i=0; i<=3; i++) {
    $('.button-holder > button')[i].innerHTML = wrongAnswers[i].name
    $('.button-holder > button')[i].setAttribute("onclick",`guess("${wrongAnswers[i].name}");`);
  }
}

let correctGuess = _ => {
  alert("Correct!");
  correctAnswers += 1;
  totalGuesses += 1;
}

let falseGuess = _ => {
  alert(`False, it was: ${correctAnswer.name}`);
  totalGuesses += 1;
}

let guess = name => {
  (name == correctAnswer.name) ? correctGuess() : falseGuess();
  runQuiz();
}

let nextQuestion = _ => {
  removeEmployees();
  answersGenerator();
  renderScoreAndImg(correctAnswer.img);
  renderButtons();
}

let endQuiz = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<h3>You finished the quiz!</h3><br><p>Score: ${correctAnswers}/${totalGuesses}</p>`;
}

let runQuiz = _ => (employees.length > 0) ? nextQuestion() : endQuiz();

/** ************************ RUN QUIZ ********************************* **/

runQuiz();

// NEXT STEPS:
// Allow user to set number of questions and restart 
// Look for opportunites to remove duplication (like the meet our employees html)
// show percentage correct
// look into scraping employee data