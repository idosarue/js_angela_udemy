var numberOfButtons = document.querySelectorAll(".a").length;

for(i = 0 ; i<numberOfButtons ; i++){
    document.querySelectorAll(".a")[i].addEventListener("click", function(){
        alert("aaaa")
    });
}