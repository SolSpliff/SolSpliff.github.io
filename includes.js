document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch ${file}`);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;

          // Highlight active link only after navbar is loaded
          if (file.includes('navbar.html')) {
            setActiveLink();
          }
        })
        .catch(error => {
          el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
          console.error(error);
        });
    }
  });
});

// Add "active" class to the nav link matching the current page
function setActiveLink() {
  let currentPage = window.location.pathname.split('/').pop();

  // Normalize empty path or directory to index.html
  if (currentPage === '') {
    currentPage = 'index.html';
  }

  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Some links may have URL params or hashes — strip those for comparison
    const cleanHref = href.split(/[?#]/)[0];

    if (cleanHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
