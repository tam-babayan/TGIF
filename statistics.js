
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



// count least Engaged
function leastEngaged(item) {
    var leastEngaged = [];
        for (var i = 0; i < item[0].members.length; i++) {
            leastEngaged.push(item[0].members[i].missed_votes)
        }
    leastEngaged.sort(function(a, b){return b - a}) 
    var x = Math.round(leastEngaged.length * 10 /100)
    for (var j = 1; j < leastEngaged.length; j++) {
        if (leastEngaged[x] == leastEngaged[x+j]) {
            x += j;
        }
    }
    return leastEngaged.slice(0, x);     
} 


// count most Engaged
function mostEngaged(item) {
    var mostEngaged = [];
        for (var i = 0; i < item[0].members.length; i++) {
            mostEngaged.push(item[0].members[i].missed_votes)
        }
    mostEngaged.sort(function(a, b){return a - b}) 
    var x = Math.round(mostEngaged.length * 10 /100)
    for (var j = 1; j < mostEngaged.length; j++) {
        if (mostEngaged[x] == mostEngaged[x+j]) {
            x += j;
        }
    }
    return mostEngaged.slice(0, x);     
} 



// count least Loyal
function leastLoyal(item) {
    var leastLoyal = [];
        for (var i = 0; i < item[0].members.length; i++) {
            leastLoyal.push(item[0].members[i].votes_with_party_pct)
        }
        leastLoyal.sort(function(a, b){return b - a}) 
    var x = Math.round(leastLoyal.length * 10 /100)
    for (var j = 1; j < leastLoyal.length; j++) {
        if (parseFloat(leastLoyal[x]) == parseFloat(leastLoyal[x+j])) {
            x += j;
        }
    }
    return leastLoyal.slice(0, x);     
} 


// count most Loyal
function mostLoyal(item) {
    var mostLoyal = [];
        for (var i = 0; i < item[0].members.length; i++) {
            mostLoyal.push(item[0].members[i].votes_with_party_pct)
        }
        mostLoyal.sort(function(a, b){return a - b}) 
    var x = Math.round(mostLoyal.length * 10 /100)
    for (var j = 1; j < mostLoyal.length; j++) {
        if (parseFloat(mostLoyal[x]) == parseFloat(mostLoyal[x+j])) {
            x += j;
        }
    }
    return mostLoyal.slice(0, x);     
} 



var statistics = 
{
    "Number of Republicants" : countNumber(data.results, "R"),
    "Number of Democrats" : countNumber(data.results, "D"),
    "Number of Independents" : countNumber(data.results, "I"),

    "Republicants voted with party" : countAverage(data.results, "R"),
    "Democrats Voted with party" : countAverage(data.results, "D"),
    "Independents Voted with party" : countAverage(data.results, "I"),

    "least engaged members": leastEngaged(data.results),
    "most engaged members": mostEngaged(data.results),

    "least loyal members": leastLoyal(data.results),
    "most loyal members": mostLoyal(data.results),

}
console.log(JSON.stringify(statistics))