
var drumButtons = document.querySelectorAll(".drum").length;
// var audio = 
var audio = new Audio("sounds/kick-bass.mp3");
var audio = new Audio("sounds/snare.mp3");
var audio = new Audio("sounds/tom-1.mp3");
var audio = new Audio("sounds/tom-2.mp3");
var audio = new Audio("sounds/tom-3.mp3");
var audio = new Audio("sounds/tom-4.mp3");

let crash = document.getElementById("w");

w.addEventListener("keyup", function(event) {
  if (event.keyCode === 87) {
    event.preventDefault();
    document.getElementById("w").click();
  }
});

function playCrash() {
    var audio = new Audio("sounds/crash.mp3");
    audio.play();
  }

  function playTom1() {
    var audio = new Audio("sounds/tom-1.mp3");
    audio.play();
  }

  function playTom2() {
    var audio = new Audio("sounds/tom-2.mp3");
    audio.play();
  }

  function playTom3() {
    var audio = new Audio("sounds/tom-3.mp3");
    audio.play();
  }

  function playTom4() {
    var audio = new Audio("sounds/tom-4.mp3");
    audio.play();
  }

  function playSnare() {
    var audio = new Audio("sounds/snare.mp3");
    audio.play();
  }

  function playKick() {
    var audio = new Audio("sounds/kick-bass.mp3");
    audio.play();
  }


for(var i = 0 ; i<drumButtons ; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function () { 
        // alert("clicked");
     });
    
}


