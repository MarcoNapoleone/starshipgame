import Asteroid from "./Asteroid.js";

class BigBang {                 //the object that mind all the asteroids generation
    swarm = [];                 //array of asteroids
    spawnClock = 2000;          //time between two asteroids generation
    asteroidTravelSpeed = 100;
    timeFromLastAsteroid = 0;

    constructor(gameSpace) {
        this.gameSpace = gameSpace;
    }
    /**
     * Method that create a new asteroid and ad it to the swarm, then move all the asteroids downward
     * @param delta the diff of time between two renders
     */
    act(delta) {
        this.timeFromLastAsteroid += delta;
        /** if the time from the last render is bigger than the current frequency */
        if (this.timeFromLastAsteroid >= this.spawnClock) {
            /** random size between 5 and 30 */
            const size = 5 + Math.random() * 25;

            /** adding a new random position asteroid to the swarm (leaving at least 5px from borders) */
            this.swarm.push(new Asteroid(size + 5 + Math.random() * (this.gameSpace.width - size * 2 - 5), -20, this.asteroidTravelSpeed, size));
            this.timeFromLastAsteroid -= this.spawnClock;
        }
        /** moving all the asteroids forward */
        for (const asteroid of this.swarm) {
            asteroid.act(delta);
        }
        this.blackHole();
    }

    /** drawing all to the canvas */
    render(context) {
        for (const asteroid of this.swarm) {
            asteroid.render(context);
        }
    }

    /**
     * To eliminate all the asteroids passed
     */
    blackHole() {
        for (let asteroid in this.swarm) {
            if ((this.swarm[asteroid].pos.y >= this.gameSpace.height + this.swarm[asteroid].size + 1) || this.swarm[asteroid].size < 5)
                this.swarm.splice(asteroid, 1);
        }
        //console.log(this.swarm.length);   debugging test shows that the total number is constant
    }
}

export default BigBang;