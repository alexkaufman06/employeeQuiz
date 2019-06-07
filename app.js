/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. You'll need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

let employees = [];
let qaEngineers = ['Keith Hamilton', 'Jeff Weber', 'Jake Sarate', 'Jodi Bethel', 'Justin Clar', 'Jack Tillotson', 'Josh Ludahl', 'Stephen McGuckin', 'Sam Rousculp', 'Kris Sandwick', 'Julie Green', 'Sara Holtz', 'Lauren Posey', 'Scott Brose', 'Tri Pham', 'Darryl Bechtol'];
let devEngineers = ['Denver Bohling', 'Steve Bloedel', 'Vincent Petrone', 'Erhan Ergenekan', 'Tommy Koster', ' Caleb Chenoweth', 'David Sheckler', 'Iryna Grom', 'Tyler Vaslev', 'Michael Morris-Pearce'];
let engineeringManagement = ['Jack Beck', 'Mark Bryant', 'Keith Hamilton', 'Schon Brenner', 'Jeremy Sanecki'];
let engineering = engineeringManagement.concat(devEngineers, qaEngineers);
let departmentForQuiz = '';
let quizLength = 0;
let employeesCopy;
let correctAnswer;
let correctAnswers = 0;
let totalGuesses = 0;
let styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px} h2 {text-align:center !important;}.button-holder > button {display: inline-block;cursor: pointer;margin: 10px;font-weight: 400;color: #212529;border-color: #343a40 !important;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;} button:hover {color: #fff !important;background-color: #343a40;border-color: #343a40;}</style>';
let buttons = '<div class="button-holder"><button type="button"></button><button type="button"></button><button type="button"></button><button type="button"></button></div>';

/** *********************** SETUP TASKS ****************************** **/

// Prompt user for department to be quized on
while (departmentForQuiz.toLowerCase() != 'all' && departmentForQuiz.toLowerCase() != 'engineering') {
  departmentForQuiz = prompt('Which department would you like to be quized on? (All or Engineering?)');
}

// Prompt user on length of quiz
while (quizLength <= 0) {
  quizLength = prompt('How many questions would you like in your quiz?');
}

// Scrape employees, store them in employees array
for (i=0; i < $('.result').length; i++) {
  // Logic to scrape based on department
  if (departmentForQuiz == 'engineering' && engineering.indexOf($('.result > span')[i].innerHTML) != -1) {
    employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src}); 
  } else if (departmentForQuiz == 'all') {
    employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
  }
}

// Limit length of quiz to personalized amount specified above
while (employees.length > quizLength) {
  employees.pop(); // should update this to remove random employee
}

employeesCopy = [...employees]; // Copy employees array
$('#ctl00_divCenter')[0].innerHTML += styles; // Add inline CSS to page
$('.CustomWidget > h2')[0].innerHTML += " Quiz"; // Change title

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
// Look for opportunites to remove duplication (like the meet our employees html)
// show percentage correct
// look into scraping employee data
// Get rid of prompts and provide interface within HTML
// Add logic to regect if quizLength is greater than length requested