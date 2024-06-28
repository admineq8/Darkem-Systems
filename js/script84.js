document.getElementById('risk-form').addEventListener('submit', addRisk);

function addRisk(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const costo = document.getElementById('costo').value;
    const responsable = document.getElementById('responsable').value;

    const table = document.getElementById('risk-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${actividad}</td>
        <td>${tiempo}</td>
        <td>${costo}</td>
        <td>${responsable}</td>
    `;

    document.getElementById('risk-form').reset();
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
    doc.text("Plantilla de Control de Riesgos", 10, 10);
    doc.autoTable({ 
        html: '#risk-table', 
        startY: 20,
        theme: 'grid',
    });
    doc.addImage('minuta84.png', 'PNG', 10, doc.autoTable.previous.finalY + 10, 180, 160);
    doc.save('Control_de_Riesgos.pdf');
}
