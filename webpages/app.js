const outline = document.querySelector("#outlineList");
let id = 2;


function createLvl1(e) {
  console.log(e);
  const lvl1 = document.createElement("li");
  lvl1.setAttribute("id",id);
  lvl1.setAttribute("data-level", "1");
  lvl1.setAttribute("class", "text");
  lvl1.textContent = "I exist now";
  outline.appendChild(lvl1);
  id= id+1
  lvl1.addEventListener("click", selectItem);
}


let selected = "anything";
function selectItem(e) {
  selected = e.target;
}



function indentRight() {
  let level = Number(selected.dataset.level)+1;
  selected.dataset.level = level; 
  console.log(selected);
}function indentLeft() {
  let level = Number(selected.dataset.level)-1;
  selected.dataset.level = level;
  console.log(selected);
}

function newChild() {  //add if statement to see if there already is a ul as a child
  arrayEle = selected.parentElement.children
  
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  li.setAttribute("contenteditable","true");
  li.setAttribute("class", "text");
  li.setAttribute("id",id);
  id+=1
  
  console.log(arrayEle);
  

  ul.appendChild(li);
  selected.parentElement.appendChild(ul);
  // console.log(selected.parentElement);
  li.addEventListener("click", selectItem)
}


function newSib() {// create sibling element just under selected when enter is pressed
}






document.querySelector("#lvl1Button").addEventListener("click", createLvl1);

document.querySelector("#indentright").addEventListener("click", indentRight);
document.querySelector("#indentLeft").addEventListener("click", indentLeft);


document.querySelector("#new-child").addEventListener("click", newChild);
// document.querySelector("#test").addEventListener("click", test);



//Attaches Event listener to all text classes
document.querySelectorAll(".text").forEach((e) => e.addEventListener("click", selectItem));

//Stops contenteditable from making new li elements when enter is pressed
document.querySelector("#outlineList").addEventListener("keypress", function(e){
  if(e.which === 13){e.preventDefault()}
});