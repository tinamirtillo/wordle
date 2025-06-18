const parolaSegreta = "BURRO";  // Cambia con la parola che vuoi!
let tentativi = 0;
const maxTentativi = 6;

function creaGriglia() {
    const grid = document.getElementById("grid");
    for (let i = 0; i < maxTentativi * 5; i++) {
        const div = document.createElement("div");
        div.classList.add("letter-box");
        grid.appendChild(div);
    }
}

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
        alert("La parola deve essere di 5 lettere!");
        return;
    }

    const grid = document.getElementById("grid");
    const rowStart = tentativi * 5;
    
    for (let i = 0; i < 5; i++) {
        const box = grid.children[rowStart + i];
        box.textContent = guess[i];

        if (guess[i] === parolaSegreta[i]) {
            box.classList.add("correct");
        } else if (parolaSegreta.includes(guess[i])) {
            box.classList.add("present");
        } else {
            box.classList.add("absent");
        }
    }

    tentativi++;
    guessInput.value = "";

    if (guess === parolaSegreta) {
        document.getElementById("message").textContent = "Bravo! 🎉 Hai sbloccato la password nascosta!";
        guessInput.disabled = true;
        triggerFireworks();
        showDogs();
    } else if (tentativi >= maxTentativi) {
        document.getElementById("message").textContent = "Peccato! Hai perso. ";
        guessInput.disabled = true;
    }
}

function createFirework(x, y) {
    for (let i = 0; i < 10; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${x + Math.random() * 100 - 50}px`;
        firework.style.top = `${y + Math.random() * 100 - 50}px`;
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}

function triggerFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(window.innerWidth / 2, window.innerHeight / 3);
        }, i * 500);
    }
}

function showDogs() {
    let dogs = ["dog1.png", "dog2.png", "dog3.png"];  // Usa i nomi delle immagini
    dogs.forEach((dog, index) => {
        let img = document.createElement("img");
        img.src = dog;
        img.classList.add("dog");
        img.style.left = `${20 + index * 150}px`;
        img.style.bottom = "20px";
        document.body.appendChild(img);
    });
}

window.onload = creaGriglia;
