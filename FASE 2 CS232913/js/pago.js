// Función para realizar pago
function realizarPago(servicio) {
    const montoPago = parseFloat(document.getElementById('monto-pago').value);

    if (montoPago === '' || isNaN(parseFloat(montoPago)) || parseFloat(montoPago) <= 0) {
        // Mostrar modal de monto inválido en lugar de alert
        const myModalInvalid = new bootstrap.Modal(document.getElementById('montoInvalidoModal'), {
            keyboard: true
        });
        myModalInvalid.show();
        return;
    }

    let saldoActual = parseFloat(localStorage.getItem('saldo')) || 0; // Saldo por defecto es $0 si no se encuentra definido

    if (montoPago > saldoActual) {
        // Mostrar modal de saldo insuficiente en lugar de alert
        const myModal = new bootstrap.Modal(document.getElementById('saldoInsuficienteModal'), {
            keyboard: true
        });
        myModal.show();
        return;
    }

    // Actualizar saldo
    saldoActual -= montoPago;
    localStorage.setItem('saldo', saldoActual.toString());

    // Registrar la transacción en el historial
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    const nuevaTransaccion = {
        servicio: servicio,
        fecha: new Date().toLocaleDateString(),
        monto: `-$${montoPago.toFixed(2)}`
    };
    historial.push(nuevaTransaccion);
    localStorage.setItem('historial', JSON.stringify(historial));

    // Guardar los detalles del pago para la previsualización
    localStorage.setItem('servicio-pago', servicio);
    localStorage.setItem('monto-pago', montoPago.toFixed(2));

    // Redirección a la página de éxito
    window.location.href = "/FASE 1 CS232913/pago/exito.html";
}

// Inicializar saldo si no existe en localStorage
if (!localStorage.getItem('saldo')) {
    localStorage.setItem('saldo', '0'); // Establecer saldo inicial en $0
}
