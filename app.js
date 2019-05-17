/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. You'll need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

var currentEmployeeImg = '';
var currentEmployeeName = '';
var employees = [];
var styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px} h2 {text-align:center !important;}.button-holder > button {display: inline-block;margin: 10px;font-weight: 400;color: #212529;border-color: #343a40 !important;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-color: transparent;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;} button:hover {color: #fff !important;background-color: #343a40;border-color: #343a40;}</style>';
var buttons = '<div class="button-holder"><button></button><button></button><button></button><button></button></div>'

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

function answersGenerator() {
  // Choose an employee, get their data, and remove them from the employees array
  chosenNumber = Math.floor(Math.random() * employees.length);
  chosenEmployee = employees[chosenNumber];
  correctName = chosenEmployee.name;
  correctImg = chosenEmployee.img;
  employees.splice(chosenNumber, 1);
  // Copy employees array and generate wrong answers
  employeesCopy = [...employees];
  wrongAnswers = [];
  for (i=0; i<=2; i++) {
    wrongAnswerEmployeeId = Math.floor(Math.random() * employeesCopy.length);
    wrongAnswers[i] = employeesCopy[wrongAnswerEmployeeId];
    wrongAnswerName1 = wrongAnswers[i].name;
    wrongAnswerImg1 = wrongAnswers[i].img;
    employeesCopy.splice(wrongAnswerEmployeeId, 1);
  }
  // remove chosen employee and add other employees without removing them from original employees array
  // chosing other employees will require removing 'other chosen' from duplicated array
}

function randomEmployeeImg() {
  return employees[Math.floor(Math.random() * employees.length)].img;
}

function renderImg(imgSrc) {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<img src="${imgSrc}">`;
}

function renderButtons() {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML += buttons;
  $('.button-holder > button')[0].innerHTML = 'text'
  $('.button-holder > button')[1].innerHTML = 'text'
  $('.button-holder > button')[2].innerHTML = 'text'
  $('.button-holder > button')[3].innerHTML = 'text'
}

/** ************************ RUN QUIZ ********************************* **/

removeEmployees();
currentEmployeeImg = randomEmployeeImg();
renderImg(currentEmployeeImg);
renderButtons();

// Next Steps:
// Select a winner and 3 other names to fill the buttons
// Add 1 / NumOfEmployees in UI
// Percent and ration correct in UI
