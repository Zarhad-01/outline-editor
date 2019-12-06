'use strict';

let selected= null;

function idGen(){
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idLen = 16;
  let id = "";
  
  for(let i = 0; i<idLen; i++){
    id+= letters.charAt(Math.floor(Math.random() * letters.length));
  } 
  console.log(id); 
  return id;
}

function insertAfter(newEle, target) {
  target.parentElement.insertBefore(newEle, target.nextElementSibling);
}

function webTitle(e) {
  document.querySelector("#web-title").textContent = "OE - "+ e.target.textContent.trim();
}

function focusPara(e) {
  e.target.style.background = "#000000";
  selected = e.target;
}
function blurPara(e) {
  e.target.style.background = "";
}

function newLine() {
  const newP = document.createElement("p");
  newP.setAttribute("class", "oText");
  newP.setAttribute("contenteditable", "true");
  newP.setAttribute("data-indent", "1");
  newP.setAttribute("id", idGen());

  
  newP.textContent = "i exist now";
  
  document.querySelector("#outline").appendChild(newP);
  newP.addEventListener("focus", focusPara);
  newP.addEventListener("blur", blurPara);
}

function newIndentedLine() {
  
  if (selected.getAttribute("data-indent") == 9) {
    window.alert("Cannot have a higher level of indentation");
    return 0;
  }
  
  const divId = String("#child-"+selected.id)
  let divSelector = document.querySelector(divId);
  
  const divLoc = 0;
  let newDiv = null;
  
  const indentLevel = String(Number(selected.getAttribute("data-indent"))+1);
  
  if(divSelector == null){
    console.log("null moment");
    newDiv = document.createElement("div");
    newDiv.setAttribute("id","child-"+selected.id);
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
  
  const newP = document.createElement("p");
  newP.setAttribute("class", "oText");
  newP.setAttribute("contenteditable", "true");
  newP.setAttribute("data-indent", indentLevel);
  newP.setAttribute("id", idGen());
  newP.textContent = "i exist now as a branch";
  divSelector.appendChild(newP);
  newP.addEventListener("focus", focusPara);
  newP.addEventListener("blur", blurPara);
  newP.focus();
}




// Event Listeners
document.querySelector("#page-title").addEventListener("keyup", webTitle);
document.querySelector("#nli").addEventListener("click", newLine);
document.querySelector("#child").addEventListener("click", newIndentedLine);
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("focus", focusPara));
document.querySelectorAll(".oText").forEach((e) => e.addEventListener("blur", blurPara));

// Stops enter from making a new line will later ad it so it makes a sibling
document.querySelector("#outline").addEventListener("keypress", function(e){
  if(e.which === 13){e.preventDefault()}
});
