document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    /**
     * Carga las noticias desde un archivo JSON externo y las muestra en la página.
     * Maneja errores en caso de que la carga falle.
     */
    async function loadNews() {
        try {
            // Realiza una solicitud para obtener el archivo JSON de noticias
            const response = await fetch('data/noticias.json');
            // Verifica si la respuesta de la red fue exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parsea la respuesta como JSON
            const news = await response.json();

            // Limpia el contenedor de noticias antes de añadir nuevas
            newsContainer.innerHTML = '';

            // Itera sobre cada noticia y crea un elemento HTML para mostrarla
            news.forEach(item => {
                const article = document.createElement('article');
                article.classList.add('news-item'); // Añade una clase para estilos CSS
                article.innerHTML = `
                    <h3>${item.titulo}</h3>
                    <p class="news-date">${item.fecha}</p>
                    <p>${item.contenido}</p>
                `;
                newsContainer.appendChild(article); // Añade el artículo al contenedor
            });
        } catch (error) {
            // Captura y muestra cualquier error durante la carga de noticias
            console.error('Error al cargar las noticias:', error);
            newsContainer.innerHTML = '<p>No se pudieron cargar las noticias en este momento. Inténtelo de nuevo más tarde.</p>';
        }
    }

    // Llama a la función para cargar las noticias cuando el DOM esté completamente cargado
    loadNews();
});

function Nav() {
    console.log(window.nav)

    if (window.nav > 100) {
        nav.classList.add('nav-scroll')
    } else {
        nav.classList.remove('nav-scroll')
    }
}

window.addEventListener('scroll', Nav)