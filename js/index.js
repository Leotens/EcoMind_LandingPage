// Función para mostrar la página de Sign Up
function showSignup() {
    const signupPage = document.getElementById('signup-page');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (signupPage && main) {
        // Ocultar contenido principal
        main.style.display = 'none';
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        
        // Mostrar página de signup
        signupPage.classList.add('active');
        signupPage.style.display = 'block';
        window.scrollTo(0, 0);
        
        // Guardar estado en sessionStorage
        sessionStorage.setItem('ecomind_page', 'signup');
        
        // Agregar al historial del navegador (sin cambiar URL)
        history.pushState({ page: 'signup' }, '');
    }
}

// Función para volver a la Landing Page
function showLanding() {
    const signupPage = document.getElementById('signup-page');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (signupPage && main) {
        // Ocultar página de signup
        signupPage.classList.remove('active');
        signupPage.style.display = 'none';
        
        // Mostrar contenido principal
        main.style.display = 'block';
        if (header) header.style.display = 'block';
        if (footer) footer.style.display = 'block';
        window.scrollTo(0, 0);
        
        // Guardar estado en sessionStorage
        sessionStorage.setItem('ecomind_page', 'landing');
    }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Restaurar el estado guardado al cargar la página
    const savedPage = sessionStorage.getItem('ecomind_page');
    const signupPage = document.getElementById('signup-page');
    
    if (savedPage === 'signup' && signupPage) {
        // Mostrar signup si estaba ahí antes de recargar
        signupPage.style.display = 'block';
        signupPage.classList.add('active');
        const main = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (main) main.style.display = 'none';
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
    } else {
        // Ocultar signup por defecto
        if (signupPage) {
            signupPage.style.display = 'none';
        }
        sessionStorage.setItem('ecomind_page', 'landing');
    }
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Si es el botón de únete
            if (this.classList.contains('btn-unete') || targetId === '#unete.html') {
                e.preventDefault();
                showSignup();
                return;
            }
            
            // Si es el botón de regresar
            if (this.id === 'btnRegresar' || this.classList.contains('link-back')) {
                e.preventDefault();
                showLanding();
                return;
            }
            
            // Para otros enlaces con # (navegación interna)
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    const btnUnete = document.querySelector('.btn-unete');
    const btnExploraRetos = document.querySelector('.btn-primario');
    
    function addSignupListener(button) {
    if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showSignup();
            });
        }
    }

    addSignupListener(btnUnete);
    addSignupListener(btnExploraRetos);
    
    // Event listener para el botón Regresar
    const btnRegresar = document.getElementById('btnRegresar');
    if (btnRegresar) {
        btnRegresar.addEventListener('click', function(e) {
            e.preventDefault();
            showLanding();
        });
    }
    
    // Manejo del formulario de Sign Up
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const password = this.querySelector('input[name="password"]').value;
            const terms = document.getElementById('terms');
            
            // Validar que los términos estén aceptados
            if (terms && !terms.checked) {
                alert('Debes aceptar los términos y condiciones');
                return;
            }
            
            // Validar campos
            if (!name || !email || !password) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            // Mostrar mensaje de éxito
            alert(`¡Bienvenido a EcoMind, ${name}!\nTu registro ha sido exitoso.`);
            
            // Limpiar el formulario
            this.reset();
        });
    }
    
    // Manejo de los botones sociales (Google y Apple)
    const btnGoogle = document.querySelector('.btn-google');
    const btnApple = document.querySelector('.btn-apple');
    
    if (btnGoogle) {
        btnGoogle.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign in with Google en desarrollo');
        });
    }
    
    if (btnApple) {
        btnApple.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign in with Apple en desarrollo');
        });
    }
    
    // Manejo del enlace "Sign In"
    const linkSignIn = document.querySelector('.link-signin');
    if (linkSignIn) {
        linkSignIn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de Sign In en desarrollo');
        });
    }
    
    // Manejar el botón de retroceso del navegador
    window.addEventListener('popstate', function(event) {
        // Cuando presionas la flecha atrás, siempre volver a landing
        showLanding();
    });
});
