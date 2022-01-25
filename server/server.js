const express = require('express');
const app = express();
const cors = require('cors');
const { trainers, Trainer } = require('./models/trainers')

app.use(cors());
app.use(express.json());

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// let trainers = [
//     { id: 1, name: 'Eren', age: 20, hair: 'Brown', eye: 'Brown', pokemon: 'Bulbasaur' },
//     { id: 2, name: 'Hazel', age: 21, hair: 'Dyed', eye: 'Blue', pokemon: 'Charmander'  },
//     { id: 3, name: 'Molly', age: 35, hair: 'Brown', eye: 'Blue', pokemon: 'Squirtle'  },    
//     { id: 4, name: 'Bob the Builder', age: 29, hair: 'Blonde', eye: 'Brown', pokemon: 'Jigglypuff'  },
//     {id: 5, name: 'Daniel', age: 34, hair: 'Blonde', eye: 'Green', pokemon: 'Salamence' },
//     { id: 6, name: 'Honey', age: 18, hair: 'Brown', eye: 'Green', pokemon: 'Dratini' }
// ];

// Test
app.get('/', (req, res) => {
    res.json('Hello World!')
});

// Get a list of all the trainers
app.get('/trainers', (req, res) => {
    res.json(trainers);
});

// Retrieve a specific trainer
app.get('/trainers/:name', (req, res) => {
    try {
        let reqName = req.params.name;
        let matchingTrainer = trainers.find(trainer => trainer.name.toLowerCase()===reqName.toLowerCase());
        if (!matchingTrainer) {
            throw new Error(`No trainer with the given name.`);
        }
        res.json(matchingTrainer);
    } catch(err) {
        res.status(404).json({});
    }
});

// Create a new trainer
app.post('/trainers', (req, res) => {
    try {
        let newTrainer = new Trainer(req.body);
        newTrainer.id = trainers.length+1;
        trainers.push(newTrainer);
        res.status(201).json(newTrainer);
    } catch(err) {
        res.status(404).json(err.message);
    }
});

// Update a current trainer
app.patch('/trainers/:name', (req, res) => {
    try {
        let newData = req.body;
        let name = req.params.name;
        let matchingTrainer = trainers.find((trainer) => trainer.name.toLowerCase()===name.toLowerCase());
        let trainerId = trainers.indexOf(matchingTrainer);
        if (trainerId===-1) {
            throw new Error('No trainer with the given name')
        }
        let updatedTrainer = { ...matchingTrainer, ...newData };
        trainers.splice(trainerId,1,updatedTrainer)
        res.json(updatedTrainer);
    } catch(err) {
        res.status(404).json(err.message)
    }
});

// Delete a trainer
app.delete('/trainers/:name', (req, res) => {
    try {
        let index = parseInt(req.params.id)-1
        trainers.splice(index,1);
        res.status(204).json();
    } catch(err) {
        res.status(404).json(err.message)
    }
});

app.post('/', (req,res) => {
    res.status(405).json('Not allowed.')
})

module.exports = { app };
