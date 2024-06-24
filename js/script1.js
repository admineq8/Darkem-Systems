document.getElementById('project-form').addEventListener('submit', addActivity);

let totalCost = 0;
let costHistory = [];
let schedule = {};

function addActivity(e) {
    e.preventDefault();

    const tecnologia = document.getElementById('tecnologia').value;
    const operativa = document.getElementById('operativa').value;
    const rh = document.getElementById('rh').value;
    const finanzas = document.getElementById('finanzas').value;
    const comercial = document.getElementById('comercial').value;

    const table = document.getElementById('activity-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${tecnologia}</td>
        <td>${operativa}</td>
        <td>${rh}</td>
        <td>${finanzas}</td>
        <td>${comercial}</td>
    `;

    // Suponiendo que los costos se suman según los valores de los campos
    const recurso = parseFloat(tecnologia) + parseFloat(operativa) + parseFloat(rh) + parseFloat(finanzas) + parseFloat(comercial);
    totalCost += recurso;
    document.getElementById('total-cost').textContent = totalCost;

    costHistory.push(totalCost);
    updateCostHistory();

    if (!schedule[comercial]) {
        schedule[comercial] = [];
    }
    schedule[comercial].push(tecnologia);
    updateSchedule();

    document.getElementById('project-form').reset();
}

function updateCostHistory() {
    const historyList = document.getElementById('cost-history');
    historyList.innerHTML = '';

    costHistory.forEach((cost, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Costo total después de la actividad ${index + 1}: $${cost}`;
        historyList.appendChild(listItem);
    });
}

function updateSchedule() {
    const scheduleTable = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
    scheduleTable.innerHTML = '';

    for (const [responsable, actividades] of Object.entries(schedule)) {
        const newRow = scheduleTable.insertRow();
        newRow.innerHTML = `
            <td>${responsable}</td>
            <td>${actividades.join(', ')}</td>
        `;
    }
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
    img1.src = 'img/imagen1.png'; // Reemplaza con la ruta a tu imagen PNG
    const img2 = new Image();
    img2.src = 'img/minuta1.png'; // Reemplaza con la ruta a tu segunda imagen PNG

    img1.onload = function () {
        doc.addImage(img1, 'PNG', 10, 10, 190, 30); // Ajusta las coordenadas y tamaño según tu imagen

        doc.setFontSize(12);
        doc.text('Plan Operativo', 10, 50);

        const totalCost = document.getElementById('total-cost').textContent;
        doc.text(`Total Costos: $${totalCost}`, 10, 60);

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
        });

        img2.onload = function () {
            doc.addImage(img2, 'PNG', 10, doc.lastAutoTable.finalY + 10, 190, 30); // Ajusta las coordenadas y tamaño según tu imagen
            doc.save('Plan_Operativo.pdf');
        }
    }
}

