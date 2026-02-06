// --- LÓGICA DE INTERFAZ ---
const roleScreen = document.getElementById('role-screen');
const appScreen = document.getElementById('app-screen');
const roleDisplay = document.getElementById('user-role-display');
const adminControls = document.getElementById('admin-controls');

function selectRole(role) {
    roleScreen.classList.remove('active');
    roleScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
    appScreen.classList.add('active');
    
    roleDisplay.textContent = `Rol: ${role.toUpperCase()}`;
    
    // Mostrar controles solo si es admin
    if(role === 'admin') {
        adminControls.classList.remove('hidden');
    } else {
        adminControls.classList.add('hidden');
    }
    
    startMapSimulation();
}

function goBack() {
    appScreen.classList.add('hidden');
    appScreen.classList.remove('active');
    roleScreen.classList.add('active');
    roleScreen.classList.remove('hidden');
}

// --- SIMULACIÓN DE MAPA OFFLINE (CANVAS) ---
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

let car = { x: 0, y: 0, angle: 0, speed: 0 };
let mapOffset = { x: 0, y: 0 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60; // Restar header
    car.x = canvas.width / 2;
    car.y = canvas.height / 2;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawCar() {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);

    // Diseño Realista del Auto (Dibujado con código)
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(-12, -22, 24, 48);

    // Chasis
    ctx.fillStyle = '#ff4757'; // Color rojo deportivo
    ctx.beginPath();
    ctx.roundRect(-10, -20, 20, 40, 5);
    ctx.fill();

    // Parabrisas
    ctx.fillStyle = '#333';
    ctx.fillRect(-8, -10, 16, 8); // Delantero
    ctx.fillRect(-8, 12, 16, 6);  // Trasero
    
    // Luces
    ctx.fillStyle = '#ffeb3b'; // Faros
    ctx.fillRect(-9, -21, 5, 2);
    ctx.fillRect(4, -21, 5, 2);

    ctx.restore();
}

function drawGrid() {
    // Simulamos calles moviendo el fondo, no el auto
    const gridSize = 100; // Tamaño de cuadra
    const roadWidth = 20;

    ctx.fillStyle = '#0d0d0d'; // Suelo
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    // Dibujamos lineas verticales y horizontales simulando movimiento
    for (let x = mapOffset.x % gridSize; x < canvas.width; x += gridSize) {
        ctx.fillStyle = '#222'; // Calles
        ctx.fillRect(x, 0, roadWidth, canvas.height);
        
        // Lineas de calle
        ctx.fillStyle = '#444';
        ctx.fillRect(x + roadWidth/2 - 1, 0, 2, canvas.height);
    }
    
    for (let y = mapOffset.y % gridSize; y < canvas.height; y += gridSize) {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, y, canvas.width, roadWidth);
        
        ctx.fillStyle = '#444';
        ctx.fillRect(0, y + roadWidth/2 - 1, canvas.width, 2);
    }
}

function updateInfo() {
    // Simular velocidad
    document.getElementById('speed').innerText = Math.floor(Math.random() * 5 + 40);
    // Simular distancia
    document.getElementById('distance').innerText = Math.floor(Date.now() / 1000);
}

function animate() {
    // Simular movimiento "infinito"
    mapOffset.y += 2; 
    
    drawGrid();
    drawCar();
    updateInfo();
    requestAnimationFrame(animate);
}

function startMapSimulation() {
    animate();
}
