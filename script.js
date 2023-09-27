const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");

const copy = document.getElementById("copy");
const cut = document.getElementById("cut");
const paste = document.getElementById("paste");
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
const save = document.getElementById("save");
const upload = document.getElementById("upload");

//Copy paste object
const copy_past_obj = {
  text: "",
  Style: "",
  btnId: "",
};

//For adding Alphabats till Z
let column = 26;

//For adding Number in rows
let rows = 100;

//Creating virtual storage
let virtualStorage = [];
for(let i = 0 ; i < rows ; i++)
{
  let arr = [];
  for(let j = 0 ; j < column ; j++)
  {
    arr.push({});
  }
  virtualStorage.push(arr);
}



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
  currentCell.addEventListener("input",(e)=>{
    updateStorage();
  })
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

//Checking for cell which has been edited
function checkForCellEdits() {
  //Checking for font weight
  makeButtonChanges("fontWeight", boldButton, "bold");
  //Checking for font style
  makeButtonChanges("fontStyle", italicButton, "italic");
  //Checking for font text-decoration
  makeButtonChanges("textDecoration", underlineButton, "underline");

  //Checking for font size
  makeFontFamily_SizeBtnChanges("fontSize", fontSize);

  //Checking for font family
  makeFontFamily_SizeBtnChanges("fontFamily", fontFamily);

  //Checking for font text-align-left
  makeTextAlignBtnChanges("textAlign", alignLeft, "left");
  //Checking for font text-align-center
  makeTextAlignBtnChanges("textAlign", alignCenter, "center");
  //Checking for font text-align-right
  makeTextAlignBtnChanges("textAlign", alignRight, "right");
}

//Function to make changes in font buttons
function makeButtonChanges(fontType, btnType, fontValue) {
  if (currentCell.style[fontType] === fontValue) {
    btnType.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  } else {
    btnType.style.backgroundColor = "rgb(215, 215, 215)";
  }
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
  updateStorage();
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
  updateStorage();
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
  updateStorage();
});

//Funtion to make changes in drop down buttons
function makeFontFamily_SizeBtnChanges(fontType, buttonType) {
  if (currentCell.style[fontType] == "" && fontType === "fontSize") {
    buttonType.value = "14px";
  } else if (currentCell.style[fontType] == "" && fontType === "fontFamily") {
    buttonType.value = "Rubik";
  } else {
    buttonType.value = currentCell.style[fontType];
  }
}

//Font-style button event function
fontFamily.addEventListener("change", (e) => {
  currentCell.style.fontFamily = e.target.value;
  updateStorage();
  // console.log(currentCell.style.fontFamily);
});

//Font-size button event funtion
fontSize.addEventListener("change", (e) => {
  currentCell.style.fontSize = e.target.value;
  updateStorage();
});

