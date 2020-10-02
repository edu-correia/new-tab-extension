(() => {
    getTime();
    setInterval(getTime,1000)
})()

function getTime(){
    let week = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];


    let novaHora = new Date();

    let hora = novaHora.getHours();
    let minuto = novaHora.getMinutes();
    let segundo = novaHora.getSeconds();
    let week_day = novaHora.getDay();


    hora = zero(hora);
    minuto = zero(minuto);
    segundo = zero(segundo);
    
    document.getElementById('week_day').innerHTML = week[week_day];
    document.getElementById('hours').innerHTML = hora;
    document.getElementById('minutes').innerHTML = minuto;
    document.getElementById('seconds').innerHTML = segundo;
}

function zero(x) {
    if (x < 10) {
        x = '0' + x;
    } return x;
}