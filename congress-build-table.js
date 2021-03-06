function buildTable(data) {
    var myTable = document.querySelector('#tbody')
    var stateValue = document.querySelector('#stateSelect').value

    //mapping the values checked
    var checkboxesCheckedValue = Array.from(document.querySelectorAll('input[name=party]:checked')).map(function (input) {
        return input.value
    })

    //Array witn only the members that accomplish the values inside the filter method
    var filteredMembersArray = data.results[0].members.filter(member => {
        var stateFilterValue = stateValue == "All" || stateValue == member.state
        var partyFilterValue = checkboxesCheckedValue.length == 0 || checkboxesCheckedValue.includes(member.party)
        //If both vars return true, the member is included in this array.
        return stateFilterValue && partyFilterValue
    })

    myTable.innerHTML = ''
    //For every member in the filteredMembers array. Create a row and all cells
    filteredMembersArray.forEach(member => {
        var newRow = document.createElement('tr')
        var middle_name = (member.middle_name) ? member.middle_name + " " : ""
        newRow.insertCell().innerHTML = member.first_name + " " + middle_name + member.last_name
        newRow.insertCell().innerHTML = member.party
        newRow.insertCell().innerHTML = member.state
        newRow.insertCell().innerHTML = member.seniority
        newRow.insertCell().innerHTML = member.votes_with_party_pct + "%"
        myTable.append(newRow);
    })
}

function activateEventListeners(data) {
    document.getElementById('Republican').addEventListener('change', (event) => {buildTable(data)})
    document.getElementById('Democrat').addEventListener('change', (event) => {buildTable(data)})
    document.getElementById('Independent').addEventListener('change', (event) => {buildTable(data)})
    document.getElementById('stateSelect').addEventListener('change', (event) => {buildTable(data)})
}

function render(url) {
    fetch(url, {
        method: "GET",
        headers: new Headers({
            "X-API-Key": "N1JQgCXPBQCq7lYC6bTApOnHARZZ8yEKol1jfSqt"
        })
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(function (data) {
        activateEventListeners(data)
        buildTable(data)
    }).catch(function (error) {
        console.log(error)
    });
}