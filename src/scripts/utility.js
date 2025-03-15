function normalDraw(mean, stdev, min = -Infinity, max = Infinity) {
    const z0 = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
    return Math.min(Math.max(z0 * stdev + mean, min), max);
}


export { normalDraw };