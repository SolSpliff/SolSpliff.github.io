document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logoImage');

    // Check that imageList exists (defined in images-list.js)
    if (typeof imageList === 'undefined') {
        console.error('imageList is not defined. Did you forget to include images-list.js?');
        return;
    }

    // Preload logo images in the background
    const preloadedImages = imageList.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    // Logo click event: perform roll animation
    logo.addEventListener('click', () => {
        let count = 0;
        const rollInterval = setInterval(() => {
            logo.src = preloadedImages[Math.floor(Math.random() * preloadedImages.length)].src;
            count++;
            if (count >= 10) {
                clearInterval(rollInterval);
                logo.src = preloadedImages[Math.floor(Math.random() * preloadedImages.length)].src;
            }
        }, 100);
    });
});