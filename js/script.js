// Evento que se ejecuta cuando todo el contenido del DOM ha sido cargado
document.addEventListener("DOMContentLoaded", () => {
    cargarGraduados(); // Llama a la función para cargar y mostrar la lista de graduados almacenados
});

// Muestra el formulario para agregar un nuevo graduado
function mostrarFormulario() {
    document.getElementById("formularioGraduado").style.display = "block"; // Cambia el estilo para mostrar el formulario
}

// Evento para manejar el envío del formulario de graduado
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const edad = document.getElementById("edad").value;
    const licenciatura = document.getElementById("licenciatura").value;
    const opcionTitulacion = document.getElementById("opcionTitulacion").value;
    const imagenInput = document.getElementById("imagen");

    // Verifica que se haya seleccionado una imagen
    if (imagenInput.files.length === 0) {
        alert("Por favor, selecciona una imagen.");
        return; // Detiene la ejecución si no hay imagen
    }

    // Convierte la imagen seleccionada a una cadena en formato base64
    const reader = new FileReader();
    reader.onload = function(event) {
        const imagenData = event.target.result; // Contiene la imagen en formato base64

        // Crea un objeto graduado con los datos del formulario
        const graduado = { nombre, apellidos, edad, licenciatura, opcionTitulacion, imagenData };
        
        // Llama a la función para guardar el graduado en localStorage
        guardarEnLocalStorage(graduado);
        
        // Recarga la lista de graduados para mostrar el nuevo registro
        cargarGraduados();
        
        // Limpia el formulario y oculta el formulario de registro
        document.getElementById("uploadForm").reset();
        document.getElementById("formularioGraduado").style.display = "none";
    };

    // Lee la imagen como una URL de datos (base64)
    reader.readAsDataURL(imagenInput.files[0]);
});

// Guarda un nuevo graduado en localStorage
function guardarEnLocalStorage(graduado) {
    let graduados = JSON.parse(localStorage.getItem("graduados")) || []; // Recupera la lista existente o crea una nueva si no hay datos
    graduados.push(graduado); // Agrega el nuevo graduado a la lista
    localStorage.setItem("graduados", JSON.stringify(graduados)); // Guarda la lista actualizada en localStorage
}

// Carga la lista de graduados desde localStorage y los muestra en la tabla
function cargarGraduados() {
    const graduados = JSON.parse(localStorage.getItem("graduados")) || []; // Recupera la lista de graduados o crea una lista vacía
    const tbody = document.getElementById("graduadosTableBody"); // Obtiene el cuerpo de la tabla
    tbody.innerHTML = ""; // Limpia el contenido actual de la tabla

    // Itera sobre cada graduado y crea una fila en la tabla
    graduados.forEach((graduado, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${graduado.imagenData}" alt="Foto" width="100"></td>
            <td>${graduado.nombre}</td>
            <td>${graduado.apellidos}</td>
            <td>${graduado.edad}</td>
            <td>${graduado.licenciatura}</td>
            <td>${graduado.opcionTitulacion}</td>
            <td><button class="btn btn-danger" onclick="eliminarGraduado(${index})">Eliminar</button></td>
        `;
        tbody.appendChild(fila); // Agrega la fila a la tabla
    });
}

// Elimina un graduado de localStorage y actualiza la tabla
function eliminarGraduado(index) {
    let graduados = JSON.parse(localStorage.getItem("graduados")) || []; // Recupera la lista de graduados
    graduados.splice(index, 1); // Elimina el graduado en la posición especificada
    localStorage.setItem("graduados", JSON.stringify(graduados)); // Guarda la lista actualizada en localStorage
    cargarGraduados(); // Recarga la lista de graduados en la tabla
}
