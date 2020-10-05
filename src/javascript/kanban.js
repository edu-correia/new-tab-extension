let todo = [];
let doing = [];
let done = [];

let fktodo = [];
let fkdoing = [];
let fkdone = [];

//Start function
(() => {
    let savedTodos = localStorage.getItem('todo');
    if(savedTodos !== null){
        var formatedTodos = savedTodos.split(',');
    }

    let savedDoing = localStorage.getItem('doing')
    if(savedDoing !== null){
        var formatedDoing = savedDoing.split(',');
    }

    let savedDone = localStorage.getItem('done')
    if(savedDone !== null){
        var formatedDone = savedDone.split(',');
    }

    let todoDiv = document.getElementById('todo');
    let doingDiv = document.getElementById('doing');
    let doneDiv = document.getElementById('done');

    loadKanBan(formatedTodos, todoDiv);
    loadKanBan(formatedDoing, doingDiv);
    loadKanBan(formatedDone, doneDiv);
    
})()

function loadKanBan(arr, div){
    if(arr === undefined) return;

    arr.map(item => {
        if(item === ""){

        }else{
            let boardDiv = document.createElement('div');
            let pEl = document.createElement('p');
            let pText = document.createTextNode(item);
            let dltButton = document.createElement('button');
            let dltText = document.createTextNode('x');

    
            boardDiv.setAttribute('class', 'bloco');
            boardDiv.setAttribute('draggable', true);
            
            dltButton.appendChild(dltText);
            pEl.appendChild(pText);
            boardDiv.appendChild(pEl);
            boardDiv.appendChild(dltButton);
            
            div.appendChild(boardDiv);
            dltButton.addEventListener('click', deleteSpecific);
        }
    })
}

//DropZones

const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(zone => {
    zone.addEventListener('dragleave', dragleave)
})

function dragleave(){
    const cardBeingDragged = document.querySelector('.is-dragging');
    
    this.appendChild(cardBeingDragged);
    save();
}

//Cards

let blocos = document.querySelectorAll('.bloco');

blocos.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('dragend', dragend)
})

function dragstart(){

    this.classList.add('is-dragging');
}

function dragend(){

    this.classList.remove('is-dragging');
}

//Save Function

function save(){
    dropzones.forEach((zone, index) => {
        if(index === 0){
            fktodo = zone.children;
        }

        if(index === 1){
            fkdoing = zone.children;
        }

        if(index === 2){
            fkdone = zone.children;
        }
    })

    todo = [];
    for(let i = 0; i < fktodo.length; i++){
        todo.push(fktodo[i].children[0].innerHTML);
    }

    doing = [];
    for(let i = 0; i < fkdoing.length; i++){
        doing.push(fkdoing[i].children[0].innerHTML);
    }

    done = [];
    for(let i = 0; i < fkdone.length; i++){
        done.push(fkdone[i].children[0].innerHTML);
    }

    localStorage.setItem('todo', todo);
    localStorage.setItem('doing', doing);
    localStorage.setItem('done', done);
}

//Add board

let btnBoard = document.getElementById('btn-board');

btnBoard.onclick = () => {
    let savedTodos = localStorage.getItem('todo');

    let boardTitle = document.getElementById('textBoard').value;

    let aux = [savedTodos, boardTitle];

    localStorage.setItem('todo', aux);
    
    let abcDiv = document.getElementById('todo');

    let boardDiv = document.createElement('div');
    let pEl = document.createElement('p');
    let pText = document.createTextNode(boardTitle);
    let dltButton = document.createElement('button');
    let dltText = document.createTextNode('x');

    boardDiv.setAttribute('class', 'bloco');
    boardDiv.setAttribute('draggable', true);

    dltButton.appendChild(dltText);
    pEl.appendChild(pText);
    boardDiv.appendChild(pEl);
    boardDiv.appendChild(dltButton);
    
    abcDiv.appendChild(boardDiv);
    boardDiv.addEventListener('dragstart', dragstart);
    boardDiv.addEventListener('dragend', dragend);
    dltButton.addEventListener('click', deleteSpecific);
}

//Delete Boards

let dltBoards = document.getElementById('dlt-boards');

dltBoards.onclick = () => {
    let doneBoard = document.getElementById('done');
    doneBoard.innerHTML = '';
    save();
}

function deleteSpecific(){
    let dropzoneDiv = this.parentNode.parentNode;
    let itemToDelete = this.parentNode;

    dropzoneDiv.removeChild(itemToDelete);    
    save();
}