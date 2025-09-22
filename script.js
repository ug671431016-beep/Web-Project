// Show button when scrolling down
window.addEventListener('scroll', function () {
    const btn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 200) {
        btn.style.display = 'flex';
    } else {
        btn.style.display = 'none';
    }
});

// Scroll to top on click
document.getElementById('scrollTopBtn').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form validation and sanitization
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    // Reset error messages
    document.querySelectorAll('.text-red-500').forEach(el => {
        el.classList.add('hidden');
    });
    
    let isValid = true;
    
   // Validate name (at least 3 characters, letters and spaces only)
const nameValue = sanitizeInput(nameInput.value);
const nameRegex = /^[\u0600-\u06FF\sA-Za-z]+$/; // يقبل الأحرف العربية والإنجليزية والمسافات

if (nameValue.length < 3 || !nameRegex.test(nameValue)) {
    document.getElementById('name-error').classList.remove('hidden');
    isValid = false;
}
    
    // Validate email
    const emailValue = sanitizeInput(emailInput.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    }
    
    // Validate phone (optional but if provided, must be valid)
    const phoneValue = sanitizeInput(phoneInput.value);
    if (phoneValue && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phoneValue)) {
        document.getElementById('phone-error').classList.remove('hidden');
        isValid = false;
    }
    
    // Validate message (at least 10 characters)
    const messageValue = sanitizeInput(messageInput.value);
    if (messageValue.length < 10) {
        document.getElementById('message-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        // Form is valid - you would typically send data to server here
        alert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.');
        this.reset();
    }
});

// Sanitize input function
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML.trim();
}



// Website visitor counter
document.addEventListener('DOMContentLoaded', function() {
    // Check if visitor count exists in localStorage
    let visitorCount = localStorage.getItem('visitorCount');
    
    if (!visitorCount) {
        // First visit, initialize counter
        visitorCount = 0;
    }
    
    // Increment counter
    visitorCount++;
    
    // Update localStorage and display
    localStorage.setItem('visitorCount', visitorCount);
    
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = visitorCount;
    }
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});