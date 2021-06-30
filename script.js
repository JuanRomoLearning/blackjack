function generateSixDeck() {
    const suits = ["Heart", "Spade", "Diamond", "Club"];
    const values = ["Ace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "King", "Queen", "Jack"];

    const sixDeck = [];
    for (let deck = 0; deck < DECKS; deck++) {
        for (let suit = 0; suit < 4; suit++) {
            for (let value = 0; value < 13; value++) {
                sixDeck.push({
                    suit: suits[suit],
                    value: values[value]
                });
            }
        }
    }
    return sixDeck;
}

// Fisher–Yates shuffle
function shuffleDeck(deck) {
    let currentIndex = deck.length;
    while (currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex--);
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
}

function dealCards(deck) {
    if ((DECKS * 52) * DECK_PENETRATION > deck.length) {
        deck.length = 0;
        deck.push(...generateSixDeck());
        shuffleDeck(deck);
    }

    const cardsDealt = [deck.pop(), deck.pop(), deck.pop(), deck.pop()];
    return [[cardsDealt[0], cardsDealt[2]], [cardsDealt[1], cardsDealt[3]]];
}

// Game Settings
const DECKS = 6;
const DECK_PENETRATION = .75; // Errors can occur if the deck penetration is too high and cards begin to be dealt from an empty deck

const deck = generateSixDeck();

shuffleDeck(deck);

let [userHand, dealerHand] = dealCards(deck);