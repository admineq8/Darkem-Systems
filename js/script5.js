document.getElementById('project-form').addEventListener('submit', addTask);

let totalTasks = 0;
const presupuestoInicial = 501830; // Presupuesto inicial definido

function addTask(e) {
    e.preventDefault();

    const tarea = document.getElementById('tarea').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaLanzamiento = document.getElementById('fecha-lanzamiento').value;
    const fechaFinalizacion = document.getElementById('fecha-finalizacion').value;
    const fechasLimites = document.getElementById('fechas-limites').value;
    const hitos = document.getElementById('hitos').value;

    const table = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${tarea}</td>
        <td>${descripcion}</td>
        <td>${fechaInicio}</td>
        <td>${fechaLanzamiento}</td>
        <td>${fechaFinalizacion}</td>
        <td>${fechasLimites}</td>
        <td>${hitos}</td>
    `;

    totalTasks++;
    document.getElementById('total-tasks').textContent = totalTasks;

    document.getElementById('project-form').reset();
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablink');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Abrir la primera pestaña por defecto
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tablink').click();
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const img1 = new Image();
    img1.src = 'img/imagen1.png'; // Ruta a la primera imagen correspondiente
    const img5 = new Image();
    img5.src = 'img/minuta5.png'; // Ruta a la nueva segunda imagen correspondiente (minuta5.png)

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajustar las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Gestión del Alcance', 10, 50); // Encabezado ajustado según la plantilla
        doc.text(`Presupuesto: $${presupuestoInicial}`, 10, 60);

        const taskTable = document.getElementById('task-table');
        const rows = taskTable.getElementsByTagName('tr');
        const data = [];

        for (let i = 1; i < rows.length; i++) { // Saltamos la primera fila de encabezado
            const cols = rows[i].getElementsByTagName('td');
            const rowData = [];
            for (let j = 0; j < cols.length; j++) {
                rowData.push(cols[j].innerText);
            }
            data.push(rowData);
        }

        doc.autoTable({
            head: [
                ['TAREA NO.', 'DESCRIPCIÓN', 'FECHA INICIO', 'FECHA LANZAMIENTO', 'FECHA FINALIZACIÓN', 'FECHAS LÍMITES', 'HITOS CLAVE']
            ],
            body: data,
            startY: 70,
            theme: 'grid',
            styles: {
                fillColor: [255, 255, 255], // Color blanco para las celdas
                textColor: [0, 0, 0], // Color negro para el texto
            },
            headStyles: {
                fillColor: [255, 165, 0], // Color naranja más oscuro para el encabezado
                textColor: [255, 255, 255], // Color blanco para el texto del encabezado
            }
        });

        img5.onload = function () {
            doc.addImage(img5, 'PNG', 10, doc.lastAutoTable.finalY + 10, 190, 60); // Ajustamos el alto de la segunda imagen
            doc.save('gestion_alcance.pdf');
        };
    };
}
