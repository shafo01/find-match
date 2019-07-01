/*
 * Create a list that holds all of your cards
 */

const flowers = ['&#127801;', '🌼',
    '🌻', '🌺', '🏵', '🌸',
    '🌻', '🌺', '🍀', '🌷',
    '🌷', '🍀', '🌸', '🏵',
    '🌼', '&#127801;'
];

let start = false;

const timer = (function() {

    let numSeconds = 0;

    /** some taken from w3schools **/
    function updateTime() {
        document.getElementById("seconds").innerHTML = numSeconds;
        numSeconds++;
    }

    function getNumSeconds() {
        return numSeconds;
    }

    function resetTime() {
        numSeconds = 0;
        document.getElementById("seconds").innerHTML = numSeconds;
    }



    return {

        updateTime: updateTime,
        getNumSeconds: getNumSeconds,
        resetTime: resetTime
    }


})();

let time;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



const ultility = (function() {

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return {
        shuffle: shuffle
    };
}());




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


const move = (function() {

    let moves = 0;
    let inCorrectMoves = 0;

    function addMove() {
        moves++;
    }



    function addIncorrectMove() {
        inCorrectMoves++;
    }

    function getIncorrectMoves() {
        return inCorrectMoves;
    }

    function updateMoves() {
        let movesSpan = document.getElementById('moves');
        movesSpan.innerHTML = moves;
    }

    function getMoves() {
        return moves;
    }

    function resetMoves() {
        moves = 0;
        updateMoves();
        inCorrectMoves = 0;
    }

    return {
        addMove: addMove,
        addIncorrectMove: addIncorrectMove,
        getIncorrectMoves: getIncorrectMoves,
        updateMoves: updateMoves,
        getMoves: getMoves,
        resetMoves: resetMoves
    }

})();

const star = (function() {

    let stars = 3;

    function getRemainingStars() {
        if (move.getIncorrectMoves() <= 8) {
            return 3;
        } else if (move.getIncorrectMoves() > 8 && move.getIncorrectMoves() <= 12) {
            return 2;
        } else if (move.getIncorrectMoves() > 12) {
            return 1;
        }
    }

    function updateStars() {
        let tempStars = getRemainingStars();
        if (stars !== tempStars) {
            if (tempStars === 2) {
                let star3 = document.getElementById('star3');
                star3.classList.add('blur');

            } else if (tempStars === 1) {
                let star2 = document.getElementById('star2');
                star2.classList.add('blur');

            }
        }
    }

    function resetStars() {
        let starElements = document.getElementsByClassName('star');
        console.log(starElements);
        for (aStar of starElements) {
            aStar.classList.remove('blur');
        }
    }

    return {
        updateStars: updateStars,
        resetStars: resetStars
    };


})();

const winning = (function() {

    function createWinningScreen() {

        let board = document.getElementById('board');
        board.classList.add('blur');

        let winningBanner = document.getElementById('winningMat');
        winningMat.classList.remove('hide');
        winningMat.classList.add('show');

        let winningTokens = document.getElementById('winningMat__token');
        winningTokens.innerHTML = ` ${flowers[1]} ${flowers[1]} ${flowers[1]} `;

        let starsContent = document.getElementById('stars');
        let winningStars = document.getElementById('winningMat__stars');

        winningStars.innerHTML = starsContent.innerHTML;

        document.getElementById('winningMat__moves').innerHTML = `${move.getMoves()} moves`;

        document.getElementById('winningMat__seconds').innerHTML = `${document.getElementById('seconds').innerHTML} seconds`;




    }

    function resetWin() {
        let board = document.getElementById('board');
        board.classList.remove('blur');

        let winningBanner = document.getElementById('winningMat');
        winningMat.classList.remove('show');
        winningMat.classList.add('hide');


    }

    return {
        createWinningScreen: createWinningScreen,
        resetWin: resetWin
    };

})();

