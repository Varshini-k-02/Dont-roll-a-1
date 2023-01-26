'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
score0El.textContent=0;
score1El.textContent=0;

let scores, currScore, activePl,playing;
const init = function(){
    scores=[0,0];
    currScore = 0;
    activePl = 0;
    playing = true;
    score0El.textContent=0;
    score1El.textContent=0;
    curr0El.textContent=0;
    curr1El.textContent=0;
    
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner');
}
init();
const switchPl=function(){
    document.getElementById(`current--${activePl}`).textContent=0;
    currScore = 0;
    activePl = activePl === 0?1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//Hiding the dice initially before rolling 
diceEl.classList.add('hidden');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

btnRoll.addEventListener('click',function(){
    if(playing){
    const dice = Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if(dice!==1){
        currScore+=dice;
        document.getElementById(`current--${activePl}`).textContent=currScore;
        
    }
    else{
        switchPl();

    }
}
})
btnHold.addEventListener('click',function(){
    if(playing){
    scores[activePl]+=currScore;
    document.getElementById(`score--${activePl}`).textContent = 
    scores[activePl];

    if(scores[activePl]>=100){
        playing = false;
        document.querySelector(`.player--${activePl}`).classList.add('player--winner');
        document.querySelector(`.player--${activePl}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
    }
    else{
        switchPl();
    }  
}
});
btnNew.addEventListener('click', init);