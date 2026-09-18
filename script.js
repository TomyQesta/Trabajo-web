// 1. Empezamos con el carrito vacío
let cantidadEnCarrito = 0;

// 2. Buscamos el elemento del HTML donde se muestra el número
const contadorHtml = document.getElementById('contador');

// 3. Buscamos TODOS los botones que digan "Agregar al carrito"
const botones = document.querySelectorAll('.btn-agregar');

// 4. Le decimos a cada botón qué hacer cuando lo hagan clic
botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        
        // Sumamos 1 a la cantidad
        cantidadEnCarrito = cantidadEnCarrito + 1;
        
        // Actualizamos el número en la página web
        contadorHtml.innerText = cantidadEnCarrito;
        
        // Opcional: Mostramos un pequeño mensaje de confirmación
        alert('¡Prenda agregada al carrito!');
    });
});