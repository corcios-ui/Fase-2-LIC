function realizarDeposito(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener el monto del depósito
    const montoDeposito = parseFloat(document.getElementById('monto-deposito').value);

    // Obtener el saldo actual de localStorage
    let saldoActual = parseFloat(localStorage.getItem('saldo'));

    // Sumar el depósito al saldo actual
    saldoActual += montoDeposito;

    // Guardar el nuevo saldo en localStorage
    localStorage.setItem('saldo', saldoActual);

    // Crear el objeto de transacción
    const transaccion = {
        servicio: 'Depósito',
        fecha: new Date().toLocaleDateString(),
        monto: `$${montoDeposito}`
    };

    // Obtener el historial actual de transacciones
    let historial = JSON.parse(localStorage.getItem('historial')) || [];

    // Agregar la nueva transacción al historial
    historial.push(transaccion);

    // Guardar el historial actualizado en localStorage
    localStorage.setItem('historial', JSON.stringify(historial));

    // Redirigir a la página de éxito
    window.location.href = "/FASE 1 CS232913/depositar/depo.html";
}
