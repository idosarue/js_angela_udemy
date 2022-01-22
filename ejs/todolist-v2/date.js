const date = () => {
    let today = new Date()
    let options = {weekday : 'long', year : 'numeric', month : 'long', day : 'numeric'}
    let currentDay = today.getDay()
    return today.toLocaleDateString("en-US", options)
}

module.exports = date