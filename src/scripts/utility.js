function normalDraw(mean, stdev, min = -Infinity, max = Infinity) {
    const z0 = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
    return Math.min(Math.max(z0 * stdev + mean, min), max);
}

function getColorProximity(color1, color2) {
    return 1 - Math.sqrt(
        (color1[0] - color2[0]) ** 2 +
        (color1[1] - color2[1]) ** 2 +
        (color1[2] - color2[2]) ** 2
    ) / Math.sqrt(3 * 255 ** 2);
}


export { normalDraw, getColorProximity};