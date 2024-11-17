document.getElementById('saldo-actual').textContent = `$${localStorage.getItem('saldo')}.00`;

function imprimirRecibo() {
    const saldo = localStorage.getItem('saldo') || '0';
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Recibo de Cajero Automático", 20, 20);

    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);

    doc.setFontSize(14);
    doc.text("Detalles de la transacción:", 20, 40);
    doc.text(`Saldo actual: $${saldo}.00`, 20, 50);

    doc.setFontSize(12);
    doc.text("________________________", 20, 70);
    doc.text("Firma del Cliente", 20, 80);

    doc.save("recibo.pdf");
}
