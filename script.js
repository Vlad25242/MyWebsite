// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const reservationForm = document.getElementById('reservationForm');

// Navbar scroll effect removed - keeping header transparent and same size

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (hamburger && navMenu) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.section-header, .feature-item, .menu-category, .new-section-text, .reservation-content, .contact-content, .gallery-content, .contact-container, .cuisine-text');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});



// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const guests = document.getElementById('guests');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
    });
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Numele este obligatoriu');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Numele trebuie să aibă cel puțin 2 caractere');
        isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phone.value.trim()) {
        showError(phone, 'Telefonul este obligatoriu');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Numărul de telefon nu este valid');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email-ul este obligatoriu');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Email-ul nu este valid');
        isValid = false;
    }
    
    // Validate date
    if (!date.value) {
        showError(date, 'Data este obligatorie');
        isValid = false;
    } else {
        const selectedDate = new Date(date.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(date, 'Data nu poate fi în trecut');
            isValid = false;
        }
        
        // Check if it's Monday (restaurant is closed)
        if (selectedDate.getDay() === 1) {
            showError(date, 'Restaurantul este închis luni');
            isValid = false;
        }
    }
    
    // Validate time
    if (!time.value) {
        showError(time, 'Ora este obligatorie');
        isValid = false;
    }
    
    // Validate guests
    if (!guests.value) {
        showError(guests, 'Numărul de persoane este obligatoriu');
        isValid = false;
    }
    
    return isValid;
}

function showError(field, message) {
    field.classList.add('error');
    
    let errorMsg = field.parentNode.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        field.parentNode.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

function showSuccess(message) {
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        reservationForm.insertBefore(successMsg, reservationForm.firstChild);
    }
    
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Form submission
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            const submitBtn = reservationForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Se trimite...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showSuccess('Rezervarea a fost trimisă cu succes! Vă vom contacta în curând pentru confirmare.');
                reservationForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Set minimum date for reservation (today)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}





// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});



// Parallax scrolling effect
const parallaxBg = document.querySelector('.parallax-bg');

if (parallaxBg) {
    window.addEventListener('scroll', () => {
        const parallaxSection = document.querySelector('.parallax-section');
        
        if (parallaxSection) {
            const rect = parallaxSection.getBoundingClientRect();
            // Much extended visibility range - start effect much earlier and end much later
            const extendedRange = window.innerHeight * 1.0;
            const isVisible = rect.top < (window.innerHeight + extendedRange) && rect.bottom > -extendedRange;
            
            if (isVisible) {
                // Much extended parallax effect over very long scroll distance
                const sectionHeight = parallaxSection.offsetHeight;
                const extendedHeight = sectionHeight + (extendedRange * 2);
                const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight + extendedRange - rect.top) / (window.innerHeight + extendedHeight)));
                
                // Maximum movement is 15% of section height for even more visible effect
                const maxMovement = sectionHeight * 0.15;
                const yPos = (scrollProgress - 0.5) * maxMovement;
                
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        }
    });
}

console.log('Apertivo Restaurant Website - Loaded Successfully!');