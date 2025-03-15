class Being {
    constructor(position, size, color) {
        this.position = position;
        this.age = 0;
        this.size = size;
        this.color = color;
        this.speed = 1;
        this.maxAge = 1000;
    }

    update(beings) {
        this.age++;
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