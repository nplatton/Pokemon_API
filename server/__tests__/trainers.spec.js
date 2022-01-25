// import model and data
const { Trainer } = require('../models/trainers');

describe('Trainer model', () => {
    const testTrainer = {
        name: 'Armin',
        age: 21,
        eye: 'Blue',
        hair: 'Blonde',
        pokemon: 'Pikachu'
    };

    it('should make an instance of a trainer', () => {
        const trainer = new Trainer({ id: 21, ...testTrainer });

        expect(trainer.id).toBe(21);
        expect(trainer.name).toBe('Armin');
        expect(trainer.age).toBe(21);
        expect(trainer.hair).toBe('Blonde');
        expect(trainer.eye).toBe('Blue');
        expect(trainer.pokemon).toBe('Pikachu')
    });
});
