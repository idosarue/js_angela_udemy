
// ******************************* Day 2 exercise         ************************* 
console.log('Hello JS!.');

var userName = 'Ido Sarue'
console.log('userName Hello ' + userName + '!');

function capitalize(){
    var country = prompt('From which country are you from?');
    country = country.toLowerCase(); // converts the string to lowercase.
    var city = prompt('Which city do you live in?');
    city = city.toLowerCase();// converts the string to lowercase.
    var address = city.charAt(0).toUpperCase() + city.slice(1) +' ' + country.charAt(0).toUpperCase() + country.slice(1);// converts the first letter of strings to a capital letter 
    console.log('address The address is: ' + address);
}

 capitalize();

var age = prompt('How old are you?');
if (age >= 18){
    console.log('Welcome ' + userName + ', you are ' + age + ', so you are old enough to buy Beer');
  }else{
      console.log('We are sorry, ' + userName + ', you are ' + age + ', and means that you are too young for buying Beer')
  }

var score = 1;
    if (score > 9){
        console.log('excellent!');
    }else if (score >= 7 && score  <= 9 ){
        console.log('good');
    }else{
        console.log('not enough')
    }

    var num1 = prompt('enter a number');
    var num2 = prompt('enter another number');
    
    if (num1 > num2){
       console.log(num1 + ' is bigger!');
    }else if (num2 > num1){
        console.log(num2 + ' is bigger!');
    }else {
        console.log('The numbers are equal!')
    }
// ******************************* Day 2 exercise         ************************* 

