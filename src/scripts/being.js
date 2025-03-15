import { normalDraw } from "./utility.js";

class Being {
    constructor(position, maxAge, maxSize, color, speed) {
        this.position = position;
        this.age = 0;
        this.maxAge = maxAge;
        this.size = 5;
        this.maxSize = maxSize;
        // At 20% of maxAge, the being will be at max size
        this.growthRate = (this.maxSize - this.size) / (this.maxAge * normalDraw(0.2, 0.05));
        this.color = color;
        this.speed = speed;
    }

    update(beings) {
        this.age++;
        console.log(this.age / this.maxAge);
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }
        if (this.age >= this.maxAge) {
            beings.splice(beings.indexOf(this), 1);
        }
        this.position.x += (Math.random()-.5) * this.speed;
        this.position.y += (Math.random()-.5) * this.speed;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

export { Being };