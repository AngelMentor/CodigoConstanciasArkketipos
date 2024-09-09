// Obtengo elementos del DOM que voy a utilizar
const contenido = document.getElementById('contenido');
const contenedores = document.getElementById('contenedores');
const Bcursos = document.getElementById('Bcursos');
// Importo funciones necesarias desde otros módulos
import {  PeticionesData } from "./Constancia/Peticiones.js";
import { dibujadoPdf } from './Constancia/DibujadoPdf.js';

// Defino una función asíncrona para cargar y procesar los datos
const datacargada = async () => {
    try {
        // Obtengo datos del backend
        const { urlpdf, cursos } = await PeticionesData();
        // Realizo la búsqueda inicial
        Busqueda(cursos);
        // Elimino el contenido actual del contenedor para reemplazarlo
        contenedores.removeChild(contenido);
        // Recorro los cursos y creo un nuevo div para cada uno
        cursos.forEach(iterator => {
            // Clono el div de contenido para reutilizar la plantilla
            const nuevoDiv = contenido.cloneNode(true);
            // Actualizo los datos en el nuevo div
            for (const key in iterator) {
                if (key === 'post_title') {
                    nuevoDiv.querySelector('#titleCurso').innerText = iterator[key];
                }    else if (key === 'average_progress') {
                    // Dibujo el PDF en el nuevo div
                    dibujadoPdf(urlpdf, nuevoDiv, iterator[key]);
                 }
            }
            // Agrego el nuevo div al contenedor
            contenedores.appendChild(nuevoDiv);
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return null;
    }
};
// Defino la función para realizar la búsqueda de cursos
const Busqueda = (InfoCursos) => {
    Bcursos.oninput = () => {
        // Obtengo el valor del campo de búsqueda y lo convierto a minúsculas
        const inputValue = Bcursos.value.toLowerCase();
        console.log(inputValue);
        // Obtengo todos los divs de curso
        const todosLosDivs = document.querySelectorAll('.container');
        // Recorro los cursos y filtro los divs en función de la búsqueda
        InfoCursos.forEach((curso, index) => {
            const cursoTitle = curso.post_title.toLowerCase();
            const divCurso = todosLosDivs[index];
            if (cursoTitle.includes(inputValue)) {
                // Muevo a visible el div si el título incluye el valor de búsqueda
                divCurso.style.display = "flex";
            } else {
                // Oculto el div si el título no incluye el valor de búsqueda
                divCurso.style.display = "none";
            }
        });
    };
};
// Llamo a la función para cargar los datos cuando el script se ejecute
datacargada();










