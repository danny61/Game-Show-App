const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');

let missed = 0;

const phrases = [
    "Cut To The Chase",
    "Right Out of the Gate",
    "Break The Ice",
    "A Day Late and a Dollar Short",
    "A Cut Below"
];


startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
})

function getRandomPhraseAsArray(arr) {

    let randomNumber = [Math.floor(Math.random() * phrases.length)];
    let randomPhrase = arr[randomNumber];

    return randomPhrase.split('');
}

function addPhraseToDisplay (arr){
    const ul = document.querySelector('ul');

    for (let i = 0; i < arr.length; i++) {

    let listItem = document.createElement('li');
    listItem.innerHTML = arr[i];
    ul.appendChild(listItem);
      
    if (arr[i] === ' ') {
        listItem.className = 'space';
    } else {
        listItem.className = 'letter';
    }
}
}

function checkLetter (button) {
    const checkLetter = document.querySelectorAll('li');
    let match = null;
  
    for (let i = 0; i < checkLetter.length; i += 1) {
        if (button.textContent === checkLetter[i].textContent.toLowerCase() ) {
            checkLetter[i].classList.add('show');
            match = button.textContent;
        }
    }
    return match;
}

const checkWin = () => {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');

    if (letter.length === show.length) {
        overlay.className = 'win';
        title.textContent = 'You Win!';
        overlay.style.display = 'flex';
        startBtn.textContent = 'Play Again!';
        startBtn.addEventListener('click', (e) => { 
            setPlayAgain();
        });
    }
    if (missed > 4) {
        overlay.className = 'lose';
        title.textContent = `You lost! Please try again!'`;
        overlay.style.display = 'flex';
        startBtn.textContent = 'Try Again!';
        startBtn.addEventListener('click', () => { 
            setPlayAgain();
        });
    }
};

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    getRandomPhraseAsArray(phrases);
});

qwerty.addEventListener('click', (e) => {
    
    let buttonClick = e.target;
    if (buttonClick.tagName === 'BUTTON' || buttonClick.className === 'chosen') {
        buttonClick.className = 'chosen';
        buttonClick.disabled =  true;
        const letterFound = checkLetter(buttonClick);
        
        if ( letterFound === null ) {
            const lost = document.querySelectorAll('.tries img');
            lost[missed].src = 'images/lostHeart.png';
            lost.className = 'lost';
            missed++;
        }
    }
    checkWin();
});

function setPlayAgain() {
    
    const resetPhrase = document.querySelectorAll('#phrase ul li');
    const resetLetters = document.querySelectorAll('#qwerty .keyrow button');
    const life = document.querySelectorAll('.tries img');
    const newPhrase = document.getElementById('phrase');;

    for(let i = 0; i < resetPhrase.length; i+=1) {
        resetPhrase[i].remove(resetPhrase[i]);
    }
    for (let i = 0; i < resetLetters.length; i+=1) {
        resetLetters[i].className = "";
        resetLetters[i].disabled = false;
    }
    for (let i = 0; i < phrase.length; i+=1) {
        resetPhrase[i].removeChild(resetPhrase[i].firstElementChild);
    }
    
    for (let i = 0; i < life.length; i+=1) {
    life[i].src = 'images/liveHeart.png';
    }
    missed = 0;
   
    const phraseArr = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArr);
}