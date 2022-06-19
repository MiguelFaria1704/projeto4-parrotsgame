//before game
let allCards = ["bobrossparrot" , "explodyparrot" , "fiestaparrot" , "metalparrot" , "revertitparrot" , "tripletsparrot" , "unicornparrot"];

function askNumberOfCards() {
    let n = prompt("Com quantas cartas quer jogar? (Apenas números pares, de 4 a 14)");
    while (n < 4 || n > 14 || n % 2 !== 0) {
        n = prompt("Com quantas cartas quer jogar? (Apenas números pares, de 4 a 14)");
    }

    return n;
}

let nCards = askNumberOfCards();

function comparador() { 
	return Math.random() - 0.5; 
}

function dealCards(n) {
    let deck = [];
    const table = document.querySelector(".content");

    for (let i = 0 ; i < n ; i += 2) {
        deck.push(allCards[i]);
        deck.push(allCards[i]);
    }
    
    deck.sort(comparador);

    for (i = 0 ; i < n ; i ++) {
        table.innerHTML += `
            <div class="card ${deck[i]}" onclick="flip(this)">
                <img class="front" src="./media/front.png" alt="Parrot">
                <img class="back" src="./media/${deck[i]}.gif" alt="${deck[i]}">
            </div>
        `;
    }
}

dealCards(nCards);

//during game

let nPlays = 0;

function flip(element) {
    nPlays ++;
    let flippedCards = document.querySelectorAll(".flipped");
    let nFlipped = flippedCards.length;
    
    if (nFlipped < 2) {
        element.classList.add("flipped");
        nFlipped ++;
    } 

    if (nFlipped === 2) {
        if(flippedCards[0].getAttribute("class") !== element.getAttribute("class")) {
            setTimeout(function () {
                element.classList.remove("flipped");
                flippedCards[0].classList.remove("flipped");
            }, 1000);
        } else {
            element.classList.add("match");
            flippedCards[0].classList.add("match");
            element.classList.remove("flipped");
            flippedCards[0].classList.remove("flipped");
            checkResult();
        }
    }
}

function checkResult() {
    let matchedCards = document.querySelectorAll(".match");
    let nMatched = matchedCards.length;

    if (nMatched == nCards) {
        clearInterval(counter);

        setTimeout(function () {
            alert(`Você ganhou em ${nPlays} jogadas!\nSeu tempo final foi de ${s} segundos.`);
            const restart = prompt("Deseja reiniciar a partida?");
            if (restart == "sim") {
                window.location.reload();
        }
        }, 1000);
    }
}

let s = 0;
let ss = 0;
let mm = 0;
let hh = 0;

let time = 1000;
let counter;

counter = setInterval(timer, time);

function timer() {
    ss++;
    s++;

    if (ss === 60) {
        ss = 0;
        mm++;

        if(mm === 60) {
            mm = 0;
            hh++;
        }
    }

    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    document.querySelector(".clock p").innerHTML = format;
}


