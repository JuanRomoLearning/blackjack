function generateSixDeck() {
    const suits = ["Heart", "Spade", "Diamond", "Club"];
    const values = ["Ace", "1", "2", "3", "4", "5", "6", "7", "8", "9", "King", "Queen", "Jack"];

    const sixDeck = [];
    for (let deck = 0; deck < 6; deck++) {
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

console.log("♠ ♥ Blackjack ♣ ♦");

let deck = generateSixDeck();

shuffleDeck(deck);