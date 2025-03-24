// Se ejecuta cuando el documento ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    cargarAvisos(); // Carga los avisos almacenados en localStorage
});

// Muestra el formulario para agregar un nuevo aviso
function mostrarFormulario() {
    document.getElementById("formularioAviso").style.display = "block";
}

// Evento que se ejecuta cuando el formulario es enviado
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    // Obtiene los valores de los campos del formulario
    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;

    // Crea un objeto aviso con los datos ingresados
    const aviso = { titulo, contenido };

    // Guarda el aviso en localStorage
    guardarEnLocalStorage(aviso);

    // Recarga la lista de avisos
    cargarAvisos();

    // Resetea el formulario
    document.getElementById("uploadForm").reset();

    // Oculta el formulario después de guardar el aviso
    document.getElementById("formularioAviso").style.display = "none";
});

// Guarda un nuevo aviso en localStorage
function guardarEnLocalStorage(aviso) {
    // Recupera los avisos existentes de localStorage o crea un array vacío si no hay ninguno
    let avisos = JSON.parse(localStorage.getItem("avisos")) || [];
    
    // Agrega el nuevo aviso al array
    avisos.push(aviso);

    // Actualiza localStorage con el array modificado
    localStorage.setItem("avisos", JSON.stringify(avisos));
}

// Carga los avisos almacenados en localStorage y los muestra en la página
function cargarAvisos() {
    // Recupera los avisos de localStorage o crea un array vacío si no hay ninguno
    const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
    
    // Obtiene el contenedor donde se mostrarán los avisos
    const container = document.getElementById("avisosContainer");

    // Limpia el contenido anterior del contenedor
    container.innerHTML = "";
    
    // Recorre la lista de avisos y los muestra en el contenedor
    avisos.forEach((aviso, index) => {
        // Crea un elemento div para cada aviso
        const avisoBox = document.createElement("div");
        avisoBox.classList.add("box"); // Clase CSS para estilizar el aviso

        // Define el contenido del aviso
        avisoBox.innerHTML = `
            <h2>${aviso.titulo}</h2>
            <p>${aviso.contenido}</p>
            <button class="btn btn-danger" onclick="eliminarAviso(${index})">Eliminar</button>
        `;

        // Agrega el aviso al contenedor
        container.appendChild(avisoBox);
    });
}

// Elimina un aviso del array en localStorage y recarga la lista
function eliminarAviso(index) {
    // Recupera los avisos de localStorage
    let avisos = JSON.parse(localStorage.getItem("avisos")) || [];

    // Elimina el aviso en la posición indicada por el índice
    avisos.splice(index, 1);

    // Actualiza localStorage con el array modificado
    localStorage.setItem("avisos", JSON.stringify(avisos));

    // Recarga la lista de avisos para reflejar el cambio
    cargarAvisos();
}
