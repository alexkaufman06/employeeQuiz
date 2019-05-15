/* Visit this URL and run the code in the console: http://intranet.dat.com/meet-our-employees */

// Store employees in array
var employees = [];
for (i=0; i < $('.result').length; i++) {
  employees.push({name: $('.result > span')[i].innerHTML, img: $('.result > a> img')[i].src});
}

// Remove employees from DOM
for (i = $('.result').length - 1; i >= 0; i--) {
  $('.result')[i].remove();
}

// Make changes to DOM and add interactive features
$('.CustomWidget > h2')[0].innerHTML += " Quiz";
$('.MeetOurEmployees > .MeetOurEmployees')[0].innerHTML = "<img src='" + employees[Math.floor(Math.random() * employees.length)].img + "'>";