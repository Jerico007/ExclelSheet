let thead = document.getElementById("thead");

let tbody = document.getElementById("tbody");

let boldButton = document.getElementById("bold");
//For adding Alphabats till Z
let column = 26;

//For adding Number in rows
let rows = 100;

//Keep track of current cell
let currentCell = "";

//For cell highlighting
let prevColId = "";
let prevRowId = "";

function checkForCellEdit() {
  console.log(currentCell);

  if (currentCell.style.fontWeight === "bold") {
    console.log("yes");
    boldButton.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  } else {
    boldButton.style.backgroundColor = "rgb(215, 215, 215)";
  }
}

//To show selected cells;
function showHighlight(e) {
  currentCell = e.target;
  checkForCellEdit();
  if (prevColId !== "" && prevRowId !== "") {
    document.getElementById(prevColId).style.backgroundColor = "white";
    document.getElementById(prevRowId).style.backgroundColor = "white";
  }
  let id = e.target.id;
  document.getElementById("selected-cell").value = id;
  let columnId = id[0];
  prevColId = columnId;
  let rowId = id.substring(1);
  prevRowId = rowId;
  document.getElementById(columnId).style.backgroundColor = "#bbb8b8";
  document.getElementById(rowId).style.backgroundColor = "#bbb8b8";
}

//Function to add columns
function GenrateColumns(printAlphabets, parentNode, rowNo) {
  for (let i = 0; i < 26; i++) {
    if (printAlphabets) {
      let th = document.createElement("th");
      th.setAttribute("id", String.fromCharCode(65 + i));
      th.innerText = `${String.fromCharCode(65 + i)}`;
      parentNode.appendChild(th);
    } else {
      let td = document.createElement("td");
      td.setAttribute("id", `${String.fromCharCode(65 + i)}${rowNo}`);
      td.setAttribute("contentEditable", true);
      td.addEventListener("focus", showHighlight);
      parentNode.appendChild(td);
    }
  }
}

//Generating header columns
GenrateColumns(true, thead);

//code to add row numbers and columns in tbody
for (let i = 0; i < rows; i++) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
        <th id=${i + 1}>${i + 1}</th>     
    `;
  GenrateColumns(false, tr, i + 1);

  tbody.appendChild(tr);
}

boldButton.addEventListener("click", (e) => {
  if (currentCell.style.fontWeight === "bold") {
    currentCell.style.fontWeight = "normal";
    e.target.style.backgroundColor = "rgb(215, 215, 215)";
  } else {
    currentCell.style.fontWeight = "bold";
    e.target.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
});
