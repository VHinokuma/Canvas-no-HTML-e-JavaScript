// ==========================================
// 1. PRIMEIRO CANVAS (myCanvas - Botões Fixos)
// ==========================================
const c = document.getElementById("myCanvas");
const ctxMyCanvas = c.getContext("2d");

function linha() {
    ctxMyCanvas.beginPath(); // Evita que a linha se conecte a desenhos anteriores
    ctxMyCanvas.moveTo(0, 0);
    ctxMyCanvas.lineTo(300, 300);
    ctxMyCanvas.stroke();    
}

function circulo() {
    ctxMyCanvas.beginPath();
    ctxMyCanvas.arc(95, 50, 40, 0, 2 * Math.PI);
    ctxMyCanvas.stroke();
}

function retangulofixo() {
    ctxMyCanvas.fillStyle = "#abffc1";
    ctxMyCanvas.fillRect(100, 100, 180, 180);
}

function limparCanvas() {
    ctxMyCanvas.setTransform(1, 0, 0, 1, 0, 0);
    ctxMyCanvas.clearRect(0, 0, c.width, c.height);
}

// ==========================================
// 2. CANVAS DENTRO DAS DIVS (Canvas A e B)
// ==========================================
const canvasA = document.getElementById('canvasA');
const ctxA = canvasA.getContext('2d');
ctxA.fillStyle = '#fff6a1';
ctxA.fillRect(30, 30, 100, 80);

const canvasB = document.getElementById('canvasB');
const ctxB = canvasB.getContext('2d');
ctxB.fillStyle = '#f6a1ff';
ctxB.fillRect(30, 30, 100, 80);

// ==========================================
// 3. QUADRO INTERATIVO COM MOUSE (quadro)
// ==========================================
const canvas = document.getElementById('quadro');
const ctxQuadro = canvas.getContext('2d');
const botoesTool = document.querySelectorAll('.tool');
const inputCor = document.getElementById('cor');
const btnLimparTudo = document.getElementById('limparTudo');

let desenhando = false;
let ferramentaAtual = 'linha';
let inicioX = 0;
let inicioY = 0;
let snapshot;

botoesTool.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tool.active').classList.remove('active');
        btn.classList.add('active');
        ferramentaAtual = btn.dataset.tool;
    });
});

btnLimparTudo.addEventListener('click', () => {
    ctxQuadro.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', (e) => {
    desenhando = true;
    inicioX = e.offsetX;
    inicioY = e.offsetY;
    
    ctxQuadro.beginPath();
    ctxQuadro.lineWidth = 2;
    ctxQuadro.strokeStyle = inputCor.value;
    
    snapshot = ctxQuadro.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousemove', (e) => {
    if (!desenhando) return;

    const atualX = e.offsetX;
    const atualY = e.offsetY;

    if (ferramentaAtual === 'borracha') {
        ctxQuadro.clearRect(atualX - 10, atualY - 10, 20, 20);
        return;
    }

    ctxQuadro.putImageData(snapshot, 0, 0);

    if (ferramentaAtual === 'linha') {
        desenharLinha(atualX, atualY);
    } else if (ferramentaAtual === 'retangulo') {
        desenharRetangulo(atualX, atualY);
    } else if (ferramentaAtual === 'circulo') {
        desenharCirculo(atualX, atualY);
    }
});

canvas.addEventListener('mouseup', () => {
    desenhando = false;
});

function desenharLinha(x, y) {
    ctxQuadro.beginPath();
    ctxQuadro.moveTo(inicioX, inicioY);
    ctxQuadro.lineTo(x, y);
    ctxQuadro.stroke();
}

function desenharRetangulo(x, y) {
    const largura = x - inicioX;
    const altura = y - inicioY;
    ctxQuadro.strokeRect(inicioX, inicioY, largura, altura);
}

function desenharCirculo(x, y) {
    ctxQuadro.beginPath();
    const raio = Math.sqrt(Math.pow(x - inicioX, 2) + Math.pow(y - inicioY, 2));
    ctxQuadro.arc(inicioX, inicioY, raio, 0, 2 * Math.PI);
    ctxQuadro.stroke();
}