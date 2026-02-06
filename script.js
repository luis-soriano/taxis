const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let appState = { role: '', user: '', status: 'idle' };
let mapImg = new Image();
mapImg.src = 'mapa_guaranda.jpg'; // Recuerda subir este archivo

function initApp(role) {
    const name = document.getElementById('user-name').value || role;
    appState.role = role;
    appState.user = name;

    document.getElementById('role-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    
    // Activar UI correspondiente
    document.getElementById(`ui-${role}`).classList.remove('hidden');
    
    resize();
    startSync(); // Iniciar sincronización de "datos"
    animate();
}

// SIMULACIÓN DE RED (Usando LocalStorage)
function startSync() {
    setInterval(() => {
        const pedido = JSON.parse(localStorage.getItem('uber_pedido'));
        
        if (appState.role === 'conductor' && pedido && pedido.status === 'buscando') {
            document.getElementById('ride-request').classList.remove('hidden');
            document.getElementById('req-name').innerText = pedido.cliente;
            document.getElementById('req-dest').innerText = pedido.destino;
        }

        if (appState.role === 'cliente' && pedido && pedido.status === 'aceptado') {
            showTripStatus("El conductor ha aceptado", "Llega en 2 min • Toyota Corolla");
        }
    }, 2000);
}

function requestRide() {
    const destino = document.getElementById('dest-input').value || "Centro de Guaranda";
    const pedido = { cliente: appState.user, destino: destino, status: 'buscando' };
    localStorage.setItem('uber_pedido', JSON.stringify(pedido));
    
    document.getElementById('btn-request').innerText = "BUSCANDO CONDUCTOR...";
    document.getElementById('btn-request').style.background = "#555";
}

function acceptRide() {
    const pedido = JSON.parse(localStorage.getItem('uber_pedido'));
    pedido.status = 'aceptado';
    pedido.conductor = appState.user;
    localStorage.setItem('uber_pedido', JSON.stringify(pedido));
    
    document.getElementById('ride-request').classList.add('hidden');
    document.getElementById('driver-info').innerText = "En viaje con " + pedido.cliente;
}

function showTripStatus(msg, sub) {
    document.getElementById('ui-cliente').classList.add('hidden');
    document.getElementById('trip-status').classList.remove('hidden');
    document.getElementById('trip-msg').innerText = msg;
    document.getElementById('trip-sub').innerText = sub;
}

// RENDERIZADO DEL MAPA
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mapImg.complete) {
        ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#111"; ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    
    // Dibujar vehículo del conductor (Si hay viaje activo)
    drawVehicle(canvas.width/2, canvas.height/2);
    requestAnimationFrame(animate);
}

function drawVehicle(x, y) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.roundRect(x-10, y-20, 20, 40, 4);
    ctx.fill();
    // Luces
    ctx.fillStyle = "#fff"; ctx.fillRect(x-8, y-18, 5, 2); ctx.fillRect(x+3, y-18, 5, 2);
}

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize;
