var table = document.getElementById("tbody");

function clearTable() {
    table.innerHTML = ""
}

function buildTable(member) {
    var middle_name = (member.middle_name) ? member.middle_name + " " : "";
    var tr = table.insertRow(0);
    // add hyperlinks to senators pages
    var link = document.createElement("a");
    link.innerHTML = member.first_name + " " + middle_name + member.last_name; 
    link.href = member.url;
    link.target = "_blank";
    var td_1 = tr.insertCell(0);
    td_1.appendChild(link);
    var td_2 = tr.insertCell(1);
    td_2.innerHTML = member.party;
    var td_3 = tr.insertCell(2);
    td_3.innerHTML = member.state;
    var td_4 = tr.insertCell(3);
    td_4.innerHTML = member.seniority;
    var td_5 = tr.insertCell(4);
    td_5.innerHTML = member.votes_with_party_pct + "%"; 
}  

for (var j = 0; j < data.results.length; j++) {
    for (var i = 0; i < data.results[0].members.length; i++) {
        buildTable(data.results[0].members[i]);
    }
}    


var filters = document.getElementsByClassName("filter") 
for (k = 0; k < filters.length; k ++) {
    filters[k].onchange = function() {
        clearTable();
        for (var j = 0; j < data.results.length; j++) {
            for (var i = 0; i < data.results[0].members.length; i++) {
                if (filters[3].value == data.results[0].members[i].state || filters[3].value =="All") {
                    if (document.getElementById("Republican").checked && data.results[0].members[i].party == "R" ) {
                        buildTable(data.results[0].members[i]);
                    }
                    else if (document.getElementById("Democrat").checked && data.results[0].members[i].party == "D" ) {
                        buildTable(data.results[0].members[i]);
                    }
                    else if (document.getElementById("Independent").checked && data.results[0].members[i].party == "I" ) {
                        buildTable(data.results[0].members[i]);
                    }                 
                    else if (!document.getElementById("Republican").checked && !document.getElementById("Democrat").checked && !document.getElementById("Independent").checked) {
                        buildTable(data.results[0].members[i]);
                    }
                }
            }   
        }    
    }
}





  