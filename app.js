/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. You'll need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

var currentEmployeeImg = '';
var currentEmployeeName = '';
var employees = [];
var styles = '<style>.MeetOurEmployees {text-align:center;} .MeetOurEmployees > img {border-radius: 9px; width: 150px}</style>';

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

function randomEmployeeImg() {
  return employees[Math.floor(Math.random() * employees.length)].img;
}

function renderImg(imgSrc) {
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<img src="${imgSrc}">`;
}

/** ************************ RUN QUIZ ********************************* **/

removeEmployees();
currentEmployeeImg = randomEmployeeImg();
renderImg(currentEmployeeImg);

// Next Steps:
// Center Image and add buttons for choosing names