document.addEventListener("DOMContentLoaded", function() {

 // Crear el mapa centrado en Quito
var mapa = L.map('mapa').setView([-0.1807, -78.4678], 13);

// Cargar el mapa visual (calles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);


// 🚕 Lista de taxis (ejemplo)
var taxis = [
    { nombre: "Taxi 1", lat: -0.1807, lng: -78.4678, estado: "disponible" },
    { nombre: "Taxi 2", lat: -0.1900, lng: -78.4800, estado: "ocupado" },
    { nombre: "Taxi 3", lat: -0.1750, lng: -78.4600, estado: "disponible" }
];


// Recorrer la lista de taxis y ponerlos en el mapa
taxis.forEach(function(taxi) {

    // Elegir color según estado
    var color = taxi.estado === "disponible" ? "green" : "red";

    // Crear un círculo en el mapa
    L.circleMarker([taxi.lat, taxi.lng], {
        radius: 8,
        color: color,
        fillColor: color,
        fillOpacity: 0.8
    })
    .addTo(mapa)
    .bindPopup(
        "<b>" + taxi.nombre + "</b><br>Estado: " + taxi.estado
    );
});
