class Asteroid {

    speed = 150;
    size = null;
    shape = "circle";


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
        context.arc(this.pos.x, this.pos.y, this.size, 0, 360);
        context.fillStyle = "#ffffff";
        context.fill();
        context.closePath();
    }

    act(delta) {
        this.pos.y += this.speed * delta / 1000;
    }
}

export default Asteroid;