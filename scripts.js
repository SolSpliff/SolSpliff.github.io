// Mobile menu toggle function
function toggleMenu() {
    const navbar = document.querySelector('.navbar ul');
    navbar.classList.toggle('show');
}

// Automatically set active link based on current page
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Handle index.html being default when pathname is empty
        const href = link.getAttribute('href');
        if (
            (href === currentPage) || 
            (href === 'index.html' && currentPage === '')
        ) {
            link.classList.add('active');
        }
    });
});
