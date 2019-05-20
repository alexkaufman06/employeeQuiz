/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. You'll need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

var employees = [];
var correctAnswers = 0;
var totalGuesses = 0;
var styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px} h2 {text-align:center !important;}.button-holder > button {display: inline-block;cursor: pointer;margin: 10px;font-weight: 400;color: #212529;border-color: #343a40 !important;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;} button:hover {color: #fff !important;background-color: #343a40;border-color: #343a40;}</style>';
var buttons = '<div class="button-holder"><button type="button"></button><button type="button"></button><button type="button"></button><button type="button"></button></div>'

/** *********************** SETUP TASKS ****************************** **/

// Scrape employees and store them in array
for (i=0; i < $('.result').length; i++) {
  employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
}

// Add inline CSS to page
$('#ctl00_divCenter')[0].innerHTML += styles;

// Change title
$('.CustomWidget > h2')[0].innerHTML += " Quiz";

/** ********************** HELPER FUNCTIONS *************************** **/

// Remove employees from DOM
function removeEmployees() {
  for (i = $('.result').length - 1; i >= 0; i--) {
    $('.result')[i].remove();
  }
}

// Choose an employee, get their data, and remove them from the employees array
function correctAnswerGenerator() {
  chosenNumber = Math.floor(Math.random() * employees.length);
  correctAnswer = employees[chosenNumber];
  employees.splice(chosenNumber, 1);
}

// Copy employees array and generate wrong answers
function falseAnswersGenerator() {
  employeesCopy = [...employees];
  wrongAnswers = [];
  for (i=0; i<=2; i++) {
    wrongAnswerEmployeeId = Math.floor(Math.random() * employeesCopy.length);
    wrongAnswers[i] = employeesCopy[wrongAnswerEmployeeId];
    employeesCopy.splice(wrongAnswerEmployeeId, 1);
  }
}

function answersGenerator() {
  correctAnswerGenerator();
  falseAnswersGenerator();
}

function renderScoreAndImg(imgSrc) {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<p>${correctAnswers}/${totalGuesses}</p><br><img src="${imgSrc}">`;
}

// Shuffle answer choices so they appear in random order
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderButtons() {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML += buttons;
  wrongAnswers[3] = correctAnswer;
  shuffle(wrongAnswers);
  for (i=0; i<=3; i++) {
    $('.button-holder > button')[i].innerHTML = wrongAnswers[i].name
    $('.button-holder > button')[i].setAttribute("onclick",`guess("${wrongAnswers[i].name}");`);
  }
}

function guess(name) {
  if (name == correctAnswer.name) {
    alert("Correct!");
    correctAnswers += 1;
    totalGuesses += 1;
  } else {
    alert("False");
    totalGuesses += 1;
  }
  removeEmployees();
  answersGenerator();
  renderScoreAndImg(correctAnswer.img);
  renderButtons();
}

/** ************************ RUN QUIZ ********************************* **/

removeEmployees();
answersGenerator();
renderScoreAndImg(correctAnswer.img);
renderButtons();
