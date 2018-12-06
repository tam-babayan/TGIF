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
    return sum / averageArray.length;
}


// least Loyal/Engaged
function least(item, element) {
    var array = [];
        for (var i = 0; i < item.length; i++) {
            array.push(item[i][element])
        }
        array.sort(function(a, b){return a - b}) 
    var x = Math.round(array.length * 10 /100)
    for (var j = 1; j < array.length; j++) {
        if (array[x] == array[x+j]) {
            x += j;
        }
    }
    return array.slice(0, x);     
} 

// most Loyal/Engaged
function most(item, element) {
    var array = [];
        for (var i = 0; i < item.length; i++) {
            array.push(item[i][element])
        }
        array.sort(function(a, b){return a - b}) 
    var x = Math.round(array.length * 10 /100)
    for (var j = 1; j < array.length; j++) {
        if (array[x] == array[x+j]) {
            x += j;
        }
    }
    return array.slice(0, x);     
} 


var statistics = 
{
    "Number of Republicants" : countNumber(data.results, "R"),
    "Number of Democrats" : countNumber(data.results, "D"),
    "Number of Independents" : countNumber(data.results, "I"),

    "Republicants voted with party" : countAverage(data.results, "R"),
    "Democrats Voted with party" : countAverage(data.results, "D"),
    "Independents Voted with party" : countAverage(data.results, "I"),

    "least engaged members": least(data.results[0].members, "missed_votes"),
    "most engaged members": most(data.results[0].members, "missed_votes"),

    "least loyal members": least(data.results[0].members, "votes_with_party_pct"),
    "most loyal members": most(data.results[0].members, "votes_with_party_pct"),

}
console.log(JSON.stringify(statistics))


