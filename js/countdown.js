// Countdown Timer
(function() {
    // Set the date we're counting down to (November 27, 2025)
    const launchDate = new Date("November 27, 2025 00:00:00").getTime();
    
    // Update the countdown every second
    const countdownInterval = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and launch date
        const distance = launchDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result in the respective elements
        updateCountdownDisplay(days, hours, minutes, seconds);
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            displayLaunchMessage();
        }
    }, 1000);
    
    function updateCountdownDisplay(days, hours, minutes, seconds) {
        // Add leading zeros if needed
        const formatNumber = (num) => num.toString().padStart(2, '0');
        
        // Update DOM elements with animation
        updateElement('days', formatNumber(days));
        updateElement('hours', formatNumber(hours));
        updateElement('minutes', formatNumber(minutes));
        updateElement('seconds', formatNumber(seconds));
    }
    
    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element && element.textContent !== value) {
            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0.5';
            element.textContent = value;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, 100);
        }
    }
    
    function displayLaunchMessage() {
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.innerHTML = `
                <div class="launch-message">
                    <h2 style="color: var(--dr-red); font-size: 3rem; margin-bottom: 1rem;">
                        🎉 ¡Ya estamos aquí! 🎉
                    </h2>
                    <p style="font-size: 1.5rem; color: var(--dr-blue);">
                        <span class="es">Bienvenidos a Ayudame</span>
                        <span class="en" style="display:none;">Welcome to Ayudame</span>
                    </p>
                </div>
            `;
        }
    }
    
    // Initialize countdown display immediately
    const now = new Date().getTime();
    const distance = launchDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    updateCountdownDisplay(days, hours, minutes, seconds);
})();

// Email Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const formMessage = document.getElementById('formMessage');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = signupForm.querySelector('.email-input');
            const email = emailInput.value;
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showMessage('error', 'Por favor, ingresa un correo electrónico válido.');
                return;
            }
            
            // Store email (in production, this would send to a server)
            storeEmail(email);
            
            // Show success message
            showMessage('success', '¡Gracias! Te notificaremos cuando lancemos.');
            
            // Clear form
            emailInput.value = '';
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function storeEmail(email) {
        // In production, this would send the email to your server
        // For now, we'll store it in localStorage
        let emails = JSON.parse(localStorage.getItem('ayudame_signups') || '[]');
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('ayudame_signups', JSON.stringify(emails));
        }
        
        console.log('Email stored:', email);
        console.log('Total signups:', emails.length);
    }
    
    function showMessage(type, text) {
        formMessage.className = 'form-message ' + type;
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    function getCurrentLanguage() {
        return document.querySelector('.lang-btn.active')?.dataset.lang || 'es';
    }
});