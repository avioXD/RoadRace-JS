const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const GameOverH1 = document.querySelector('.GameOver');
const GameStartH1 = document.querySelector('.GameStart');
GameStartH1.addEventListener('click', start);

let player = { speed: 5, score: 0 };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(e.key)
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    console.log(e.key);
}

function moveLines() {
    console.log("...........Move line triggred")
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(element) {
        if (element.fromTop >= 900) {
            element.fromTop = -100;
        }
        element.fromTop += player.speed;
        element.style.top = element.fromTop + "px";
    })

}

function endGame() {
    player.start = false;
    //gameArea.classList.add('hide');
    setTimeout(() => {
        startScreen.classList.remove('hide');
        GameOverH1.classList.remove('hide');
        GameOverH1.innerText = `Game Over Score: ${player.score}`;
        gameArea.innerHTML = ``;
    }, 1000);
}

function moveEnemyCar(car) {
    let enemyCar = document.querySelectorAll(".enemy");
    enemyCar.forEach((element) => {
        if (isCollide(car, element)) {
            endGame();
        }
        if (element.fromTop >= 900) {
            element.fromTop = -250;
            element.style.left = Math.floor(Math.random() * 330) + "px";
        }
        element.fromTop += player.speed;
        element.style.top = element.fromTop + "px";
    })
}

function isCollide(a, b) {
    car = a.getBoundingClientRect();
    enemy = b.getBoundingClientRect();

    return !((car.top >= enemy.bottom) ||
        (car.bottom <= enemy.top) ||
        (car.right <= enemy.left) ||
        (car.left >= enemy.right));
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemyCar(car);
        if (keys.ArrowUp && player.y > (road.top) + 90) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom) - 150) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 70)) { player.x += player.speed }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";

        window.requestAnimationFrame(gamePlay);
        score.innerText = `${player.score++}`;
    }
    console.log("Hey I am started");
}

function start() {
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    score.classList.remove('hide');
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.fromTop = (x * 200);
        roadLine.style.top = roadLine.fromTop + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('img');
    car.setAttribute('class', 'car');
    car.setAttribute('src', './car/car1.png');
    // car.innerText = "I am car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('img');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.setAttribute('src', `./randomCars/randromcar${Math.floor(Math.random() * 6) + 1}.png`)
        enemyCar.fromTop = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.fromTop + "px";
        enemyCar.style.left = Math.floor(Math.random() * 330) + "px";
        gameArea.appendChild(enemyCar);
    }

}