class Bullet {

    speed = null;
    size = null;
    shape = "arrow";

    pos = {
        x: null, y: null
    };

    constructor(x, y, speed, size) {
        this.pos.x = x;
        this.pos.y = y;
        this.size = size;
        this.speed = speed;
    }

    render(context) {
        context.beginPath();
        context.rect(this.pos.x - this.size / 10, this.pos.y - this.size / 4, this.size / 5, this.size / 2);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
    }

    act(delta) {
        this.pos.y -= this.speed * delta / 1000;
    }
}

export default Bullet;