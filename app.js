/**
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

const styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px} h2 {text-align:center !important;}.button-holder > button {display: inline-block;cursor: pointer;margin: 10px;font-weight: 400;color: #212529;border-color: #343a40 !important;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;} button:hover {color: #fff !important;background-color: #343a40;border-color: #343a40;}</style>';
const buttons = '<div class="button-holder"><button type="button"></button><button type="button"></button><button type="button"></button><button type="button"></button></div>';
const quizOptions = '<div class="form-group"> <h4>Please select the department for your quiz:</h4><br><form> <p> <label><input type="radio" name="department" value="All" required>&nbsp;&nbsp;All&nbsp;</label> <label><input type="radio" name="department" value="Engineering">&nbsp;&nbsp;Engineering&nbsp;</label> <label><input type="radio" name="department" value="Human Resources">&nbsp;&nbsp;Human Resources&nbsp;</label> </p><br> <label for="formControlRange">Select the length of your quiz:</label> <input type="range" class="form-control-range" id="lengthInput" value="5" min="5" max="20" oninput="lengthOutput.value = lengthInput.value"> <output id="lengthOutput">5</output> <br><br><p><input type="submit" value="Start Quiz"></p></form> </div>';
const hrEmployees = ['Dwight Morrow', 'Sandy Campbell', 'Diane Hamman', 'Lisa Henshaw', 'John Gay'];
const qaEngineers = ['Keith Hamilton', 'Jeff Weber', 'Jake Sarate', 'Jodi Bethel', 'Justin Clar', 'Jack Tillotson', 'Josh Ludahl', 'Stephen McGuckin', 'Sam Rousculp', 'Kris Sandwick', 'Julie Green', 'Sara Holtz', 'Lauren Posey', 'Scott Brose', 'Tri Pham', 'Darryl Bechtol'];
const devEngineers = ['Denver Bohling', 'Steve Bloedel', 'Vincent Petrone', 'Erhan Ergenekan', 'Tommy Koster', ' Caleb Chenoweth', 'David Sheckler', 'Iryna Grom', 'Tyler Vaslev', 'Michael Morris-Pearce'];
const engineeringManagement = ['Jack Beck', 'Mark Bryant', 'Keith Hamilton', 'Schon Brenner', 'Jeremy Sanecki'];
const engineering = engineeringManagement.concat(devEngineers, qaEngineers);
const allEmployees = [];
const quizEmployees = [];
let quizEmployeesCopy;
let departmentForQuiz = '';
let quizLength = 0;
let correctAnswer;
let correctAnswers = 0;
let totalGuesses = 0;

/** *********************** SETUP TASKS ****************************** **/

// Scrape all employees and store them in an array
for (let i=0; i < $('.result').length; i++) {
  allEmployees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
}

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
  runQuiz();
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

const renderScoreAndImg = imgSrc => $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<p>Score: ${correctAnswers}/${totalGuesses}</p><br><img src="${imgSrc}">`;

const renderButtons = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML += buttons;
  wrongAnswers[3] = correctAnswer;
  shuffleArray(wrongAnswers);
  for (let i=0; i<=3; i++) {
    $('.button-holder > button')[i].innerHTML = wrongAnswers[i].name
    $('.button-holder > button')[i].setAttribute("onclick",`guess("${wrongAnswers[i].name}");`);
  }
}

const correctGuess = _ => {
  alert("Correct!");
  correctAnswers += 1;
  totalGuesses += 1;
}

const falseGuess = _ => {
  alert(`False, it was: ${correctAnswer.name}`);
  totalGuesses += 1;
}

const guess = name => {
  (name == correctAnswer.name) ? correctGuess() : falseGuess();
  runQuiz();
}

const nextQuestion = _ => {
  removeEmployees();
  answersGenerator();
  renderScoreAndImg(correctAnswer.img);
  renderButtons();
}

const endQuiz = _ => {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<h3>You finished the quiz!</h3><br><p>Score: ${correctAnswers}/${totalGuesses}</p>`;
}

const runQuiz = _ => (quizEmployees.length > 0) ? nextQuestion() : endQuiz();

/** ************************ RUN QUIZ ********************************* **/

initializeQuiz();
// runQuiz();

// NEXT STEPS:
// Look for opportunites to remove duplication (like the meet our employees html)
// show percentage correct (custom messages depending on how well you scored)
// look into scraping employee data via automation and store it to feed app
// Add logic to regect if quizLength is greater than length requested
// Having low number of quiz questions is breaking the program (might set a minimum to 5 questions)
// Update the way choices are rendered?
  // Wrong choices should come from all employees?