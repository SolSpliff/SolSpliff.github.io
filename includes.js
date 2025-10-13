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

// ✅ Centralized placeholder values
const PLACEHOLDERS = {
  '{{TICKER}}': '{{Ticker TBA}}',
  '{{CONTRACT_ADDRESS}}': '{{CA TBA}}',
  '{{MULTISIG_ADDRESS}}': '{{Multi-Sig TBA}}'
};

// ✅ Function to replace placeholders throughout the document body
function applyPlaceholders() {
  let html = document.body.innerHTML;

  for (const [key, value] of Object.entries(PLACEHOLDERS)) {
    // Global regex to replace all occurrences of each placeholder
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, value);
  }

  document.body.innerHTML = html;
}

// ✅ Run once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', applyPlaceholders);
