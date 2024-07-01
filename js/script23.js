document.getElementById('checklist-form').addEventListener('submit', generateChecklist);

function generateChecklist(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const costo = document.getElementById('costo').value;
    const responsable = document.getElementById('responsable').value;

    const checklistDetails = `
        <p><strong>Actividad:</strong> ${actividad}</p>
        <p><strong>Tiempo:</strong> ${tiempo}</p>
        <p><strong>Costo:</strong> ${costo}</p>
        <p><strong>Responsable:</strong> ${responsable}</p>
    `;

    document.getElementById('checklist-details').innerHTML = checklistDetails;
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
    doc.text("Checklist", 10, 10);
    doc.text(document.getElementById('checklist-details').innerText, 10, 20);
    doc.save('Checklist.pdf');
}
