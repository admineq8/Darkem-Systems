document.getElementById('project-form').addEventListener('submit', addVerification);

let totalVerifications = 0;

function addVerification(e) {
    e.preventDefault();

    const entregable = document.getElementById('entregable').value;
    const requisito = document.getElementById('requisito').value;
    const verificacion = document.getElementById('verificacion').value;

    const table = document.getElementById('verification-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${entregable}</td>
        <td>${requisito}</td>
        <td>${verificacion}</td>
    `;

    totalVerifications++;
    document.getElementById('total-verifications').textContent = totalVerifications;

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
    const img6 = new Image();
    img6.src = 'img/minuta6.png'; // Ruta a la nueva segunda imagen correspondiente (minuta6.png)

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajustar las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Verificación del Alcance', 10, 50); // Encabezado ajustado según la plantilla

        const verificationTable = document.getElementById('verification-table');
        const rows = verificationTable.getElementsByTagName('tr');
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
                ['Entregable', 'Requisito', 'Verificación']
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

        img6.onload = function () {
            doc.addImage(img6, 'PNG', 10, doc.lastAutoTable.finalY + 10, 190, 60); // Ajustamos el alto de la segunda imagen
            doc.save('verificacion_alcance.pdf');
        };
    };
}
