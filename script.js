let cards = {
    '6': { value: 6, image: './cards/6.png' },
    '7': { value: 7, image: './cards/7.png' },
    '8': { value: 8, image: './cards/8.png' },
    '9': { value: 9, image: './cards/9.png' },
    '10': { value: 10, image: './cards/10.png' },
    'Валет': { value: 2, image: './cards/V.png' },
    'Дама': { value: 3, image: './cards/Q.png' },
    'Король': { value: 4, image: './cards/K.png' },
    'Туз': { value: 11, image: './cards/A.png' },
    '6r': { value: 6, image: './cards/6r.png' },
    '7r': { value: 7, image: './cards/7r.png' },
    '8r': { value: 8, image: './cards/8r.png' },
    '9r': { value: 9, image: './cards/9r.png' },
    '10r': { value: 10, image: './cards/10r.jpg' },
    'Валетr': { value: 2, image: './cards/Vr.png' },
    'Дамаr': { value: 3, image: './cards/Qr.png' },
    'Корольr': { value: 4, image: './cards/Kr.png' },
    'Тузr': { value: 11, image: './cards/Ar.png' }
};
var audio1 =  new Audio(document.getElementById("maint"));
audio1.volume = 0.15;
let userScore = 0;
let computerScore = 0;
let round = 0;

function getRandomCard(player) {
    let keys = Object.keys(cards);
    keys = keys.filter(key => player === 'user' ? !key.endsWith('r') : key.endsWith('r'));
    return keys[keys.length * Math.random() << 0];
}
let audio;
let startButton = document.getElementById('start');

startButton.addEventListener('mouseover', function() {
    document.body.style.backgroundColor = 'black';
});

startButton.addEventListener('mouseout', function() {
    document.body.style.backgroundColor = 'white'; 
});

document.getElementById('start').addEventListener('click', function() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    audio = new Audio('./sound/lightsword.mp3');
    audio.play();
    nextRound();
});

document.getElementById('draw').addEventListener('click', function() {
    audio = new Audio('./sound/lightsword.mp3');
    audio.play();
    nextRound();
});

function nextRound() {
    round++;
    document.getElementById('round').innerText = round;
    let userCardKey = getRandomCard('user');
    let computerCardKey = getRandomCard('computer');
    let userCard = cards[userCardKey];
    let computerCard = cards[computerCardKey];
    userScore += userCard.value;
    computerScore += computerCard.value;
    document.getElementById('userScore').innerText = userScore;
    document.getElementById('computerScore').innerText = computerScore;

    let userCardElement = document.getElementById('userCard');
    let computerCardElement = document.getElementById('computerCard');

    userCardElement.setAttribute('data-player', 'user');
    userCardElement.classList.add('user-card');

    computerCardElement.setAttribute('data-player', 'computer');
    computerCardElement.classList.add('computer-card');

    userCardElement.style.backgroundImage = `url(${userCard.image})`;
    computerCardElement.style.backgroundImage = `url(${computerCard.image})`;

    if (round >= 3) {
        setTimeout(endGame, 1000);
        document.getElementById('draw').disabled = true;
        let audio = new Audio('./sound/end.mp3');
        audio.play();
    }
}

function endGame() {
    if (userScore <= 21 && (userScore > computerScore || computerScore > 21)) {
        alert("Ви виграли!");
    } else if (computerScore <= 21 && (computerScore > userScore || userScore > 21)) {
        alert("Світла сторона перемогла!");
    } else {
        alert("Нічия!");
    }
}
