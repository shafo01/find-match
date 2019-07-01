let flowers = ['&#127801;', '🌼',
    '🌻', '🌺', '🏵', '🌸',
    '🌻', '🌺', '🍀', '🌷',
    '🌷', '🍀', '🌸', '🏵',
    '🌼', '&#127801;'
];

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

ultility.shuffle(flowers);

const card = (function() {

    function createCard(picture) {
        const cardHolder = document.createElement("div");
        cardHolder.classList.add('card-holder');

        const carda = document.createElement("div");
        carda.classList.add('card');

        const front = document.createElement("div");
        front.classList.add('card__face');
        front.classList.add('card__face--front');
        front.innerHTML = '💐';

        const back = document.createElement("div");
        back.classList.add('card__face');
        back.classList.add("card__face--back");
        back.innerHTML = picture;

        carda.append(front);
        carda.append(back);

        carda.addEventListener('click', function() {
            carda.classList.remove('is-flipped');
            window.requestAnimationFrame(function() {
                carda.classList.add('is-flipped');
            });

        });


        cardHolder.append(carda);
        return cardHolder;
    }


    return {
        createCard: createCard

    };
}());

let i = 0;
while (i < 16) {
    const cardHolder = document.createElement("div");
    cardHolder.classList.add('card-holder');

    const carda = document.createElement("div");
    carda.classList.add('card');

    const front = document.createElement("div");
    front.classList.add('card__face');
    front.classList.add('card__face--front');
    front.innerHTML = '💐';

    const back = document.createElement("div");
    back.classList.add('card__face');
    back.classList.add("card__face--back");
    back.innerHTML = flowers[i];

    carda.append(front);
    carda.append(back);

    carda.addEventListener('click', function() {
        carda.classList.remove('is-flipped');
        window.requestAnimationFrame(function() {
            carda.classList.add('is-flipped');
        });
        // card.classList.toggle('is-flipped');

    });


    cardHolder.append(carda);

    let board = document.getElementById("board");
    board.append(cardHolder);

    i++;
}