class Game { //ready, stop, inGame, pause

    status;
    button;

    constructor(opt, button) {
        this.status = opt;
        this.button = button;
    }

    start() {
        this.status = "inGame";
        this.button.innerText = "pause";
        this.button.className = "pause";
    }

    pause() {
        this.status = "pause";
        this.button.innerText = "Resume";
        this.button.className = "resume";
    }

}

function checkCollision(obj1, obj2) {
    let crash;
    switch (obj1.shape) {
        case "circle":
            switch (obj2.shape) {
                case "circle":
                    if (distance(obj1.pos, obj2.pos) <= obj2.size + obj1.size) {
                        return true;
                    }
                    break;

                case "rect":
                    if ((obj1.pos.x >= obj2.pos.x - obj2.size / 2 && obj1.pos.x <= obj2.pos.x + obj2.size / 2) ||
                        (obj1.pos.y >= obj2.pos.y - obj2.size / 2 && obj1.pos.y <= obj2.pos.y + obj2.size / 2)) {
                        if ((obj1.size + obj2.size / 2) <= (obj2.pos.x - obj1.pos.x) && (obj1.size + obj2.size / 2 <= (obj2.pos.y - obj1.pos.y))) {
                            return true;
                        }
                    } else {
                        if (distance(obj1.pos, {
                            x: obj2.pos.x + obj2.size / 2,
                            y: obj2.y + obj2.size / 2
                        }) <= obj1.size) {
                            return true;
                        } else if (distance(obj1.pos, {
                            x: obj2.pos.x + obj2.size / 2,
                            y: obj2.y - obj2.size / 2
                        }) <= obj1.size) {
                            return true;
                        } else if (distance(obj1.pos, {
                            x: obj2.pos.x - obj2.size / 2,
                            y: obj2.y + obj2.size / 2
                        }) <= obj1.size) {
                            return true;
                        } else if (distance(obj1.pos, {
                            x: obj2.pos.x - obj2.size / 2,
                            y: obj2.y - obj2.size / 2
                        }) <= obj1.size) {
                            return true;
                        }
                    }
                    break;

                case "arrow":
                    if (distance(obj1.pos, {x: obj2.pos.x, y: obj2.y + obj2.size / 2}) <= obj1.size) {
                        return true;
                    } else if (distance(obj1.pos, {x: obj2.pos.x, y: obj2.y - obj2.size / 2}) <= obj1.size) {
                        return true;
                    }
                    break;
            }
            break;

        case "rect":
            switch (obj2.shape) {
                case "circle":
                    return checkCollision(obj2, obj1);
                case "rect":
                    if ((obj1.size / 2 + obj2.size / 2) <= (obj2.pos.x - obj1.pos.x) && (obj1.size / 2 + obj2.size / 2 <= (obj2.pos.y - obj1.pos.y))) {
                        return true;
                    }
                    break;
                case "arrow":
                    if ((obj1.size / 2 + obj2.size / 10) <= (obj2.pos.x - obj1.pos.x) && (obj1.size / 2 + obj2.size / 4 <= (obj2.pos.y - obj1.pos.y))) {
                        return true;
                    }
                    break;
            }
            break;

        case "arrow":
            switch (obj2.shape) {
                case "circle":
                    checkCollision(obj2, obj1);
                    break;
                case "rect":
                    checkCollision(obj2, obj1);
                    break;
                case "arrow":
                    throw new Error ("not implemented yet");
                    //break;
            }
            break;
    }


    return crash;
}

function distance(pt1, pt2) {
    return Math.sqrt(((pt1.x) - (pt2.x)) ** 2 + ((pt1.y) - (pt2.y)) ** 2);
}

export default Game;
export {checkCollision};