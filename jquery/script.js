let h1 = $("h1")
let button = $("button")

// // change style
// h1.css("color", "red");

// // add class
// h1.addClass("big-title");

// // add multiple classes
// h1.addClass("big-title margin-50");

// // check if element has class
// console.log(h1.hasClass("margin-50"));

// // manipulate text
// h1.text("Bye");

// // change text of multiple button elements
// $('button').text('Don\'t click me');

// // innerHTML
// button.html("<em>hey</em>");

// // **********manipulate attributes***********

// // get the values
// $('img').attr("src");

// // set the value
// $('a').attr('href', 'https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12384214#overview')

// // get clasess
// console.log(h1.attr('class'));

// /* adding event listeners */

// // single event listener
// h1.click(function() {
//     h1.css("color", 'purple');
// });

// $('button :nth-child(1)').click(function(){
//     h1.css("color", 'green')
// });

// // multiple event listeners

// button.click(function(){
//     h1.css("color", 'blue');
// });

// // detect key strokes inside input
// $('input').keypress(function(event){
//     console.log(event.key);
// });

// // detect key strokes document

// $(document).keypress(function(event){
//     h1.text(event.key);
// });

// // on

// h1.on('mouseover', function(){
//     h1.css('color', 'pink');
// });

// // adding elements

// // before
// h1.before('<button>New Button</button>')

// // before on click
// h1.on('click', function(){
//     h1.before('<button>New Button</button>')
// });

// // after on click
// h1.on('click', function(){
//     h1.after('<button>New Button after</button>')
// });

// // prepend will add to the element just after the opening tag
// h1.on('click', function(){
//     h1.prepend('<button>New Button after</button>')
// });

// // append will add to the element just after the content
// h1.on('click', function(){
//     h1.append('<button>New Button after</button>')
// });

// // remove elements
// // button.remove()

// // ********* animations ********

// // button.click(function(){
// //     h1.hide()
// // });

// // button.click(function(){
// //     h1.show()
// // });

// // toggle
// // button.click(function(){
// //     h1.toggle()
// // });

// // fade out will reduce the opacity and hide

// // button.click(function(){
// //     h1.fadeOut()
// // });

// // button.click(function(){
// //     h1.fadeIn()
// // });

// // toggle

// // button.click(function(){
// //     h1.fadeToggle()
// // });

// // slide 

// // button.click(function(){
// //     h1.slideUp()
// // });

// // button.click(function(){
// //     h1.slideDown()
// // });


// // button.click(function(){
// //     h1.slideToggle()
// // });


// // custom animations

// // you can only add numeric values
// button.click(function(){
//     h1.animate({opacity: 0.5})
// });

// button.click(function(){
//     h1.animate({opacity:'20%'})
// });

// // chain animations


button.click(function(){
    h1.slideUp().slideDown().animate({opacity:'20%'})
});