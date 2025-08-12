document.addEventListener('DOMContentLoaded', () => {
    // Obtención de referencias a los elementos del DOM
    const form = document.getElementById('budgetForm');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
    const presupuestoFinalSpan = document.getElementById('presupuesto-final');
    const condicionesCheckbox = document.getElementById('condiciones');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    /**
     * Muestra un mensaje de error para un elemento de formulario.
     * @param {HTMLElement} element - El elemento del input que tiene el error.
     * @param {string} message - El mensaje de error a mostrar.
     */
    function showError(element, message) {
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = message;
            element.classList.add('invalid'); // Añade una clase para estilos visuales de error
        }
    }

    /**
     * Limpia el mensaje de error para un elemento de formulario.
     * @param {HTMLElement} element - El elemento del input cuyo error se va a limpiar.
     */
    function clearError(element) {
        const errorSpan = document.getElementById(`error-${element.id}`);
        if (errorSpan) {
            errorSpan.textContent = '';
            element.classList.remove('invalid'); // Remueve la clase de error
        }
    }

    // --- Funciones de Validación de Datos de Contacto ---

    /**
     * Valida el campo Nombre.
     * Solo letras, longitud máxima de 15 caracteres.
     * @returns {boolean} - Verdadero si es válido, falso en caso contrario.
     */
    function validateNombre() {
        const nombre = nombreInput.value.trim();
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras, acentos, ñ y espacios
        if (nombre.length === 0) {
            showError(nombreInput, 'El nombre es obligatorio.');
            return false;
        }
        if (!regex.test(nombre)) {
            showError(nombreInput, 'El nombre solo puede contener letras y espacios.');
            return false;
        }
        if (nombre.length > 15) {
            showError(nombreInput, 'El nombre no puede exceder 15 caracteres.');
            return false;
        }
        clearError(nombreInput);
        return true;
    }

    /**
     * Valida el campo Apellidos.
     * Solo letras, longitud máxima de 40 caracteres.
     * @returns {boolean} - Verdadero si es válido, falso en caso contrario.
     */
    function validateApellidos() {
        const apellidos = apellidosInput.value.trim();
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (apellidos.length === 0) {
            showError(apellidosInput, 'Los apellidos son obligatorios.');
            return false;
        }
        if (!regex.test(apellidos)) {
            showError(apellidosInput, 'Los apellidos solo pueden contener letras y espacios.');
            return false;
        }
        if (apellidos.length > 40) {
            showError(apellidosInput, 'Los apellidos no pueden exceder 40 caracteres.');
            return false;
        }
        clearError(apellidosInput);
        return true;
    }

    /**
     * Valida el campo Teléfono de Contacto.
     * Solo números, longitud exacta de 9 dígitos.
     * @returns {boolean} - Verdadero si es válido, falso en caso contrario.
     */
    function validateTelefono() {
        const telefono = telefonoInput.value.trim();
        const regex = /^[0-9]+$/;
        if (telefono.length === 0) {
            showError(telefonoInput, 'El teléfono es obligatorio.');
            return false;
        }
        if (!regex.test(telefono)) {
            showError(telefonoInput, 'El teléfono solo puede contener números.');
            return false;
        }
        if (telefono.length !== 9) {
            showError(telefonoInput, 'El teléfono debe tener exactamente 9 dígitos.');
            return false;
        }
        clearError(telefonoInput);
        return true;
    }

    /**
     * Valida el campo Correo Electrónico.
     * Debe cumplir con un formato de email estándar.
     * @returns {boolean} - Verdadero si es válido, falso en caso contrario.
     */
    function validateEmail() {
        const email = emailInput.value.trim();
        // Regex de email estándar (puede ser más compleja si se necesita)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.length === 0) {
            showError(emailInput, 'El correo electrónico es obligatorio.');
            return false;
        }
        if (!regex.test(email)) {
            showError(emailInput, 'El formato del correo electrónico es inválido. Ejemplo: usuario@dominio.com');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    /**
     * Valida que la casilla de aceptación de condiciones esté marcada.
     * @returns {boolean} - Verdadero si está marcada, falso en caso contrario.
     */
    function validateCondiciones() {
        if (!condicionesCheckbox.checked) {
            showError(condicionesCheckbox, 'Debe aceptar las condiciones de privacidad.');
            return false;
        }
        clearError(condicionesCheckbox);
        return true;
    }

    // --- Función de Cálculo del Presupuesto ---

    /**
     * Calcula y actualiza el presupuesto final basado en las selecciones del usuario.
     * Se llama cada vez que una opción relevante cambia.
     */
    function calculateBudget() {
        let basePrice = 0;
        let discount = 0;
        let extrasPrice = 0;

        // 1. Obtener el precio base del producto seleccionado
        const selectedProductOption = productoSelect.options[productoSelect.selectedIndex];
        if (selectedProductOption && selectedProductOption.value) {
            basePrice = parseFloat(selectedProductOption.dataset.price || 0);
        }

        // 2. Calcular el descuento por plazo
        const plazo = parseInt(plazoInput.value);
        if (plazo > 0) {
            // Ejemplo de lógica de descuento:
            // 5% de descuento si el plazo es de 30 días o más
            // 10% de descuento si el plazo es de 60 días o más
            if (plazo >= 60) {
                discount = basePrice * 0.10; // 10% de descuento
            } else if (plazo >= 30) {
                discount = basePrice * 0.05; // 5% de descuento
            }
            // Puedes ajustar esta lógica de descuento según tus necesidades
        }

        // 3. Sumar el precio de los extras seleccionados
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                extrasPrice += parseFloat(checkbox.dataset.price || 0);
            }
        });

        // Calcular el presupuesto final
        let finalBudget = basePrice - discount + extrasPrice;

        // Asegurarse de que el presupuesto no sea negativo
        if (finalBudget < 0) {
            finalBudget = 0;
        }

        // Mostrar el presupuesto final formateado
        presupuestoFinalSpan.textContent = `€${finalBudget.toFixed(2)}`;
    }

    // --- Event Listeners para validación y cálculo en tiempo real ---

    // Validaciones en tiempo real al escribir o cambiar los campos de contacto
    nombreInput.addEventListener('input', validateNombre);
    apellidosInput.addEventListener('input', validateApellidos);
    telefonoInput.addEventListener('input', validateTelefono);
    emailInput.addEventListener('input', validateEmail);
    condicionesCheckbox.addEventListener('change', validateCondiciones);

    // Recalcular presupuesto cada vez que cambian las opciones relevantes
    productoSelect.addEventListener('change', calculateBudget);
    plazoInput.addEventListener('input', calculateBudget);
    extrasCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateBudget);
    });

    // --- Manejo del Envío y Reseteo del Formulario ---

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario (recarga de página)

        // Ejecutar todas las validaciones antes de permitir el envío
        const isValidNombre = validateNombre();
        const isValidApellidos = validateApellidos();
        const isValidTelefono = validateTelefono();
        const isValidEmail = validateEmail();
        const isValidCondiciones = validateCondiciones();
        const isProductSelected = productoSelect.value !== ""; // Verifica que se haya seleccionado un producto

        // Si no se ha seleccionado un producto, muestra un mensaje y enfoca el select
        if (!isProductSelected) {
            alert('Por favor, selecciona un producto o servicio para tu presupuesto.');
            productoSelect.focus();
            return; // Detiene el proceso de envío
        }

        // Si todas las validaciones son exitosas, el formulario es válido
        if (isValidNombre && isValidApellidos && isValidTelefono && isValidEmail && isValidCondiciones && isProductSelected) {
            // Aquí podrías recopilar todos los datos del formulario
            const formData = {
                nombre: nombreInput.value.trim(),
                apellidos: apellidosInput.value.trim(),
                telefono: telefonoInput.value.trim(),
                email: emailInput.value.trim(),
                producto: productoSelect.value,
                plazo: parseInt(plazoInput.value),
                extras: Array.from(extrasCheckboxes).filter(cb => cb.checked).map(cb => cb.value),
                presupuestoFinal: presupuestoFinalSpan.textContent
            };

            console.log('Datos del formulario:', formData);
            alert('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto. Presupuesto final: ' + presupuestoFinalSpan.textContent);

            // En un escenario real, aquí enviarías 'formData' a un servidor usando fetch() o XMLHttpRequest
            // Ejemplo (descomentar para usar):
            /*
            fetch('/api/submit-budget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                alert('¡Presupuesto enviado con éxito!');
                form.reset(); // Opcional: resetear el formulario después de un envío exitoso
                calculateBudget(); // Recalcular presupuesto a 0
            })
            .catch((error) => {
                console.error('Error al enviar el formulario:', error);
                alert('Hubo un error al enviar tu presupuesto. Por favor, inténtalo de nuevo.');
            });
            */
        } else {
            // Si hay errores de validación, informa al usuario
            alert('Por favor, corrige los errores marcados en el formulario antes de enviar.');
        }
    });

    // Evento para el botón de restablecer el formulario
    resetBtn.addEventListener('click', () => {
        form.reset(); // Restablece todos los campos del formulario a sus valores iniciales
        calculateBudget(); // Recalcula el presupuesto a 0 después de resetear
        // Limpia todos los mensajes de error y las clases 'invalid'
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
        document.querySelectorAll('.invalid').forEach(element => element.classList.remove('invalid'));
    });

    // Calcular el presupuesto inicial al cargar la página por primera vez
    calculateBudget();
});