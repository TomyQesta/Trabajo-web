// 1. Inicialización y Selección de elementos
let carrito = JSON.parse(localStorage.getItem('carritoFourteen')) || [];
const contadorHtml = document.getElementById('contador');
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// Elementos del panel lateral
const btnAbrirCarrito = document.getElementById('abrir-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const panelCarrito = document.getElementById('carrito-lateral');
const overlayCarrito = document.getElementById('overlay-carrito');
const contenedorLista = document.getElementById('lista-carrito-lateral');
const btnVaciar = document.getElementById('btn-vaciar-lateral');
const textoTotal = document.getElementById('total-carrito'); 
const btnTerminarCompra = document.getElementById('btn-terminar-compra'); 

// --- FUNCIONES PARA LOS PRECIOS ---
function parsearPrecio(precioStr) {
    return Number(precioStr.replace('$', '').replace(/\./g, ''));
}

function formatearPrecio(numero) {
    return '$' + numero.toLocaleString('es-AR'); 
}

// 2. Función para actualizar el panel y el total
function actualizarCarrito() {
    contadorHtml.innerText = carrito.length;
    if (carrito.length > 0) {
        contadorHtml.classList.add('con-productos');
    } else {
        contadorHtml.classList.remove('con-productos');
    }

    contenedorLista.innerHTML = ''; 
    let totalAcumulado = 0; 

    if (carrito.length === 0) {
        contenedorLista.innerHTML = '<p style="color: #aaa; text-align: center; margin-top: 20px;">Tu carrito está vacío.</p>';
        btnVaciar.style.display = 'none';
        btnTerminarCompra.style.display = 'none'; 
        textoTotal.innerText = '$0';
        return;
    }

    btnVaciar.style.display = 'block';
    btnTerminarCompra.style.display = 'block';

    carrito.forEach((producto) => {
        // NUEVO: Agregamos el talle al lado del nombre en una etiqueta <span> chiquita
        // Verificamos si el producto tiene talle (por si agregaste algo antes de este cambio)
        const textoTalle = producto.talle ? `<span class="talle-carrito">Talle: ${producto.talle}</span>` : '';

        contenedorLista.innerHTML += `
            <div class="item-carrito-lateral">
                <h3>${producto.nombre} ${textoTalle}</h3>
                <span class="precio">${producto.precio}</span>
            </div>
        `;
        
        totalAcumulado += parsearPrecio(producto.precio);
    });

    textoTotal.innerText = formatearPrecio(totalAcumulado);
}

// 3. Lógica para Agregar al carrito
botonesAgregar.forEach(function(boton) {
    boton.addEventListener('click', function(evento) {
        const tarjeta = evento.target.closest('.tarjeta-producto');
        const nombreProducto = tarjeta.querySelector('h3').textContent.trim();
        const precioProducto = tarjeta.querySelector('.precio').textContent.trim();
        
        // NUEVO: Capturamos el talle del <select> dentro de esta tarjeta
        // Buscamos el elemento 'select', si existe sacamos su valor ('S', 'M', etc.), si no, lo dejamos vacío
        const selectorTalle = tarjeta.querySelector('select');
        const talleSeleccionado = selectorTalle ? selectorTalle.value : '';
        
        // Guardamos también el talle en el objeto
        carrito.push({ 
            nombre: nombreProducto, 
            precio: precioProducto, 
            talle: talleSeleccionado 
        });
        
        localStorage.setItem('carritoFourteen', JSON.stringify(carrito));
        
        actualizarCarrito(); 
        
        panelCarrito.classList.add('abierto');
        overlayCarrito.classList.add('activo');
    });
});

// 4. Lógica para Abrir y Cerrar el panel lateral
btnAbrirCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('abierto');
    overlayCarrito.classList.add('activo');
});

function cerrarPanel() {
    panelCarrito.classList.remove('abierto');
    overlayCarrito.classList.remove('activo');
}

btnCerrarCarrito.addEventListener('click', cerrarPanel);
overlayCarrito.addEventListener('click', cerrarPanel);

// 5. Vaciar el carrito
btnVaciar.addEventListener('click', () => {
    if(confirm("¿Seguro que quieres vaciar tu carrito?")) {
        localStorage.removeItem('carritoFourteen'); 
        carrito = []; 
        actualizarCarrito(); 
    }
});

// 6. Funcionalidad del botón Terminar Compra
btnTerminarCompra.addEventListener('click', () => {
    alert("¡Gracias por tu compra!");
});

// 7. Ejecutar todo al iniciar
actualizarCarrito();

// 8. Código de la pantalla de introducción
document.addEventListener("DOMContentLoaded", () => {
    const pantallaIntro = document.getElementById("intro-pantalla");
    setTimeout(() => {
        if (pantallaIntro) {
            pantallaIntro.remove();
        }
    }, 6000); 
});