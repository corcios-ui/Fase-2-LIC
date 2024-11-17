// Previsualizar el recibo cuando se abre el modal
document.querySelector('[data-bs-target="#previewModal"]').addEventListener('click', function() {
    const fecha = new Date().toLocaleDateString();
    const servicio = localStorage.getItem('servicio-pago') || 'Servicio no especificado';
    const montoPago = localStorage.getItem('monto-pago') || 'Monto no especificado';

    document.getElementById('fecha-recibo').textContent = fecha;
    document.getElementById('servicio-pago-recibo').textContent = servicio;
    document.getElementById('monto-pago-recibo').textContent = `$${montoPago}`;
});

// Función para guardar el recibo en PDF
function guardarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fecha = new Date().toLocaleDateString();
    const servicio = localStorage.getItem('servicio-pago') || 'Servicio no especificado';
    const montoPago = localStorage.getItem('monto-pago') || 'Monto no especificado';

    // Agregar texto al PDF
    doc.setFontSize(18);
    doc.text("Recibo de Pago - Cajero Automático", 20, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
    doc.text(`Servicio: ${servicio}`, 20, 40);
    doc.text(`Monto del pago: $${montoPago}`, 20, 50);

    // Descargar el PDF
    doc.save("recibo_pago.pdf");
}
