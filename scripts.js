const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    //second click
        secondCard = this;

        checkForMatch();
    
}

function checkForMatch() {
    // do cards match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //    disableCards();
   // } else {
   //     unflipCards();
    //}
}

function disableCards() {
    // its a match!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    console.log('its a match!');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    // not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        }, 1500);
        console.log('try again!');
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    });
})();



cards.forEach(card => card.addEventListener('click', flipCard))