
let thead = document.getElementById("thead");

let tbody = document.getElementById("tbody");

//For adding Alphabats till Z
let column = 26;


//For adding Number in rows
let rows = 100;

//For cell highlighting
let prevColId = "";
let prevRowId = "";


function showHighlight(e)
{
  if(prevColId !== ""  && prevRowId !== "")
  {
    document.getElementById(prevColId).style.backgroundColor = "white";
    document.getElementById(prevRowId).style.backgroundColor = "white";
  }

  let id = e.target.id;
  let columnId =  id[0];
  prevColId = columnId;
  let rowId = id.substring(1);
  prevRowId = rowId;
  document.getElementById(columnId).style.backgroundColor = "grey";
  document.getElementById(rowId).style.backgroundColor = "grey";
}

//Function to add columns
function GenrateColumns(printAlphabets , parentNode ,rowNo){

    for(let i = 0 ; i < 26 ; i++)
    {
        if(printAlphabets)
        {
            let th = document.createElement("th");
            th.setAttribute("id",String.fromCharCode(65 + i));
            th.innerText = `${String.fromCharCode(65 + i)}`;
            parentNode.appendChild(th);
        }
        else{
            let td = document.createElement("td");
            td.setAttribute("id",`${String.fromCharCode(65 + i)}${rowNo}`);
            td.setAttribute("contentEditable",true);
            td.addEventListener("focus",showHighlight);
            parentNode.appendChild(td);
        }
    }
}




//Generating header columns
GenrateColumns(true,thead);






//code to add row numbers and columns in tbody
for(let i = 0 ; i < rows ;i++)
{
    let tr = document.createElement("tr");
    
    tr.innerHTML = `
        <th id=${i+1}>${i + 1}</th>     
    `
    GenrateColumns(false,tr,i+1);

    tbody.appendChild(tr);
}