function validarLogin(event) {
    event.preventDefault();  // Evita el envío del formulario

    // Limpia todos los datos almacenados en localStorage
    localStorage.clear();

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (usuario === 'jose' && contrasena === '1234') {
        // Si el usuario y contraseña son correctos, redirige a la página de inicio
        window.location.href = 'inicio/inicio.html';
    } else {
        // Si los datos son incorrectos, muestra un mensaje de error
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = 'Usuario o contraseña incorrectos.';
        errorMessage.style.display = 'block';
    }
}
