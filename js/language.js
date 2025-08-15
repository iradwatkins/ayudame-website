// Language Switching
(function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Detect if we're in development (localhost) or production
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.protocol === 'file:';
    
    // English for development, Spanish for production
    const defaultLang = isDevelopment ? 'en' : 'es';
    
    // Initialize language from localStorage or default
    const savedLang = localStorage.getItem('ayudame_language') || defaultLang;
    setLanguage(savedLang);
    
    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('ayudame_language', lang);
        });
    });
    
    function setLanguage(lang) {
        // Update button states
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show/hide language-specific content
        document.querySelectorAll('.es').forEach(el => {
            el.style.display = lang === 'es' ? 'inline' : 'none';
        });
        
        document.querySelectorAll('.en').forEach(el => {
            el.style.display = lang === 'en' ? 'inline' : 'none';
        });
        
        // Update input placeholders
        const emailInput = document.querySelector('.email-input');
        if (emailInput) {
            emailInput.placeholder = lang === 'es' 
                ? emailInput.dataset.placeholderEs 
                : emailInput.dataset.placeholderEn;
        }
        
        // Update page title
        document.title = lang === 'es' 
            ? 'Ayudame - Próximamente | Coming Soon'
            : 'Ayudame - Coming Soon | Próximamente';
    }
    
    // Spanish is default - no browser detection needed
})();