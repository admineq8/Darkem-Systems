document.getElementById('project-form').addEventListener('submit', addActivity);

let totalCost = 0;
const presupuestoInicial = 601820; // Presupuesto inicial definido

function addActivity(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const costo = parseInt(document.getElementById('costo').value);
    const recursos = document.getElementById('recursos').value;
    const responsable = document.getElementById('responsable').value;
    const entregable = document.getElementById('entregable').value;

    const table = document.getElementById('activity-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${actividad}</td>
        <td>${tiempo}</td>
        <td>${costo}</td>
        <td>${recursos}</td>
        <td>${responsable}</td>
        <td>${entregable}</td>
    `;

    totalCost += costo;
    document.getElementById('total-cost').textContent = totalCost;

    // Calcular presupuesto restante
    const presupuestoRestante = presupuestoInicial - totalCost;
    document.getElementById('presupuesto-restante').textContent = `$${presupuestoRestante}`;

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
    const img3 = new Image();
    img3.src = 'img/minuta3.png'; // Ruta a la segunda imagen correspondiente (minuta3.png)

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajustar las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Plan de Trabajo', 10, 50); // Encabezado ajustado según la plantilla
        doc.text(`Presupuesto: $${presupuestoInicial}`, 10, 60);

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
            head: [['Actividad', 'Tiempo', 'Costo', 'Recursos', 'Responsable', 'Entregable']],
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

        img3.onload = function () {
            doc.addImage(img3, 'PNG', 10, doc.lastAutoTable.finalY + 10, 190, 60); // Ajustamos el alto de la segunda imagen
            doc.save('plan_trabajo.pdf');
        };
    };
}
