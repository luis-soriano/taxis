console.log("Mapa de taxis en Guaranda cargado");

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
// 3️⃣ ICONOS DE CARROS
// =======================
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

// =======================
// 4️⃣ FUNCIÓN PARA CREAR TAXIS
// =======================
function agregarTaxi(nombre, estado, lat, lng, sector) {
    var icono = (estado === "Disponible") ? carroLibre : carroOcupado;

    L.marker([lat, lng], {icon: icono})
      .addTo(mapa)
      .bindPopup(
        `<b>${nombre}</b><br>
         Estado: <b>${estado}</b><br>
         📍 Ubicación: ${sector}`
      );
}

// =======================
// 5️⃣ AGREGAR TAXIS EN GUARANDA
// =======================
agregarTaxi("Taxi Centro", "Disponible", -1.5926, -79.0000, "Parque Central");
agregarTaxi("Taxi Terminal", "Ocupado", -1.5965, -79.0040, "Terminal Terrestre");
agregarTaxi("Taxi Norte", "Disponible", -1.5885, -78.9975, "Barrio Norte");
agregarTaxi("Taxi Sur", "Ocupado", -1.5945, -79.0080, "Avenida Sur");
