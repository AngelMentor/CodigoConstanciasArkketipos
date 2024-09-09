// Defino la URL base para las peticiones
const peticiones = 'http://localhost/Backendphp/config.php';

// Exporto la función PeticionesData para obtener datos desde el backend
export const PeticionesData = async () => {
    try {
        // Realizo dos peticiones en paralelo usando Promise.all:
        // 1. Obtengo el PDF como un array de bytes
        // 2. Obtengo la información de los usuarios (cursos)
        const [urlpdf, cursos] = await Promise.all([
            axios.get(`${peticiones}?action=ObtenerPdf`, { responseType: 'arraybuffer' }),
            axios.get(`${peticiones}?action=InfoUsuarios`)
        ]);
        // Devuelvo los datos obtenidos en un objeto
        return { urlpdf: urlpdf.data, cursos: cursos.data };
    } catch (error) {
        // En caso de error, muestro el error en la consola y devuelvo datos por defecto
        console.error(error);
        return { urlpdf: null, cursos: [] };
    }
};
