class Being {
    constructor(position, maxSize, color, speed) {
        this.position = position;
        this.age = 0;
        this.size = 5;
        this.maxSize = maxSize;
        this.color = color;
        this.speed = speed;
        this.maxAge = 1000;
    }

    update(beings) {
        this.age++;
        this.size = Math.min(this.size + Math.min(this.age / this.maxAge, 1) * (this.maxSize-this.size), this.maxSize);
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