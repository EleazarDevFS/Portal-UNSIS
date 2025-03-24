// Espera a que el DOM esté completamente cargado para ejecutar las funciones iniciales
document.addEventListener("DOMContentLoaded", () => {
    cargarAvisos();   // Carga y muestra los avisos almacenados en localStorage
    cargarGraduados(); // Carga y muestra la lista de graduados almacenados en localStorage
});

// Función para cargar y mostrar los avisos desde localStorage
function cargarAvisos() {
    const avisos = JSON.parse(localStorage.getItem("avisos")) || []; // Recupera los avisos o devuelve un arreglo vacío si no hay datos
    const container = document.getElementById("avisosContainer");
    container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos avisos

    // Itera sobre cada aviso y lo agrega al contenedor
    avisos.forEach(aviso => {
        const avisoBox = document.createElement("div");
        avisoBox.classList.add("box");
        avisoBox.innerHTML = `<h4>${aviso.titulo}</h4><p>${aviso.contenido}</p>`; // Muestra el título y contenido del aviso
        container.appendChild(avisoBox);
    });
}

// Función para cargar y mostrar la galería de graduados desde localStorage
function cargarGraduados() {
    const graduados = JSON.parse(localStorage.getItem("graduados")) || []; // Recupera los datos de graduados o devuelve un arreglo vacío
    const container = document.getElementById("graduadosContainer");
    container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevas tarjetas

    // Itera sobre cada graduado y crea una tarjeta para mostrar su información
    graduados.forEach(graduado => {
        const card = document.createElement("div");
        card.classList.add("card", "m-2");
        card.style.width = "200px";
        card.innerHTML = `
            <img src="${graduado.imagenData}" class="card-img-top" alt="Foto"> <!-- Imagen del graduado -->
            <div class="card-body">
                <h5 class="card-title">${graduado.nombre} ${graduado.apellidos}</h5> <!-- Nombre completo del graduado -->
                <p class="card-text">${graduado.licenciatura}</p> <!-- Carrera del graduado -->
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para filtrar graduados por carrera seleccionada
function filtrarPorCarrera() {
    const seleccion = document.getElementById("filtroCarreras").value; // Obtiene la carrera seleccionada en el filtro
    const graduados = JSON.parse(localStorage.getItem("graduados")) || [];
    const container = document.getElementById("graduadosContainer");
    container.innerHTML = ""; // Limpia el contenedor antes de agregar las tarjetas filtradas

    // Filtra los graduados según la carrera seleccionada y crea tarjetas para ellos
    graduados.filter(g => seleccion === "" || g.licenciatura === seleccion).forEach(graduado => {
        const card = document.createElement("div");
        card.classList.add("card", "m-2");
        card.style.width = "200px";
        card.innerHTML = `
            <img src="${graduado.imagenData}" class="card-img-top" alt="Foto">
            <div class="card-body">
                <h5 class="card-title">${graduado.nombre} ${graduado.apellidos}</h5>
                <p class="card-text">${graduado.licenciatura}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para mostrar la sección de avisos y ocultar la galería
function mostrarAvisos() {
    document.getElementById("avisos").style.display = "block"; // Muestra la sección de avisos
    document.getElementById("galeria").style.display = "none"; // Oculta la sección de galería
    cargarAvisos(); // Vuelve a cargar los avisos
}

// Función para mostrar la sección de galería y ocultar los avisos
function mostrarGaleria() {
    document.getElementById("avisos").style.display = "none"; // Oculta la sección de avisos
    document.getElementById("galeria").style.display = "block"; // Muestra la sección de galería
    cargarGraduados(); // Vuelve a cargar la galería
}
