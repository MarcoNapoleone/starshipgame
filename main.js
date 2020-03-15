import StarShip from "./src/StarShip.js";
import Game from "./src/Game.js";
import BigBang from "./src/BigBang.js";
import {checkCollision} from "./src/Game.js";

const canvas = document.getElementById("game-canvas");   //canvas setting
const context = canvas.getContext("2d");
const container = document.getElementById("game-container");
const gameButton = document.getElementById("start-stop");    //buttons to start and stop
const canvasReference = document.getElementById("button-canvas-reference");

/************************************ global variables **************************************/

let starShip = null;
let game = new Game("ready", gameButton);
let asteroidGenerator = null;
let score = 0;
let lastRender = Date.now();

/********************************** rendering loop ***************************************/

function renderField() {

    let now = Date.now();
    let delta = now - lastRender;
    lastRender = now;

    if (game.status !== "inGame") {
        window.requestAnimationFrame(renderField);
        return;
    }

    for (let asteroid of asteroidGenerator.swarm) {
        for (let bullet of starShip.bullets) {
            if (checkCollision(asteroid, bullet)) {
                asteroid.size -= 5;
                bullet.hp--;
            }
        }
        if (checkCollision(asteroid, starShip)) {
            console.log("crash");
        }
    }
    asteroidGenerator.act(delta);
    starShip.act(delta);
    context.clearRect(0, 0, canvas.width, canvas.height);
    starShip.render(context);
    asteroidGenerator.render(context);
    window.requestAnimationFrame(renderField);
}

//setTimeout(renderField, 1000 / 120);
window.requestAnimationFrame(renderField);


/******************************* interface interactions **************************************/

canvas.addEventListener("mousemove", (ev) => {
        starShip.pos = {
            x: ev.clientX - canvas.getBoundingClientRect().left,
            y: canvas.height - 25,
        };
    }, {passive: true}
);

/**
 * making the shooting system
 */
canvas.addEventListener("click", (ev) => {
        starShip.shoot();
    }
);

/**
 * start button listener
 */
gameButton.addEventListener("click", (ev) => {

        switch (game.status) {

            case "ready":
                starShip = new StarShip(canvas);
                asteroidGenerator = new BigBang(canvas);
                game.start();
                break;

            case "inGame":
                game.pause();
                break;

            case "pause":
                game.start();
                break;
        }
    }
);

canvas.addEventListener("mouseout", (ev) => {
        if (game.status === "inGame") {
            game.pause();
        }
    }
);

