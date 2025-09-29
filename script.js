// Scroll Top Button
window.addEventListener('scroll', function () {
  const btn = document.getElementById('scrollTopBtn');
  btn.style.display = window.scrollY > 200 ? 'flex' : 'none';
});
document.getElementById('scrollTopBtn').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sanitize input
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML.trim();
}

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const nameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');
  document.querySelectorAll('.text-red-500').forEach(el => el.classList.add('hidden'));
  let isValid = true;

  const nameValue = sanitizeInput(nameInput.value);
  if (nameValue.length < 3) {
    document.getElementById('name-error').classList.remove('hidden');
    isValid = false;
  }
  const emailValue = sanitizeInput(emailInput.value);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    document.getElementById('email-error').classList.remove('hidden');
    isValid = false;
  }
  const phoneValue = sanitizeInput(phoneInput.value);
  if (phoneValue && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phoneValue)) {
    document.getElementById('phone-error').classList.remove('hidden');
    isValid = false;
  }
  const messageValue = sanitizeInput(messageInput.value);
  if (messageValue.length < 10) {
    document.getElementById('message-error').classList.remove('hidden');
    isValid = false;
  }

  if (isValid) {
    alert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.');
    this.reset();
  }
});

// Visitor Counter + Year
document.addEventListener('DOMContentLoaded', function () {
  let visitorCount = localStorage.getItem('visitorCount') || 0;
  visitorCount++;
  localStorage.setItem('visitorCount', visitorCount);
  document.getElementById('visitor-count').textContent = visitorCount;
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ===== Dynamic Training Cards with Higher-Order Methods =====
const trainingCards = [
    { 
        id: 1, 
        title: "برنامج المبتدئين", 
        description: "تمارين أساسية لتحسين التركيز والتحكم في التوتر للمبتدئين",
        type: "beginner"
    },
    { 
        id: 2, 
        title: "برنامج المتوسطين", 
        description: "تقنيات متقدمة لإدارة الضغط والتفكير التكتيكي",
        type: "intermediate"
    },
    { 
        id: 3, 
        title: "برنامج المحترفين", 
        description: "تدريبات متخصصة للتركيز تحت الضغط والقيادة الذهنية",
        type: "advanced"
    }
];

// Higher-order function to create card generator
function createCardGenerator(templateFunction) {
    return function(cardData) {
        return templateFunction(cardData);
    };
}

// Template function using higher-order method
const cardTemplate = (card) => `
    <div class="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold text-gray-800">${card.title}</h3>
            <span class="px-2 py-1 text-xs rounded-full ${
                card.type === 'beginner' ? 'bg-green-100 text-green-800' :
                card.type === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
            }">
                ${card.type === 'beginner' ? 'مبتدئ' : 
                  card.type === 'intermediate' ? 'متوسط' : 'محترف'}
            </span>
        </div>
        <p class="text-gray-600 mb-4 leading-relaxed">${card.description}</p>
        <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">تم الإنشاء: ${new Date().toLocaleDateString('ar-EG')}</span>
            <button onclick="removeCard(${card.id})" class="text-red-500 hover:text-red-700 transition-colors text-sm">
                حذف البرنامج
            </button>
        </div>
    </div>
`;

// Create card generator
const generateCard = createCardGenerator(cardTemplate);

// Display cards using higher-order method (map)
function displayCards() {
    const container = document.getElementById('dynamic-cards-container');
    container.innerHTML = trainingCards
        .map(card => generateCard(card))
        .join('');
}

// Add new card
document.getElementById('add-card-btn').addEventListener('click', function() {
    const title = document.getElementById('card-title').value.trim();
    const desc = document.getElementById('card-desc').value.trim();
    
    if (title && desc) {
        // Determine card type based on content
        let type = 'custom';
        if (title.includes('مبتدئ') || desc.includes('مبتدئ')) type = 'beginner';
        else if (title.includes('متوسط') || desc.includes('متوسط')) type = 'intermediate';
        else if (title.includes('محترف') || desc.includes('محترف')) type = 'advanced';
        
        const newCard = {
            id: Date.now(), // Simple unique ID
            title: sanitizeInput(title),
            description: sanitizeInput(desc),
            type: type
        };
        
        trainingCards.push(newCard);
        displayCards();
        
        // Clear inputs
        document.getElementById('card-title').value = '';
        document.getElementById('card-desc').value = '';
        
        // Show success message
        showNotification('تم إضافة البرنامج بنجاح!', 'success');
    } else {
        showNotification('الرجاء ملء جميع الحقول', 'error');
    }
});

// Remove card using higher-order method (filter)
function removeCard(cardId) {
    const initialLength = trainingCards.length;
    // Using filter to remove the card
    const filteredCards = trainingCards.filter(card => card.id !== cardId);
    
    if (filteredCards.length < initialLength) {
        // Update the original array
        trainingCards.length = 0;
        trainingCards.push(...filteredCards);
        displayCards();
        showNotification('تم حذف البرنامج بنجاح', 'success');
    }
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== Fetch API for Training Tips =====
async function fetchTrainingTips() {
    try {
        // Using a free API that returns random advice
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        
        const advice = data.slip.advice;
        
        // Create different program types based on advice content
        let programType = 'custom';
        let programTitle = 'نصيحة تدريبية';
        
        if (advice.toLowerCase().includes('beginner') || advice.toLowerCase().includes('basic')) {
            programType = 'beginner';
            programTitle = 'برنامج المبتدئين - نصيحة جديدة';
        } else if (advice.toLowerCase().includes('advanced') || advice.toLowerCase().includes('expert')) {
            programType = 'advanced';
            programTitle = 'برنامج المحترفين - نصيحة متقدمة';
        } else {
            programType = 'intermediate';
            programTitle = 'برنامج المتوسطين - نصيحة تطويرية';
        }
        
        const newCard = {
            id: Date.now(),
            title: programTitle,
            description: advice,
            type: programType
        };
        
        trainingCards.push(newCard);
        displayCards();
        showNotification('تم جلب النصيحة التدريبية بنجاح!', 'success');
        
    } catch (error) {
        console.error('Error fetching training tips:', error);
        showNotification('حدث خطأ في جلب النصائح. حاول مرة أخرى.', 'error');
    }
}

// Event listener for fetch button
document.getElementById('fetch-tips-btn').addEventListener('click', fetchTrainingTips);

// Filter cards by type using higher-order method (filter)
function filterCards(type) {
    const filtered = trainingCards.filter(card => card.type === type);
    const container = document.getElementById('dynamic-cards-container');
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-8 text-gray-500">لا توجد برامج في هذا المستوى</div>`;
    } else {
        container.innerHTML = filtered
            .map(card => generateCard(card))
            .join('');
    }
}

// Initialize cards when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCards();
});