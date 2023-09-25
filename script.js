
let thead = document.getElementById("thead");

let tbody = document.getElementById("tbody");

//For adding Alphabats till Z
let column = 26;


//For adding Number in rows
let rows = 100;

GenrateColumns(true,thead);
//Function to add columns
function GenrateColumns(printAlphabets , tnode){

    for(let i = 0 ; i < 26 ; i++)
    {
        if(printAlphabets)
        {
            let th = document.createElement("th");
            th.innerText = `${String.fromCharCode(65 + i)}`;
            tnode.appendChild(th);
        }
        else{
            let td = document.createElement("td");
            tnode.appendChild(td);
        }
    }
}



//code to add numbers in tbody

for(let i = 0 ; i < rows ;i++)
{
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <th>${i + 1}</th>     
    `
    GenrateColumns(false,tr);

    tbody.appendChild(tr);
}