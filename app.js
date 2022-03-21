const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

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
