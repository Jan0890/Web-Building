document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');

    // Array de objetos con la información de las imágenes de la galería
    const images = [
        { src: 'https://kinsta.com/es/wp-content/uploads/sites/8/2020/09/diseno-sensible-vs-adaptable.png', alt: 'Diseño de un sitio web moderno y responsivo.' },
        { src: 'https://i.blogs.es/131ac2/trello/650_1200.webp', alt: 'Aplicación móvil intuitiva para gestión de tareas.' },
        { src: 'https://milagrosruizbarroeta.com/wp-content/uploads/2025/06/Integra-la-Innovacion-_Presentacion_-1.webp', alt: 'Sesión de consultoría estratégica para optimización de procesos.' },
        { src: 'https://www.slideteam.net/wp/wp-content/uploads/2024/02/5-Panel-de-seguimiento-de-resultados-de-campanas-de-marketing.png', alt: 'Campaña de marketing digital con resultados excepcionales.' },
        { src: 'https://academiasutnmza.com/wp-content/uploads/2025/06/ciber-hacking-etico-800x765.png', alt: 'Hackin Etico y Ciberseguridad' }

    ];

    let currentIndex = 0; // Índice de la imagen actualmente mostrada en el modal

    /**
     * Renderiza las miniaturas de la galería en el contenedor.
     */
    function renderGallery() {
        galleryContainer.innerHTML = ''; // Limpia el contenedor antes de añadir las miniaturas
        images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.dataset.index = index; // Guarda el índice en un atributo de datos
            imgElement.classList.add('gallery-thumbnail'); // Añade clase para estilos
            // Añade un evento de clic para abrir el modal con la imagen correspondiente
            imgElement.addEventListener('click', () => openModal(index));
            galleryContainer.appendChild(imgElement); // Añade la miniatura al contenedor
        });
    }

    /**
     * Abre el modal y muestra la imagen seleccionada.
     * @param {number} index - El índice de la imagen a mostrar.
     */
    function openModal(index) {
        modal.style.display = 'block'; // Muestra el modal
        modalImage.src = images[index].src; // Establece la fuente de la imagen del modal
        captionText.innerHTML = images[index].alt; // Establece la descripción de la imagen
        currentIndex = index; // Actualiza el índice actual
    }

    // Evento para cerrar el modal al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Oculta el modal
    });

    // Evento para cerrar el modal al hacer clic fuera de la imagen (en el fondo oscuro)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // Oculta el modal
        }
    });

    // Evento para el botón "Anterior" en el carrusel del modal
    prevBtn.addEventListener('click', () => {
        // Decrementa el índice, si es el primero, va al último
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        openModal(currentIndex); // Abre el modal con la nueva imagen
    });

    // Evento para el botón "Siguiente" en el carrusel del modal
    nextBtn.addEventListener('click', () => {
        // Incrementa el índice, si es el último, va al primero
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        openModal(currentIndex); // Abre el modal con la nueva imagen
    });

    // Renderiza la galería cuando el DOM esté completamente cargado
    renderGallery();
});