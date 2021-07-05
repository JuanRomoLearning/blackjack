function generateDeck() {
    const suits = ["Club", "Diamond", "Heart", "Spade"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

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

// Hard Coded to only support 1 player alongside the dealer
function dealCards(deck) {
    // Create a new shuffled deck if we reach the deck penetration limit
    if ((DECKS * 52) * DECK_PENETRATION > deck.length) {
        deck.length = 0;
        deck.push(...generateDeck());
        shuffleDeck(deck);
    }

    const cardsDealt = [deck.pop(), deck.pop(), deck.pop(), deck.pop()];
    return [[cardsDealt[0], cardsDealt[2]], [cardsDealt[1], cardsDealt[3]]];
}

function calculateHandScore(hand) {
    hand.sort((firstCard) => firstCard.value === "Ace" ? 1 : -1); // Move aces to the back to determine their value after all other cards are accounted for

    let handScore = 0;
    for (let card of hand) {
        switch (card.value) {
            case "Ace":
                handScore += handScore + 11 <= 21 ? 11 : 1;
                break;
            case "Jack":
            case "Queen":
            case "King":
                handScore += 10;
                break;
            default:
                handScore += parseInt(card.value);
                break;
        }
    }
    return handScore;
}

// Game Settings
const DECKS = 6;
const DECK_PENETRATION = .75; // Errors can occur if the deck penetration is set too high and cards begin to be dealt from an empty deck

const deck = generateDeck();

shuffleDeck(deck);

let [userHand, dealerHand] = dealCards(deck);

console.log(`Dealer's Hand: ${dealerHand[0].value} of ${dealerHand[0].suit}s for a hand score of ${calculateHandScore(dealerHand.slice(0, 1))}`);

console.log(`Your Hand: ${userHand[0].value} of ${userHand[0].suit}s and ${userHand[1].value} of ${userHand[1].suit}s for a hand score of ${calculateHandScore(userHand)}`);