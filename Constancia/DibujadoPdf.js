// Exporto la función dibujadoPdf para que pueda ser utilizada en otros módulos
export const dibujadoPdf = async (urlpdf, div, iterador) => {
    try {
        // Convierto el iterador a número
        const iteradorNumerico = Number(iterador);
        // Carga el archivo PDF desde la URL proporcionada
        const existingPdfBytes = new Uint8Array(urlpdf);
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
        // Incrusto la fuente Helvetica en el documento PDF
        const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        // Obtengo la primera página del PDF
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        
        // Obtengo los elementos del div que voy a modificar
        const ArchivoDescargarDiv = div.querySelector('#ArchivoDescargar');
        const gradientefondoDiv = div.querySelector('#gradientefondo');
        const FechaDiv = div.querySelector('#Fecha');
        const medallaDiv = div.querySelector('#medalla');
        const circuloDiv = div.querySelector('#circulo');
        const arkk = div.querySelector('#arkk');

        // Si el iterador es mayor a 80, añado texto al PDF
        if (iterador > 80) {
            // Añado los textos al PDF en diferentes posiciones
            firstPage.drawText('hola', {
                x: 350,
                y: 520,
                size: 50,
                font: helveticaFont,
                color: PDFLib.rgb(0, 0, 0),
            });

            firstPage.drawText('hola', {
                x: 400,
                y: 400,
                size: 40,
                font: helveticaFont,
                color: PDFLib.rgb(0, 0, 0),
            });

            firstPage.drawText(`Felicidades por haber realizado y aprobado satisfactoriamente`, {
                x: 200,
                y: 300,
                size: 30,
                font: helveticaFont,
                color: PDFLib.rgb(0, 0, 0),
            });

            firstPage.drawText(`con de ${iterador} calificación en el curso.`, {
                x: 400,
                y: 275,
                size: 30,
                font: helveticaFont,
                color: PDFLib.rgb(0, 0, 0),
            });
            // Cambia la imagen de medalla dependiendo del valor del iterador
            switch (iterador) {
                case 80:
                    medallaDiv.src = 'assets/medallas/bronce.png';
                    break;
                case 90:
                    medallaDiv.src = 'assets/medallas/plata.png';
                    break;
                case 100:
                    medallaDiv.src = 'assets/medallas/oro.png';
                    break;
            }
        } else {
            // Si el iterador es 80 o menor, deshabilito el botón y actualizo el estilo del div
            ArchivoDescargarDiv.disabled = true;
            ArchivoDescargarDiv.style.background = 'gray';
            ArchivoDescargarDiv.classList.remove('ButtonDescargar-animacion');
            gradientefondoDiv.style.background = 'gray';
            FechaDiv.innerText = 'No terminado aún';
            medallaDiv.style.display = 'none';
            circuloDiv.style.background = 'gray';
            arkk.classList.remove('figura:hover');

        }
        // Guardo los cambios en el PDF y crea un Blob del PDF modificado
        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        // Agrego un evento al botón para descargar el PDF modificado cuando se hace clic
        div.querySelector('#ArchivoDescargar').addEventListener('click', () => {
            console.log('Me diste clic');
            if (modifiedPdfBytes) {
                // Creo un enlace para descargar el PDF
                const url = URL.createObjectURL(modifiedBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Constancia.pdf';
                a.click();
                // Revoco el objeto URL después de la descarga
                URL.revokeObjectURL(url);
            } else {
                console.log('No hay un PDF modificado para descargar');
            }
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar el archivo PDF:', error);
        return null;
    }

}