const sual = document.querySelector('#sual');
const cavab = document.querySelector('#cavab');
const number = document.querySelector('#number');
let x = 0;
let api = [];
let random = null;
let answer = [
    [],
    []
];

fetch('https://raw.githubusercontent.com/zahid022/json/main/milyoncu.json')
  .then(res => res.json())
  .then(data => {
    api = data;
    console.log(api);
    call();
  });

function call() {
    let kod = '';
    x++;
    random = rnd(0, api.sual.length - 1);
    sual.innerHTML = api.sual[random].s;
    api.sual[random].c.forEach((element, index) => {
        kod += `<li onclick="ansClick(${index})" id="a${index}" class="answer-option" style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">${element}</li>`;
    });
    if (x <= 10) number.innerHTML = x + '/10';
    else{
        sual.innerHTML = 'Sizin nəticələriniz.'
        kod = `<li   style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Düzgün cavabların sayı: ${answer[1].length}</li>
                <li  style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Yanlış cavabların sayı: ${answer[0].length}</li>
                <li  onclick="location.reload()" style="margin-bottom: 20px; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Yenidən başlayın</li>`;
    }
    cavab.innerHTML = kod;
}

function ansClick(index) {
    const secilen = document.querySelector(`#a${index}`);
    if (secilen.classList.contains('clicked')) return;

    secilen.classList.add('clicked');
    if (api.sual[random].d == index) {
        answer[1].push('1');
        secilen.style.backgroundColor = 'green';
    } else {
        answer[0].push('0');
        secilen.style.backgroundColor = 'red';
    }
    setTimeout(call, 1000);
    console.log(answer);
}

// Random number generator
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
