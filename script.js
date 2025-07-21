// DOM Manipulation - Adding training programs
const trainingPrograms = [
    {
        title: "أساسيات التركيز",
        description: "تمارين لتحسين التركيز والانتباه أثناء المباريات",
        duration: "4 أسابيع"
    },
    {
        title: "بناء الثقة",
        description: "استراتيجيات لتعزيز الثقة بالنفس في الملعب",
        duration: "6 أسابيع"
    },
    {
        title: "إدارة الضغوط",
        description: "تعلم كيفية التحكم في التوتر أثناء المنافسات",
        duration: "8 أسابيع"
    }
];

const trainingCardsContainer = document.getElementById('training-cards');

trainingPrograms.forEach(program => {
    const card = document.createElement('section'); // already changed from div to section
    card.className = 'card bg-white p-6 rounded-lg shadow-lg border border-blue-100';
    card.innerHTML = `
                <h3 class="text-xl font-bold text-blue-700 mb-2">${program.title}</h3>
                <p class="text-gray-700 mb-4">${program.description}</p>
                <section class="flex justify-between items-center"> <!-- changed from div to section -->
                    <span class="text-sm text-blue-600">${program.duration}</span>
                    <button class="bg-blue-100 text-blue-700 px-4 py-1 rounded-lg hover:bg-blue-200 transition-colors">
                        عرض التفاصيل
                    </button>
                </section>
            `;
    trainingCardsContainer.appendChild(card);
});

// Form Validation
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameError.classList.remove('hidden');
        isValid = false;
    } else {
        nameError.classList.add('hidden');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.classList.remove('hidden');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
    }

    if (isValid) {
        alert('تم تسجيلك بنجاح! سنتواصل معك قريباً.');
        registrationForm.reset();
    }
});

// Fetch API - Loading testimonials
async function loadTestimonials() {
    try {
        // In a real app, this would be an actual API endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=2');
        const data = await response.json();

        const testimonialsContainer = document.getElementById('testimonials');

        data.forEach(comment => {
            const testimonial = document.createElement('section'); // changed from div to section
            testimonial.className = 'text-center p-4 border border-blue-200 rounded-lg';
            testimonial.innerHTML = `
                        <p class="text-gray-700 mb-4">"${comment.body}"</p>
                        <p class="font-semibold text-blue-600">- ${comment.name.split(' ')[0]}</p>
                    `;
            testimonialsContainer.appendChild(testimonial);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

document.getElementById('load-more').addEventListener('click', loadTestimonials);

// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Image hover effect
document.getElementById('hero-image').addEventListener('mouseenter', function () {
    this.classList.add('hover:rotate-2');
});

// Learn more button
document.getElementById('learn-more').addEventListener('click', function () {
    window.scrollTo({
        top: document.getElementById('training-cards').offsetTop - 100,
        behavior: 'smooth'
    });
});