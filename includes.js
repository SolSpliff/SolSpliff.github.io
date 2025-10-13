// ✅ Centralized placeholder values (edit these once here)
const PLACEHOLDERS = {
  '{{TICKER}}': '{{Ticker TBA}}',
  '{{CONTRACT_ADDRESS}}': '{{CA_TBA}}',
  '{{MULTISIG_ADDRESS}}': '{{MULTISIG_TBA}}'
};

// ✅ Replace placeholders in any string
function replacePlaceholders(str) {
  let result = str;
  for (const [key, value] of Object.entries(PLACEHOLDERS)) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, value);
  }
  return result;
}

// ✅ Function to apply placeholders throughout the document body
function applyPlaceholders() {
  document.body.innerHTML = replacePlaceholders(document.body.innerHTML);
}

// ✅ Original logic: load HTML includes (e.g., navbar.html)
document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  const loadPromises = [];

  includes.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      const p = fetch(file)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to fetch ${file}`);
          return response.text();
        })
        .then(data => {
          // Replace placeholders inside included content before inserting
          el.innerHTML = replacePlaceholders(data);

          // Highlight active link only after navbar is loaded
          if (file.includes('navbar.html')) {
            setActiveLink();
          }
        })
        .catch(error => {
          el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
          console.error(error);
        });

      loadPromises.push(p);
    }
  });

  // After all includes load, apply placeholders to the rest of the page
  Promise.all(loadPromises).then(() => {
    applyPlaceholders();
  });
});

// ✅ Original function: highlight active navbar link
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
    const cleanHref = href ? href.split(/[?#]/)[0] : '';

    if (cleanHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
