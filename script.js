console.log("Mapa cargado correctamente");

// =======================
// 1️⃣ CREAR MAPA EN GUARANDA
// =======================
var mapa = L.map('mapa').setView([-1.5923, -79.0016], 15);

// =======================
// 2️⃣ MAPA BASE
// =======================
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// =======================
// 3️⃣ ICONOS DE CARROS TAXI
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
// 4️⃣ FUNCIÓN PARA AGREGAR TAXIS
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
// 5️⃣ TAXIS EN PUNTOS REALES DE GUARANDA
// =======================
agregarTaxi("Taxi Centro", "Disponible", -1.5923, -79.0016, "Centro de Guaranda");
agregarTaxi("Taxi Terminal", "Ocupado", -1.5916, -78.9942, "Terminal Terrestre");
agregarTaxi("Taxi Norte", "Disponible", -1.5880, -78.9980, "Barrio Norte");
agregarTaxi("Taxi Sur", "Ocupado", -1.5950, -79.0060, "Avenida Sur");

// =======================
// 6️⃣ UBICACIÓN DEL USUARIO
// =======================
var marcadorUsuario;

function mostrarUbicacion() {
    if (!navigator.geolocation) {
        alert("Tu navegador no permite geolocalización");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(posicion) {
        var lat = posicion.coords.latitude;
        var lng = posicion.coords.longitude;

        if (marcadorUsuario) {
            marcadorUsuario.setLatLng([lat, lng]);
        } else {
            marcadorUsuario = L.marker([lat, lng], {
                icon: L.icon({
                    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                    iconSize: [40, 40]
                })
            }).addTo(mapa);
        }

        marcadorUsuario.bindPopup("📍 Tú estás aquí").openPopup();
        mapa.setView([lat, lng], 16);

    }, function() {
        alert("No se pudo obtener tu ubicación");
    });
}
