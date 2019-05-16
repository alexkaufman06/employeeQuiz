/**
 * This file uses ES6 Template Literals which aren't compatible with IE11 or less. Need to convert to normal strings for IE11.
 * Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees
 * */

/** ********************* GLOBAL VARIABLES **************************** **/

var currentEmployeeImg = '';
var currentEmployeeName = '';

// Store employees in array
var employees = [];
for (i=0; i < $('.result').length; i++) {
  employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
}

/** ******************** HELPER FUNCTIONS ***************************** **/

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
  $('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = `<img src="${imgSrc}" style="border-radius: 9px; width: 150px">`;
}

/** ************************ RUN QUIZ ********************************* **/

// Make changes to DOM and add interactive features
$('.CustomWidget > h2')[0].innerHTML += " Quiz";
removeEmployees();
currentEmployeeImg = randomEmployeeImg();
renderImg(currentEmployeeImg);

// Next Steps:
// Center Image and add buttons for choosing names