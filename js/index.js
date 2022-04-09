/* jshint esversion:9 */

const cardsList = [
    './img/bobrossparrot.gif',
    './img/explodyparrot.gif',
    './img/fiestaparrot.gif',
    './img/metalparrot.gif',
    './img/revertitparrot.gif',
    './img/tripletsparrot.gif',
    './img/unicornparrot.gif'
];
let cardsQty = 0;
let playerMoves = 0;
let shuffledCards = [];
let upturnedCards = [];
let actualFlippedCard = null;

function validateUserInput(){
    return (isNaN(cardsQty) || cardsQty < 4 || cardsQty > 14 || (cardsQty % 2 === 1));
}

function init(){

    cardsQty = 0;
    playerMoves = 0;
    shuffledCards = [];
    upturnedCards = [];
    actualFlippedCard = null;

    do {
        cardsQty = Number(prompt('Informe a quantidade de cartas do jogo. Você precisa informar um número entre 4 e 14: '));
    } while(validateUserInput());

    shuffleCards();
    insertCards();

}

function getRandomCard(){
    return cardsList[Math.floor(Math.random() * cardsList.length)];
}

function shuffleCards(){

    const uniqueCardsQty = cardsQty / 2;
    const uniqueCards = [];

    while(uniqueCards.length < uniqueCardsQty){

        const randomCard = getRandomCard();
        if(uniqueCards.indexOf(randomCard) == -1){
            uniqueCards.push(randomCard);
        }

    }

    const uniqueCardsCopy = uniqueCards.map(card => card);
    shuffledCards = uniqueCards.concat(uniqueCardsCopy);
    shuffledCards.sort(function(){
        return Math.random() - 0.5;
    });

}

function insertCards(){

    const cardsListEl = document.querySelector('.card-list');
    cardsListEl.innerHTML = '';

    for(let i = 0; i < shuffledCards.length; i++){

        cardsListEl.innerHTML += `
            <div class="card flip-front" onclick="clickCard(this)">
                <div class="front-side side">
                   <img src="./img/front.png" alt=""> 
                </div>
                <div class="back-side side">
                    <img src="${shuffledCards[i]}" alt="">
                </div>
            </div>
        `;

    }

}

function clickCard(element){

    if(element.classList.contains('flip-front')){

        playerMoves++;
        element.classList.remove('flip-front');
        element.classList.add('flip-back');
        const cardImg = element.querySelector('.back-side img').src;

        if(upturnedCards.length % 2 == 1) {

            if(upturnedCards.indexOf(cardImg) > -1){

                upturnedCards.push(cardImg);
                setTimeout(function(){
                    if(upturnedCards.length === shuffledCards.length) finishGame();
                }, 500);
    
            } else {
    
                setTimeout(function(){
                    wrongGuess(element);
                }, 1000);
    
            }

        } else {

            actualFlippedCard = cardImg;
            upturnedCards.push(cardImg);

        }

    }

}

function wrongGuess(element){

    upturnedCards = upturnedCards.filter(function(card){
        if(card !== actualFlippedCard) return card;
    });

    [...document.querySelectorAll('.flip-back')].forEach(card=>{

        const img = card.querySelector('.back-side img').src;

        if(img === actualFlippedCard){
            
            card.classList.remove('flip-back');
            card.classList.add('flip-front');

        }

    });

    element.classList.remove('flip-back');
    element.classList.add('flip-front');

}

function finishGame(){

    alert(`Você ganhou em ${playerMoves} jogadas!`);
    const restartGame = prompt('Deseja reiniciar o jogo ?').trim().toLowerCase();
    if(restartGame === 'sim') init();

}

window.onload = init;