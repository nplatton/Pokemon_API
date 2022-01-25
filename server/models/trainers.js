let trainers = [
    { id: 1, name: 'Eren', age: 20, hair: 'Brown', eye: 'Brown', pokemon: 'Bulbasaur' },
    { id: 2, name: 'Hazel', age: 21, hair: 'Dyed', eye: 'Blue', pokemon: 'Charmander'  },
    { id: 3, name: 'Molly', age: 35, hair: 'Brown', eye: 'Blue', pokemon: 'Squirtle'  },    
    { id: 4, name: 'Bob the Builder', age: 29, hair: 'Blonde', eye: 'Brown', pokemon: 'Jigglypuff'  },
    {id: 5, name: 'Daniel', age: 34, hair: 'Blonde', eye: 'Green', pokemon: 'Salamence' },
    { id: 6, name: 'Honey', age: 18, hair: 'Brown', eye: 'Green', pokemon: 'Dratini' }
];

class Trainer {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.eye = data.eye;
        this.hair= data.hair;
        this.pokemon = data.pokemon;
    }

    // static get all() {
    //     const trainers = trainerData.map((trainer) => new Trainer(trainer));
    //     return trainer;
    // }
}

module.exports = { trainers, Trainer };
