document.getElementById('constitutive-form').addEventListener('submit', generateConstitutiveAct);

function generateConstitutiveAct(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const acuerdo = document.getElementById('acuerdo').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaTermino = document.getElementById('fechaTermino').value;
    const responsable = document.getElementById('responsable').value;

    const constitutiveDetails = `
        <p><strong>Actividad:</strong> ${actividad}</p>
        <p><strong>Acuerdo:</strong> ${acuerdo}</p>
        <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
        <p><strong>Fecha Termino:</strong> ${fechaTermino}</p>
        <p><strong>Responsable:</strong> ${responsable}</p>
    `;

    document.getElementById('constitutive-details').innerHTML = constitutiveDetails;
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
    doc.text("Acta Constitutiva del Proyecto", 10, 10);
    doc.text(document.getElementById('constitutive-details').innerText, 10, 20);
    doc.save('Acta_Constitutiva_del_Proyecto.pdf');
}
