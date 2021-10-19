var checkOne = Number.isInteger(year / 4);
var checkTwo = Number.isInteger(year / 100);
var checkthree = Number.isInteger(year / 400);

function isLeap(year){
    if (checkOne && checkTwo && checkthree){
        return true
    }
    return false
}
