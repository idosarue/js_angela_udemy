
var drumButtons = document.querySelectorAll(".drum");

// detect which button was pressed
for(var i = 0 ; i<drumButtons.length ; i++){
  drumButtons[i].addEventListener("click", function () { 
    let buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML)

  });
    
}


// Detect keyboard press
document.addEventListener('keydown', function (event){
  makeSound(event.key);
  buttonAnimation(event.key)
  
});

// Play sound
function makeSound(key) {
  switch (key) {
    case "w":
      new Audio("sounds/tom-1.mp3").play();
      break;
    case "a":
      new Audio("sounds/tom-2.mp3").play();
    
    // if none of the cases happens
    default: console.log(key);
      break;
  }
};


function buttonAnimation(currentKey){
  let activeButton = document.querySelector(`.${currentKey}`)
  activeButton.classList.add("pressed");
  setTimeout(function(){activeButton.classList.remove("pressed");},100)


};