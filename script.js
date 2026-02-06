console.log("Mapa de Guaranda cargando...");

// =======================
// 1️⃣ CREAR MAPA EN GUARANDA
// =======================
var mapa = L.map('mapa').setView([-1.5926, -79.0000], 15);

// =======================
// 2️⃣ MAPA BASE (CALLES)
// =======================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// =======================
// 3️⃣ ICONOS GRANDES Y LLAMATIVOS
// =======================
var taxiLibre = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png', // verde brillante
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -45]
});

var taxiOcupado = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png', // rojo fuerte
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -45]
});

// =======================
// 4️⃣ MARCADORES DE TAXIS
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
// 5️⃣ CÍRCULO DEL CENTRO (DECORACIÓN)
// =======================
L.circle([-1.5926, -79.0000], {
    color: 'yellow',
    fillColor: '#ffff00',
    fillOpacity: 0.2,
    radius: 500
}).addTo(mapa).bindPopup("Zona Centro Guaranda");
