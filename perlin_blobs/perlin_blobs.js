function setup() {
    noStroke();
    createCanvas(1000, 1000);
    w = width / 50;
}
let W;
function draw() {
    blendMode(BLEND);
    background(255);
    // turn on exclusion
    blendMode(EXCLUSION);

    for (let i = 0; i < width; i += w) {
        for (let j = 0; j < height; j += w) {
            let n = noise(i * 0.002, j * 0.002, frameCount * 0.05);
            if (n > 0.5) {
                fill(255, 0, 0);
                rect(i, j, w, w);
            }
            let n2 = noise(i * 0.002, j * 0.002, frameCount * 0.05 + 1000);
            if (n2 > 0.5) {
                fill(0, 255, 0);
                rect(i, j, w, w);
            }
            let n3 = noise(j * 0.002, i * 0.002, frameCount * 0.05);
            if (n3 > 0.5) {
                fill(0, 0, 255);
                rect(i, j, w, w);
            }
        }
    }
}
