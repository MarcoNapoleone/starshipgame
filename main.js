/*********************************** html imports **************************************/

const canvas = document.getElementById("game-canvas");   //canvas setting
const context = canvas.getContext("2d");
const gameButton = document.getElementById("start-stop");    //buttons to start and stop

/*********************************** classes ***************************************/

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

class BigBang {                 //the object that mind all the asteroids generation
    swarm = [];                 //array of asteroids
    spawnClock = 2000;          //time between two asteroids generation
    asteroidTravelSpeed = 100;
    timeFromLastAsteroid = 0;

    /**
     * Method that create a new asteroid and ad it to the swarm, then move all the asteroids downward
     * @param delta the diff of time between two renders
     */
    explosion(delta) {
        this.timeFromLastAsteroid += delta;
        /** if the time from the last render is bigger than the current frequency */
        if (this.timeFromLastAsteroid >= this.spawnClock) {
            /** random size between 5 and 30 */
            const size = 5 + Math.random() * 25;

            /** adding a new random position asteroid to the swarm (leaving at least 5px from borders) */
            this.swarm.push(new Asteroid(size + 5 + Math.random() * (canvas.width - size * 2 - 5), -20, this.asteroidTravelSpeed, size));
            this.timeFromLastAsteroid -= this.spawnClock;
        }
        /** moving all the asteroids forward */
        for (const asteroid of this.swarm) {
            asteroid.act(delta);
        }
        this.blackHole();
    }

    /** drawing all to the canvas */
    render() {
        for (const asteroid of this.swarm) {
            asteroid.render();
        }
    }

    /**
     * To eliminate all the asteroids passed
     */
    blackHole() {
        for (let asteroid in this.swarm) {
            if (this.swarm[asteroid].pos.y >= canvas.height + this.swarm[asteroid].size + 1)
                this.swarm.splice(asteroid, 1);
        }
        //console.log(this.swarm.length);   debugging test shows that the total number is constant
    }
}

class StarShip {

    bullets = [];
    reloadSpeed = 150;

    render() {
        context.beginPath();
        context.rect(mousePos.x - 10, canvas.height - 25, 20, 20);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
        for (let bullet of this.bullets) {
            bullet.render();
        }
    }

    act(delta) {
        for (let bullet of this.bullets) {
            bullet.act(delta);
        }
        this.deleteBullet()
    }

    shoot() {
        this.bullets.push(new Bullet(mousePos.x, mousePos.y, this.reloadSpeed, 1))
    }

    deleteBullet() {
        for (let bullet in this.bullets) {
            if (this.bullets[bullet].pos.y < 0)
                this.bullets.splice(bullet, 1);
        }
    }
}

class Bullet {

    speed = null;
    size = null;

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
        context.rect(this.pos.x, this.pos.y, 2, 5);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
    }

    act(delta) {
        this.pos.y -= this.speed * delta / 1000;
    }
}

/************************************ global variables **************************************/

let mousePos = null;
let starship = null;
let asteroidGenerator = null;
let gameStatus = "ready";   //ready, stop, inGame, pause
let score = 0;
let lastRender = Date.now();

/********************************** rendering loop ***************************************/

function renderField() {

    let now = Date.now();
    let delta = now - lastRender;
    lastRender = now;

    if (gameStatus !== "inGame") {
        window.requestAnimationFrame(renderField);
        return;
    }

    //console.log(1000 / delta); fps
    asteroidGenerator.explosion(delta);
    starship.act(delta);
    context.clearRect(0, 0, canvas.width, canvas.height);
    starship.render();
    asteroidGenerator.render();
    window.requestAnimationFrame(renderField);
}

//setTimeout(renderField, 1000 / 120);
window.requestAnimationFrame(renderField);
/******************************* interface interactions **************************************/

/**
 * making the mouse input for the canvas
 */
canvas.addEventListener("mousemove", (ev) => {
            mousePos = {
                x: ev.clientX - canvas.getBoundingClientRect().left, y: ev.clientY
        }
    }
);

/**
 * making the shooting system
 */
canvas.addEventListener("click", (ev) => {
        starship.shoot();
    }
);

/**
 * start button listener
 */
gameButton.addEventListener("click", (ev) => {

        switch (gameStatus) {
            case "ready":
                starship = new StarShip();
                asteroidGenerator = new BigBang();
                gameStatus = "inGame";
                gameButton.innerText = "pause";
                gameButton.className = "pause";
                break;
            case "inGame":
                gameStatus = "pause";
                gameButton.innerText = "Resume";
                gameButton.className = "resume";
                break;
            case "pause":
                gameStatus = "inGame";
                gameButton.innerText = "Pause";
                gameButton.className = "pause";
                break;
        }
    }
);
