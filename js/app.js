/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/* Number of moves in a global variable */
let movesnumber = 0;
/* Clock global variables */
let clockOff = true;
let time = 0;
let clockId;
/* Matched cards global variable */
let matched = 0;


/*Query Selector for class deck*/
const deck=document.querySelector('.deck')

/* Modal Tests
time = 125;
displaytime(); // 3:00
movesnumber = 16;
scoring(); // 2 stars

modalstats();
modaltoggle(); */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* Function used to shuffle and randomize the deck */
function shufflethedeck(){
    const cardstoshuffle = Array.from(document.querySelectorAll('.deck li'));
    /*console.log('cards to shuffle', cardstoshuffle);*/
    const cardsshuffled = shuffle(cardstoshuffle);
    /*console.log('shuffled cards', cardsshuffled);*/
    for (card of cardsshuffled) {
      deck.appendChild(card);
    }


}
shufflethedeck();


/* Function to toggle the cards */

function Cardtoggle(card) {
  card.classList.toggle('open'); /*.open class for non-matching cards */
  card.classList.toggle('show'); /*.show class for matching cards */
}


/* Event Listener to toggle the cards */
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (Validclick(clickTarget)) {
    if (clockOff) {
      startingclock();
      clockOff = false;
    }
  /*}
  if (clickTarget.classList.contains('card') && toggledCards.length < 2) {*/
      Cardtoggle(clickTarget);
      addtoggledCards(clickTarget);
      if (toggledCards.length === 2) {
          Cardmatch(clickTarget);
          addingmoves();
          scoring();
      }
    }
});


/* Making an array to add the cards to a list of open cards */
let toggledCards = [];

function addtoggledCards(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}


/* Function to match the cards using the first child element */
function Cardmatch() {
    const totalpairs = 8;

  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      toggledCards = [];
      matched++;
      if (matched === totalpairs) {
        gameover();
      }
  }   else {setTimeout(() => {
        Cardtoggle(toggledCards[0]);
        Cardtoggle(toggledCards[1]);
        toggledCards = [];
    }, 1000);
}
}


/* Function for game over matched pairs */
function gameover() {
  stopclock();
  modalstats();
  modaltoggle();
  resetcards();

}


/* Function that will check if the click event is valid or not */
function Validclick(clickTarget) {
  return (clickTarget.classList.contains('card') &&
          !clickTarget.classList.contains('match') &&
          toggledCards.length < 2 &&
          !toggledCards.includes(clickTarget));
}


/* Function to increment number of moves */
function addingmoves() {
  movesnumber++;
  const movesText = document.querySelector('.moves')
  movesText.innerHTML = movesnumber;
}


/*Scoring function */
function scoring() {
  if (movesnumber === 16 || movesnumber === 24)
    {  starremove();
      }
}


/* Manipulating DOM to remove the star (hide it with styling) */
function starremove () {
  const liststar = document.querySelectorAll('.stars li');
  for (star of liststar) {
    if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
    }
  }
}


/* Function for starting the clock (timer) */
function startingclock() {
  clockId = setInterval(() => {
    time++;
    displaytime();/*console.log(time);*/
  }, 1000);
}


/* Function for displaying the time on the page */
function displaytime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (seconds < 10) {
      clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
      clock.innerHTML = `${minutes}:${seconds}`;
  }
  /*console.log(clock);*/
  /*clock.innerHTML = time;*/
}


/* Stopping the clock function */
function stopclock() {
  clearInterval(clockId);

}


/* Toggle the modal on and off */
function modaltoggle() {
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}

/* function that writes the stats to the Modal*/
function modalstats() {
  const timestat = document.querySelector('.modal__time')
  const clockstat = document.querySelector('.clock').innerHTML
  const movesstat = document.querySelector('.modal__moves');
  const starsstat = document.querySelector('.modal__stars');
  const stars = getstars();

  timestat.innerHTML = `Time = ${clockstat}`;
  movesstat.innerHTML = `Moves = ${movesnumber}`;
  starsstat.innerHTML = `Stars = ${stars}`;
}


/* Function to get the stars stat working correctly */
function getstars() {
  stars = document.querySelectorAll('.stars li');
  starcount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starcount++;
    }
  }
return starcount;
}


/* Listener for modal Cancel button */
document.querySelector('.modal__cancel').addEventListener('click', () => {
  modaltoggle();
});


/* Listener for modal Play Again button */
document.querySelector('.modal__playagain').addEventListener('click', replaygame);


/* Listener for reset button (icon) */
document.querySelector('.restart').addEventListener('click', gamereset);


/* Function to reset the entire game */
function gamereset () {
      resettimeandclock();
      resetmoves();
      resetstars();
      shufflethedeck();
}

/* Function for replaying the game */
function replaygame() {
  gamereset();
  modaltoggle();
}

/* Function for resetting the clock counter */
function resettimeandclock() {
  stopclock();
  clockOff = true;
  time = 0;
  displaytime();
}


/* Function for resetting the moves counter */
function resetmoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}


/* Function for resetting the stars counter */
function resetstars() {
  stars = 0;
  const starlist = document.querySelectorAll('.stars li');
  for (star of starlist) {
    star.style.display = 'inline';
  }
}


/* Function for turning over cards after gameover */
function resetcards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
