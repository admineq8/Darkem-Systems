document.getElementById('cost-form').addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();

    const item = document.getElementById('item').value;
    const costoPlaneado = document.getElementById('costo_planeado').value;

    const table = document.getElementById('cost-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${item}</td>
        <td>${costoPlaneado}</td>
    `;

    document.getElementById('cost-form').reset();
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
    doc.text("Control de Costos", 10, 10);
    doc.autoTable({ 
        html: '#cost-table', 
        startY: 20,
        theme: 'grid',
    });
    doc.addImage('minuta82.png', 'PNG', 10, doc.autoTable.previous.finalY + 10, 180, 160);
    doc.save('Control_de_Costos.pdf');
}
