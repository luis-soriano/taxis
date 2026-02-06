console.log("Mapa de taxis (carros) en Guaranda cargando...");

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
// 3️⃣ ICONOS DE CARRO (TAXI)
// =======================
var carroLibre = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png', // carro verde
    iconSize: [45, 45],
    iconAnchor: [22, 40],
    popupAnchor: [0, -35]
});

var carroOcupado = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744466.png', // carro rojo
    iconSize: [45, 45],
    iconAnchor: [22, 40],
    popupAnchor: [0, -35]
});

// =======================
// 4️⃣ AGREGAR TAXIS (CARROS)
// =======================
L.marker([-1.5926, -79.0000], {icon: carroLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Centro</b><br>🟢 Disponible");

L.marker([-1.5965, -79.0040], {icon: carroOcupado})
  .addTo(mapa)
  .bindPopup("<b>Taxi Terminal</b><br>🔴 Ocupado");

L.marker([-1.5885, -78.9975], {icon: carroLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Norte</b><br>🟢 Disponible");

L.marker([-1.5945, -79.0080], {icon: carroOcupado})
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
