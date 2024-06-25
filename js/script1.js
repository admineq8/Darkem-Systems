document.getElementById('project-form').addEventListener('submit', addActivity);

let totalCost = 0;
let costHistory = [];
let schedule = {};

function addActivity(e) {
    e.preventDefault();

    const tecnologia = document.getElementById('concepto').value;
    const operativa = document.getElementById('tiempo').value;
    const rh = document.getElementById('recurso').value;
    const finanzas = document.getElementById('responsable').value;
    const comercial = document.getElementById('avance').value;

    const table = document.getElementById('activity-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${tecnologia}</td>
        <td>${operativa}</td>
        <td>${rh}</td>
        <td>${finanzas}</td>
        <td>${comercial}</td>
    `;

    // No se añaden costos ni historial en esta plantilla, solo se muestra la información

    if (!schedule['Responsable']) {
        schedule['Responsable'] = [];
    }
    schedule['Responsable'].push(tecnologia); // Ajustar según la lógica deseada para el cronograma

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

// Open the first tab by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tablink').click();
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const img1 = new Image();
    img1.src = 'img/imagen1.png'; // Reemplazar con la ruta a tu imagen PNG
    const img2 = new Image();
    img2.src = 'img/minuta1.png'; // Reemplazar con la ruta a tu segunda imagen PNG

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajustar las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Plan Operativo', 10, 50); // Encabezado ajustado según la plantilla

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
            head: [['Tecnología', 'Operativa', 'R.H', 'Finanzas', 'Comercial']],
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
            doc.save('plan_operativo.pdf');
        };
    };
}
