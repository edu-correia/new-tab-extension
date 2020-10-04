//DropZones

const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(zone => zone.addEventListener('dragleave', dragleave))

function dragleave(){
    const cardBeingDragged = document.querySelector('.is-dragging');
    
    this.appendChild(cardBeingDragged);
}

//Cards

const blocos = document.querySelectorAll('.bloco');

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