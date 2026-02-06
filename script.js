console.log("Mapa cargado correctamente");

// Coordenadas de Guaranda, Ecuador
var mapa = L.map('mapa').setView([-1.5926, -79.0000], 14);

// Mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Iconos
var taxiLibre = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743922.png',
    iconSize: [40, 40]
});

var taxiOcupado = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
    iconSize: [40, 40]
});

// Taxis de ejemplo en Guaranda
L.marker([-1.5926, -79.0000], {icon: taxiLibre})
  .addTo(mapa)
  .bindPopup("Taxi Centro - Disponible");

L.marker([-1.5960, -79.0050], {icon: taxiOcupado})
  .addTo(mapa)
  .bindPopup("Taxi Terminal - Ocupado");

L.marker([-1.5880, -78.9970], {icon: taxiLibre})
  .addTo(mapa)
  .bindPopup("Taxi Norte - Disponible");
