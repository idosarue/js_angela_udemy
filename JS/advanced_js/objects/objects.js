let houseKeeper1 = {
    yearsOfExperience : 12,
    name : "Jane",
    cleaningRepetoire : ["bathroom","lobby", "bedroom"]
};

// object properties can be accessed both with . and []
console.log(houseKeeper1["name"]);
console.log(houseKeeper1.name);

//constructor functions

// the function name has to be capitalized not camel case in order to be a constructor
function BellBoy (name, age, hasWorkPermit, languages){
    this.name = name;
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
}
function HouseKeeper (name, yearsOfExperience, cleaningRepetoire){
    this.name = name;
    this.yearsOfExperience = yearsOfExperience;
    this.cleaningRepetoire = cleaningRepetoire;
}

let houseKeeper2 = new HouseKeeper("Sara", 12, ["bathroom","lobby", "bedroom"])
console.log(houseKeeper2)

// object methods
function BellBoyObj (name, age, hasWorkPermit, languages){
    this.name = name;
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
    this.moveSuitcase = function () {
        alert("may I take Your suitcase")
    }
    this.clean = function () {
        alert("cleaning in proggress")
    }

}

let bellBoy = new BellBoyObj("john", 19, true, "english")
bellBoy.clean()