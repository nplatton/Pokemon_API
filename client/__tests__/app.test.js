/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

global.fetch = require('jest-fetch-mock')
let app;

describe('app.js', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/app.js');
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('requests', () => {
        
        describe('currentTrainers', () => {
            test('it retrieves all trainers', () => {
                app.currentTrainers();
                expect(fetch.mock.calls[0][0]).toMatch(/trainers$/);
            })
        })

        describe('signUp', () => {
            test('it makes a post request to /trainers with the data', () => {
                const fakeEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        name: {value: "Noah"},
                        age: {value: 23},
                        hair: {value: "Brown"},
                        eye: {value: "Blue"},
                        pokemon: {value: "Mew"}
                    }
                }
                app.signUp(fakeEvent);
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({name: "Noah", age: 23, hair: "Brown", eye: "Blue", pokemon: "Mew"}));
            })
        })

    })

    describe('helper functions', () => {

        describe('appendTrainer', () => {
            test('it adds a new element to the bottom of the page in index.html', () => {
                const test = {
                    name: 'Noah',
                    age: 23,
                    hair: 'Brown',
                    eye: 'Blue',
                    pokemon: 'Mew'
                }
                const pCount = document.querySelectorAll('div p').length
                app.appendTrainer(test);
                const newCount = document.querySelectorAll('div p').length
                expect(newCount).toBe(pCount+1)
                expect(document.querySelectorAll('div p')[newCount-1].textContent).toContain('Noah')
            })
        })

    })

})
