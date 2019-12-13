'use strict';

let selected = null;
let dragged = null;
let dragParentEle = null;
let dragEnterEle = null;

function loadTextEvents() {
  // Adding event listeners to do with the Outline Area
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('focus', focusPara));
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('blur', blurPara));
  
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('dragover', (e) => e.preventDefault()));
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('dragend',(e) => e.preventDefault()));
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('dragstart', dragStartFun));
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('drop', dragDrop));
  document.querySelectorAll('.oText').forEach((e) => e.addEventListener('dragenter', dragEnter));
    
  document.querySelector('*').addEventListener('keydown', function(e){
    if (e.ctrlKey && e.which === 83){e.preventDefault(); save()}
  });
  document.querySelector('#outlineArea').addEventListener('keydown', function(e){
    console.log(e.which);
    if (e.ctrlKey && e.which === 38) {moveUp()}
    else if(e.ctrlKey && e.which === 40) {moveDown()}
    else if (e.ctrlKey && e.which === 13) {newIndentedLine()}
    else if (e.altKey && e.which === 13) {newLine()}
    else if (selected.textContent === '' && e.which === 8) {deleteItem()}
    else if(e.altKey && e.which === 187){ expand(document.querySelector('#child-'+selected.id));}
    else if(e.altKey && e.which === 189){ collapse(document.querySelector('#child-'+selected.id));}
    else if (e.ctrlKey && e.which === 66){bold()}
    else if (e.ctrlKey && e.which === 73){italic()}
    else if (e.ctrlKey && e.which === 80){e.preventDefault(); pagePrinter()}
    else if(e.which === 13){e.preventDefault(); newSib();}
    else if (e.ctrlKey && e.which == 37) {indentLeft()}
    else if (e.ctrlKey && e.which == 39) {indentRight()}
    
  })
}

function loadAllEvents() {
  loadTextEvents()
  //Adding all Event Listenersto the top control bar
  document.querySelector('#page-title').addEventListener('keyup', webTitle);
  document.querySelector('#nli').addEventListener('click', newLine);
  document.querySelector('#child').addEventListener('click', newIndentedLine);
  document.querySelector('#sibling').addEventListener('click', newSib);
  document.querySelector('#save').addEventListener('click', save);
  document.querySelector('#print').addEventListener('click', pagePrinter);
  document.querySelector('#help').addEventListener('click', helpWindow);
  document.querySelector('#expand').addEventListener('click', expandAndCollapse);
  document.querySelector('#delete').addEventListener('click', deleteItem); 
  document.querySelector('#bold').addEventListener('click', bold);
  document.querySelector('#italic').addEventListener('click', italic);
  
  document.querySelector('#top-title').addEventListener('keydown', function(e){
    if (e.which === 13){e.preventDefault(); save()}})
  }

function prep() {
  const fileContent = window.localStorage.getItem('user')
  const fileTitle = window.localStorage.getItem('user-title')
  
  //If there is a saved file, then it will load and hide the help section
  if (fileContent) {
    document.querySelector('#outlineArea').innerHTML = fileContent;
    document.querySelector('#page-title').textContent = fileTitle;
    document.querySelector('#help-box').classList.add('hidden');
  }
  loadAllEvents();
}


function idGen(idLen) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '' ;

  for (let i = 0; i < idLen; i++) {
    id+= letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return id;
}

function insertAfter(newEle, target) {
  target.parentElement.insertBefore(newEle, target.nextElementSibling);
}

function createP() {
  const newP = document.createElement('p');
  newP.setAttribute('class', 'oText');
  newP.setAttribute('contenteditable', 'true');
  newP.setAttribute('draggable', 'true');
  newP.setAttribute('id', idGen(16));

  newP.addEventListener('focus', focusPara)
  newP.addEventListener('blur', blurPara)
  newP.addEventListener('dragover', (e) => e.preventDefault())
  newP.addEventListener('dragend',(e) => e.preventDefault())
  newP.addEventListener('dragstart', dragStartFun)
  newP.addEventListener('drop', dragDrop)
  newP.addEventListener('dragenter', dragEnter)

  return newP;
}


function newDiv() {
  const divEle = document.createElement('div');
  divEle.setAttribute('id','child-'+selected.id);
  divEle.setAttribute('data-indent',Number(selected.parentNode.getAttribute('data-indent'))+1);
  divEle.setAttribute('class','indent');

  if(selected.nextElementSibling === null){
    selected.parentElement.appendChild(divEle)
  }else{
    insertAfter(divEle, selected);
  }
  return divEle;
}


