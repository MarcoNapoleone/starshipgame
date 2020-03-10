const canvas = document.getElementById("game-space");
const context = canvas.getContext("2d");

const startBut = document.getElementById("start");
const stopBut = document.getElementById("stop");

class Asteroid {

    speed = 150;
    size = 10;

    pos = {
        x: null, y: null
    };

    constructor(x, y, speed, size) {
        this.pos.x = x;
        this.pos.y = y;
        this.size = size;
        this.speed = speed;
    }

    render() {
        context.beginPath();
        context.arc(this.pos.x, this.pos.y + 10, this.size, 0, 360);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
    }

    act(delta) {
        this.pos.y += this.speed * delta / 1000;
    }
}

class BigBang {

    swarm = [];
    spawnClock = 2000;    //time between two asteroids generation
    asteroidTravelSpeed = 100;
    timeFromLastAsteroid = 0;

    act(delta) {
        this.timeFromLastAsteroid += delta;
        if (this.timeFromLastAsteroid >= this.spawnClock) {
            const size = 5 + Math.random() * 25;
            this.swarm.push(new Asteroid(5 + Math.random() * (canvas.width - 10), -20, this.asteroidTravelSpeed, size));
            this.timeFromLastAsteroid -= this.spawnClock;
        }
        for (const asteroid of this.swarm) {
            asteroid.act(delta);
        }
    }

    render() {
        for (const asteroid of this.swarm) {
            asteroid.render();
        }
    }
}

class StarShip {

    render() {
        context.beginPath();
        context.rect(mousePos.x - 10, canvas.height - 30, 20, 20);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
    }
}

let mousePos = null;
let starship = null;
let asteroidGenerator = null;
let gameStatus = "ready";   //ready, stop , inGame
let score = 0;

let lastRender = Date.now();

function renderField() {

    if (gameStatus !== "inGame") {
        setTimeout(renderField, 1000 / 120);
        return;
    }
    let now = Date.now();
    let delta = now - lastRender;
    lastRender = now;

    console.log(1000 / delta);
    asteroidGenerator.act(delta);
    context.clearRect(0, 0, canvas.width, canvas.height);
    starship.render();
    asteroidGenerator.render();
    setTimeout(renderField, 1000 / 120);
}

setTimeout(renderField, 1000 / 120);


canvas.addEventListener("mousemove", (ev) => {
        mousePos = {
            x: ev.clientX, y: ev.clientY
        };
    }
);

startBut.addEventListener("click", (ev) => {
        if (gameStatus === "ready") {
            starship = new StarShip();
            asteroidGenerator = new BigBang();
            gameStatus = "inGame";
        }
    }
);

stopBut.addEventListener("click", (ev) => {
        if (gameStatus === "inGame") {
            gameStatus = "stop";
            context.clearRect(0, 0, canvas.width, canvas.height);
            asteroidGenerator = null;
        }
    }
);

