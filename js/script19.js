document.getElementById('operativa-form').addEventListener('submit', generateOperativa);

function generateOperativa(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const costo = document.getElementById('costo').value;
    const responsable = document.getElementById('responsable').value;

    const operativaDetails = `
        <p><strong>Actividad:</strong> ${actividad}</p>
        <p><strong>Tiempo:</strong> ${tiempo}</p>
        <p><strong>Costo:</strong> ${costo}</p>
        <p><strong>Responsable:</strong> ${responsable}</p>
    `;

    document.getElementById('operativa-details').innerHTML = operativaDetails;
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
    doc.text("Área Operativa", 10, 10);
    doc.text(document.getElementById('operativa-details').innerText, 10, 20);
    doc.save('Área_Operativa.pdf');
}
