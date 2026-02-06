console.log("Mapa de taxis en Guaranda cargando...");

// =======================
// 1️⃣ CREAR MAPA EN GUARANDA
// =======================
var mapa = L.map('mapa').setView([-1.5926, -79.0000], 15);

// =======================
// 2️⃣ MAPA BASE
// =======================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// =======================
// 3️⃣ ICONOS TIPO TAXI GRANDES
// =======================
function crearIconoTaxi(color) {
    return L.divIcon({
        html: `<div style="
            background:${color};
            width:50px;
            height:50px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:26px;
            box-shadow:0 0 10px black;
            border:2px solid white;
        ">🚕</div>`,
        className: ''
    });
}

var taxiLibre = crearIconoTaxi("#00c853");   // verde brillante
var taxiOcupado = crearIconoTaxi("#d50000"); // rojo fuerte

// =======================
// 4️⃣ AGREGAR TAXIS
// =======================
L.marker([-1.5926, -79.0000], {icon: taxiLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Centro</b><br>🟢 Disponible");

L.marker([-1.5965, -79.0040], {icon: taxiOcupado})
  .addTo(mapa)
  .bindPopup("<b>Taxi Terminal</b><br>🔴 Ocupado");

L.marker([-1.5885, -78.9975], {icon: taxiLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Norte</b><br>🟢 Disponible");

L.marker([-1.5945, -79.0080], {icon: taxiOcupado})
  .addTo(mapa)
  .bindPopup("<b>Taxi Sur</b><br>🔴 Ocupado");

// =======================
// 5️⃣ ZONA CENTRO
// =======================
L.circle([-1.5926, -79.0000], {
    color: 'yellow',
    fillColor: '#ffff00',
    fillOpacity: 0.15,
    radius: 600
}).addTo(mapa).bindPopup("Zona Centro Guaranda");
