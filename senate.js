(function manin() {
    render('https://api.propublica.org/congress/v1/113/senate/members.json')
    buildTable(data)
    activateEventListeners()
})()