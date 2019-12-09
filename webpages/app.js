'use strict';

let selected = null;

function idGen(idLen) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "" ;

  for (let i = 0; i < idLen; i++) {
    id+= letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return id;
}

function insertAfter(newEle, target) {
  target.parentElement.insertBefore(newEle, target.nextElementSibling);
}

function createP() {
  const newP = document.createElement("p");
  newP.setAttribute("class", "oText");
  newP.setAttribute("contenteditable", "true");
  newP.setAttribute("draggable", "true");
  newP.setAttribute("id", idGen(16));

  newP.textContent = "i exist now";

  newP.addEventListener("focus", focusPara);
  newP.addEventListener("blur", blurPara);
  return newP;
}


function webTitle(e) {
  document.querySelector("#web-title").textContent = "OE - " + e.target.textContent.trim();
}

function focusPara(e) {
  e.target.classList.add("selected");
  selected = e.target;
}
function blurPara(e) {
  e.target.classList.remove("selected");
}

function moveUp() {
  if (!selected) { return 0;}
  
  let eleToMove = [selected];
  let prevEle = selected.previousElementSibling;

  if (document.querySelector("#child-"+selected.id)) {
    eleToMove.push(document.querySelector("#child-" + selected.id));
  }
  console.log(eleToMove);

  if (!prevEle) {
    console.log("can't move up");
  }else {
    if (prevEle.tagName === "DIV") {
      prevEle = prevEle.previousElementSibling;
    }
    
    eleToMove.forEach(ele => ele.parentNode.insertBefore(ele, prevEle));
  }
  
  selected.focus();
}

function moveDown() {
  if (!selected) {return 0;}
  
  let eleToMove = [selected];
  let nextEle = selected.nextElementSibling;
  let sendTo = selected.nextElementSibling;
  let hasChild = false;
  
  if (document.querySelector("#child-" + selected.id)) {
    eleToMove.unshift(document.querySelector("#child-" + selected.id));
  }
  
  if (sendTo !== null) {
    if (sendTo.tagName === "DIV") {
      sendTo = sendTo.nextElementSibling;
    }
    if (sendTo && sendTo.nextElementSibling && sendTo.nextElementSibling.tagName === "DIV") {

          sendTo = sendTo.nextElementSibling;
        }
  }
  
  
  if (!sendTo) {
    console.log("can not move down");
  }else {
    eleToMove.forEach((ele) => insertAfter(ele, sendTo))
  }
  
  selected.focus();
}

function newLine() {
  const newP = createP();
  document.querySelector("#outlineOText").appendChild(newP);
  newP.focus();
}

function newIndentedLine() {
  if (!selected) {return 0;}

  if (selected.parentNode.getAttribute("data-indent") == 9) {
    window.alert("Cannot have a higher level of indentation");
    return 0;
  }

  const divId = String("#child-" + selected.id);
  let divSelector = document.querySelector(divId);

  const divLoc = 0;
  let newDiv = null;

  const indentLevel = Number(selected.getAttribute("data-indent")) + 1;

  if (divSelector == null) {
    console.log("null moment");
    newDiv = document.createElement("div");
    newDiv.setAttribute("id","child-"+selected.id);
    newDiv.setAttribute("data-indent",Number(selected.parentNode.getAttribute("data-indent"))+1);
    newDiv.setAttribute("class","indent");

    if(selected.nextElementSibling === null){
      selected.parentElement.appendChild(newDiv)
    }else{
      insertAfter(newDiv, selected);
    }

    divSelector = newDiv;
  }else{
    console.log("WHAT IN THE FUCK");
  }

  const newP = createP(indentLevel);
  divSelector.appendChild(newP);

  newP.focus();
}

function newSib() {
  if(!selected){return 0;}
  const newP = createP();


  if(selected.nextElementSibling && selected.nextElementSibling.tagName === "DIV"){
    insertAfter(newP, selected.nextElementSibling);
  }else{
    insertAfter(newP, selected);
  }
  newP.focus();
}

function deleteIndividual() {
  if(!selected){return 0;}
  
  const toDel = selected;
  
  if (selected.previousElementSibling) {
    selected.previousElementSibling.focus();
  }
  toDel.remove();
}

function indentLeft() {

}

function indentRight() {
  
}

function dragStartFun(e) {
  const dragged = e.target;
}




//drop function



//MDN local storage
// Event Listeners
document.querySelector("#page-title").addEventListener("keyup", webTitle);
document.querySelector("#nli").addEventListener("click", newLine);
document.querySelector("#child").addEventListener("click", newIndentedLine);
document.querySelector("#sibling").addEventListener("click", newSib);
document.querySelector("#up").addEventListener("click", moveUp);
document.querySelector("#down").addEventListener("click", moveDown);
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("focus", focusPara));
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("blur", blurPara));
//create a event listener that saves to local starage every 5 seconds

//add event listeners for all the drag stuff (prevent default drag over and drag end)
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("dragover",(e) => e.preventDefault()));
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("dragend",(e) => e.preventDefault()));
// document.querySelectorAll(".oText").forEach((e) => e.addEventListener("dragstart", dragStartFun));





document.querySelector("#outline").addEventListener("keypress", function(e){
  if(e.which === 13){e.preventDefault(); newSib();}
});
document.querySelector("#outline").addEventListener("keydown", function(e){
  console.log(e.which);
  if (e.ctrlKey && e.which === 38) {moveUp()}
  if(e.ctrlKey && e.which === 40) {moveDown()}
  if (e.ctrlKey && e.which === 13) {newIndentedLine()}
  if (e.altKey && e.which === 13) {newLine()}
  if (selected.textContent === "" && e.which === 8) {deleteIndividual()}
})
