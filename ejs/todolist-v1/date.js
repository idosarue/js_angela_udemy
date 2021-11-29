

module.exports.getDate = () => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date()
    return today.toLocaleDateString("en-US", options)
}

module.exports.getDay = () =>  {
    let today = new Date()
    return today.toLocaleDateString("en-US", {weekday : 'long'})
}
