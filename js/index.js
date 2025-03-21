let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
};
const resetMsg = document.querySelector('.reset-message')
const resetYesMsg = document.querySelector('.js-reset-yes-button')
const resetNoMsg = document.querySelector('.js-reset-no-button')
const autoPlay = document.querySelector('.js-play-button')
let intervalId;
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock')
})
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        playGame('rock')
        
   }
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper')
})
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'p'){
        playGame('paper')
        
   }
})
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors')
})
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 's'){
        playGame('scissors')
        
   }
})
document.querySelector('.js-reset-button').addEventListener('click',()=>{
    // 
    resetMsg.classList.add('opacity-100')
    resetYesMsg.addEventListener('click',()=>{
        resetScore();
        resetMsg.classList.remove('opacity-100')
    })
    resetNoMsg.addEventListener('click',()=>{
        resetMsg.classList.remove('opacity-100')
    })
   
})
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'Backspace'){
        resetMsg.classList.add('opacity-100')
    resetYesMsg.addEventListener('click',()=>{
        resetScore();
        resetMsg.classList.remove('opacity-100')
    })
    resetNoMsg.addEventListener('click',()=>{
        resetMsg.classList.remove('opacity-100')
    })
   
        
   }
})
let isAutoPlaying = false;
autoPlay.addEventListener('click', ()=>{
if(!isAutoPlaying){
    intervalId =   setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove)
        isAutoPlaying=true;
        autoPlay.innerHTML='Stop Auto Playing'
    },1000);
}
else{
    clearInterval(intervalId)
    autoPlay.innerHTML=' Auto Play'
    isAutoPlaying=false;
}
})
updateScore();

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = "Tie!";
        } else if (computerMove === 'paper') {
            result = "You Lose!";
        } else {
            result = "You Win!";
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'paper') {
            result = "Tie!";
        } else if (computerMove === 'scissors') {
            result = "You Lose!";
        } else {
            result = "You Win!";
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = "Tie!";
        } else if (computerMove === 'rock') {
            result = "You Lose!";
        } else {
            result = "You Win!";
        }
    }

    if (result === 'You Win!') {
        score.wins += 1;
    } else if (result === "You Lose!") {
        score.losses += 1;
    } else if (result === "Tie!") {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    // alert(`You picked ${playerMove}, while Computer picked ${computerMove}. ${result} \n Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`);

    updateScore();
    gameResult(result);
    gameMoves(playerMove, computerMove)
}

function gameResult(result) {
    document.querySelector('.js-result').innerHTML = `${result}`;
}
function gameMoves(playerMove, computerMove) {
    document.querySelector('.js-moves').innerHTML = ` You 
          <img src="./images/${playerMove}-emoji.png" class="move-icon mx-1" alt="${playerMove}"> 
          , Computer 
          <img src="./images/${computerMove}-emoji.png" class="move-icon mx-1" alt="${computerMove}">`;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'rock';
    } else if (randomNumber < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}
