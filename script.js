// Inicializar mapa centrado en Bolívar
var map = L.map('map').setView([-1.5932, -79.0000], 10); // Coordenadas aproximadas de Bolívar

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

function solicitarTaxi() {
  let nombre = document.getElementById("clienteNombre").value;
  alert("Taxi solicitado por: " + nombre);
  // Aquí se conecta con backend (API REST)
}

function aceptarServicio() {
  let nombre = document.getElementById("conductorNombre").value;
  let apellido = document.getElementById("conductorApellido").value;
  alert("Conductor: " + nombre + " " + apellido + " aceptó el servicio");
}
