// CONFIGURACIÓN DE FIREBASE (Reemplaza con tus datos de Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyB...", 
    databaseURL: "https://tu-proyecto.firebaseio.com", // PON TU URL DE DATABASE AQUÍ
    projectId: "tu-proyecto",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let appState = { role: '', user: '', tripId: 'viaje_unico' };
let mapImg = new Image();
mapImg.src = 'mapa_guaranda.jpg'; // Asegúrate de tener esta imagen en tu carpeta

function iniciarApp(role) {
    const name = document.getElementById('user-name').value.trim() || role;
    appState.role = role;
    appState.user = name;

    document.getElementById('role-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById(`ui-${role}`).classList.remove('hidden');

    resize();
    escucharBaseDeDatos();
    animate();
}

// SINCRONIZACIÓN ENTRE DISPOSITIVOS
function solicitarViaje() {
    const destino = document.getElementById('input-destino').value;
    if(!destino) return alert("Ingresa un destino");

    // Subir el pedido a la nube
    db.ref('pedidos/' + appState.tripId).set({
        cliente: appState.user,
        destino: destino,
        status: 'buscando'
    });

    document.getElementById('ui-cliente').classList.add('hidden');
    document.getElementById('trip-status').classList.remove('hidden');
}

function escucharBaseDeDatos() {
    db.ref('pedidos/' + appState.tripId).on('value', (snapshot) => {
        const data = snapshot.val();
        if(!data) return;

        // Si soy CONDUCTOR y hay un pedido
        if(appState.role === 'conductor' && data.status === 'buscando') {
            document.getElementById('alerta-viaje').classList.remove('hidden');
            document.getElementById('info-pedido').innerText = `${data.cliente} → ${data.destino}`;
        }

        // Si soy CLIENTE y aceptaron mi viaje
        if(appState.role === 'cliente' && data.status === 'aceptado') {
            document.getElementById('msg-status').innerText = `¡${data.conductor} va en camino!`;
        }
    });
}

function aceptarViaje() {
    db.ref('pedidos/' + appState.tripId).update({
        status: 'aceptado',
        conductor: appState.user
    });
    document.getElementById('alerta-viaje').classList.add('hidden');
}

// RENDERIZADO DEL MAPA
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mapImg.complete) {
        ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#eee"; ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    
    // Dibujar vehículo estilo Uber (Visto desde arriba)
    drawCar(canvas.width/2, canvas.height/2);
    requestAnimationFrame(animate);
}

function drawCar(x, y) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x-12, y-22, 24, 44, 5) : ctx.fillRect(x-12, y-22, 24, 44);
    ctx.fill();
    // Faros
    ctx.fillStyle = "white"; ctx.fillRect(x-10, y-20, 6, 3); ctx.fillRect(x+4, y-20, 6, 3);
}

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize;
