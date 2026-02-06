const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let usuario = { rol: '', nombre: '', placa: '' };
let mapImg = new Image();
mapImg.src = 'mapa_guaranda.jpg'; // Debes subir esta imagen a tu repo

// Redimensionar
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

function selectRole(role) {
    const nC = document.getElementById('nombre-cliente').value;
    const nCon = document.getElementById('cond-nombre').value;
    const pCon = document.getElementById('cond-placa').value;

    if(role === 'cliente' && !nC) return alert("Pon tu nombre");
    if(role === 'conductor' && !nCon) return alert("Faltan datos de conductor");

    usuario = { 
        rol: role, 
        nombre: role === 'cliente' ? nC : nCon, 
        placa: pCon 
    };

    document.getElementById('role-screen').className = 'screen hidden';
    document.getElementById('app-screen').className = 'screen active';
    document.getElementById('user-role-display').innerText = `Hola, ${usuario.nombre}`;

    // Mostrar UI por rol
    document.getElementById('cliente-ui').classList.toggle('hidden', role !== 'cliente');
    document.getElementById('conductor-ui').classList.toggle('hidden', role !== 'conductor');
    document.getElementById('admin-ui').classList.toggle('hidden', role !== 'admin');

    if(role === 'conductor') {
        document.getElementById('disp-cond-nombre').innerText = nCon;
        document.getElementById('disp-cond-placa').innerText = pCon;
    }
    
    animate();
}

// Lógica de Pedidos
function ordenarServicio() {
    document.getElementById('btn-ordenar').innerText = "Buscando...";
    localStorage.setItem('pedido_activo', usuario.nombre);
    alert("Pedido enviado a taxistas en Guaranda");
}

function aceptarPedido() {
    const cliente = localStorage.getItem('pedido_activo');
    registrarViaje(cliente, usuario.nombre, usuario.placa);
    alert("Vas en camino por " + cliente);
    document.getElementById('alerta-pedido').classList.add('hidden');
}

// Admin Historial
function registrarViaje(c, con, p) {
    const lista = document.getElementById('lista-viajes');
    const fila = `<tr><td>${c}</td><td>${con} [${p}]</td><td>En curso</td></tr>`;
    lista.innerHTML += fila;
}

// Loop de Animación (Mapa estático con auto realista)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar Mapa
    if(mapImg.complete) {
        ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#111"; ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    // Dibujar Auto (Estático en centro como GPS)
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    // Chasis
    ctx.fillStyle = usuario.rol === 'conductor' ? '#ffeb3b' : '#ff4757'; // Amarillo si es taxi
    ctx.roundRect(-10, -20, 20, 40, 5); ctx.fill();
    // Parabrisas
    ctx.fillStyle = "#333"; ctx.fillRect(-8, -10, 16, 8);
    ctx.restore();

    requestAnimationFrame(animate);
}

function goBack() { location.reload(); }
