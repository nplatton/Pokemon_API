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