function save() {
  document.querySelectorAll('*').forEach((e) => e.classList.remove('drag-help'));
  document.querySelectorAll('*').forEach((e) => e.classList.remove('selected'))
  
  const fileContent = document.querySelector('#outlineArea').innerHTML;
  const fileTitle = document.querySelector('#page-title').textContent;
  window.localStorage.setItem('user', fileContent);
  window.localStorage.setItem('user-title', fileTitle);
}

// This function allows the title of the page to be editable
function webTitle(e) {
  const title = document.querySelector('#page-title').textContent
  if(title === '' || title === 'Untitled document'){
    document.querySelector('#web-title').textContent = 'Outline Editor'
  }else{
    document.querySelector('#web-title').textContent =e.target.textContent.trim();
  }

}


function focusPara(e) {
  e.target.classList.add('selected');
  selected = e.target;
  if (selected.classList.contains('bold')) {
    document.querySelector('#bold').classList.add('applied');
  }
  if (selected.classList.contains('italic')) {
    document.querySelector('#italic').classList.add('applied');
  }
}
function blurPara(e) {
  e.target.classList.remove('selected');
  document.querySelector('#italic').classList.remove('applied');
  document.querySelector('#bold').classList.remove('applied');
}


function moveUp() {
  if (!selected) { return 0;}
  
  let eleToMove = [selected];
  let prevEle = selected.previousElementSibling;

  // If child element(s) exist, then they will be moved
  if (document.querySelector('#child-'+selected.id)) {
    eleToMove.push(document.querySelector('#child-' + selected.id));
  }

  // If the previous element is a div (child elements),
  // then select the one previous to that 
  if (prevEle && prevEle.tagName === 'DIV') {
      prevEle = prevEle.previousElementSibling;
    }
    
    eleToMove.forEach(ele => ele.parentNode.insertBefore(ele, prevEle));
    selected.focus();
  }
  


function moveDown() {
  if (!selected) {return 0;}
  
  let eleToMove = [selected];
  let sendTo = selected.nextElementSibling;
  
  // If child element(s) exist, then they will be moved
  if (document.querySelector('#child-' + selected.id)) {
    eleToMove.unshift(document.querySelector('#child-' + selected.id));
  }
  
  if (sendTo) {
    // If the next element is a div, then it's a child element of selected
    if (sendTo.tagName === 'DIV') {
      sendTo = sendTo.nextElementSibling;
    }
    // If the next P element has a div next to it then they are it's children
    // and the selected element should move under them
    if (sendTo && sendTo.nextElementSibling && sendTo.nextElementSibling.tagName === 'DIV') {
          sendTo = sendTo.nextElementSibling;
        }
  }
  
  //If the sendTo element exist then move the selected element
  if (sendTo) {
    eleToMove.forEach((ele) => insertAfter(ele, sendTo))
  }
  
  selected.focus();
}

function indentLeft() {
  let eleToMove = [selected];
  const sendTo = selected.parentElement;
  const insertEle = selected.parentElement.previousElementSibling;
  
  // If child element(s) exist, then they will be moved
  if (document.querySelector('#child-' + selected.id)) {
    eleToMove.unshift(document.querySelector('#child-' + selected.id));
  }
  
  if (sendTo && sendTo.classList.contains('indent')) {
    eleToMove.forEach((e) => insertAfter(e, sendTo))
  }
  selected.focus();
}


function indentRight() {
  let eleToMove = [selected];
  const eleToFocus = selected;
  const curSelected = selected
  let sendTo = null;
  
  
  if(selected.previousElementSibling && selected.previousElementSibling.tagName === 'DIV'){
    sendTo = selected.previousElementSibling;
  }else if(selected.previousElementSibling && selected.previousElementSibling.tagName === 'P'){
    selected = selected.previousElementSibling;
    const selectTemp = selected;
    sendTo = newDiv();
  }else{return 0;}
  
  // If child element(s) exist, then they will be moved
  if (document.querySelector('#child-' + curSelected.id)) {
    eleToMove.push(document.querySelector('#child-' + curSelected.id));
  }
  
  // data-indent cannot be too high or else the website format will break
  if (selected.parentElement.getAttribute('data-indent') != '9') {
    sendTo.appendChild(eleToMove[0]);
    
    // If child element(s) exist, then they will be moved
    if (eleToMove[1]) {
      insertAfter(eleToMove[1], document.querySelector('#' + curSelected.id))
    }
  }
  eleToFocus.focus()
}

