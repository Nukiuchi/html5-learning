const __DEBUG__ = true;

class Card {
    constructor(value = 53) {
        this.value = value;
    }

    get suit() {
        return Math.floor(this.value / 13);
    }

    get rank() {
        return this.value % 13 + 1;
    }
}

class PackOfCards {
    constructor() {
        this.cards = [];
    }
    
    shuffle() {
        //awesome shuffle algorithm here
    }

    sort() {
        //awesome sort algorithm here
    }

    
        // return array of cards from pack
    draw(count = 1) {
        cards = [];

        for(let i=0;i<count&&i<this.cards.length;i++) {
            cards.push(this.cards.shift());
        }

        return cards;
    }

    
        //put card to pack, to optionally specified position
    put(cards, index) {
        //if undefined index, put to random position
        index = index || Math.floor(Math.random() * this.cards.length);

        //make sure we put the card into pack and not outside it
        index = index >= this.cards.length ? this.cards.length : index;

        //if pushing to bottom of pack, put it to end
        index = index === -1 ? this.cards.length : index;

        //if empty pack, push to first index
        index = this.cards.length === 0 ? 0 : index;

        this.cards.splice(index, 0, cards);
    }
}

class Deck extends PackOfCards {
    constructor(count = 52) {
        this.cards = [];

        for(let i=0;i<count;i++) {
            this.cards.push(new Card(i));
        }
    }


}

class Hand extends PackOfCards {


}

// Initialise
document.addEventListener("DOMContentLoaded", event => {
    log("ready");
});


function log(param) {
    if(__DEBUG__) {
        console.log(param);
    }
}