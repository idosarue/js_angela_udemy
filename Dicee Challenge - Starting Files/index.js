


function diceRandom(){


    var randomNumber1 =Math.floor((Math.random()*6)+1);
    document.querySelector(".img1").setAttribute("src","images/dice" + randomNumber1 + ".png"); 
    var randomNumber2 =Math.floor((Math.random()*6)+1);
    document.querySelector(".img2").setAttribute("src","images/dice" + randomNumber2 + ".png"); 
    if(randomNumber1 > randomNumber2){
        document.querySelector("h1").innerText = name1 + " wins!";
    }else if (randomNumber2> randomNumber1) {
        document.querySelector("h1").innerText = name2 + " wins!";

    }else {
        document.querySelector("h1").innerText = "it's a draw!";
    }
}



    var name1 =prompt("player 1, what is your name?")
    document.querySelector(".p1").innerText = name1;
    var name2 = prompt("player 2, what is your name?")
    document.querySelector(".p2").innerText = name2;

