// Mensaje para comprobar que el JS carga
console.log("Script cargado correctamente");

// Crear el mapa centrado en una ciudad (puedes cambiar coordenadas)
var mapa = L.map('mapa').setView([-0.1807, -78.4678], 13); // Quito ejemplo

// Cargar los mapas base (calles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Iconos personalizados
var taxiLibre = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743922.png',
    iconSize: [40, 40]
});

var taxiOcupado = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/743/743131.png',
    iconSize: [40, 40]
});

// Agregar taxis de ejemplo
L.marker([-0.1807, -78.4678], {icon: taxiLibre})
  .addTo(mapa)
  .bindPopup("Taxi 1 - Disponible");

L.marker([-0.1907, -78.4578], {icon: taxiOcupado})
  .addTo(mapa)
  .bindPopup("Taxi 2 - Ocupado");
