// returns the total number of parties
function countNumber(item, party) {
    var numberArray = [];
    for (var i = 0; i < item[0].members.length; i++) {
        if (item[0].members[i].party == party) {
            numberArray.push(item[0].members[i].first_name + " " + item[0].members[i].last_name)
        }  
    }
    return numberArray.length;
}

// returns average number of votes with parties
function countAverage (item, party) {
    var averageArray = [];
    var sum = 0;
    for (var i = 0; i < item[0].members.length; i++) {
        if (item[0].members[i].party == party) {
            averageArray.push(item[0].members[i].votes_with_party_pct)
        }  
    }
    for (j = 0; j < averageArray.length; j++) {
        sum += averageArray[j];
    } 
    var avg = sum / averageArray.length
    return avg.toFixed(2);
}

function least(item, element1, element2, element3, element4) {
    var arr = [];
    for (var i = 0; i < item.length; i++) {
        arr.push({
            "first": item[i][element1] + " " + item[i][element2],
            "second": item[i][element3],
            "third": item[i][element4]
        });
    }
    arr.sort(function(a, b) {
        // Ascending: first age less than the previous
        return b.second - a.second;
    });
    var x = Math.round(arr.length * 10 /100)
    for (var j = 0; j < (arr.length - x); j++) {
        if (arr[x-1+j] == arr[x-1]) {
            var s = x + j;
        }
    }
    console.log(s)
    return arr.slice(0, s)
}

function most(item, element1, element2, element3, element4) {
    var arr = [];
    for (var i = 0; i < item.length; i++) {
        arr.push({
            "first": item[i][element1] + " " + item[i][element2],
            "second": item[i][element3],
            "third": item[i][element4]
        });
    }
    arr = arr.sort(function(a, b) {
        return  a.second - b.second;
    });
    var x = Math.round(arr.length * 10 /100)
    for (var j = 0; j < (arr.length - x); j++) {
        if (arr[x-1+j] == arr[x-1]) {
            var s = x + j;
        }
    }
    console.log(s)
    return arr.slice(0, s)
}

var statistics = 
{
    "Republicants" : countNumber(data.results, "R"),
    "Democrats" : countNumber(data.results, "D"),
    "Independents" : countNumber(data.results, "I"),

    "Republicants_Voted_With_Party" : countAverage(data.results, "R"),
    "Democrats_Voted_With_Party" : countAverage(data.results, "D"),
    "Independents_Voted_With_Party" : countAverage(data.results, "I"),

    "leastEngaged": least(data.results[0].members, "first_name", "last_name", "missed_votes", "missed_votes_pct"),
    "mostEngaged": most(data.results[0].members, "first_name", "last_name", "missed_votes", "missed_votes_pct"),

    "leastLoyal": least(data.results[0].members, "first_name", "last_name", "total_votes", "votes_with_party_pct"),
    "mostLoyal": most(data.results[0].members, "first_name", "last_name", "total_votes", "votes_with_party_pct"),

}
console.log(JSON.stringify(statistics))

var firstCell = 0;
var secondCell = 1;
var thirdCell = 2;
buildTable1(firstCell, statistics.Republicants, statistics.Republicants_Voted_With_Party);
buildTable1(secondCell, statistics.Democrats, statistics.Democrats_Voted_With_Party);
buildTable1(thirdCell, statistics.Independents, statistics.Independents_Voted_With_Party);


buildTable2('#tbody5', statistics.leastLoyal);
buildTable2('#tbody4', statistics.mostLoyal); 
buildTable2('#tbody2', statistics.leastEngaged);
buildTable2('#tbody3', statistics.mostEngaged);



function buildTable1(index, value1, value2) {
    var myTable = document.querySelector('#tbody1')
    var newRow = document.createElement('tr')
    newRow.insertCell(0).innerHTML = Object.keys(statistics)[index];
    newRow.insertCell(1).innerHTML = value1;
    newRow.insertCell(2).innerHTML = value2 + "%";
    myTable.append(newRow);
}

function buildTable2(body, item) {
    var myTable = document.querySelector(body)
    if (myTable == null) {
        return
    }
    for (var i = 0; i < item.length; i++) {
        var newRow = document.createElement('tr')
        newRow.insertCell(0).innerHTML =  item[i].first;
        newRow.insertCell(1).innerHTML =  item[i].second;
        newRow.insertCell(2).innerHTML = item[i].third + "%";
        myTable.append(newRow);
    }    
}