/* ==================== VARIABLES GLOBALES ==================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactoForm = document.getElementById('contactoForm');
const navLinks = document.querySelectorAll('.nav-link');

/* ==================== MENÚ MÓVIL - HAMBURGUESA ==================== */

/**
 * Toggle del menú móvil cuando se hace clic en el icono hamburguesa
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/**
 * Cerrar el menú cuando se hace clic en un enlace
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * Cerrar el menú cuando se hace clic fuera de él
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ==================== FORMULARIO DE CONTACTO ==================== */

/**
 * Manejo del envío del formulario de contacto
 * Valida los datos y muestra un mensaje de éxito
 */
contactoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validación básica
    if (!nombre || !correo || !telefono || !servicio || !mensaje) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }

    // Validar formato de email
    if (!isValidEmail(correo)) {
        showNotification('Por favor, ingresa un correo electrónico válido', 'error');
        return;
    }

    // Simular envío del formulario
    const submitButton = contactoForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    setTimeout(() => {
        // Mostrar mensaje de éxito
        showNotification('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.', 'success');

        // Resetear formulario
        contactoForm.reset();

        // Restablecer botón
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Log de los datos enviados (en producción, se enviarían a un servidor)
        console.log({
            nombre,
            correo,
            telefono,
            servicio,
            mensaje,
            timestamp: new Date().toISOString()
        });
    }, 1500);
});

/**
 * Valida si un email tiene un formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Muestra notificaciones al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación: 'success' o 'error'
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Agregar estilos inline (ya que no hay CSS específico para notificaciones)
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remover notificación después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ==================== SCROLL SUAVE ==================== */

/**
 * Implementa scroll suave al hacer clic en enlaces internos
 * (Ya está implementado en el CSS con scroll-behavior: smooth)
 */

/* ==================== ANIMACIONES AL HACER SCROLL ==================== */

/**
 * Anima elementos cuando entran en el viewport durante el scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Observar tarjetas de servicios y productos
 */
document.querySelectorAll('.servicio-card, .producto-card, .ventaja-card, .testimonio-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

/* ==================== EFECTOS HOVER EN BOTONES ==================== */

/**
 * Agregar efecto ripple a los botones
 */
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Crear elemento ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        // Agregar estilo de posición relativa al botón
        if (getComputedStyle(this).position === 'static') {
            this.style.position = 'relative';
        }

        this.appendChild(ripple);

        // Remover ripple después de la animación
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

/* ==================== ANIMACIÓN DE CONTADOR ==================== */

/**
 * Animar números cuando se hace scroll hasta ellos
 * Útil para mostrar estadísticas (si se agregan en el futuro)
 */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ==================== HEADER STICKY CON EFECTO ==================== */

/**
 * Agregar sombra al header cuando se hace scroll
 */
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* ==================== BOTÓN "VER SERVICIOS" EN HERO ==================== */

/**
 * El botón "Ver Servicios" ya tiene un onclick en el HTML
 * que hace scroll suave a la sección de servicios
 */

/* ==================== MANEJO DE ERRORES DE VALIDACIÓN ==================== */

/**
 * Validación en tiempo real del formulario
 */
const formInputs = contactoForm.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

/**
 * Valida un input del formulario
 * @param {HTMLElement} input - Elemento input a validar
 */
function validateInput(input) {
    const value = input.value.trim();
    const isValid = value.length > 0;

    if (input.type === 'email') {
        isValid = isValidEmail(value) || value.length === 0;
    }

    if (input.required && !isValid) {
        input.style.borderColor = '#f44336';
    } else {
        input.style.borderColor = '';
    }
}

/* ==================== SERVICIOS Y PRODUCTOS - BOTONES DE ACCIÓN ==================== */

/**
 * Manejar clics en botones "Contratar" y "Comprar"
 */
document.querySelectorAll('.servicio-card .btn, .producto-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const card = this.closest('.servicio-card') || this.closest('.producto-card');
        const title = card.querySelector('h3').textContent;

        // Rellenar automáticamente el formulario con el servicio/producto seleccionado
        const serviceSelect = document.getElementById('servicio');
        const messageTextarea = document.getElementById('mensaje');

        // Mapear nombres de servicios/productos
        const serviceMap = {
            'Reparaciones Eléctricas': 'electricidad',
            'Plomería': 'plomeria',
            'Instalación de Cámaras': 'camaras',
            'Domótica': 'domotica',
            'Aire Acondicionado': 'aire',
            'Electrodomésticos': 'electrodomesticos'
        };

        if (serviceMap[title]) {
            serviceSelect.value = serviceMap[title];
        }

        if (card.classList.contains('producto-card')) {
            messageTextarea.value = `Estoy interesado en: ${title}`;
        } else {
            messageTextarea.value = `Me gustaría contratar el servicio de: ${title}`;
        }

        // Hacer scroll a la sección de contacto
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });

        // Enfocar en el campo de nombre
        document.getElementById('nombre').focus();
    });
});

/* ==================== FUNCIONALIDADES ADICIONALES ==================== */

/**
 * Cambiar tema de color (Bonus - puede ser personalizado)
 */
function changeTheme(colorScheme) {
    if (colorScheme === 'dark') {
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.style.colorScheme = 'light';
    }
}

/**
 * Preferencias del navegador para tema oscuro
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // El usuario prefiere tema oscuro
    // Los estilos están manejados en el CSS con @media (prefers-color-scheme: dark)
}

/* ==================== INICIALIZACIÓN ==================== */

/**
 * Mostrar animación de carga al cargar la página
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('SmartHome Solutions - Página cargada correctamente');

    // Agregar clase de animación a elementos principales
    const mainElements = document.querySelectorAll('section');
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.animation = 'fadeIn 0.8s ease-out forwards';
        }, index * 100);
    });
});

/**
 * Manejar errores no capturados
 */
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.message);
});

/* ==================== UTILIDADES ==================== */

/**
 * Obtener datos del usuario desde el localStorage (opcional)
 */
function getUserData() {
    const data = localStorage.getItem('smarthomeUserData');
    return data ? JSON.parse(data) : null;
}

/**
 * Guardar datos del usuario en localStorage (opcional)
 */
function saveUserData(data) {
    localStorage.setItem('smarthomeUserData', JSON.stringify(data));
}

/**
 * Limpiar datos del usuario
 */
function clearUserData() {
    localStorage.removeItem('smarthomeUserData');
}

/* ==================== SEGUIMIENTO DE EVENTOS (Analytics) ==================== */

/**
 * Rastrear clics en secciones importantes
 */
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary')) {
        console.log('Click en botón primario:', e.target.textContent);
    }

    if (e.target.closest('.servicio-card .btn')) {
        const serviceName = e.target.closest('.servicio-card').querySelector('h3').textContent;
        console.log('Servicio seleccionado:', serviceName);
    }

    if (e.target.closest('.producto-card .btn')) {
        const productName = e.target.closest('.producto-card').querySelector('h3').textContent;
        console.log('Producto seleccionado:', productName);
    }
});

/**
 * Rastrear tiempo de permanencia en la página
 */
let pageLoadTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = (Date.now() - pageLoadTime) / 1000;
    console.log(`Tiempo en página: ${timeSpent.toFixed(2)} segundos`);
});

/* ==================== FIN DEL CÓDIGO ==================== */