//Function to make changes in text align buttons
function makeTextAlignBtnChanges(fontType, btnType, fontValue) {
  if (currentCell.style[fontType] === fontValue) {
    alignLeft.style.backgroundColor = "rgb(215, 215, 215)";
    alignCenter.style.backgroundColor = "rgb(215, 215, 215)";
    alignRight.style.backgroundColor = "rgb(215, 215, 215)";
    btnType.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
  if (currentCell.style[fontType] === "") {
    alignLeft.style.backgroundColor = "rgb(215, 215, 215)";
    alignCenter.style.backgroundColor = "rgb(215, 215, 215)";
    alignRight.style.backgroundColor = "rgb(215, 215, 215)";
    alignLeft.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  }
}
//Function to alignButtons
function alignType(btnType, alignto) {
  currentCell.style.textAlign = alignto;
  alignLeft.style.backgroundColor = "rgb(215, 215, 215)";
  alignCenter.style.backgroundColor = "rgb(215, 215, 215)";
  alignRight.style.backgroundColor = "rgb(215, 215, 215)";
  btnType.style.backgroundColor = "rgba(128, 128, 128, 0.34)";
  updateStorage();
}

//Align-left button event function
alignLeft.addEventListener("click", (e) => {
  alignType(e.target, "left");
});

//Align-center button event function
alignCenter.addEventListener("click", (e) => {
  alignType(e.target, "center");
});

//Align-right button event function
alignRight.addEventListener("click", (e) => {
  alignType(e.target, "right");
});

//Font-color button event function
fontColor.addEventListener("input", (e) => {
  currentCell.style.color = e.target.value;
  updateStorage();
});

//Cell-color button event function
cellColor.addEventListener("input", (e) => {
  currentCell.style.backgroundColor = e.target.value;
  updateStorage();
});



//Function to copy cut
function copyCut(btnId) {
  if (currentCell.innerText !== "" && btnId === "cut") {
    copy_past_obj.text = currentCell.innerText;
    currentCell.innerText = "";
    copy_past_obj.Style = currentCell.style.cssText;
    currentCell.style.cssText = "";
    copy_past_obj.btnId = btnId;
    updateStorage();
  }

  if (currentCell.innerText !== "" && btnId === "copy") {
    copy_past_obj.text = currentCell.innerText;
    copy_past_obj.Style = currentCell.style.cssText;
    copy_past_obj.btnId = btnId;
  }
}
//copy button event function
copy.addEventListener("click", (e) => {
  copyCut(e.target.id);
});

//cut button evnet function
cut.addEventListener("click", (e) => {
  copyCut(e.target.id);
});

// Function to paste
function Paste() {
  // In case of cut
  if (copy_past_obj.btnId === "cut" && copy_past_obj.text !== "") {
    currentCell.innerText = copy_past_obj.text;
    currentCell.style.cssText = copy_past_obj.Style;
    //Flush the object
    copy_past_obj.text = "";
    copy_past_obj.Style = "";
    copy_past_obj.btnId = "";
  }
 //In case of copy
  if (copy_past_obj.btnId === "copy" && copy_past_obj.text !== "") {
    currentCell.innerText = copy_past_obj.text;
    currentCell.style.cssText = copy_past_obj.Style;
  }
  updateStorage();
}

//paste button event function
paste.addEventListener("click", (e) => {
  Paste();
});


//Function to update virtual storage
function updateStorage() {
  let cellId = currentCell.id;
  let columnNum = cellId.charCodeAt(cellId[0])-65;
  let rowNum =  cellId.substring(1)-1;
  virtualStorage[rowNum][columnNum].id= cellId;
  virtualStorage[rowNum][columnNum]["text"]= currentCell.innerText;
  virtualStorage[rowNum][columnNum]["Style"] = currentCell.style.cssText;
  // console.log(virtualStorage[rowNum][columnNum]);
}

//save btn event function
save.addEventListener("click",(e)=>{
   let matrixString = JSON.stringify(virtualStorage);
   
   //Used for converting into file format
   let blob = new Blob([matrixString],{type:"application/json"});

   //Creating link 
   let link = document.createElement("a");
   link.href=URL.createObjectURL(blob);
   //Adding download property to link
   link.download = "sheet.json";
   //Clicking the link
   link.click();
})

//Function to update VirtualStorage
function uploadMatrix(e)
{
   let file = e.target.files[0];

   //Creating file reader
   let reader = new FileReader();
   reader.readAsText(file);

   reader.onload = function (event) {
       let matrix = JSON.parse(event.target.result);
      virtualStorage = matrix;
      console.log(matrix);
      for(let i = 0 ; i < matrix.length ; i++)
      {
        for(let j = 0 ; j < matrix[i].length ; j++)
        {
          let cellObj = matrix[i][j];
          if(cellObj.hasOwnProperty("id"))
          {
           
            let cell = document.getElementById(cellObj.id);
            console.log(cell);
            cell.innerText = cellObj.text;
            cell.style.cssText = cellObj.Style;
          }
        }
      }
   }
}

//upload btn event function
upload.addEventListener("change",uploadMatrix);