const KEY = 'xKch72OdC9YWJPCKC5k5SavcXTQWiWe3';
const QUERY = 'technology';
const PARAMS = 'web_url,abstract,lead_paragraph';

(() => {
    let novaHora = new Date();
    let year = novaHora.getFullYear();
    let month = novaHora.getMonth();
    let day = novaHora.getDate();
    let fullDate = `${year}${month+1}${day}`;

        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${QUERY}&fl=${PARAMS}&begin_date=${fullDate}&api-key=${KEY}`)
        .then(response => response.json())
        .then(json => loadNews(json));
})()

function loadNews(data){
    let news = data.response.docs;
    news.map(item => {
        let postsDiv = document.getElementById('posts');

        //Criação dos Elementos
        let postDiv = document.createElement('div');
        let header = document.createElement('header');
        let section = document.createElement('section');
        let titleEl = document.createElement('p');
        let linkEl = document.createElement('a');
        let iconEl = document.createElement('img');
        let visitEl = document.createElement('span');

        //Criação dos Textos
        let titleText = document.createTextNode(item.abstract);
        let leadText = document.createTextNode(item.lead_paragraph);
        let visitText = document.createTextNode('Visitar');

        //Definindo as classes
        postDiv.setAttribute('class', 'post');
        header.setAttribute('class', 'post-header');
        iconEl.setAttribute('class', 'tab-icon');

        //Definindo parâmetros extras
        linkEl.target = "_blank";
        linkEl.href = item.web_url;
        iconEl.src = "./assets/external-link.svg";

        //Encaixando os blocos
        visitEl.appendChild(visitText);
        linkEl.appendChild(visitEl);
        linkEl.appendChild(iconEl);
        titleEl.appendChild(titleText);
        header.appendChild(titleEl);
        header.appendChild(linkEl);
        section.appendChild(leadText);
        postDiv.appendChild(header);
        postDiv.appendChild(section);

        postsDiv.appendChild(postDiv);
    });
}