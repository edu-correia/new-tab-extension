const STORAGE_NAME = 'cards';
let btn = document.getElementById('btn');

(() => {
    getItems();
})()

btn.onclick = () => {
    let local = localStorage.getItem(STORAGE_NAME);
    let name = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    let image = document.getElementById('image').value;

    let arr = [];
    if(local == null){
        arr = [name, url, image];
    }else{
        arr = [local, name, url, image];
    }
    localStorage.setItem(STORAGE_NAME, arr);

    addCard(name, url, image);
}

function getItems(){
    let dados = localStorage.getItem(STORAGE_NAME);
    if(dados === null) return;
    let local = dados.split(',');
    let name;
    let url;
    let image;
    
    local.map((item, index) => {
        if(index % 3 === 0){
           name = item;
           url = local[index + 1];
           image = local[index + 2];
           addCard(name, url, image);
        }
    });
}

function addCard(name, url, image){
    let cardsDiv = document.getElementById('cards');
    let linkElement = document.createElement('a');
    let imgElement = document.createElement('img');
    let h1Element = document.createElement('h1');
    let linkText = document.createTextNode(name);

    linkElement.href = url;
    imgElement.src = image;

    h1Element.appendChild(linkText);

    linkElement.appendChild(imgElement);
    linkElement.appendChild(h1Element);

    linkElement.classList.add('link');

    cardsDiv.appendChild(linkElement);
}
