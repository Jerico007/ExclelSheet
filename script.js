const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

const fontFamily = document.getElementById("font-family");
const fontSize = document.getElementById("font-size");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const alignLeft = document.getElementById("align-left");
const alignCenter = document.getElementById("align-center");
const alignRight = document.getElementById("align-right");
const fontColor = document.getElementById("fontColor");
const cellColor = document.getElementById("cellColor");
//For adding Alphabats till Z
let column = 26;

//For adding Number in rows
let rows = 100;

//Keep track of current cell
let currentCell = "";

//For cell highlighting
let prevColId = "";
let prevRowId = "";

//To show selected cells highlight;
function showHighlight(e) {
  currentCell = e.target;
  checkForCellEdits();
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

//Function to make changes in font buttons
function makeButtonChanges(fontType, btnType, fontValue) {
  if (currentCell.style[fontType] === fontValue) {
    btnType.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  } else {
    btnType.style.backgroundColor = "rgb(215, 215, 215)";
  }
}

//Checking for cell which has been edited
function checkForCellEdits() {
  //Checking for font weight
  makeButtonChanges("fontWeight", boldButton, "bold");
  //Checking for font style
  makeButtonChanges("fontStyle", italicButton, "italic");
  //Checking for font text-decoration
  makeButtonChanges("textDecoration", underlineButton, "underline");
  //Checking for font text-align-left
  makeButtonChanges("textAlign", alignLeft, "left");
  //Checking for font text-align-center
  makeButtonChanges("textAlign", alignCenter, "center");
  //Checking for font text-align-right
  makeButtonChanges("textAlign", alignRight, "right");
}

//bold button event function
boldButton.addEventListener("click", (e) => {
  if (currentCell.style.fontWeight === "bold") {
    currentCell.style.fontWeight = "normal";
    e.target.style.backgroundColor = "rgb(215, 215, 215)";
  } else {
    currentCell.style.fontWeight = "bold";
    e.target.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
});

//Italic button event function
italicButton.addEventListener("click", (e) => {
  if (currentCell.style.fontStyle === "italic") {
    currentCell.style.fontStyle = "normal";
    e.target.style.backgroundColor = "rgb(215, 215, 215)";
  } else {
    currentCell.style.fontStyle = "italic";
    e.target.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
});

//Underline button event function
underlineButton.addEventListener("click", (e) => {
  if (currentCell.style.textDecoration === "underline") {
    currentCell.style.textDecoration = "none";
    e.target.style.backgroundColor = "rgb(215, 215, 215)";
  } else {
    currentCell.style.textDecoration = "underline";
    e.target.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
});

//Font-style button event function
fontFamily.addEventListener("change", (e) => {
  currentCell.style.fontFamily = fontFamily.value;
  console.log(currentCell.style.fontFamily);
});

//Font-size button event funtion
fontSize.addEventListener("change", (e) => {
  currentCell.style.fontSize = e.target.value;
});

//Funtion to align text
let prevBtn = "";
function alignType(alignTo, btn) {
  if (prevBtn !== "") {
    prevBtn.style.backgroundColor = "rgb(215, 215, 215)";
  }
  prevBtn = btn;
  currentCell.style.textAlign = alignTo;
  btn.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
}

//Align-left button event function
alignLeft.addEventListener("click", (e) => {
  alignType("left", e.target);
});

//Align-center button event function
alignCenter.addEventListener("click", (e) => {
  alignType("center", e.target);
});

//Align-right button event function
alignRight.addEventListener("click", (e) => {
  alignType("right", e.target);
});


//Font-color button event function
fontColor.addEventListener("input", (e)=>{
    currentCell.style.color = e.target.value;
});

//Cell-color button event function
cellColor.addEventListener("input", (e)=>{
    console.log(e.target.value);
    currentCell.style.backgroundColor = e.target.value;

})