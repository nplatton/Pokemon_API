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