const card = (function() {
    let flipBackBoth = false;
    let firstCardId;
    let firstMove = true;
    let matchedPairs = 0;

    function resetCard() {
        flipBackBoth = false;
        firstCardId = undefined;
        firstMove = true;
        matchedPairs = 0;
    }

    function compareCards(card) {
        let matched = false;
        if (firstMove) {

            //game has started so set the timer
            if (!start) {
                time = setInterval(timer.updateTime, 1000);
                start = true;
            }
            //first move or new pair of move
            //therefore, nothing to compare
            //store result and set firstMove to cater for secondMove of the new pair

            firstCardId = card.id;
            firstMove = false;
            flipBackBoth = false;
        } else {
            //second move of the pair
            //compare card to the first card of the pair
            let firstCard = document.getElementById(firstCardId);
            if (firstCard.getAttribute("value") === card.getAttribute("value")) {
                //a matching pair
                //therefore, points will be rewarded
                flipBackBoth = false;
                matched = true;
                matchedPairs++;
            } else {
                //did not get it right for this pair
                //so this flag will single to flip back both cards
                flipBackBoth = true;
            }


            //still have to reset values to cater for next moves
            firstMove = true;

        }

        return matched;
    }

    function flipCard(card) {
        card.classList.remove('final-flip');
        card.classList.remove('is-flipped');
        window.requestAnimationFrame(function() {
            card.classList.add('is-flipped');
        });
    }

    function showCard(card) {

        card.classList.remove('final-flip');
        card.classList.remove('is-flipped');
        window.requestAnimationFrame(function() {
            card.classList.add('final-flip');
        });
    }

    function checkForPair(card) {

        //alert(card.getAttribute("matched"));

        let alreadyMatched = card.getAttribute("matched");
        console.log(alreadyMatched);

        if (alreadyMatched == '1' || card.id === firstCardId) {
            return;
        }

        move.addMove();
        move.updateMoves();

        if (firstMove) {
            card.classList.add('final-flip');
        }


        let win = false;

        //if win will remove event listener
        win = compareCards(card);

        let firstCard = document.getElementById(firstCardId);


        if (win) {

            card.classList.add('final-flip');
            //firstCard.classList.add('final-flip');

            card.setAttribute('matched', '1');
            firstCard.setAttribute('matched', '1');

            if (matchedPairs == 8) {
                clearTimeout(time);
                winning.createWinningScreen();
            }
            return;
        } else {

            if (flipBackBoth) {
                // alert("FIRST CARDS " + firstCard.id + " html " + firstCard.innerHTML);
                // alert("Current CARDS " + card.id + " html " + card.innerHTML);
                move.addIncorrectMove();
                // alert(star.getRemainingStars());
                star.updateStars();

                flipCard(card);
                flipCard(firstCard);
                firstCardId = undefined;
                //can get a new firstCardId

            }


        }




    }

    function createCardFront() {

        const front = document.createElement("div");
        front.classList.add('card__face');
        front.classList.add('card__face--front');
        front.innerHTML = '💐';
        return front;

    }

    function createCardBack(picture) {

        const back = document.createElement("div");
        back.classList.add('card__face');
        back.classList.add('card__face--back');
        back.innerHTML = picture;
        return back;

    }

    function createCard(picture, id) {
        const cardHolder = document.createElement("div");
        cardHolder.classList.add('card-holder');

        const card = document.createElement("div");
        card.id = id;
        card.setAttribute('value', picture);
        card.setAttribute('matched', '0');
        card.classList.add('card');

        let front = createCardFront();
        let back = createCardBack(picture);

        card.append(front);
        card.append(back);

        card.addEventListener('click', function() {
            checkForPair(card);

        });


        cardHolder.append(card);
        return cardHolder;
    }


    return {
        createCard: createCard,
        resetCard: resetCard

    };
}());


const board = (function() {

    function resetBoard() {
        let boardElement = document.getElementById('board');
        boardElement.innerHTML = "";
    }

    function prepareBoard() {
        ultility.shuffle(flowers);
        let i = 0;
        while (i < 16) {

            let board = document.getElementById("board");
            board.append(card.createCard(flowers[i], i));

            i++;
        }

    }
    return {
        prepareBoard: prepareBoard,
        resetBoard: resetBoard
    };
}());



const init = (function() {

    function play() {
        board.prepareBoard();
        let replayElement = document.getElementById('replay');
        replayElement.addEventListener('click', function() {
            replay();

        });

    }

    function replay() {
        //clear timer
        clearTimeout(time);
        //reset time
        timer.resetTime();
        // time = setInterval(timer.updateTime, 1000);
        //clear out all of the cards and hopefully their events
        board.resetBoard();
        start = false;
        move.resetMoves();
        star.resetStars();
        card.resetCard();
        board.prepareBoard();
        winning.resetWin();

    }

    return {
        play: play
    }



})();



init.play();