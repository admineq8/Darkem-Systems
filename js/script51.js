document.getElementById('project-form').addEventListener('submit', addActivity);

function addActivity(e) {
    e.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const tiempo = document.getElementById('tiempo').value;
    const recursos = document.getElementById('recursos').value;
    const costo = document.getElementById('costo').value;
    const responsable = document.getElementById('responsable').value;
    const avance = document.getElementById('avance').value;
    const evidencia = document.getElementById('evidencia').value;

    const table = document.getElementById('activity-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${actividad}</td>
        <td>${tiempo}</td>
        <td>${recursos}</td>
        <td>${costo}</td>
        <td>${responsable}</td>
        <td>${avance}</td>
        <td>${evidencia}</td>
    `;

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
