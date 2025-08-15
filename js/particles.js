// Particles Animation
(function() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatRandom {
            0% {
                transform: translate(0, 100vh) scale(0);
                opacity: 0;
            }
            10% {
                transform: translate(10px, 80vh) scale(1);
                opacity: 0.5;
            }
            20% {
                transform: translate(-10px, 60vh) scale(0.8);
                opacity: 0.7;
            }
            30% {
                transform: translate(10px, 40vh) scale(1.1);
                opacity: 0.6;
            }
            40% {
                transform: translate(-15px, 20vh) scale(0.9);
                opacity: 0.8;
            }
            50% {
                transform: translate(15px, 0vh) scale(1);
                opacity: 0.5;
            }
            60% {
                transform: translate(-10px, -20vh) scale(1.2);
                opacity: 0.7;
            }
            70% {
                transform: translate(10px, -40vh) scale(0.8);
                opacity: 0.6;
            }
            80% {
                transform: translate(-10px, -60vh) scale(1.1);
                opacity: 0.5;
            }
            90% {
                transform: translate(10px, -80vh) scale(0.9);
                opacity: 0.3;
            }
            100% {
                transform: translate(0, -100vh) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();