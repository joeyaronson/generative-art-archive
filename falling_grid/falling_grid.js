function setup() {
    createCanvas(2000, 2000);
    colorMode(HSB, 100);
    loadArr();
}

let g1 = [];
let g2 = [];
let g3 = [];
let g4 = [];
let g5 = [];
let g6 = [];
let prevArr = [];

const size = 50;
let noiseVal = 0.09;
let noiseVal2 = 0.01;

function draw() {
    background(0, 30);
    updateArr();
    drawArr(g6, width / 5.5, frameCount);
    drawArr(g5, width / 5, frameCount + 10);
    drawArr(g4, width / 4.5, frameCount + 20);
    drawArr(g3, width / 4, frameCount + 30);
    drawArr(g2, width / 3.5, frameCount + 40);
    drawArr(g1, width / 3, frameCount + 50);
}

function loadArr() {
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            let n = noise(i * noiseVal, j * noiseVal, frameCount * noiseVal2);
            row.push(n > 0.5);
        }
        g1.push(row);
    }
}

function drawArr(arr, offset, col) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let n = arr[i][j];
            if (n > 0.55) {
                let xoff = width / 2 - offset + i * ((offset * 2) / arr.length);
                let yoff =
                    height / 2 - offset + j * ((offset * 2) / arr.length);
                let nMap = map(n, 0, 1, -1, 1);
                let hMap = map(offset, width / 3, width / 5.5, 50, 20);
                stroke((col + nMap * 10) % 100, 100, 100, hMap);
                fill((col + nMap * 10) % 100, 100, 100, hMap / 2);
                rect(
                    xoff + (nMap * offset * 2) / arr.length,
                    yoff + (nMap * offset * 2) / arr.length,
                    (offset * 2) / arr.length,
                    (offset * 2) / arr.length
                );
            }
        }
    }
}

function updateArr() {
    g6 = Array.from(g5);
    g5 = Array.from(g4);
    g4 = Array.from(g3);
    g3 = Array.from(g2);
    g2 = Array.from(prevArr);
    prevArr = Array.from(g1);
    for (let i = 0; i < g1.length; i++) {
        for (let j = 0; j < g1[i].length; j++) {
            let n = noise(i * noiseVal, j * noiseVal, frameCount * noiseVal2);
            g1[i][j] = n;
        }
    }
}
