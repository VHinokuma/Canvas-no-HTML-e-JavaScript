/*primeiro canvas*/
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

function linha() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 300);
    ctx.stroke();    
}

function circulo() {
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
}

function retangulofixo() {
    ctx.fillStyle = "#abffc1";
    ctx.fillRect(100, 100, 180, 180);
}

function limparCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
}

/*segundo canvas*/

const canvasA = document.getElementById('canvasA');
const ctxA = canvasA.getContext('2d');
ctxA.fillStyle = '#fff6a1';
ctxA.fillRect(30, 30, 100, 80);

const canvasB = document.getElementById('canvasB');
const ctxB = canvasB.getContext('2d');
ctxB.fillStyle = '#f6a1ff';
ctxB.fillRect(30, 30, 100, 80);

/*canvas com o mouse*/
const quadro = document.getElementById("quadro");
const ctxQuadro = quadro.getContext("2d");

let ferramenta = "linha";
let x1 = 0;
let y1 = 0;

function selecionarFerramenta(nome) {
    ferramenta = nome;
    document.getElementById("status").innerText = "Ferramenta atual: " + nome;
}

quadro.addEventListener("mousedown", function(e) {
    x1 = e.offsetX;
    y1 = e.offsetY;
});

quadro.addEventListener("mouseup", function(e) {
    let x2 = e.offsetX;
    let y2 = e.offsetY;

    if (ferramenta === "linha") {
        desenharLinha(x1, y1, x2, y2);
    } else if (ferramenta === "circulo") {
        desenharCirculo(x2, y2);
    } else if (ferramenta === "retangulo") {
        desenharRetangulo(x2, y2);
    } else if (ferramenta === "borracha") {
        apagar(x2, y2);
    }
});

function desenharLinha(inicioX, inicioY, fimX, fimY) {
    ctxQuadro.beginPath();
    ctxQuadro.moveTo(inicioX, inicioY);
    ctxQuadro.lineTo(fimX, fimY);
    ctxQuadro.stroke();
}

function desenharCirculo(x, y) {
    ctxQuadro.beginPath();
    ctxQuadro.arc(x, y, 30, 0, 2 * Math.PI);
    ctxQuadro.stroke();
}

function desenharRetangulo(x, y) {
    ctxQuadro.fillStyle = "#abffc1";
    ctxQuadro.fillRect(x, y, 60, 60);
    ctxQuadro.strokeRect(x, y, 60, 60);
}

function apagar(x, y) {
    ctxQuadro.clearRect(x - 20, y - 20, 40, 40);
}

function limparQuadro() {
    ctxQuadro.clearRect(0, 0, quadro.width, quadro.height);
}
