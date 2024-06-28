document.getElementById('stakeholder-form').addEventListener('submit', generateStakeholderManagement);

function generateStakeholderManagement(e) {
    e.preventDefault();

    const interesado = document.getElementById('interesado').value;
    const poder = document.getElementById('poder').value;
    const interes = document.getElementById('interes').value;
    const estrategia = document.getElementById('estrategia').value;

    const stakeholderDetails = `
        <p><strong>Interesado:</strong> ${interesado}</p>
        <p><strong>Poder / Influencia:</strong> ${poder}</p>
        <p><strong>Interés:</strong> ${interes}</p>
        <p><strong>Estrategia:</strong> ${estrategia}</p>
    `;

    document.getElementById('stakeholder-details').innerHTML = stakeholderDetails;
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
    doc.text("Gestión de Interesados", 10, 10);
    doc.text(document.getElementById('stakeholder-details').innerText, 10, 20);
    doc.save('Gestion_de_Interesados.pdf');
}
