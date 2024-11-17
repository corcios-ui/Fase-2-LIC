const historial = JSON.parse(localStorage.getItem('historial')) || [];
const transaccionesBody = document.getElementById('transacciones-body');
const saldoActual = parseFloat(localStorage.getItem('saldo')) || 0;
document.getElementById('dinero-actual').textContent = `$${saldoActual.toFixed(2)}`;

let balanceMensual = 0;
let transaccionesPorServicio = {};

historial.forEach(transaccion => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${transaccion.servicio}</td><td>${transaccion.fecha}</td><td>${transaccion.monto}</td>`;
    transaccionesBody.appendChild(row);
    const fechaTransaccion = new Date(transaccion.fecha);
    const fechaActual = new Date();
    if (fechaTransaccion.getMonth() === fechaActual.getMonth() && fechaTransaccion.getFullYear() === fechaActual.getFullYear()) {
        balanceMensual += parseFloat(transaccion.monto.replace('$', ''));
    }
    if (transaccionesPorServicio[transaccion.servicio]) {
        transaccionesPorServicio[transaccion.servicio] += parseFloat(transaccion.monto.replace('$', ''));
    } else {
        transaccionesPorServicio[transaccion.servicio] = parseFloat(transaccion.monto.replace('$', ''));
    }
});
document.getElementById('balance-mensual').textContent = `$${balanceMensual.toFixed(2)}`;

function previsualizarInforme() {
    document.getElementById('preview').style.display = 'block';
    const fecha = new Date().toLocaleDateString();
    document.getElementById('fecha-informe').textContent = fecha;
    document.getElementById('preview-balance-mensual').textContent = `$${balanceMensual.toFixed(2)}`;
    document.getElementById('preview-dinero-actual').textContent = `$${saldoActual.toFixed(2)}`;
    const listaTransacciones = document.getElementById('lista-transacciones');
    listaTransacciones.innerHTML = '';
    historial.forEach((transaccion, index) => {
        const item = document.createElement('li');
        item.textContent = `${transaccion.servicio} - ${transaccion.fecha} - ${transaccion.monto}`;
        listaTransacciones.appendChild(item);
    });
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text("Estado de Cuenta - Cajero Automático", 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
    doc.text(`Balance mensual: $${balanceMensual.toFixed(2)}`, 20, 40);
    doc.text(`Dinero actual: $${saldoActual.toFixed(2)}`, 20, 50);
    doc.setFontSize(14);
    doc.text("Transacciones:", 20, 60);
    let yPosition = 70;
    historial.forEach((transaccion, index) => {
        doc.text(`${index + 1}. ${transaccion.servicio} - ${fecha} - ${transaccion.monto}`, 20, yPosition);
        yPosition += 10;
    });
    doc.save("estado_cuenta.pdf");
}
document.getElementById('descargar-pdf').addEventListener('click', generarPDF);

document.getElementById('graficaModal').addEventListener('shown.bs.modal', function () {
    const ctx = document.getElementById('graficaPastel').getContext('2d');
    const labels = Object.keys(transaccionesPorServicio);
    const data = Object.values(transaccionesPorServicio);
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monto por Servicio',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
