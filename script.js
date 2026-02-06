console.log("Mapa de taxis en Guaranda cargando...");

// 1️⃣ Crear el mapa centrado en Guaranda
var mapa = L.map('mapa').setView([-1.5923, -79.0016], 15);

// 2️⃣ Mapa base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// 3️⃣ Iconos de carro
var carroLibre = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    iconSize: [45, 45],
    iconAnchor: [22, 40],
    popupAnchor: [0, -35]
});

var carroOcupado = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744466.png',
    iconSize: [45, 45],
    iconAnchor: [22, 40],
    popupAnchor: [0, -35]
});

// 4️⃣ Agregar taxis con ubicaciones reales

L.marker([-1.5923, -79.0016], {icon: carroLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Centro</b><br>🟢 Disponible<br>Ubicación: Centro de Guaranda");

L.marker([-1.59157, -78.99421], {icon: carroOcupado})
  .addTo(mapa)
  .bindPopup("<b>Taxi Terminal</b><br>🔴 Ocupado<br>Ubicación: Terminal Terrestre");

L.marker([-1.59193, -79.00120], {icon: carroLibre})
  .addTo(mapa)
  .bindPopup("<b>Taxi Ayuntamiento</b><br>🟢 Disponible<br>Ubicación: Municipio / Catedral");

L.marker([-1.57182, -79.00644], {icon: carroOcupado})
  .addTo(mapa)
  .bindPopup("<b>Taxi Parque</b><br>🔴 Ocupado<br>Ubicación: Parque Ecológico");
