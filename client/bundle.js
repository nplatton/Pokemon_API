(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function currentTrainers() {
    fetch('http://localhost:3000/trainers')
        .then(r => r.json())
        .then(appendTrainers)
        .catch(console.warn)
}

function signUp(e) {
    e.preventDefault()

    const data = {
        name: e.target.name.value,
        age: e.target.age.value,
        hair: e.target.hair.value,
        eye: e.target.eye.value,
        pokemon: e.target.pokemon.value
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch('http://localhost:3000/trainers', options)
        .then(r => r.json())
        .then(appendTrainer)
        .catch(console.warn)
}

function appendTrainer(data) {
    const newP = document.createElement('p')
    newP.textContent = `Name: ${data.name} || Age: ${data.age} || Hair colour: ${data.hair} || Eye colour: ${data.eye} || Starter Pokemon: ${data.pokemon}`;
    const trainerList = document.querySelector('#trainer-list')
    trainerList.appendChild(newP);
}

function appendTrainers(trainers) {
    trainers.forEach(appendTrainer);
}

module.exports = { currentTrainers, signUp, appendTrainer, appendTrainers };

},{}],2:[function(require,module,exports){
const { currentTrainers, signUp, appendTrainer, appendTrainers } = require('./app')

const body = document.querySelector('body')

const h1 = document.querySelector('h1')
const submit = document.querySelector('#submit')
h1.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // a.forEach((item) => {
    //     item.classList.add('dark-mode');
    // })
    submit.classList.toggle('dark-mode-btn');
})

const form = document.querySelector('form')
form.addEventListener('submit', signUp);

currentTrainers();

},{"./app":1}]},{},[2]);
