document.getElementById('closure-form').addEventListener('submit', generateClosureAct);

function generateClosureAct(e) {
    e.preventDefault();

    const empresa = document.getElementById('empresa').value;
    const proyecto = document.getElementById('proyecto').value;
    const fecha = document.getElementById('fecha').value;
    const cliente = document.getElementById('cliente').value;
    const patrocinador = document.getElementById('patrocinador').value;
    const gerente = document.getElementById('gerente').value;

    const closureDetails = `
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Proyecto:</strong> ${proyecto}</p>
        <p><strong>Fecha de preparación:</strong> ${fecha}</p>
        <p><strong>Cliente:</strong> ${cliente}</p>
        <p><strong>Patrocinador principal:</strong> ${patrocinador}</p>
        <p><strong>Gerente del proyecto:</strong> ${gerente}</p>
    `;

    document.getElementById('closure-details').innerHTML = closureDetails;
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
    doc.text("Acta de Cierre de Proyecto", 10, 10);
    doc.text(document.getElementById('closure-details').innerText, 10, 20);
    doc.save('Acta_de_Cierre_de_Proyecto.pdf');
}
