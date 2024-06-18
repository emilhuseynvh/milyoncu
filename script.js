const sual = document.querySelector('#sual');
const cavab = document.querySelector('#cavab');
const number = document.querySelector('#number');

let x = 0;
let api = [];
let random = null;
let answer = [[], []];

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
    random = getUniqueRandomQuestion();
    sual.innerHTML = api.sual[random].s;
    api.sual[random].c.forEach((element, index) => {
        kod += `<li onclick="ansClick(${index})" id="a${index}" class="answer-option" style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">${element}</li>`;
    });
    if (x <= 10) number.innerHTML = x + '/10';
    else {
        sual.innerHTML = 'Sizin nəticələriniz.';
        kod = `<li class="li" style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Düzgün cavabların sayı: ${answer[1].length}</li>
               <li class="li" style="margin-bottom: 20px; background-color: blue; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Yanlış cavabların sayı: ${answer[0].length}</li>
               <li class="li" onclick="location.reload()" style="margin-bottom: 20px; padding: 8px 0; border-radius: 20px; box-shadow: 0 0 10px #333; cursor: pointer">Yenidən başlayın</li>`;
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
        // Highlight the correct answer
        document.querySelector(`#a${api.sual[random].d}`).style.backgroundColor = 'green';
    }
    setTimeout(call, 1000);
}

// Random number generator
function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Prevent repeating questions
let askedQuestions = [];
function getUniqueRandomQuestion() {
    let rndIndex;
    do {
        rndIndex = rnd(0, api.sual.length - 1);
    } while (askedQuestions.includes(rndIndex));
    askedQuestions.push(rndIndex);
    return rndIndex;
}

// Using event delegation
cavab.addEventListener('click', function(event) {
    if (event.target && event.target.nodeName == "LI") {
        const index = Array.from(event.target.parentNode.children).indexOf(event.target);
        ansClick(index);
    }
});

