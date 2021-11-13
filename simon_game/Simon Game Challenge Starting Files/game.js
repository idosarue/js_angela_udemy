let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let started = false;


$(".btn").click(function(e){
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);

});

function playSound (name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

function animatePress(currentColour){
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function(){
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
};

$(document).keypress(function(e){
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});


function nextSequence() {
    let randomNUmber = Math.floor(Math.random() * 4) ;
    let randomChosenColour  = buttonColours[randomNUmber];
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    userClickedPattern = [];
}

function checkAnswer(currentLevel) {
    if (gamePattern.length == userClickedPattern.length){
        console.log(userClickedPattern)
        console.log(gamePattern)
        if (userClickedPattern.join() == gamePattern.join()){
            $("#level-title").text("Level " + level);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } else {
            new Audio("sounds/wrong.mp3").play();
            $("body").addClass('game-over')
                setTimeout(function(){
            $("body").removeClass('game-over')
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
            }, 200);
        }
    } 
};

function startOver() {
    started = false;
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
}