// --- CONFIGURACIÓN DE FIREBASE ---
// Debes crear un proyecto en console.firebase.google.com y pegar tus datos aquí
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let appState = { role: '', user: '', status: 'idle' };

function initApp(role) {
    const name = document.getElementById('user-name').value.trim() || role;
    appState.role = role;
    appState.user = name;

    document.getElementById('role-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById(`ui-${role}`).classList.remove('hidden');
    
    resize();
    escucharPedidos(); // Escuchar cambios en la nube
    animate();
}

// --- LÓGICA DE EMPAREJAMIENTO REAL ---

// 1. El Pasajero pide el viaje
function requestRide() {
    const destino = document.getElementById('dest-input').value.trim();
    if (!destino) return alert("Pon un destino");

    const nuevoPedido = {
        cliente: appState.user,
        destino: destino,
        status: 'buscando',
        timestamp: Date.now()
    };

    // Guardar en la nube (Firebase) en lugar de LocalStorage
    database.ref('viajes/actual').set(nuevoPedido);
    
    document.getElementById('btn-request').innerText = "BUSCANDO CONDUCTOR...";
    document.getElementById('btn-request').disabled = true;
}

// 2. El sistema escucha cambios (Funciona en todos los dispositivos)
function escucharPedidos() {
    database.ref('viajes/actual').on('value', (snapshot) => {
        const pedido = snapshot.val();
        
        if (!pedido) return;

        // Si soy CONDUCTOR y hay alguien buscando
        if (appState.role === 'conductor' && pedido.status === 'buscando') {
            document.getElementById('ride-request').classList.remove('hidden');
            document.getElementById('req-name').innerText = pedido.cliente;
            document.getElementById('req-dest').innerText = pedido.destino;
        }

        // Si soy CLIENTE y el conductor aceptó
        if (appState.role === 'cliente' && pedido.status === 'aceptado' && pedido.cliente === appState.user) {
            showTripStatus(`¡${pedido.conductor} aceptó tu viaje!`, "Llega en 3 min • Toyota Corolla");
        }
    });
}

// 3. El Conductor acepta el viaje
function acceptRide() {
    database.ref('viajes/actual').update({
        status: 'aceptado',
        conductor: appState.user
    });
    
    document.getElementById('ride-request').classList.add('hidden');
    document.getElementById('driver-info').innerText = "Viaje iniciado con cliente";
}

// --- DIBUJO Y OTROS (IGUAL QUE ANTES) ---
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawVehicle(canvas.width/2, canvas.height/2);
    requestAnimationFrame(animate);
}

function drawVehicle(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x-10, y-20, 20, 40);
    ctx.fillStyle = "#fff"; 
    ctx.fillRect(x-8, y-18, 5, 2); ctx.fillRect(x+3, y-18, 5, 2);
}

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize;