function newLine() {
  const newP = createP();
  document.querySelector('#outlineOText').appendChild(newP);
  newP.focus();
}

function newIndentedLine() {
  if (!selected) {return 0;}

  if (selected.parentNode.getAttribute('data-indent') == 9) {
    window.alert('Cannot have a higher level of indentation');
    return 0;
  }

  const divId = String('#child-' + selected.id);
  let divSelector = document.querySelector(divId);


  const indentLevel = Number(selected.getAttribute('data-indent')) + 1;

// If there isn't a child div, then create one
  if (!divSelector) {
    divSelector = newDiv();
  }

  const newP = createP(indentLevel);
  divSelector.appendChild(newP);

  newP.focus();
}


function newSib() {
  if(!selected){return 0;}
  const newP = createP();
  
  // If child element(s) exist, then create the new line under that.
  if(selected.nextElementSibling && selected.nextElementSibling.tagName === 'DIV'){
    insertAfter(newP, selected.nextElementSibling);
  }else{
    insertAfter(newP, selected);
  }
  newP.focus();
}

function deleteItem() {
  if(!selected){return 0;}

  const toDel = [selected];
  const childDiv = document.querySelector('#child-' + selected.id);
  
  if (childDiv){
    toDel.push(childDiv);
  }
  
  if (selected.previousElementSibling) {
    selected.previousElementSibling.focus();
  }
    
  toDel.forEach((e) => e.remove());
}

function dragStartFun(e) {
  const childDiv = document.querySelector('#child-' + e.target.id)
  dragged = [e.target];
  dragParentEle = e.target.parentElement;
  
  // If childDiv exist, then it should also be moved with selected
  if (childDiv) {dragged.unshift(childDiv)}
  }
  
function dragEnter(e) {
  dragEnterEle = e.target;
  
  document.querySelectorAll('*').forEach((e) => e.classList.remove('drag-help'));
  
  if (e.target.nextElementSibling && e.target.nextElementSibling.tagName === 'DIV') {
    if (e.target.classList.contains('hiddenText')) {
      dragEnterEle = e.target;
    }else{
      dragEnterEle = e.target.nextElementSibling;
    }
  }
  
  // Drag and drop should be kept within the same scope
  if (dragEnterEle && dragParentEle === e.target.parentElement) {
    dragEnterEle.classList.add('drag-help');
  }
}

function dragDrop(e) {
  document.querySelectorAll('*').forEach((e) => e.classList.remove('drag-help'));
  // Drag and drop should be kept within the same scope
  if (dragParentEle === e.target.parentElement) {
    dragged.forEach((drag) => insertAfter(drag, e.target));
    dragEnterEle.classList.remove('drag-help');
    dragEnterEle = null;
  }
}

function helpWindow() {
  const helpWindow = document.querySelector('#help-box');
  if (!helpWindow.getAttribute('class')) {
    helpWindow.classList.add('hidden');
  }else{
    helpWindow.classList.remove('hidden');
  }
}

function expand(childDiv) {
  if(childDiv){
    selected.classList.remove('hiddenText');
    childDiv.classList.remove('hidden');
  }
}

function collapse(childDiv) {
  if(childDiv){
    selected.classList.add('hiddenText');
    childDiv.classList.add('hidden');
  }
}

function expandAndCollapse() {
  if(!selected){return 0;}
  const childDiv = document.querySelector('#child-'+selected.id);
  if (selected.classList.contains('hiddenText')) {
    expand(childDiv)
  }else{
    collapse(childDiv)
  }
  selected.focus()  
}

function bold() {
  if (selected.classList.contains('bold')) {
    selected.classList.remove('bold')
  }else{
    selected.classList.add('bold');
  }
  selected.blur();
  selected.focus();
}
function italic() {
  if (selected.classList.contains('italic')) {
    selected.classList.remove('italic')
  }else{
    selected.classList.add('italic');
  }
  selected.blur();
  selected.focus();
}

function pagePrinter() {
  document.querySelector('#outlineArea').classList.remove('outlineArea');
  window.print();
  document.querySelector('#outlineArea').classList.add('outlineArea');
}

window.addEventListener('load', prep);
