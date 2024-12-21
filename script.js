// Aktiv səhifəni vurğulamaq üçün
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.remove('text-black/60');
            link.classList.add('text-black');
            link.classList.add('after:absolute', 'after:-bottom-1', 'after:left-0', 'after:h-0.5', 'after:w-full', 'after:bg-black');
        }
    });
});