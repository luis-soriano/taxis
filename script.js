const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let appState = { role: '', user: '', status: 'idle' };
let mapImg = new Image();

// --- IMPORTANTE ---
// Asegúrate de que este nombre sea EXACTAMENTE el de tu imagen.
// Si no tienes la imagen, la pantalla se verá negra, pero los botones funcionarán.
mapImg.src = 'mapa_guaranda.jpg'; 


// --- FUNCIÓN DE DIBUJO COMPATIBLE (El arreglo principal) ---
// Esta función dibuja el auto de forma que funciona en todos los navegadores.
function drawRoundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}
// ---------------------------------------------------------


function initApp(role) {
    console.log("Iniciando app con rol:", role); // Mensaje en consola para verificar

    const nameInput = document.getElementById('user-name');
    const name = nameInput.value.trim() || role; // .trim() limpia espacios

    appState.role = role;
    appState.user = name;

    // Ocultar pantalla de inicio y mostrar mapa
    document.getElementById('role-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    
    // Asegurarnos de ocultar todas las interfaces primero
    document.querySelectorAll('.ui-section').forEach(el => el.classList.add('hidden'));
    
    // Mostrar solo la interfaz del rol seleccionado
    const uiElement = document.getElementById(`ui-${role}`);
    if (uiElement) {
        uiElement.classList.remove('hidden');
    } else {
        console.error("Error: No se encontró la interfaz para", role);
    }
    
    resize(); // Ajustar tamaño del mapa
    startSync(); // Iniciar simulación de red
    animate(); // Iniciar animación del mapa y auto
}

// SIMULACIÓN DE RED (Usando LocalStorage para comunicar pestañas)
function startSync() {
    setInterval(() => {
        let pedido;
        try {
            pedido = JSON.parse(localStorage.getItem('uber_pedido'));
        } catch (e) {
            console.error("Error leyendo datos:", e);
        }
        
        // Si soy conductor y hay un pedido buscando...
        if (appState.role === 'conductor' && pedido && pedido.status === 'buscando') {
            document.getElementById('ride-request').classList.remove('hidden');
            document.getElementById('req-name').innerText = pedido.cliente;
            document.getElementById('req-dest').innerText = pedido.destino;
        }

        // Si soy cliente y mi pedido fue aceptado...
        if (appState.role === 'cliente' && pedido && pedido.status === 'aceptado' && pedido.cliente === appState.user) {
            showTripStatus(`Tu conductor ${pedido.conductor} va en camino`, "Llega en 2 min • Toyota Yaris");
        }
    }, 1000); // Revisar cada segundo
}

// Función del botón "SOLICITAR GUARANDA GO"
function requestRide() {
    const destInput = document.getElementById('dest-input');
    const destino = destInput.value.trim();

    if (!destino) {
        alert("Por favor, ingresa un destino.");
        return;
    }
    
    const pedido = { cliente: appState.user, destino: destino, status: 'buscando' };
    localStorage.setItem('uber_pedido', JSON.stringify(pedido));
    
    const btn = document.getElementById('btn-request');
    btn.innerText = "BUSCANDO CONDUCTOR...";
    btn.style.background = "#666";
    btn.disabled = true; // Evitar doble clic
}

// Función del botón "ACEPTAR VIAJE" (Conductor)
function acceptRide() {
    let pedido = JSON.parse(localStorage.getItem('uber_pedido'));
    if (pedido && pedido.status === 'buscando') {
        pedido.status = 'aceptado';
        pedido.conductor = appState.user;
        localStorage.setItem('uber_pedido', JSON.stringify(pedido));
        
        document.getElementById('ride-request').classList.add('hidden');
        document.getElementById('driver-info').innerText = "⚠️ En viaje con " + pedido.cliente;
        document.getElementById('driver-info').style.color = "var(--uber-blue)";
    }
}

function showTripStatus(msg, sub) {
    document.getElementById('ui-cliente').classList.add('hidden');
    document.getElementById('trip-status').classList.remove('hidden');
    document.getElementById('trip-msg').innerText = msg;
    document.getElementById('trip-sub').innerText = sub;
}

// RENDERIZADO DEL MAPA Y EL AUTO (Animación)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar el mapa si la imagen cargó correctamente
    if(mapImg.complete && mapImg.naturalWidth > 0) {
        ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
    } else {
        // Fondo negro si no hay imagen
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Dibujar el vehículo en el centro
    drawVehicle(canvas.width/2, canvas.height/2);
    
    requestAnimationFrame(animate); // Repetir animación
}

function drawVehicle(x, y) {
    ctx.fillStyle = "black"; // Color del auto
    
    // USAMOS LA FUNCIÓN COMPATIBLE AQUÍ
    drawRoundRect(ctx, x-10, y-20, 20, 40, 4);
    
    // Luces delanteras
    ctx.fillStyle = "#fff"; 
    ctx.fillRect(x-8, y-18, 5, 2); 
    ctx.fillRect(x+3, y-18, 5, 2);
}

// Ajustar el tamaño del canvas si cambia la ventana
function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize);
resize(); // Llamar al inicio
