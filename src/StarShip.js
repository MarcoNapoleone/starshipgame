
import Bullet from "./Bullet.js";

class StarShip {

    bullets = [];
    reloadSpeed = 150;
    shape = "rect";
    size = 20;

    constructor(gameSpace) {
        this.gameSpace = gameSpace;
        this.pos = {};
    }

    render(context) {
        context.beginPath();
        context.rect(this.pos.x - this.size/2, this.pos.y - this.size/2 , this.size, this.size);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
        for (let bullet of this.bullets) {
            bullet.render(context);
        }
    }

    act(delta) {
        for (let bullet of this.bullets) {
            bullet.act(delta);
        }
        this.deleteBullet()
    }

    shoot() {
        this.bullets.push(new Bullet(this.pos.x, this.gameSpace.clientHeight - 25, this.reloadSpeed, 10))
    }

    deleteBullet() {
        for (let bullet in this.bullets) {
            if (this.bullets[bullet].pos.y < 0 || this.bullets[bullet].hp < 1)
                this.bullets.splice(bullet, 1);
        }
    }
}

export default StarShip;