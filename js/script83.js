document.getElementById('results-form').addEventListener('submit', addResult);

function addResult(e) {
    e.preventDefault();

    const etapa = document.getElementById('etapa').value;
    const tiempoPlaneado = document.getElementById('tiempo_planeado').value;
    const costoPlaneado = document.getElementById('costo_planeado').value;
    const tiempoReal = document.getElementById('tiempo_real').value;
    const costoReal = document.getElementById('costo_real').value;

    const table = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${etapa}</td>
        <td>${tiempoPlaneado}</td>
        <td>${costoPlaneado}</td>
        <td>${tiempoReal}</td>
        <td>${costoReal}</td>
    `;

    document.getElementById('results-form').reset();
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
    doc.text("Control de Resultados", 10, 10);
    doc.autoTable({ 
        html: '#results-table', 
        startY: 20,
        theme: 'grid',
    });
    doc.addImage('minuta83.png', 'PNG', 10, doc.autoTable.previous.finalY + 10, 180, 160);
    doc.save('Control_de_Resultados.pdf');
}
