document.addEventListener("DOMContentLoaded", function() {

    let taxis = [
        { id: 1, estado: "Disponible" },
        { id: 2, estado: "Ocupado" },
        { id: 3, estado: "Disponible" },
        { id: 4, estado: "Ocupado" }
    ];

    let contenedor = document.getElementById("contenedor-taxis");

    taxis.forEach(function(taxi) {

        let tarjeta = document.createElement("div");
        tarjeta.classList.add("taxi");

        let titulo = document.createElement("h2");
        titulo.textContent = "Taxi #" + taxi.id;

        let estado = document.createElement("p");
        estado.textContent = taxi.estado;

        actualizarColor(estado, taxi.estado);

        //  NUEVO: Evento al hacer clic en la tarjeta
        tarjeta.addEventListener("click", function() {

            if (taxi.estado === "Disponible") {
                taxi.estado = "Ocupado";
            } else {
                taxi.estado = "Disponible";
            }

            estado.textContent = taxi.estado;
            actualizarColor(estado, taxi.estado);
        });

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(estado);
        contenedor.appendChild(tarjeta);
    });

});

// 🔥 Función para cambiar colores según estado
function actualizarColor(elemento, estado) {
    elemento.classList.remove("disponible", "ocupado");

    if (estado === "Disponible") {
        elemento.classList.add("disponible");
    } else {
        elemento.classList.add("ocupado");
    }
}

