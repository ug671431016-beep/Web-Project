
    // Show button when scrolling down
    window.addEventListener('scroll', function () {
        const btn = document.getElementById('scrollTopBtn');
        if (window.scrollY > 200) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });
    // Scroll to top on click
    document.getElementById('scrollTopBtn').onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
