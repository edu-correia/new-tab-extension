const STORAGE_NAME = 'cards';
let btn = document.getElementById('btn');

(() => {
    getItems();
})()

btn.onclick = () => {
    let local = localStorage.getItem(STORAGE_NAME);
    let name = document.getElementById('name').value;
    let url = document.getElementById('url').value;

    let arr = [];
    if(local == null){
        arr = [name, url];
    }else{
        arr = [local, name, url];
    }
    localStorage.setItem('cardsteste', arr);

    addCard(name, url);
}

function getItems(){
    let local = localStorage.getItem(STORAGE_NAME);
    if(local === null) return;
    local = local.split(',');
    let name;
    let url;
    
    local.map((item, index) => {
        if(index % 2 === 0){
           name = item;
           url = local[index + 1];
           addCard(name, url);
        }
    });
}

function addCard(name, url){
    let cardsDiv = document.getElementById(STORAGE_NAME);
    let linkElement = document.createElement('a');
    let linkText = document.createTextNode(name);

    linkElement.appendChild(linkText);
    linkElement.href = url;
    cardsDiv.appendChild(linkElement);
}
