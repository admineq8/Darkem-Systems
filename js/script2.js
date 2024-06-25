document.getElementById('project-form').addEventListener('submit', addActivity);

let totalCost = 0;
let costHistory = [];
let schedule = {};

function addActivity(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const recurso = document.getElementById('recurso').value;
    const costo = parseInt(document.getElementById('costo').value);

    const table = document.getElementById('activity-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${actividad}</td>
        <td>${tiempo}</td>
        <td>${recurso}</td>
        <td>${costo}</td>
    `;

    totalCost += costo;
    document.getElementById('total-cost').textContent = totalCost;

    costHistory.push({
        actividad: actividad,
        costo: costo
    });

    // Actualizar presupuesto restante
    const presupuesto = 501830; // Presupuesto definido
    const presupuestoRestante = presupuesto - totalCost;

    // Mostrar presupuesto restante (puedes hacerlo como prefieras, aquí como ejemplo se imprime en consola)
    console.log('Presupuesto Restante:', presupuestoRestante);

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
    img1.src = 'img/imagen1.png'; // Ruta a la imagen correspondiente
    const img2 = new Image();
    img2.src = 'img/minuta2.png'; // Ruta a la segunda imagen correspondiente

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajustar las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Plan de Comercialización', 10, 50); // Encabezado ajustado según la plantilla

        const activityTable = document.getElementById('activity-table');
        const rows = activityTable.getElementsByTagName('tr');
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
            head: [['Actividad', 'Tiempo', 'Recurso', 'Costo']],
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

        img2.onload = function () {
            doc.addImage(img2, 'PNG', 10, doc.lastAutoTable.finalY + 10, 190, 30); // Añadimos la segunda imagen debajo de la tabla
            doc.save('plan_comercializacion.pdf');
        };
    };
}