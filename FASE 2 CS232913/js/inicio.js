// Inicializar saldo en localStorage si no existe
if (!localStorage.getItem('saldo')) {
    localStorage.setItem('saldo', '0'); // Saldo inicial
}

// Mostrar el saldo actual
document.getElementById('saldo-actual').textContent = `$${localStorage.getItem('saldo')}.00`;
